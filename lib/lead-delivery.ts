import { createHash } from "node:crypto";

export type DeliveryRecord = { fingerprint: string; status: "ready" | "customer_pending" | "lead_pending" | "confirmed"; customerId?: string; providerLeadId?: string };
export interface DeliveryStore { create(id: string, record: DeliveryRecord): Promise<boolean>; read(id: string): Promise<DeliveryRecord | null>; compareAndSet(id: string, old: DeliveryRecord, next: DeliveryRecord): Promise<boolean>; }
export class LeadDeliveryError extends Error { constructor(public code: string, public status = 503) { super(code); } }
export class ProviderRejection extends Error {}

/** Durable journal: a pending provider call is never blindly replayed after a timeout. */
export async function deliverOnce(id: string, fingerprint: string, store: DeliveryStore, provider: { customer: () => Promise<string>; lead: (customerId: string) => Promise<string> }) {
  await store.create(id, { fingerprint, status: "ready" });
  let record = await store.read(id);
  if (!record) throw new LeadDeliveryError("delivery_store_unavailable");
  if (record.fingerprint !== fingerprint) throw new LeadDeliveryError("submission_changed", 409);
  if (record.status === "confirmed" && record.providerLeadId) return record.providerLeadId;
  if (record.status === "customer_pending" || record.status === "lead_pending") throw new LeadDeliveryError("delivery_pending_reconciliation", 409);
  if (!record.customerId) {
    const pending: DeliveryRecord = { ...record, status: "customer_pending" };
    if (!await store.compareAndSet(id, record, pending)) throw new LeadDeliveryError("submission_processing", 409);
    try {
      const customerId = await provider.customer();
      if (!customerId) throw new LeadDeliveryError("customer_unconfirmed");
      const next: DeliveryRecord = { ...pending, status: "ready", customerId };
      if (!await store.compareAndSet(id, pending, next)) throw new LeadDeliveryError("delivery_pending_reconciliation");
      record = next;
    } catch (error) {
      // Only a definite rejection is safe to repeat. Timeouts and 5xx remain pending.
      if (error instanceof ProviderRejection) await store.compareAndSet(id, pending, record);
      throw error;
    }
  }
  const pending: DeliveryRecord = { ...record, status: "lead_pending" };
  if (!await store.compareAndSet(id, record, pending)) throw new LeadDeliveryError("submission_processing", 409);
  try {
    const providerLeadId = await provider.lead(record.customerId!);
    if (!providerLeadId) throw new LeadDeliveryError("lead_unconfirmed");
    if (!await store.compareAndSet(id, pending, { ...pending, status: "confirmed", providerLeadId })) throw new LeadDeliveryError("delivery_pending_reconciliation");
    return providerLeadId;
  } catch (error) {
    if (error instanceof ProviderRejection) await store.compareAndSet(id, pending, record);
    throw error;
  }
}

/** Store only a digest and provider IDs here; customer PII belongs in HCP. */
export function leadFingerprint(data: unknown) { return createHash("sha256").update(JSON.stringify(data)).digest("hex"); }

export function redisDeliveryStore(): DeliveryStore {
  const [url, token] = process.env.LEAD_REDIS_REST_URL || process.env.LEAD_REDIS_REST_TOKEN
    ? [process.env.LEAD_REDIS_REST_URL, process.env.LEAD_REDIS_REST_TOKEN]
    : process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_TOKEN
      ? [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN]
      : [process.env.KV_REST_API_URL, process.env.KV_REST_API_TOKEN];
  if (!url || !token) throw new LeadDeliveryError("delivery_store_not_configured");
  if (!url.startsWith("https://")) throw new LeadDeliveryError("delivery_store_invalid");
  const key = (id: string) => `gc:lead:v2:${id}`;
  async function command(args: unknown[]) {
    const response = await fetch(url!, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(args), cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new LeadDeliveryError("delivery_store_unavailable");
    const result = await response.json() as { result?: unknown; error?: string };
    if (result.error) throw new LeadDeliveryError("delivery_store_unavailable");
    return result.result;
  }
  return {
    create: async (id, record) => await command(["SET", key(id), JSON.stringify(record), "NX"]) === "OK",
    read: async id => { const data = await command(["GET", key(id)]); return typeof data === "string" ? JSON.parse(data) as DeliveryRecord : null; },
    compareAndSet: async (id, old, next) => await command(["EVAL", "if redis.call('GET',KEYS[1]) == ARGV[1] then redis.call('SET',KEYS[1],ARGV[2]); return 1 else return 0 end", "1", key(id), JSON.stringify(old), JSON.stringify(next)]) === 1,
  };
}

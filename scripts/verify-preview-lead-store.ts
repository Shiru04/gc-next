import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { redisDeliveryStore } from "../lib/lead-delivery";

async function main() {
  // This operational check runs with Node 24; the application retains Node 20 types.
  (process as NodeJS.Process & { loadEnvFile(path: string): void }).loadEnvFile(".env.preview-qa");
  const store = redisDeliveryStore();
  const id = `qa:${randomUUID()}`;
  const record = { fingerprint: "preview-infrastructure-qa", status: "ready" as const };
  const attempts = await Promise.all(Array.from({ length: 8 }, () => store.create(id, record)));
  assert.equal(attempts.filter(Boolean).length, 1);
  assert.deepEqual(await store.read(id), record);
  const next = { ...record, status: "confirmed" as const, providerLeadId: "synthetic-storage-check-no-hcp-request" };
  const changes = await Promise.all(Array.from({ length: 8 }, () => store.compareAndSet(id, record, next)));
  assert.equal(changes.filter(Boolean).length, 1);
  assert.deepEqual(await store.read(id), next);
  fs.writeFileSync("docs/qa-redesign/preview-redis-verification.json", JSON.stringify({ measuredAt: new Date().toISOString(), realRedis: true, realHcp: false, recordId: id, concurrentCreateWinners: 1, concurrentUpdateWinners: 1, persistentReadVerified: true }, null, 2));
  console.log("PASS preview Redis: atomic creation, compare-and-set and persistent read. No HCP request or customer data used.");
}
main().catch(() => { console.error("Preview Redis verification failed; check configuration and service access."); process.exitCode = 1; });

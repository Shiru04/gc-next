import assert from "node:assert/strict";
import { deliverOnce, ProviderRejection, type DeliveryRecord, type DeliveryStore } from "../lib/lead-delivery";
class MemoryStore implements DeliveryStore {
  records = new Map<string, DeliveryRecord>();
  async create(id: string, record: DeliveryRecord) { if(this.records.has(id))return false;this.records.set(id,record);return true; }
  async read(id: string){return this.records.get(id) || null;}
  async compareAndSet(id: string, old: DeliveryRecord, next: DeliveryRecord){if(JSON.stringify(this.records.get(id))!==JSON.stringify(old))return false;this.records.set(id,next);return true;}
}
async function run(){
  const store=new MemoryStore();let customers=0,leads=0;
  const provider={customer:async()=>{customers++;return "customer-1";},lead:async()=>{leads++;return "lead-1";}};
  const concurrent=await Promise.allSettled(Array.from({length:8},()=>deliverOnce("id","fingerprint",store,provider)));
  assert.equal(customers,1);assert.equal(leads,1);assert.ok(concurrent.some(r=>r.status==="fulfilled"));
  assert.equal(await deliverOnce("id","fingerprint",store,provider),"lead-1");assert.equal(leads,1);
  await assert.rejects(()=>deliverOnce("id","different",store,provider),/submission_changed/);
  let attempts=0;const retry={customer:provider.customer,lead:async()=>{attempts++;if(attempts===1)throw new ProviderRejection();return "retried";}};
  await assert.rejects(()=>deliverOnce("retry","fp",store,retry));
  assert.equal(await deliverOnce("retry","fp",store,retry),"retried");assert.equal(customers,2);
  let uncertainCalls=0;const uncertain={customer:provider.customer,lead:async()=>{uncertainCalls++;throw new Error("timeout after provider possibly committed");}};
  await assert.rejects(()=>deliverOnce("uncertain","fp",store,uncertain));
  await assert.rejects(()=>deliverOnce("uncertain","fp",store,uncertain),/reconciliation/);assert.equal(uncertainCalls,1);
  console.log("PASS durable delivery contract: concurrency, repeat request, payload conflict, known-rejection retry, customer reuse, ambiguous timeout prevents replay. Memory adapter only; live Redis/HCP still require acceptance.");
}
void run();

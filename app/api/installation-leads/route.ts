import { NextRequest, NextResponse } from "next/server";
import { validateInstallation } from "@/lib/installation-schema";
import { deliverOnce, leadFingerprint, LeadDeliveryError, ProviderRejection, redisDeliveryStore } from "@/lib/lead-delivery";
export const runtime = "nodejs";

async function verify(token: string) {
 const secret=process.env.TURNSTILE_SECRET_KEY;
 if(!secret)return process.env.NODE_ENV==="development";
 const response=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:new URLSearchParams({secret,response:token}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 return response.ok && Boolean((await response.json()).success);
}
async function hcp(path: string, body: unknown, requestId: string) {
 const base=process.env.HOUSECALL_PRO_API_BASE_URL || "https://api.housecallpro.com";
 const response=await fetch(base.replace(/\/$/,"")+path,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Token "+process.env.HOUSECALL_PRO_API_KEY,"Idempotency-Key":requestId},body:JSON.stringify(body),cache:"no-store",signal:AbortSignal.timeout(15000)});
 if(!response.ok){
  if([400,401,403,404,422,429].includes(response.status))throw new ProviderRejection("hcp_rejected");
  throw new LeadDeliveryError("hcp_outcome_unknown");
 }
 const data=await response.json();
 const id=data.id || data.customer?.id || data.lead?.id;
 if(typeof id!=="string" || !id)throw new LeadDeliveryError("hcp_unconfirmed");
 return id;
}
export async function POST(request: NextRequest) {
 const id=request.headers.get("Idempotency-Key")?.trim() || "";
 const fail=(error:string,status:number,errors?:unknown)=>NextResponse.json({ok:false,error,error_stage:error.startsWith("verification")?"cloudflare":error.startsWith("invalid")||error==="submission_id_required"?"validation":error.includes("store")?"storage":"hcp",request_id:id,...(errors?{errors}:{})},{status});
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return fail("submission_id_required",400);
 const origin=request.headers.get("origin");
 if(origin && origin!==request.nextUrl.origin)return fail("origin_rejected",403);
 let raw;try{raw=await request.json();}catch{return fail("invalid_json",400);}
 const cookie=(name:string)=>{try{return JSON.parse(decodeURIComponent(request.cookies.get(name)?.value || "{}"));}catch{return {};}};
 const firstTouch=cookie("gc_attribution_first"),latestTouch=cookie("gc_attribution_latest");
 if(raw && typeof raw==="object" && (Object.keys(firstTouch).length || Object.keys(latestTouch).length))raw.attribution={firstTouch,latestTouch};
 const parsed=validateInstallation(raw);if(!parsed.success)return fail("invalid_fields",422,parsed.errors);
 const lead=parsed.data;if(lead.website)return fail("request_rejected",400);
 if(process.env.HOUSECALL_PRO_MODE!=="api" || !process.env.HOUSECALL_PRO_API_KEY)return fail("hcp_configuration",503);
 try{
  if(!await verify(lead.turnstileToken))return fail("verification_failed",403);
  const store=redisDeliveryStore();
  const {turnstileToken:_token,attribution:_attribution,...stable}=lead;
  const fingerprint=leadFingerprint(stable);
  const note=[
   "GC website submission: "+id,"Service intent: "+(lead.serviceIntent || lead.serviceRequestType || "installation"),
   "Project: "+lead.projectType,"Timing: "+lead.timeline,"System interest: "+lead.systemType,
   "Financing interest: "+lead.financingInterest,"Property relationship: "+lead.homeownerStatus,
   "ZIP: "+lead.zipCode,"Form placement: "+lead.ctaSource,"Company: "+lead.company,
   "Property type: "+lead.propertyType,"Equipment: "+lead.equipmentType,"Service needed: "+lead.serviceNeeded,
   "Urgency: "+lead.urgency,"Comfort concerns: "+lead.comfortNeeds.join(", "),"Comments: "+lead.comments,
   "First/latest attribution: "+JSON.stringify(lead.attribution),
   lead.serviceRequestType==="maintenance"?"Maintenance offer: Regular $174; save $25; final $149; coupon GC149":""
  ].filter(Boolean).join("\n");
  const providerLeadId=await deliverOnce(id,fingerprint,store,{
   customer:()=>hcp("/customers",{first_name:lead.firstName,last_name:lead.lastName,...(lead.email?{email:lead.email}:{}),mobile_number:lead.phone,notifications_enabled:false},id+"-customer"),
   lead:customerId=>hcp("/leads",{customer_id:customerId,lead_source:process.env.HOUSECALL_PRO_LEAD_SOURCE?.trim() || "GC Website",note},id+"-lead")
  });
  // HCP is the primary destination. Optional reporting storage cannot turn a confirmed lead into a failure.
  const endpoint=process.env.OPERATIONS_HUB_FORM_ENDPOINT;
  const formId=(lead.serviceRequestType?process.env.OPERATIONS_HUB_SERVICE_REQUEST_FORM_ID:undefined) || process.env.OPERATIONS_HUB_INSTALLATION_FORM_ID;
  if(endpoint && formId)await fetch(endpoint.replace(/\/$/,"")+"/"+encodeURIComponent(formId)+"/submit",{method:"POST",headers:{"Content-Type":"application/json","Idempotency-Key":id,...(process.env.OPERATIONS_HUB_API_KEY?{Authorization:"Bearer "+process.env.OPERATIONS_HUB_API_KEY}:{})},body:JSON.stringify({data:{...stable,attribution:lead.attribution,request_id:id,leadId:id,providerLeadId,status:"hcp_confirmed",receivedAt:new Date().toISOString()}}),signal:AbortSignal.timeout(5000)}).catch(()=>undefined);
  return NextResponse.json({ok:true,provider:"housecall_pro",providerLeadId,leadId:id,request_id:id});
 }catch(error){
  if(error instanceof LeadDeliveryError)return fail(error.code,error.status);
  if(error instanceof ProviderRejection)return fail("hcp_rejected",502);
  return fail("delivery_unconfirmed",503);
 }
}

"use client";
import { readStoredAttribution } from "@/lib/attribution";
import { sendGoogleEvent } from "@/lib/google-tag";
export function OptionalBooking({locale,submissionId}:{locale:"en"|"es";submissionId:string}){
 const configured=process.env.NEXT_PUBLIC_HOUSECALL_PRO_ONLINE_BOOKING_URL;
 if(!configured)return null;
 let url:URL;try{url=new URL(configured);if(url.protocol!=="https:" || !/(^|\.)(housecallpro\.com|housecall\.pro)$/.test(url.hostname))return null;}catch{return null;}
 function book(){const attribution=readStoredAttribution() as Record<string,unknown>;const first=(attribution.firstTouch || attribution) as Record<string,unknown>;const latest=(attribution.latestTouch || first) as Record<string,unknown>;
  for(const field of ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","gbraid","wbraid"]){const value=latest[field] || first[field];if(typeof value==="string")url.searchParams.set(field,value);}
  url.searchParams.set("submission_id",submissionId);sendGoogleEvent("hcp_booking_start",{request_id:submissionId,form_location:"confirmed-success"});window.location.assign(url.toString());
 }
 return <button className="gc-button gc-button-light" onClick={book}>{locale==="es"?"Elegir una cita (opcional)":"Choose an appointment (optional)"}</button>;
}

# Housecall Pro migration runbook

Dispatch remains the automatic fallback for repair and maintenance until the Housecall Pro booking URL is configured and production QA is approved. Do not delete the Dispatch account, links, or historical data during this migration.

## Choose one lead mode

- `HOUSECALL_PRO_MODE=api`: for Housecall Pro MAX/XL with API Leads enabled. Set `HOUSECALL_PRO_API_KEY`; the website saves the backup record first, creates the Housecall Pro customer and lead, and only then returns success.
- `HOUSECALL_PRO_MODE=native`: for a non-MAX account. Set `NEXT_PUBLIC_HOUSECALL_PRO_LEAD_FORM_URL` to the URL from the official Housecall Pro Lead Form embed. Configure Last name, Email, Address/ZIP, Service Details, and custom questions in Housecall Pro before enabling it.
- `HOUSECALL_PRO_MODE=disabled`: migration-safe default. The API will preserve a submitted request in backup storage but will not report a conversion because Housecall Pro did not confirm receipt.

Set `NEXT_PUBLIC_HOUSECALL_PRO_ONLINE_BOOKING_URL` to the booking-page link copied from Housecall Pro for Repair and Tune-Up CTAs. If it is blank, those CTAs continue to Dispatch.

## Production acceptance

1. Verify Central AC, heat pump and mini-split leads in Housecall Pro.
2. Verify project, comfort, timeline, financing, ZIP, CTA source, GCLID/GBRAID/WBRAID and all UTMs.
3. Simulate Housecall Pro failure and confirm the backup record and notification still exist while no success event fires.
4. Confirm `housecall_pro_installation_lead_confirmed` fires once after a Housecall Pro lead ID is returned.
5. Verify Repair and Tune-Up open Housecall Pro Online Booking and retain campaign parameters.
6. Obtain GC approval before removing any Dispatch fallback or historical integration.

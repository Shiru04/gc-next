# Analytics data contract

GTM is the only distributor. Configure GA4 and Google Ads tags from these `dataLayer` events: `schedule_service_click`, `phone_click`, `dispatch_booking_start`, `contact_form_start`, `contact_form_submit`, `installation_estimate_request`, and `financing_click`. Keep `dispatch_booking_complete` disabled pending a verified Dispatch callback.

Every event supplies `service_type`, `page_path`, `cta_location`, `traffic_source`, `campaign`, and `device_type`; link events may supply a destination URL stripped of query parameters. No name, email, phone, ZIP, message, Turnstile token, click ID, or other PII is pushed.

Recommended conversions: Phone Call Lead (primary), Contact Form Lead (primary), Installation Estimate Request (primary), Dispatch Booking Start (secondary), Dispatch Booking Completed (disabled), Financing Application Start (disabled until an approved destination exists).

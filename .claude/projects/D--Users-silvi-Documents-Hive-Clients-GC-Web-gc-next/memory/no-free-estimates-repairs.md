---
name: no-free-estimates-repairs
description: Never mention "free estimates" in HVAC repair content (promotions, services, pages)
metadata:
  type: feedback
---

For the GC Heating & Cooling site, repairs must never advertise "free estimates" / "free estimate". Free estimates only apply to installations (whole system).

**Why:** The business does not offer free estimates for repair work — only for new system installations. Advertising it on repairs is inaccurate.

**How to apply:** When adding or editing repair-related copy (the `repairs` promotion in `lib/promotions.ts`, `app/promotions/repairs/page.tsx`, repair services in `lib/services.ts`), reframe around "fast diagnostics" / "clear repair quote" instead of free estimates. General pages that cover installation too (service-areas, contact) may keep free-estimate wording since it applies to installs.

const fs = require('node:fs');
function edit(path, before, after) { const text = fs.readFileSync(path, 'utf8'); if (!text.includes(before)) throw new Error('Missing target: '+path); fs.writeFileSync(path, text.replace(before, after)); }
edit('lib/google-tag.ts', '  | "housecall_pro_booking_start"', '  | "housecall_pro_booking_start"\n  | "hcp_booking_start"');
edit('lib/google-tag.ts', 'const ALLOWED_PARAMETERS = new Set([', 'const ALLOWED_PARAMETERS = new Set([\n  "form_name", "form_location", "step", "error_type",');
edit('lib/seo.ts', 'if (!raw) return undefined;', 'if (!raw) return "https://gc-heatingandcooling.com";');
edit('lib/installation-schema.ts', 'firstName: string; lastName: string;', 'formMode: string; serviceIntent: string; company: string; propertyType: string; equipmentType: string; serviceNeeded: string; urgency: string;\n  firstName: string; lastName: string;');
edit('lib/installation-schema.ts', 'const data: InstallationInput = {', 'const data: InstallationInput = {\n    formMode: text(raw.formMode, 30), serviceIntent: text(raw.serviceIntent, 30), company: text(raw.company, 120), propertyType: text(raw.propertyType, 120), equipmentType: text(raw.equipmentType, 120), serviceNeeded: text(raw.serviceNeeded, 200), urgency: text(raw.urgency, 120),');
edit('lib/installation-schema.ts', 'if (data.firstName.length < 2)', 'if (!data.firstName.length)');
edit('lib/installation-schema.ts', 'if (data.lastName.length < 2)', 'if (data.formMode === "installation" && !data.lastName.length)');
edit('lib/installation-schema.ts', 'if (!EMAIL.test(data.email))', 'if (data.email && !EMAIL.test(data.email))');
edit('lib/installation-schema.ts', 'if (!data.comfortNeeds.length) errors.comfortNeeds = "Choose at least one comfort priority.";', 'if (data.formMode === "commercial" && !data.company) errors.company = "Enter your company name.";');
edit('app/api/installation-leads/route.ts', '  return [', '  return [\n    `Service intent: ${lead.serviceIntent}`, `Company: ${lead.company}`, `Property type: ${lead.propertyType}`, `Equipment: ${lead.equipmentType}`, `Service needed: ${lead.serviceNeeded}`, `Urgency: ${lead.urgency}`,');
console.log('Updated acquisition schema and event metadata.');

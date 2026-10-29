/** Attribution contains campaign identifiers only, never free-form contact data. */
export function attributionValue(key: string, value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const candidate = value.trim();
  const format = key.startsWith("utm_") ? /^[a-zA-Z0-9_.~ -]{1,160}$/ : /^[a-zA-Z0-9_.~-]{1,160}$/;
  if (!format.test(candidate)) return undefined;
  if (key !== "gad_campaignid" && /^\d{5}(?:\d{5,10})?$/.test(candidate)) return undefined;
  return candidate;
}

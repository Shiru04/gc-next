export function HousecallProNativeLeadForm({ url }: { url: string }) {
  return (
    <div>
      <p className="mb-4 text-sm text-black/65">
        Complete GC’s secure Housecall Pro Lead Form below. The service-details
        and custom-question fields must be configured in Housecall Pro to match
        this quote guide before activation.
      </p>
      <iframe
        title="Free HVAC Installation Estimate"
        src={url}
        className="min-h-[760px] w-full rounded-xl border border-black/10"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

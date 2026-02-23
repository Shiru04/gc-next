import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact GC Heating & Cooling",
  description:
    "Call or book online for HVAC service in Los Angeles & Orange County. Get fast scheduling and reliable service.",
});

// Static “mailto” form: works with static export.
// Later we can swap to a form provider (Formspree/Netlify Forms/etc.) without SSR.
export default function ContactPage() {
  const mailto = `mailto:info@gcheatingandcooling.com?subject=${encodeURIComponent(
    "Service Request",
  )}&body=${encodeURIComponent("Hi GC Heating & Cooling,%0D%0A%0D%0AI'm looking for help with:%0D%0A%0D%0AName:%0D%0APhone:%0D%0AAddress/City:%0D%0ADetails:%0D%0A")}`;

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              CONTACT
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              We’re ready to help
            </h1>
            <p className="mt-4 text-lg text-black/70">
              Call for fast help or book an onsite consultation. We serve Los
              Angeles and Orange County.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={`tel:${BUSINESS.phoneE164}`}
                variant="secondary"
                size="lg"
              >
                Call {BUSINESS.phoneDisplay}
              </Button>
              <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
                Book Now
              </Button>
            </div>

            <Card className="mt-7 p-6">
              <div className="font-extrabold">Office</div>
              <div className="mt-2 text-black/70">
                <div>{BUSINESS.addressLine1}</div>
                <div>{BUSINESS.cityStateZip}</div>
                <div className="mt-3">{BUSINESS.hoursShort}</div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="text-2xl font-extrabold">Quick message</div>
            <p className="mt-2 text-black/70">
              Since this site is static, the simplest option is email. Click
              below to start a pre-filled message.
            </p>
            <div className="mt-5">
              <Button
                href={mailto}
                variant="primary"
                size="lg"
                target="_self"
                rel=""
              >
                Email us
              </Button>
            </div>
            <p className="mt-4 text-sm text-black/60">
              Prefer booking? Use “Book Now” and we’ll confirm your appointment.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}

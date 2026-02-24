import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export const metadata = buildMetadata({
  title: "Contact | GC Heating & Cooling",
  description:
    "Contact GC Heating & Cooling for HVAC installation, repair, and maintenance across Los Angeles & Orange County. Free estimates available.",
  path: "/contact",
});

export default function ContactPage() {
  const mailto = `mailto:info@gcheatingandcooling.com?subject=${encodeURIComponent(
    "Service Request",
  )}&body=${encodeURIComponent(
    "Hi GC Heating & Cooling,%0D%0A%0D%0AI'm looking for help with:%0D%0A%0D%0AName:%0D%0APhone:%0D%0AAddress/City:%0D%0ADetails:%0D%0A",
  )}`;

  return (
    <>
      {/* HERO (Wix-like) */}
      <Section className="relative overflow-hidden pt-10 sm:pt-14">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b31217] via-[#e52d27] to-[#ff6a00]" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
              WE SERVICE, INSTALL & REPAIR HVAC SYSTEMS
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              We are ready
              <br />
              to help!
            </h1>

            <div className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              Call us for fast scheduling or book an onsite consultation. We
              serve <span className="font-semibold">Los Angeles</span> and{" "}
              <span className="font-semibold">Orange County</span>.
            </div>

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

            {/* Contact details (Wix-style block) */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="bg-white/95 p-6 shadow-soft">
                <div className="text-sm font-extrabold text-black/60">
                  Customer Support
                </div>
                <div className="mt-2 text-xl font-extrabold">
                  {BUSINESS.phoneDisplay}
                </div>
                <div className="mt-2 text-sm text-black/70">
                  {BUSINESS.hoursShort}
                </div>
                <div className="mt-4">
                  <Button
                    href={`tel:${BUSINESS.phoneE164}`}
                    variant="primary"
                    size="md"
                  >
                    Tap to Call
                  </Button>
                </div>
              </Card>

              <Card className="bg-white/95 p-6 shadow-soft">
                <div className="text-sm font-extrabold text-black/60">
                  Our Address
                </div>
                <div className="mt-2 font-extrabold">
                  {BUSINESS.addressLine1}
                </div>
                <div className="text-black/70">{BUSINESS.cityStateZip}</div>

                <div className="mt-4 text-sm text-black/70">
                  Need to confirm your service area?{" "}
                  <a
                    href="/service-areas"
                    className="font-bold text-brand-red underline underline-offset-2"
                  >
                    View service areas
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* Right visual + “Contact card” (no form) */}
          <div className="lg:col-span-5">
            <div className="relative h-full">
              {/* vertical hero photo (9:16) */}
              <div className="relative hidden h-full min-h-[520px] overflow-hidden rounded-3xl lg:block">
                <ResponsiveImage
                  srcBase="/hero/contact-hero"
                  alt="GC Heating & Cooling technician"
                  fill
                  priority={false}
                  widths={[640, 960, 1200, 1600]}
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>

              {/* floating contact options card */}
              <Card className="relative mt-6 bg-white/98 p-6 shadow-soft lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:mt-0">
                <div className="font-extrabold text-black">Office Hours</div>
                <div className="mt-1">{BUSINESS.hoursShort}</div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICE AREA (map + CTA to /service-areas) */}
      <Section className="pt-10 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="text-sm font-extrabold tracking-wide text-black/60">
              GC HEATING & COOLING
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
              Service Area
            </h2>
            <p className="mt-4 text-lg text-black/70">
              We provide heating and air conditioning services for residential
              and commercial properties across{" "}
              <span className="font-semibold">Los Angeles County</span> and{" "}
              <span className="font-semibold">Orange County</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/service-areas" variant="primary" size="lg">
                View Service Areas
              </Button>
              <Button href={BUSINESS.bookingUrl} variant="secondary" size="lg">
                Book Onsite Consultation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="overflow-hidden p-0">
              <div className="relative aspect-[16/10] w-full">
                <ResponsiveImage
                  srcBase="/hero/service-areas-map"
                  alt="Service area map for Los Angeles and Orange County"
                  fill
                  widths={[640, 960, 1200, 1600]}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

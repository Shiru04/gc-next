import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | GC Heating & Cooling",
  description:
    "Privacy Policy for GC Heating & Cooling. Learn how we collect, use, and protect personal information of our website visitors and customers.",
  path: "/privacy-policy",
});

const CONTACT_EMAIL = "info@gc-heatingandcooling.com";
const EFFECTIVE_DATE = "May 29, 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-2xl font-extrabold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-lg font-extrabold tracking-tight">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-relaxed text-black/70">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-6 text-black/70">{children}</ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* HEADER */}
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-black/60">
            LEGAL
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy <span className="text-brand-red">Policy</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-black/70">
            This Privacy Policy explains how {BUSINESS.name} (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
            information about you when you visit our website, contact us, or
            request our HVAC services.
          </p>
          <div className="mt-4 text-sm text-black/60">
            Effective date: {EFFECTIVE_DATE}
          </div>
        </div>
      </Section>

      {/* CONTENT */}
      <Section className="pt-0">
        <Card className="p-7 sm:p-10">
          <div className="max-w-3xl text-black/80">
            <H2>1. Information We Collect</H2>
            <P>
              We collect information you provide directly to us, information
              collected automatically when you use our website, and information
              we receive from third parties.
            </P>

            <H3>Information you provide</H3>
            <UL>
              <li>
                Contact details such as your name, phone number, email address,
                and service address when you call us, fill out a form, or book
                an appointment.
              </li>
              <li>
                Details about your home or HVAC system, service history, and
                the work you are requesting.
              </li>
              <li>
                Payment and financing information processed by our payment or
                financing providers (we do not store full card numbers on our
                servers).
              </li>
              <li>
                Communications you send us, including messages, voicemails, and
                feedback.
              </li>
            </UL>

            <H3>Information collected automatically</H3>
            <UL>
              <li>
                Device and usage information such as IP address, browser type,
                pages visited, referring URLs, and time spent on the site.
              </li>
              <li>
                Cookies, pixels, and similar tracking technologies (see
                &ldquo;Cookies &amp; Tracking&rdquo; below).
              </li>
            </UL>

            <H3>Information from third parties</H3>
            <P>
              We may receive information from advertising partners, lead
              providers, review platforms, and analytics providers, consistent
              with their own privacy policies.
            </P>

            <H2>2. How We Use Information</H2>
            <UL>
              <li>To respond to inquiries and schedule service appointments.</li>
              <li>
                To provide, perform, and invoice HVAC installation, repair, and
                maintenance services.
              </li>
              <li>
                To send service updates, appointment reminders, follow-ups, and
                related communications.
              </li>
              <li>
                To operate, improve, and secure our website and business
                operations.
              </li>
              <li>
                To advertise our services, measure ad performance, and reach
                similar audiences.
              </li>
              <li>
                To comply with legal obligations, enforce our terms, and protect
                our rights.
              </li>
            </UL>

            <H2>3. Cookies &amp; Tracking Technologies</H2>
            <P>
              Our website uses cookies and similar technologies to operate the
              site, remember preferences, measure traffic, and support
              advertising. You can control cookies through your browser
              settings, and where required by law, through our cookie consent
              banner.
            </P>
            <P>
              Third-party services we currently use may include:
            </P>
            <UL>
              <li>
                <strong>Google Ads &amp; Google Analytics</strong> — to measure
                site traffic, ad performance, and conversions (such as phone
                clicks and booking clicks).
              </li>
              <li>
                <strong>Meta (Facebook) Pixel</strong> — to measure ad
                performance and reach relevant audiences on Meta platforms.
              </li>
              <li>
                <strong>Dispatch (dispatch.me)</strong> — to power our online
                booking and scheduling experience.
              </li>
            </UL>
            <P>
              These providers may collect information about your visits to our
              website and other websites and use that information in accordance
              with their own privacy policies.
            </P>

            <H2>4. How We Share Information</H2>
            <P>We do not sell your personal information. We may share it with:</P>
            <UL>
              <li>
                Service providers and vendors that help us operate our business
                (e.g., scheduling, payments, financing, communications, hosting,
                analytics, and advertising).
              </li>
              <li>
                Our technicians and staff, to the extent needed to perform the
                services you request.
              </li>
              <li>
                Professional advisors, insurers, or other parties as needed for
                legal, accounting, or safety reasons.
              </li>
              <li>
                Government authorities or other parties when required by law,
                subpoena, or to protect our rights, property, or safety.
              </li>
              <li>
                A successor entity in connection with a merger, acquisition, or
                sale of assets.
              </li>
            </UL>

            <H2>5. SMS &amp; Phone Communications</H2>
            <P>
              When you provide your phone number, you agree that we may contact
              you by phone, voicemail, or text message regarding your inquiry,
              appointment, or service. Standard message and data rates may
              apply. You can opt out of marketing texts at any time by replying
              STOP. Opting out of marketing texts does not stop service-related
              communications necessary to complete work you have requested.
            </P>

            <H2>6. Data Retention</H2>
            <P>
              We keep personal information for as long as needed to provide our
              services, comply with our legal obligations (including tax,
              accounting, warranty, and licensing requirements), resolve
              disputes, and enforce our agreements.
            </P>

            <H2>7. Security</H2>
            <P>
              We use reasonable administrative, technical, and physical
              safeguards to protect personal information. However, no method of
              transmission or storage is 100% secure, and we cannot guarantee
              absolute security.
            </P>

            <H2>8. Your California Privacy Rights</H2>
            <P>
              If you are a California resident, the California Consumer Privacy
              Act (CCPA), as amended by the California Privacy Rights Act
              (CPRA), gives you certain rights regarding your personal
              information, including the right to:
            </P>
            <UL>
              <li>
                Know what personal information we collect, use, disclose, and
                share.
              </li>
              <li>
                Request a copy of the personal information we have collected
                about you.
              </li>
              <li>
                Request deletion of personal information we have collected from
                you, subject to certain exceptions.
              </li>
              <li>Request correction of inaccurate personal information.</li>
              <li>
                Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of
                personal information as those terms are defined under California
                law. We do not sell personal information for money, but the use
                of advertising cookies and pixels may be considered
                &ldquo;sharing&rdquo; under California law.
              </li>
              <li>
                Be free from unlawful discrimination for exercising these
                rights.
              </li>
            </UL>
            <P>
              To exercise these rights, please contact us using the information
              below. We may need to verify your identity before responding.
              Authorized agents may submit requests on your behalf with proper
              written authorization.
            </P>

            <H2>9. Children&apos;s Privacy</H2>
            <P>
              Our website and services are intended for adults. We do not
              knowingly collect personal information from children under 13. If
              you believe a child has provided us personal information, please
              contact us so we can remove it.
            </P>

            <H2>10. Third-Party Links</H2>
            <P>
              Our website may contain links to third-party websites and
              services. We are not responsible for the privacy practices or
              content of those third parties. We encourage you to review their
              privacy policies.
            </P>

            <H2>11. Changes to This Policy</H2>
            <P>
              We may update this Privacy Policy from time to time. When we make
              changes, we will update the &ldquo;Effective date&rdquo; at the
              top of this page. Material changes will be posted on this page
              and, where appropriate, communicated by other means.
            </P>

            <H2>12. Contact Us</H2>
            <P>
              If you have questions about this Privacy Policy or wish to
              exercise your privacy rights, please contact us:
            </P>
            <div className="mt-4 rounded-2xl bg-brand-gray p-5 text-sm">
              <div className="font-extrabold">{BUSINESS.name}</div>
              <div className="mt-1">{BUSINESS.addressLine1}</div>
              <div>{BUSINESS.cityStateZip}</div>
              <div className="mt-2">
                Phone:{" "}
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="font-semibold text-brand-red hover:underline"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-brand-red hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="mt-2 text-black/60">{BUSINESS.licenseLabel}</div>
            </div>
          </div>
        </Card>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-brand-gray">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Questions about your privacy?
          </h2>
          <p className="mt-3 text-black/70">
            Our team is happy to help — give us a call or send a message.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
            <Button
              href={`mailto:${CONTACT_EMAIL}`}
              variant="primary"
              size="lg"
            >
              Email Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

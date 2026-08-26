import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de privacidad | Calefacción y refrigeración GC",
  description:
    "Política de privacidad para GC Calefacción y refrigeración. Descubra cómo recopilamos, utilizamos y protegemos la información personal de los visitantes y clientes de nuestro sitio web.",
  path: "/es/politica-de-privacidad",
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
            Privacidad <span className="text-brand-red">Política</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-black/70">
            Esta Política de Privacidad explica cómo {BUSINESS.name} ("nosotros",
            “nosotros” o “nuestro”) recopila, utiliza y comparte
            información sobre usted cuando visita nuestro sitio web, se comunica con nosotros o
            Solicite nuestros servicios de climatización.
          </p>
          <div className="mt-4 text-sm text-black/60">
            Fecha de vigencia: {EFFECTIVE_DATE}
          </div>
        </div>
      </Section>

      {/* CONTENT */}
      <Section className="pt-0">
        <Card className="p-7 sm:p-10">
          <div className="max-w-3xl text-black/80">
            <H2>1. Información que recopilamos</H2>
            <P>
              Recopilamos información que usted nos proporciona directamente, información
              recopilada automáticamente cuando utiliza nuestro sitio web, y la información
              recibimos de terceros.
            </P>

            <H3>Información que proporcionas</H3>
            <UL>
              <li>
                Detalles de contacto como su nombre, número de teléfono, dirección de correo electrónico,
                y dirección de servicio cuando nos llama, completa un formulario o reserva
                una cita.
              </li>
              <li>
                Detalles sobre su hogar o sistema HVAC, historial de servicio y
                el trabajo que solicita.
              </li>
              <li>
                Información de pago y financiación procesada por nuestro pago o
                proveedores de financiación (no almacenamos números de tarjetas completos en nuestro
                servidores).
              </li>
              <li>
                Comunicaciones que usted nos envía, incluidos mensajes, correos de voz y
                retroalimentación.
              </li>
            </UL>

            <H3>Información recopilada automáticamente</H3>
            <UL>
              <li>
                Información del dispositivo y de uso, como dirección IP, tipo de navegador,
                páginas visitadas, URL de referencia y tiempo pasado en el sitio.
              </li>
              <li>
                Cookies, píxeles y tecnologías de seguimiento similares (consulte
                “Cookies y seguimiento” a continuación).
              </li>
            </UL>

            <H3>Información de terceros</H3>
            <P>
              Podemos recibir información de socios publicitarios, clientes potenciales
              proveedores, plataformas de revisión y proveedores de análisis, consistentes
              con sus propias políticas de privacidad.
            </P>

            <H2>2. Cómo utilizamos la información</H2>
            <UL>
              <li>Para responder consultas y programar citas de servicio.</li>
              <li>
                Proporcionar, realizar y facturar la instalación, reparación y
                servicios de mantenimiento.
              </li>
              <li>
                Para enviar actualizaciones de servicios, recordatorios de citas, seguimientos y
                comunicaciones relacionadas.
              </li>
              <li>
                Para operar, mejorar y proteger nuestro sitio web y nuestro negocio.
                operaciones.
              </li>
              <li>
                Para anunciar nuestros servicios, medir el rendimiento de los anuncios y el alcance.
                audiencias similares.
              </li>
              <li>
                Para cumplir con obligaciones legales, hacer cumplir nuestros términos y proteger
                nuestros derechos.
              </li>
            </UL>

            <H2>3. Cookies y tecnologías de seguimiento</H2>
            <P>
              Nuestro sitio web utiliza cookies y tecnologías similares para operar el
              sitio, recordar preferencias, medir el tráfico y brindar soporte
              publicidad. Puedes controlar las cookies a través de tu navegador
              configuración, y cuando lo exija la ley, a través de nuestro consentimiento de cookies
              pancarta.
            </P>
            <P>
              Los servicios de terceros que utilizamos actualmente pueden incluir:
            </P>
            <UL>
              <li>
                <strong>Anuncios de Google y Google Analytics</strong> — para medir
                tráfico del sitio, rendimiento de los anuncios y conversiones (como el teléfono
                clics y clics de reserva).
              </li>
              <li>
                <strong>Metapíxel (Facebook)</strong> - para medir el anuncio
                rendimiento y llegar a audiencias relevantes en las plataformas Meta.
              </li>
              <li>
                <strong>Despacho (dispatch.me)</strong> — para impulsar nuestro en línea
                Experiencia en reservas y programación.
              </li>
            </UL>
            <P>
              Estos proveedores pueden recopilar información sobre sus visitas a nuestro
              sitio web y otros sitios web y usar esa información de acuerdo
              con sus propias políticas de privacidad.
            </P>

            <H2>4. Cómo compartimos la información</H2>
            <P>No vendemos su información personal. Podemos compartirlo con:</P>
            <UL>
              <li>
                Proveedores de servicios y vendedores que nos ayudan a operar nuestro negocio.
                (por ejemplo, programación, pagos, financiación, comunicaciones, alojamiento,
                análisis y publicidad).
              </li>
              <li>
                Nuestros técnicos y personal, en la medida necesaria para realizar las
                servicios que usted solicita.
              </li>
              <li>
                Asesores profesionales, aseguradores u otras partes según sea necesario para
                razones legales, contables o de seguridad.
              </li>
              <li>
                Autoridades gubernamentales u otras partes cuando así lo exija la ley,
                citación, o para proteger nuestros derechos, propiedad o seguridad.
              </li>
              <li>
                Una entidad sucesora en relación con una fusión, adquisición o
                venta de activos.
              </li>
            </UL>

            <H2>5. Comunicaciones telefónicas y por SMS</H2>
            <P>
              Cuando proporciona su número de teléfono, acepta que podemos comunicarnos con
              usted por teléfono, correo de voz o mensaje de texto con respecto a su consulta,
              cita o servicio. Las tarifas estándar de mensajes y datos pueden
              aplicar. Puede optar por no recibir mensajes de texto de marketing en cualquier momento respondiendo
              PARAR. La exclusión voluntaria de los textos de marketing no detiene las relaciones con el servicio.
              comunicaciones necesarias para completar el trabajo que ha solicitado.
            </P>

            <H2>6. Retención de datos</H2>
            <P>
              Conservamos información personal durante el tiempo necesario para proporcionar nuestra
              servicios, cumplir con nuestras obligaciones legales (incluidos impuestos,
              requisitos de contabilidad, garantía y licencia), resolver
              disputas y hacer cumplir nuestros acuerdos.
            </P>

            <H2>7. Seguridad</H2>
            <P>
              Utilizamos medidas administrativas, técnicas y físicas razonables.
              salvaguardias para proteger la información personal. Sin embargo, ningún método de
              La transmisión o el almacenamiento son 100% seguros y no podemos garantizar
              seguridad absoluta.
            </P>

            <H2>8. Sus derechos de privacidad en California</H2>
            <P>
              Si es residente de California, la Oficina de Privacidad del Consumidor de California
              Ley (CCPA), modificada por la Ley de Derechos de Privacidad de California
              (CPRA), le otorga ciertos derechos con respecto a su información personal
              información, incluido el derecho a:
            </P>
            <UL>
              <li>
                Saber qué información personal recopilamos, utilizamos, divulgamos y
                compartir.
              </li>
              <li>
                Solicitar una copia de la información personal que hemos recopilado
                sobre ti.
              </li>
              <li>
                Solicitar la eliminación de la información personal que hemos recopilado de
                usted, sujeto a ciertas excepciones.
              </li>
              <li>Solicitar la corrección de información personal inexacta.</li>
              <li>
                Optar por no “vender” o “compartir”
                información personal tal como se definen esos términos en California
                ley. No vendemos información personal por dinero, sino el uso
                de cookies y píxeles publicitarios pueden considerarse
                “compartir” según la ley de California.
              </li>
              <li>
                Estar libre de discriminación ilegal por el ejercicio de estos
                derechos.
              </li>
            </UL>
            <P>
              Para ejercer estos derechos, por favor póngase en contacto con nosotros utilizando la información
              abajo. Es posible que necesitemos verificar su identidad antes de responder.
              Los agentes autorizados pueden presentar solicitudes en su nombre con la debida
              autorización escrita.
            </P>

            <H2>9. Privacidad de los niños</H2>
            <P>
              Nuestro sitio web y nuestros servicios están destinados a adultos. nosotros no
              recopilar conscientemente información personal de niños menores de 13 años. Si
              Si cree que un niño nos ha proporcionado información personal, por favor
              Contáctanos para que podamos eliminarlo.
            </P>

            <H2>10. Enlaces de terceros</H2>
            <P>
              Nuestro sitio web puede contener enlaces a sitios web de terceros y
              servicios. No somos responsables de las prácticas de privacidad o
              contenidos de dichos terceros. Le animamos a revisar sus
              políticas de privacidad.
            </P>

            <H2>11. Cambios a esta política</H2>
            <P>
              Podemos actualizar esta Política de Privacidad de vez en cuando. cuando hacemos
              cambios, actualizaremos la “Fecha de entrada en vigor” en el
              parte superior de esta página. Los cambios materiales se publicarán en esta página.
              y, en su caso, comunicado por otros medios.
            </P>

            <H2>12. Contáctenos</H2>
            <P>
              Si tiene preguntas sobre esta Política de Privacidad o desea
              ejercer sus derechos de privacidad, por favor póngase en contacto con nosotros:
            </P>
            <div className="mt-4 rounded-2xl bg-brand-gray p-5 text-sm">
              <div className="font-extrabold">{BUSINESS.name}</div>
              <div className="mt-1">{BUSINESS.addressLine1}</div>
              <div>{BUSINESS.cityStateZip}</div>
              <div className="mt-2">
                Teléfono:{" "}
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="font-semibold text-brand-red hover:underline"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div>
                Correo electrónico:{" "}
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
            ¿Preguntas sobre su privacidad?
          </h2>
          <p className="mt-3 text-black/70">
            Nuestro equipo estará encantado de ayudarle: llámenos o envíenos un mensaje.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Llamar {BUSINESS.phoneDisplay}
            </Button>
            <Button
              href={`mailto:${CONTACT_EMAIL}`}
              variant="primary"
              size="lg"
            >
              Envíenos un correo electrónico
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

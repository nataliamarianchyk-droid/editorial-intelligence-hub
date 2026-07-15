import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — NM Insight" },
      {
        name: "description",
        content:
          "Impressum von NM Insight nach § 5 DDG: Anbieterkennzeichnung, Kontakt und verantwortliche Person.",
      },
      { property: "og:title", content: "Impressum — NM Insight" },
      {
        property: "og:description",
        content: "Anbieterkennzeichnung und Kontakt von NM Insight, Berlin.",
      },
      { property: "og:url", content: "https://insights.nm-insight.com/impressum" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://insights.nm-insight.com/impressum" }],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-[var(--paper)] text-[var(--ink-deep)]">
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="eyebrow !text-[var(--ink-navy)]/70">Legal</p>
          <h1 className="font-display text-3xl md:text-4xl mt-3 mb-2 text-[var(--ink-deep)]">
            Impressum
          </h1>
          <p className="text-sm text-[var(--ink-deep)]/60 mb-10">
            Angaben gemäß § 5 DDG
          </p>

          <Section title="Anbieter">
            <address className="not-italic">
              Natalia Marianchyk
              <br />
              NM Insight
              <br />
              Karl-Kunger-Straße 58
              <br />
              12435 Berlin
              <br />
              Deutschland
            </address>
          </Section>

          <Section title="Kontakt">
            <p>
              E-Mail:{" "}
              <a
                href="mailto:hello@nm-insight.com"
                className="underline hover:text-[var(--ink-navy)]"
              >
                hello@nm-insight.com
              </a>
            </p>
          </Section>

          <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>
              Natalia Marianchyk, Karl-Kunger-Straße 58, 12435 Berlin, Deutschland
            </p>
          </Section>

          <Section title="Umsatzsteuer">
            <p>
              Als Kleinunternehmerin im Sinne von § 19 UStG wird keine Umsatzsteuer
              ausgewiesen.
            </p>
          </Section>

          <Section title="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--ink-navy)]"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben.
            </p>
          </Section>

          <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Section>

          <Section title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
              §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen oder
              nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
              von Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt.
            </p>
          </Section>

          <Section title="Haftung für Links">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich.
            </p>
          </Section>

          <Section title="Urheberrecht">
            <p>
              Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung der
              jeweiligen Autorin.
            </p>
          </Section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl md:text-2xl text-[var(--ink-deep)] mb-3">
        {title}
      </h2>
      <div className="space-y-3 leading-relaxed text-[var(--ink-deep)]/85 text-[15px]">
        {children}
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — NM Insight" },
      {
        name: "description",
        content:
          "Datenschutzerklärung von NM Insight: Verantwortlicher, Rechtsgrundlagen, Cookies, Google Analytics 4, HubSpot-Formulare und Ihre Rechte nach DSGVO.",
      },
      { property: "og:title", content: "Datenschutzerklärung — NM Insight" },
      {
        property: "og:description",
        content:
          "Wie NM Insight personenbezogene Daten verarbeitet: Hosting, Server-Logs, Consent, Analytics und Ihre Betroffenenrechte.",
      },
      { property: "og:url", content: "https://insights.nm-insight.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://insights.nm-insight.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-[var(--paper)] text-[var(--ink-deep)]">
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="eyebrow !text-[var(--ink-navy)]/70">Legal</p>
          <h1 className="font-display text-3xl md:text-4xl mt-3 mb-2 text-[var(--ink-deep)]">
            Datenschutzerklärung
          </h1>
          <p className="text-sm text-[var(--ink-deep)]/60 mb-8">Stand: Juli 2026</p>

          <div className="rounded-sm border border-[var(--ink-navy)]/15 bg-[var(--paper-warm)] p-5 text-sm leading-relaxed text-[var(--ink-deep)]/85 mb-10">
            <strong>Hinweis:</strong> Dies ist ein sorgfältig erstellter Entwurf, keine
            anwaltlich geprüfte Rechtsberatung. Vor der endgültigen Veröffentlichung sollte
            der Text gegen einen aktuellen Generator (z. B. e-recht24) oder mit einer
            Datenschutz-Fachperson abgeglichen werden — insbesondere die Passagen zu Google
            Analytics und Drittlandübermittlung. Ergänzend ist ein Impressum gesetzlich
            verpflichtend (§ 5 DDG).
          </div>

          <Section n="1" title="Verantwortlicher">
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
            <address className="not-italic mt-3">
              Natalia Marianchyk
              <br />
              NM Insight
              <br />
              Karl-Kunger-Straße 58
              <br />
              12435 Berlin
              <br />
              Deutschland
              <br />
              <br />
              E-Mail:{" "}
              <a href="mailto:hello@nm-insight.com" className="underline hover:text-[var(--ink-navy)]">
                hello@nm-insight.com
              </a>
            </address>
          </Section>

          <Section n="2" title="Allgemeines zur Datenverarbeitung">
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit
              dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und
              Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach
              Einwilligung des Nutzers oder wenn eine Rechtsgrundlage nach der
              Datenschutz-Grundverordnung (DSGVO) vorliegt.
            </p>
            <p>
              Rechtsgrundlagen sind insbesondere: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung),
              Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen) und Art. 6 Abs.
              1 lit. f DSGVO (berechtigtes Interesse). Für das Speichern von bzw. den Zugriff
              auf Informationen im Endgerät (Cookies) gilt zusätzlich § 25 TDDDG.
            </p>
            <p>
              <strong>Speicherdauer:</strong> Personenbezogene Daten werden gelöscht, sobald
              der Zweck der Speicherung entfällt oder eine gesetzliche Aufbewahrungsfrist
              abläuft, sofern keine weitere Rechtsgrundlage für die Speicherung besteht.
            </p>
          </Section>

          <Section n="3" title="Hosting">
            <p>
              Diese Website wird bei Lovable (Lovable Labs Incorporated) gehostet. Der
              Anbieter verarbeitet in unserem Auftrag Daten, die zur Auslieferung der Website
              technisch erforderlich sind (z. B. Server-Log-Daten). Rechtsgrundlage ist unser
              berechtigtes Interesse an einer sicheren und effizienten Bereitstellung der
              Website (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter besteht bzw. wird ein
              Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO) geschlossen. Soweit dabei Daten
              in ein Drittland (USA) übermittelt werden, erfolgt dies auf Grundlage geeigneter
              Garantien (EU-Standardvertragsklauseln bzw. EU-U.S. Data Privacy Framework).
            </p>
          </Section>

          <Section n="4" title="Server-Logfiles">
            <p>
              Beim Aufruf der Website erhebt der Hosting-Anbieter automatisch Informationen in
              sogenannten Server-Logfiles, die Ihr Browser übermittelt. Dies sind in der Regel:
              Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des
              zugreifenden Rechners, Uhrzeit der Serveranfrage und die IP-Adresse. Diese Daten
              werden nicht mit anderen Datenquellen zusammengeführt. Die Verarbeitung erfolgt
              auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur technischen Bereitstellung und
              Sicherheit der Website.
            </p>
          </Section>

          <Section n="5" title="Cookies und Einwilligung (Consent)">
            <p>
              Diese Website verwendet Cookies bzw. vergleichbare Technologien. Technisch
              notwendige Cookies werden auf Grundlage von § 25 Abs. 2 TDDDG bzw. Art. 6 Abs. 1
              lit. f DSGVO gesetzt.
            </p>
            <p>
              Für nicht notwendige Cookies — insbesondere zu Analysezwecken (siehe Ziffer 6) —
              holen wir Ihre Einwilligung über ein Consent-Banner ein. Analyse-Dienste werden
              erst geladen und setzen erst dann Cookies, nachdem Sie im Banner aktiv
              zugestimmt haben („Accept"). Bis dahin bleibt die Datenverarbeitung durch diese
              Dienste gesperrt (Google Consent Mode v2, Standardstatus „denied").
            </p>
            <p>
              Ihre Einwilligung ist freiwillig und jederzeit mit Wirkung für die Zukunft
              widerrufbar. Sie können Ihre Auswahl widerrufen, indem Sie das im Browser
              gespeicherte Consent-Cookie (<code>nm_consent</code>) löschen und die Seite neu
              laden; das Banner erscheint anschließend erneut.
            </p>
          </Section>

          <Section n="6" title="Google Analytics 4">
            <p>
              Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google
              Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google").
            </p>
            <p>
              Google Analytics verwendet Cookies und ähnliche Technologien, um die Nutzung
              der Website zu analysieren (z. B. aufgerufene Seiten, Verweildauer, ungefährer
              Standort auf Stadtebene, verwendetes Gerät). Die IP-Adresse wird von Google
              Analytics 4 standardmäßig gekürzt bzw. anonymisiert verarbeitet; wir haben
              zusätzlich die IP-Anonymisierung aktiviert.
            </p>
            <p>
              Rechtsgrundlage ist ausschließlich Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a
              DSGVO in Verbindung mit § 25 Abs. 1 TDDDG. Ohne Ihre Einwilligung werden keine
              Analyse-Cookies gesetzt und keine Analysedaten erhoben.
            </p>
            <p>
              <strong>Drittlandübermittlung:</strong> Eine Übermittlung von Daten an Google in
              die USA kann nicht ausgeschlossen werden. Google ist unter dem EU-U.S. Data
              Privacy Framework zertifiziert; die Übermittlung stützt sich zudem auf die
              EU-Standardvertragsklauseln.
            </p>
            <p>
              Mit Google besteht ein Vertrag zur Auftragsverarbeitung. Weitere Informationen:
              Google-Datenschutzerklärung unter{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--ink-navy)]"
              >
                https://policies.google.com/privacy
              </a>
              .
            </p>
            <p>Sie können Ihre Einwilligung jederzeit widerrufen (siehe Ziffer 5).</p>
          </Section>

          <Section n="7" title="Kontakt- und Newsletter-Formular (HubSpot)">
            <p>
              Wenn Sie über ein Formular auf dieser Website mit uns Kontakt aufnehmen oder
              sich für unseren Newsletter anmelden, werden die von Ihnen eingegebenen Daten
              (z. B. Name, E-Mail-Adresse, Unternehmen, Nachricht) zur Bearbeitung Ihrer
              Anfrage bzw. zur Verwaltung Ihrer Anmeldung verarbeitet.
            </p>
            <p>
              Zur Verarbeitung dieser Daten und zur Pflege unserer Kundenbeziehungen nutzen
              wir das CRM-System HubSpot (HubSpot, Inc., 2 Canal Park, Cambridge, MA 02141,
              USA; in der EU: HubSpot Ireland Limited). HubSpot verarbeitet die Formulardaten
              in unserem Auftrag; ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO)
              besteht.
            </p>
            <p>
              <strong>Rechtsgrundlagen:</strong> Bei Kontaktanfragen Art. 6 Abs. 1 lit. b
              DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO (berechtigtes Interesse an
              der Beantwortung). Bei der Newsletter-Anmeldung Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung); diese können Sie jederzeit über den Abmeldelink im Newsletter
              oder per E-Mail widerrufen.
            </p>
            <p>
              Drittlandübermittlung in die USA erfolgt auf Grundlage der
              EU-Standardvertragsklauseln bzw. des EU-U.S. Data Privacy Framework. Ihre Daten
              werden gelöscht, sobald sie für den Zweck der Erhebung nicht mehr erforderlich
              sind bzw. Sie Ihre Einwilligung widerrufen, soweit keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </Section>

          <Section n="8" title="Ihre Rechte als betroffene Person">
            <p>Ihnen stehen nach der DSGVO folgende Rechte zu:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art.
                21 DSGVO)
              </li>
              <li>
                Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs.
                3 DSGVO)
              </li>
            </ul>
            <p className="mt-4">
              Zur Ausübung genügt eine formlose Nachricht an{" "}
              <a href="mailto:hello@nm-insight.com" className="underline hover:text-[var(--ink-navy)]">
                hello@nm-insight.com
              </a>
              .
            </p>
            <p>
              <strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist u. a. die Berliner
              Beauftragte für Datenschutz und Informationsfreiheit, Alt-Moabit 59–61, 10555
              Berlin.
            </p>
          </Section>

          <Section n="9" title="Änderungen dieser Datenschutzerklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
              aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer
              Leistungen umzusetzen. Für Ihren erneuten Besuch gilt dann die jeweils aktuelle
              Fassung.
            </p>
          </Section>

          <hr className="my-12 border-[var(--ink-navy)]/15" />

          <h2 className="font-display text-2xl text-[var(--ink-deep)] mb-2">
            Privacy Policy (English reference translation)
          </h2>
          <p className="text-sm text-[var(--ink-deep)]/70 mb-8">
            The German version above is the legally operative text. This English translation
            is provided for convenience only.
          </p>

          <Section n="1" title="Controller" en>
            <p>
              Natalia Marianchyk, NM Insight, Karl-Kunger-Straße 58, 12435 Berlin, Germany —{" "}
              <a href="mailto:hello@nm-insight.com" className="underline hover:text-[var(--ink-navy)]">
                hello@nm-insight.com
              </a>
            </p>
          </Section>

          <Section n="2" title="General" en>
            <p>
              We process personal data only as far as necessary to provide a functional
              website and our content. Processing occurs based on consent (Art. 6(1)(a) GDPR),
              contract (b), or legitimate interest (f); cookie access additionally under § 25
              TDDDG. Data is deleted once its purpose lapses or a retention period expires.
            </p>
          </Section>

          <Section n="3" title="Hosting" en>
            <p>
              The site is hosted by Lovable (Lovable Labs Inc.), acting as our processor under
              a Data Processing Agreement (Art. 28 GDPR). Basis: legitimate interest (Art.
              6(1)(f)). Any transfer to the USA relies on EU Standard Contractual Clauses /
              the EU-U.S. Data Privacy Framework.
            </p>
          </Section>

          <Section n="4" title="Server log files" en>
            <p>
              On access, the host automatically collects standard log data (browser, OS,
              referrer, hostname, time, IP address) for technical delivery and security (Art.
              6(1)(f)). This data is not merged with other sources.
            </p>
          </Section>

          <Section n="5" title="Cookies & consent" en>
            <p>
              Necessary cookies are set under § 25(2) TDDDG / Art. 6(1)(f). Non-necessary
              (analytics) cookies load only after you actively accept via our consent banner
              (Google Consent Mode v2, default "denied"). Consent is voluntary and revocable
              at any time by deleting the <code>nm_consent</code> cookie and reloading.
            </p>
          </Section>

          <Section n="6" title="Google Analytics 4" en>
            <p>
              We use Google Analytics 4 (Google Ireland Limited, Dublin). It uses cookies to
              analyse site usage (pages, duration, city-level location, device); IP addresses
              are truncated/anonymised. Legal basis: your consent only (Art. 6(1)(a) GDPR + §
              25(1) TDDDG) — no analytics cookies without it. US transfers rely on the
              EU-U.S. Data Privacy Framework / SCCs. A DPA with Google is in place. Details:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--ink-navy)]"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </Section>

          <Section n="7" title="Contact & newsletter form (HubSpot)" en>
            <p>
              Form data (name, email, company, message) is processed to handle your enquiry
              or manage your subscription, using HubSpot as our processor under a DPA (Art. 28
              GDPR). Basis: pre-contractual measures / legitimate interest for enquiries (Art.
              6(1)(b)/(f)); consent for newsletter (Art. 6(1)(a)), revocable anytime via the
              unsubscribe link. US transfers rely on SCCs / the EU-U.S. Data Privacy
              Framework.
            </p>
          </Section>

          <Section n="8" title="Your rights" en>
            <p>
              Access, rectification, erasure, restriction, portability, objection, and
              withdrawal of consent (Arts. 15–21, 7(3) GDPR) — email{" "}
              <a href="mailto:hello@nm-insight.com" className="underline hover:text-[var(--ink-navy)]">
                hello@nm-insight.com
              </a>
              . You may also lodge a complaint with a supervisory authority, e.g. the Berlin
              Commissioner for Data Protection and Freedom of Information (Alt-Moabit 59–61,
              10555 Berlin).
            </p>
          </Section>

          <Section n="9" title="Changes" en>
            <p>
              We may update this policy to stay legally compliant; the current version applies
              on each visit.
            </p>
          </Section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  n,
  title,
  children,
  en,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  en?: boolean;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl md:text-2xl text-[var(--ink-deep)] mb-3">
        {n}. {title}
      </h2>
      <div
        className={`space-y-3 leading-relaxed text-[var(--ink-deep)]/85 ${
          en ? "text-[15px]" : "text-[15px]"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

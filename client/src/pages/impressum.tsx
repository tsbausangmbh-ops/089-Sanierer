import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead, generatePageGraphSchema } from "@/components/seo-head";
const impressumHeroImage = "/images/rechtliche_dokumente_impressum.webp";

const impressumHeroContent: HeroContent = {
  backgroundImage: impressumHeroImage,
  mobileImageSrc: "/images/mobile/rechtliche_dokumente_impressum.webp",
  imageAlt: "Impressum 089-Sanierer München – Sanierungsfirma für Komplettsanierung, Badsanierung und Renovierung in München",
  badge: "Rechtliche Angaben",
  titleLine1: "Impressum.",
  titleLine2: "Sanierungsfirma München.",
  descriptions: ["KSHW München – Ihr exklusiver Projekt-Kurator.", "Lokale Meisterbetriebe für anspruchsvolle Eigentümer."],
  strongText: "Angaben gemäß § 5 TMG.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe", "Festpreisgarantie"],
  dataTestIdPrefix: "impressum"
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Impressum | 089-sanierer.de | Sanierung München"
        description="Impressum und Kontaktdaten von KSHW München. Verantwortlich: Mustafa Sakar & Ali Kemal Kurt. Telefon: 089 444438872. Komplettsanierung Haus & Wohnung."
        keywords="Impressum Sanierungsfirma München, Komplettsanierung München Kontakt, Renovierungsfirma Bayern Impressum, Handwerker München Rechtliches, Baufirma München Angaben, Sanierung München Anbieter"
        canonicalPath="/impressum"
        schema={generatePageGraphSchema({ path: "/impressum", name: "Impressum – 089-Sanierer München", description: "Impressum und Kontaktdaten von KSHW München." })}
      />
      <SiteHeader />
      <GlobalHero content={impressumHeroContent} />
      <Breadcrumb items={[{ label: "Impressum" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-6">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-muted-foreground">
                Die Website KSHW München – Komplettsanierung Haus & Wohnung wird gemeinschaftlich betrieben von zwei rechtlich selbstständigen Einzelgewerben:
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Gewerbebetrieb 1</h3>
              <p className="text-muted-foreground">
                <strong>Name:</strong> Mustafa Sakar<br />
                <strong>Rechtsform:</strong> Einzelunternehmen<br />
                <strong>Firmenauftritt:</strong> KSHW München
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Anschrift:</strong><br />
                Hardenbergstr. 4<br />
                80992 München<br />
                Deutschland
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Telefon:</strong> <a href="tel:089444438872" className="text-primary hover:underline">089 444438872</a><br />
                <strong>E-Mail:</strong> <a href="mailto:info@089-sanierer.de" className="text-primary hover:underline">info@089-sanierer.de</a>
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Tätigkeitsbereich:</strong><br />
                Bauleitung, Projektsteuerung, Kundenberatung, Koordination der Gewerke, Angebots- und Auftragsabwicklung
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Gewerbebetrieb 2</h3>
              <p className="text-muted-foreground">
                <strong>Name:</strong> Ali Kemal Kurt<br />
                <strong>Rechtsform:</strong> Einzelunternehmen<br />
                <strong>Firmenauftritt:</strong> KSHW München
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Anschrift:</strong><br />
                Zielstattstr. 9<br />
                81379 München<br />
                Deutschland
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Telefon:</strong> <a href="tel:01521227404" className="text-primary hover:underline">0152 122 740 43</a><br />
                <strong>E-Mail:</strong> <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a>
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Tätigkeitsbereich:</strong><br />
                Ausführende Bau-, Sanierungs- und Renovierungsleistungen sowie handwerkliche Tätigkeiten im Rahmen des jeweils erteilten Auftrags
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Umsatzsteuer-ID</h2>
              <p className="text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong>DE356852204</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Rechtlicher Hinweis zur Gewerbetrennung</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Die genannten Gewerbebetriebe sind rechtlich, wirtschaftlich und steuerlich eigenständig.</li>
                <li>Der jeweilige Vertragspartner, Rechnungssteller und Leistungserbringer wird im Angebot, Auftrag und auf der Rechnung eindeutig benannt.</li>
                <li>Es besteht keine gemeinsame Haftung.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Vertragspartner je Auftrag</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Vertragspartner dieses Angebots ist der im Angebot namentlich genannte Gewerbebetrieb.</li>
                <li>Rechnungsstellung, Gewährleistung und Haftung erfolgen ausschließlich über den jeweiligen Vertragspartner.</li>
                <li>Weitere Leistungen können durch rechtlich selbstständige Partnerbetriebe ausgeführt werden.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Verantwortlich für den Inhalt gemäß § 18 MStV</h2>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                  <strong>Mustafa Sakar</strong><br />
                  Hardenbergstr. 4<br />
                  80992 München
                </div>
                <div>
                  <strong>Ali Kemal Kurt</strong><br />
                  Zielstattstr. 9<br />
                  81379 München
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p className="text-muted-foreground">
                <strong>Berufsbezeichnung:</strong> Generalübernehmer<br />
                <strong>Zuständige Kammer:</strong> Handwerkskammer für München und Oberbayern
              </p>
              <p className="text-muted-foreground mt-4">
                Es gelten folgende berufsrechtliche Regelungen: Handwerksordnung (HwO)<br />
                Regelungen einsehbar unter: <a href="https://www.gesetze-im-internet.de/hwo/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.gesetze-im-internet.de/hwo/</a>
              </p>
              <p className="text-muted-foreground mt-4 bg-primary/10 p-4 rounded-lg">
                <strong>Wichtiger Hinweis:</strong> Alle meisterpflichtigen Gewerke werden durch unser Partnernetzwerk ausgeführt, die als eingetragene Meisterfirmen in der Handwerkskammer gelistet sind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Partnernetzwerk</h2>
              <p className="text-muted-foreground">
                Wir arbeiten mit rechtlich selbstständigen Einzelgewerbebetrieben und ausgewählten Partnerfirmen.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Der jeweilige Vertragspartner wird im Angebot und in der Rechnung eindeutig ausgewiesen.</li>
                <li>Sämtliche meisterpflichtigen Gewerke (u.a. Elektro, Sanitär, Heizung) werden durch unser Partnernetzwerk ausgeführt.</li>
                <li>Hierbei handelt es sich ausnahmslos um eingetragene Meisterfirmen der Handwerkskammer München.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Außergerichtliche Streitschlichtung (Handwerk)</h2>
              <p className="text-sm text-muted-foreground mb-4">Hinweis gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz) für Handwerksbetriebe:</p>
              <p className="text-muted-foreground">
                Wir sind bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Zuständige Schlichtungsstelle:</strong><br />
                Schlichtungsstelle für den Bereich Handwerk<br />
                Bayerische Handwerkskammern / ZDH<br />
                Geschäftsstelle: Max-Joseph-Straße 4, 80333 München<br />
                Website: <a href="https://www.zdh.de/fachbereiche/recht/schlichtung/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.zdh.de/fachbereiche/recht/schlichtung/</a>
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                Hinweis: Die EU-Online-Streitbeilegungsplattform (OS) wurde gemäß Verordnung (EU) 2024/3228 zum 20. Juli 2025 eingestellt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftung für Inhalte</h2>
              <p className="text-muted-foreground">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Urheberrecht</h2>
              <p className="text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">KI-Hinweis gemäß EU AI Act (Art. 50)</h2>
              <p className="text-sm text-muted-foreground mb-4">Transparenzhinweis gemäß Art. 50 Verordnung (EU) 2024/1689</p>
              <p className="text-muted-foreground">
                Komplettsanierung München setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Rechtsgrundlage:</strong> Verordnung (EU) 2024/1689 (EU AI Act), Art. 22 DSGVO
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Hinweis zum Vertragsabschluss</h2>
              <p className="text-muted-foreground">
                Die auf dieser Website dargestellten Inhalte, Leistungen und Informationen stellen kein verbindliches Angebot im rechtlichen Sinne dar.
                Ein Vertragsabschluss über diese Website findet nicht statt.
              </p>
              <p className="text-muted-foreground mt-4">
                Anfragen über Kontaktformulare, E-Mail oder Telefon dienen ausschließlich der unverbindlichen Kontaktaufnahme und der Vorbereitung einer individuellen Angebotserstellung.
                Ein Vertrag kommt erst nach persönlicher Abstimmung, Besichtigung vor Ort und ausdrücklicher Annahme eines schriftlichen Angebots zustande.
              </p>
              <p className="text-muted-foreground mt-4">
                Es erfolgt keine kostenpflichtige Bestellung, keine Buchung und keine Online-Zahlung über diese Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Unternehmensangaben gemäß §5 TMG</h2>
              <p className="text-muted-foreground">
                Nachfolgend finden Sie weiterführende Informationen zu den Gewerbeanmeldungen und berufsrechtlichen Grundlagen unserer Tätigkeit im Bereich Komplettsanierung in München.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Handelsregistereintrag und Gewerbeanmeldung</h3>
              <p className="text-muted-foreground">
                Beide Gewerbebetriebe sind ordnungsgemäß beim zuständigen Gewerbeamt der Landeshauptstadt München angemeldet. Die Gewerbeanmeldungen umfassen sämtliche Tätigkeiten im Bereich Bau, Sanierung, Renovierung und Projektkoordination. Eine Eintragung im Handelsregister liegt derzeit nicht vor, da es sich um Einzelunternehmen handelt, die nicht handelsregisterpflichtig sind.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Berufsrechtliche Regelungen</h3>
              <p className="text-muted-foreground">
                Für die ausgeführten Tätigkeiten gelten die Bestimmungen der Handwerksordnung (HwO) sowie die jeweiligen Landesregelungen des Freistaats Bayern. Meisterpflichtige Gewerke werden ausschließlich durch eingetragene Meisterbetriebe unseres Partnernetzwerks ausgeführt. Die zuständige Aufsichtsbehörde ist die Handwerkskammer für München und Oberbayern, Max-Joseph-Straße 4, 80333 München.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftungsausschluss (Disclaimer)</h2>
              <p className="text-muted-foreground">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Haftung für Inhalte</h3>
              <p className="text-muted-foreground">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Haftung für Links</h3>
              <p className="text-muted-foreground">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Urheberrecht und Bildrechte</h2>
              <p className="text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Nutzung der Inhalte</h3>
              <p className="text-muted-foreground">
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Streitschlichtung</h2>
              <p className="text-muted-foreground">
                Wir sind grundsätzlich bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Nachfolgend finden Sie Informationen zur Online-Streitbeilegung und zur zuständigen Verbraucherschlichtungsstelle.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Online-Streitbeilegung</h3>
              <p className="text-muted-foreground">
                Die Europäische Kommission hat die Online-Streitbeilegungsplattform (OS-Plattform) gemäß Verordnung (EU) 2024/3228 zum 20. Juli 2025 eingestellt. Damit steht dieses Verfahren zur außergerichtlichen Beilegung von Streitigkeiten nicht mehr zur Verfügung. Für Beschwerden stehen Ihnen weiterhin die unten genannten Schlichtungsstellen sowie der ordentliche Rechtsweg zur Verfügung.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Verbraucherschlichtungsstelle</h3>
              <p className="text-muted-foreground">
                Die zuständige Verbraucherschlichtungsstelle ist die Schlichtungsstelle für den Bereich Handwerk bei den Bayerischen Handwerkskammern. Bei Streitigkeiten aus Werkverträgen im Handwerksbereich können Sie sich an diese Stelle wenden. Die Teilnahme an einem Schlichtungsverfahren ist für beide Parteien freiwillig, wir sind jedoch grundsätzlich zur Teilnahme bereit.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>Stand:</strong> Januar 2026 – Impressum gemäß § 5 DDG und aktuellen Anforderungen für Handwerksbetriebe.
              </p>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link></li>
                <li><Link href="/agb" className="text-primary hover:underline">Allgemeine Geschäftsbedingungen (AGB)</Link></li>
                <li><Link href="/cookies" className="text-primary hover:underline">Cookie-Richtlinie</Link></li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}

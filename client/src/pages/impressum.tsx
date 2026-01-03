import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import impressumHeroImage from "@assets/generated_images/legal_documents_impressum.png";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Impressum | 089-sanierer.de | Sanierung München"
        description="Impressum und Kontaktdaten. Verantwortlich: Ali Kemal Kurt, Zielstattstr. 9, 81379 München. Telefon: 0152 122 740 43. USt-IdNr: DE356852204."
        keywords="Impressum Sanierung München, 089 Sanierer Kontakt, Handwerker München Impressum, KSHW München Adresse, Sanierung München Anbieter, Renovierung München Firma, Handwerker München Verantwortlicher, 089 Sanierer Telefonnummer, Komplettsanierung München Unternehmen, Badsanierung München Ansprechpartner, Sanierung München USt-IdNr, KSHW München Öffnungszeiten, Handwerker München seriös, Renovierung München rechtliche Angaben, Sanierung München Betreiber"
        canonicalPath="/impressum"
      />
      <SiteHeader />
      <PageHero 
        title="Impressum" 
        subtitle="KSHW München"
        showCta={false}
        compact={true}
        image={impressumHeroImage}
        imageAlt="Rechtliche Dokumente"
      />
      <Breadcrumb items={[{ label: "Impressum" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            
            <section>
              <h2 className="text-xl font-bold mb-4">Verantwortlicher</h2>
              <p className="text-muted-foreground">
                <a href="https://089-sanierer.de/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.089-sanierer.de</a><br />
                <a href="https://komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.komplettsanierungen-haus-wohnung.de</a>
              </p>
              <p className="text-muted-foreground mt-4">
                KSHW München<br />
                Ali Kemal Kurt<br />
                Zielstattstr. 9<br />
                81379 München
              </p>
              <p className="text-muted-foreground mt-4">
                USt-IdNr: DE356852204<br />
                Email: info@komplettsanierungen-haus-wohnung.de<br />
                Tel: 0152 122 740 43
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Technische Informationen</h2>
              <p className="text-muted-foreground">
                Wir weisen Sie darauf hin, dass die Vertraulichkeit im Internet nicht gewährleistet ist. Jeder Benutzer ist daher allein verantwortlich, seine Daten und/oder Softwares vor eventuell im Internet zirkulierenden Viren angemessen zu schützen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Urheberrechte</h2>
              <p className="text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Rechtsinhabers bzw. des Erstellers. Jede vollständige oder teilweise Reproduktion oder Darstellung der Webseiten, Daten oder eines Bestandteils der Website www.komplettsanierungen-haus-wohnung.de, in welchem Verfahren und auf welchem Datenträger auch immer, ist ohne Zustimmung des Herausgebers untersagt und bedeutet eine Fälschung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftungsausschluss</h2>
              <p className="text-muted-foreground">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann keine Gewähr übernommen werden. Als Diensteanbieter bzw. Herausgeber dieser Website sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter bzw. Herausgeber jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Einsatz von Künstlicher Intelligenz (KI-Hinweis gem. EU AI Act)</h2>
              <p className="text-sm text-muted-foreground mb-4">Transparenzhinweis gemäß Art. 50 Verordnung (EU) 2024/1689</p>
              <p className="text-muted-foreground">
                KSHW München setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Rechtsgrundlage:</strong> Verordnung (EU) 2024/1689 (EU AI Act), Art. 22 DSGVO
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link></li>
                <li><Link href="/agb" className="text-primary hover:underline">Allgemeine Geschäftsbedingungen (AGB)</Link></li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}

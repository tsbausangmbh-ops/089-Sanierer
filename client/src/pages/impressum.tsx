import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Mail, Phone } from "lucide-react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Building2 className="w-7 h-7 text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">Komplettsanierungen</span>
                  <span className="text-xs text-muted-foreground leading-tight">Haus & Wohnung</span>
                </div>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Impressum</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-xl font-bold mb-4">Verantwortlicher</h2>
              <p className="text-muted-foreground">
                www.komplettsanierungen-haus-wohnung.de
              </p>
              <p className="text-muted-foreground mt-4">
                KSHW München<br />
                Ali Kemal Kurt<br />
                Zielstattstr. 9<br />
                81379 München
              </p>
              <p className="text-muted-foreground mt-4">
                USt-IdNr: DE356852204
              </p>
              <div className="space-y-2 text-muted-foreground mt-4">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email: info@komplettsanierungen-haus-wohnung.de
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Tel: 0152 122 740 43
                </p>
              </div>
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
                Die durch die Seitenbetreiber erstellten Inhalte auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Rechtsinhabers bzw. des Erstellers. Jede vollständige oder teilweise Reproduktion oder Darstellung der Webseiten, Daten oder eines Bestandteils der Website www.komplettsanierungen-haus-wohnung.de, in welchem Verfahren und auf welchem Datenträger auch immer, ist ohne die vorherige, schriftliche Zustimmung von KSHW München untersagt und stellt einen Verstoß gegen das Urheberrecht dar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftungsausschluss</h2>
              <p className="text-muted-foreground">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann keine Gewähr übernommen werden. Als Diensteanbieter bzw. Herausgeber dieser Website sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter bzw. Herausgeber jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-muted-foreground mt-2">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="text-muted-foreground mt-2">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Streitschlichtung</h2>
              <p className="text-muted-foreground">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-muted-foreground mt-2">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="text-muted-foreground mt-2">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

          </div>
        </div>
      </main>

      <footer className="py-8 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} komplettsanierungen-haus-wohnung.de - Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}

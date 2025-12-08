import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "bodensanierung", title: "Bodensanierung" },
  { id: "elektrosanierung", title: "Elektrosanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung" },
  { id: "energetisch", title: "Energetische Sanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
];

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <div className="hidden lg:flex items-center gap-1">
              {services.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm">
                    {service.title}
                  </Button>
                </Link>
              ))}
            </div>
            <Link href="/anfrage">
              <Button data-testid="button-header-cta">
                Kostenlose Anfrage
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 flex-1">
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
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann keine Gewähr übernommen werden. Als Diensteanbieter bzw. Herausgeber dieser Website sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter bzw. Herausgeber jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
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

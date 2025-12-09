import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Calendar, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-base leading-tight">KSHW München</span>
                  <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
                </div>
              </div>
            </Link>
            <div className="flex lg:hidden items-center gap-2">
              <a href="tel:+4915212274043">
                <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                  <Phone className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer">
                <Button size="icon" className="bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500">
                  <Calendar className="w-4 h-4" />
                </Button>
              </a>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-[hsl(220,85%,10%)] text-white border-l-white/20">
                  <SheetHeader>
                    <SheetTitle className="text-white text-left">Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 mt-6">
                    {headerServices.map((service) => (
                      <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                        <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                          {service.title}
                        </Button>
                      </Link>
                    ))}
                    <div className="border-t border-white/20 my-2" />
                    <Link href="/ratgeber">
                      <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                        Ratgeber
                      </Button>
                    </Link>
                    <Link href="/faq-preise">
                      <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                        FAQ & Preise
                      </Button>
                    </Link>
                    <Link href="/kontakt">
                      <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                        Kontakt
                      </Button>
                    </Link>
                    <div className="border-t border-white/20 my-2" />
                    <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Calendar className="w-4 h-4 mr-2" />
                        24 h Termin
                      </Button>
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {headerServices.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                    {service.title}
                  </Button>
                </Link>
              ))}
              <Link href="/ratgeber">
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Ratgeber
                </Button>
              </Link>
              <Link href="/faq-preise">
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                  FAQ & Preise
                </Button>
              </Link>
              <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer" className="ml-3">
                <Button size="sm" className="text-sm bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  24 h Termin
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Impressum – KSHW Komplettsanierungen München</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
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
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann keine Gewähr übernommen werden. Als Diensteanbieter bzw. Herausgeber dieser Website sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter bzw. Herausgeber jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
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

      <footer className="pt-12 pb-6 bg-[hsl(220,85%,10%)] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Ihr zuverlässiger Partner für Komplettsanierungen in München und Umgebung.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-white/70">
                <a href="tel:+4915212274043" className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" />
                  0152 122 740 43
                </a>
                <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" />
                  info@komplettsanierungen-haus-wohnung.de
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Zielstattstr. 9<br />81379 München</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mo-Fr: 8:00-17:00 Uhr
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {headerServices.map((service) => (
                  <li key={service.id}>
                    <Link href={`/anfrage?service=${service.id}`} className="hover:text-white">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/impressum" className="hover:text-white">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-white">AGB</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
                <li><Link href="/faq-preise" className="hover:text-white">FAQ & Preise</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <h4 className="font-bold mb-2 text-sm">Haus oder Wohnung sanieren in München – Planung, Kosten & Handwerker</h4>
            <p className="text-xs text-white/60 mb-2">
              München Pasing · Allach · Untermenzing · Obermenzing · Aubing · Moosach · Feldmoching · Schwabing · Sendling · Bogenhausen · Haidhausen · Neuhausen · Laim · Nymphenburg · Giesing · Berg am Laim · Trudering · Riem · Milbertshofen · Freimann · Solln · Großhadern · Hadern · Fürstenried · Forstenried · Thalkirchen · Obersendling · Ramersdorf · Perlach · Neuperlach
            </p>
            <p className="text-xs text-white/60">
              Sowie im Münchner Umland: Dachau · Karlsfeld · Germering · Fürstenfeldbruck · Freising · Starnberg · Garching · Unterschleißheim · Oberschleißheim · Ottobrunn · Haar · Gräfelfing · Planegg · Pullach · Grünwald
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} <a href="https://komplettsanierungen-haus-wohnung.de" className="hover:text-white underline">komplettsanierungen-haus-wohnung.de</a> - Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}

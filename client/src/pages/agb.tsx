import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "haussanierung", title: "Haussanierung" },
  { id: "energetisch", title: "Energetische Sanierung" },
];

export default function AGB() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight text-white">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
                </div>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              {services.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
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
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-xl font-bold mb-4">Geltungsbereich</h2>
              <p className="text-muted-foreground">
                a. Die nachfolgenden Allgemeinen Geschäftsbedingungen („AGB") gelten für die Nutzung des auf der Website 089-sanierer.de bereitgestellten Dienstes. Betreiber dieses Angebots ist KSHW München, Zielstattstr. 9, 81379 München, im Folgenden „wir" oder „uns" genannt.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Diese AGB regeln das vertragliche Verhältnis zwischen uns und den Nutzern unseres Dienstes, im Folgenden als „Interessenten" bezeichnet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Unsere Leistungen</h2>
              <p className="text-muted-foreground">
                a. Über unsere Website haben Interessenten die Möglichkeit, eine Anfrage zu stellen, um unverbindliche und kostenfreie Angebote für Produkte und Dienstleistungen im Bereich Immobilienmodernisierung und -sanierung zu erhalten. Die eingegangene Anfrage wird hierfür an eine begrenzte Zahl von kooperierenden Partnerunternehmen („Anbieter") weitergeleitet, die dann mit dem Interessenten in Kontakt treten können.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Wichtiger Hinweis:</strong> Eine Übermittlung Ihrer persönlichen Daten an Partnerunternehmen erfolgt ausschließlich nach vorheriger telefonischer Einwilligung. Näheres entnehmen Sie bitte unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Die Nutzung unseres Dienstes ist für den Interessenten mit keinen Kosten verbunden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Zustandekommen eines Vertrages, Vertragsdokumentation, Sprache</h2>
              <p className="text-muted-foreground">
                a. Die Präsentation unserer Dienstleistung auf der Website stellt noch kein bindendes Angebot auf Abschluss eines Vermittlungsvertrages dar. Ein Angebot zum Abschluss eines unentgeltlichen Vermittlungsvertrages erfolgt erst durch die Absendung einer Anfrage durch den Interessenten. Wird diese Anfrage von uns akzeptiert, so erfolgt eine Bestätigung entweder unmittelbar auf der Website oder per E-Mail. Erst mit dieser Bestätigung kommt ein Vertrag zustande.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Die Vertragsinhalte inklusive dieser AGB werden von uns gespeichert. Der Interessent kann diese über die Druck- oder Speicherfunktion seines Browsers sichern. Die aktuell gültige Version der AGB kann jederzeit auf der Website eingesehen werden; ältere Versionen sind nicht mehr verfügbar.
              </p>
              <p className="text-muted-foreground mt-4">
                c. Die Vertragssprache ist Deutsch.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Pflichten des Interessenten</h2>
              <p className="text-muted-foreground">
                Der Interessent ist verpflichtet, bei der Nutzung unseres Angebots wahrheitsgemäße und vollständige Angaben zu machen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Haftungsausschluss und -begrenzung</h2>
              <p className="text-muted-foreground">
                a. Wir haften für Schäden ausschließlich bei Vorsatz oder grober Fahrlässigkeit. Bei einfacher Fahrlässigkeit haften wir nur, sofern eine wesentliche Vertragspflicht („Kardinalpflicht") verletzt wurde – also eine Pflicht, deren Einhaltung für die ordnungsgemäße Vertragserfüllung unerlässlich ist und auf die der Vertragspartner regelmäßig vertrauen darf.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Die Haftung bei einfacher Fahrlässigkeit ist in jedem Fall auf den typischen, bei Vertragsschluss vorhersehbaren Schaden beschränkt.
              </p>
              <p className="text-muted-foreground mt-4">
                c. Die genannten Haftungsausschlüsse und -begrenzungen gelten nicht für Ansprüche nach dem Produkthaftungsgesetz sowie bei Schäden an Leben, Körper oder Gesundheit.
              </p>
              <p className="text-muted-foreground mt-4">
                d. Diese Haftungsregelungen gelten ebenfalls für unsere gesetzlichen Vertreter, Mitarbeitenden sowie Erfüllungsgehilfen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Anwendbares Recht, Gerichtsstand, Teilnichtigkeit</h2>
              <p className="text-muted-foreground">
                a. Es gilt deutsches Recht. Bei Verbrauchern gilt diese Rechtswahl nur, soweit keine zwingenden gesetzlichen Regelungen des Landes eingeschränkt werden, in dem der Verbraucher seinen Wohnsitz oder gewöhnlichen Aufenthalt hat.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Hat der Interessent oder ein Anbieter keinen allgemeinen Gerichtsstand in Deutschland oder einem anderen EU-Mitgliedsstaat, oder handelt es sich um einen Kaufmann, oder wird der Wohnsitz nach Inkrafttreten dieser AGB ins Ausland verlegt, oder ist der Wohnsitz oder gewöhnliche Aufenthaltsort im Zeitpunkt der Klageerhebung nicht bekannt, so ist der Gerichtsstand am Sitz unseres Unternehmens.
              </p>
              <p className="text-muted-foreground mt-4">
                c. Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam sein oder im Widerspruch zu gesetzlichen Vorschriften stehen, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Kontakt</h2>
              <p className="text-muted-foreground">
                KSHW München<br />
                Zielstattstr. 9<br />
                81379 München<br /><br />
                E-Mail: <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a><br />
                Telefon: 0152 122 740 43
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/impressum" className="text-primary hover:underline">Impressum</Link></li>
                <li><Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link></li>
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
                {services.map((service) => (
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
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8">
            <p className="text-white/70 text-sm mb-4 text-center">
              Ihr Münchner Sanierungspartner für Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Riem, Haidhausen, Giesing und alle weiteren Stadtteile. 
              Auch im Münchner Umland: Dachau, Starnberg, Fürstenfeldbruck, Freising, Germering und Umgebung.
            </p>
            <p className="text-center text-sm text-white/70">
              © 2025 KSHW München. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

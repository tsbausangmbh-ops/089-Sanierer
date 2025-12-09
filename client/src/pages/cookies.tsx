import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Menu, X, Cookie, Shield, BarChart3, Megaphone, Settings, ArrowLeft } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-consent";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

export default function Cookies() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,75%,22%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" data-testid="button-back" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                  <div className="hidden sm:flex flex-col">
                    <span className="font-bold text-base leading-tight">KSHW München</span>
                    <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex lg:hidden items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <a href="tel:+4915212274043">
                <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                  <Phone className="w-4 h-4" />
                </Button>
              </a>
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
              <a href="tel:+4915212274043" className="ml-3">
                <Button size="sm" className="text-sm bg-green-500 hover:bg-green-600 text-white border-green-500">
                  <Phone className="w-4 h-4 mr-1" />
                  0152 122 740 43
                </Button>
              </a>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[hsl(220,75%,28%)] border-t border-white/10">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {headerServices.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>{service.title}</Button>
                </Link>
              ))}
              <div className="border-t border-white/20 my-2" />
              <Link href="/ratgeber"><Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Ratgeber</Button></Link>
              <Link href="/faq-preise"><Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>FAQ & Preise</Button></Link>
              <Link href="/kontakt"><Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Kontakt</Button></Link>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-24 pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold" data-testid="heading-cookies">Cookie-Richtlinie</h1>
              <p className="text-muted-foreground">Stand: Dezember 2024</p>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-primary" />
                  Was sind Cookies?
                </h2>
                <p className="text-muted-foreground">
                  Cookies sind kleine Textdateien, die auf Ihrem Computer oder mobilen Gerät gespeichert werden, 
                  wenn Sie unsere Website besuchen. Sie helfen uns, die Website funktionsfähig zu halten, 
                  Ihre Präferenzen zu speichern und zu verstehen, wie Besucher unsere Website nutzen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Notwendige Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Diese Cookies sind für den Betrieb unserer Website unerlässlich. Sie ermöglichen grundlegende 
                  Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Website. Ohne diese Cookies 
                  kann die Website nicht ordnungsgemäß funktionieren.
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold">Cookie-Name</th>
                        <th className="text-left py-2 font-semibold">Zweck</th>
                        <th className="text-left py-2 font-semibold">Speicherdauer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-muted">
                        <td className="py-2">kshw_cookie_consent</td>
                        <td className="py-2">Speichert Ihre Cookie-Einstellungen</td>
                        <td className="py-2">1 Jahr</td>
                      </tr>
                      <tr>
                        <td className="py-2">kshw_session</td>
                        <td className="py-2">Session-Verwaltung</td>
                        <td className="py-2">Sitzung</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Analyse-Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. 
                  Sie sammeln Informationen anonym und helfen uns, unsere Website zu verbessern.
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold">Cookie-Name</th>
                        <th className="text-left py-2 font-semibold">Anbieter</th>
                        <th className="text-left py-2 font-semibold">Zweck</th>
                        <th className="text-left py-2 font-semibold">Speicherdauer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-muted">
                        <td className="py-2">_ga</td>
                        <td className="py-2">Google Analytics</td>
                        <td className="py-2">Unterscheidung von Nutzern</td>
                        <td className="py-2">2 Jahre</td>
                      </tr>
                      <tr className="border-b border-muted">
                        <td className="py-2">_ga_*</td>
                        <td className="py-2">Google Analytics</td>
                        <td className="py-2">Sitzungsstatus speichern</td>
                        <td className="py-2">2 Jahre</td>
                      </tr>
                      <tr>
                        <td className="py-2">_gid</td>
                        <td className="py-2">Google Analytics</td>
                        <td className="py-2">Unterscheidung von Nutzern</td>
                        <td className="py-2">24 Stunden</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Wir verwenden Google Analytics mit IP-Anonymisierung (anonymize_ip) und im Rahmen von 
                  Google Consent Mode V2, um die DSGVO-Konformität sicherzustellen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-primary" />
                  Marketing-Cookies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Diese Cookies werden verwendet, um Besuchern relevante Werbung anzuzeigen. 
                  Sie können auch verwendet werden, um die Anzahl der Anzeigen zu begrenzen und 
                  die Effektivität von Werbekampagnen zu messen.
                </p>
                <p className="text-sm text-muted-foreground">
                  Derzeit setzen wir keine Marketing-Cookies ein. Sollten wir in Zukunft Marketing-Cookies 
                  verwenden, werden wir diese Liste entsprechend aktualisieren und Ihre erneute Einwilligung einholen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Ihre Cookie-Einstellungen verwalten
                </h2>
                <p className="text-muted-foreground mb-4">
                  Sie können Ihre Cookie-Einstellungen jederzeit ändern. Klicken Sie auf den Button unten, 
                  um das Cookie-Einstellungsfenster erneut zu öffnen.
                </p>
                <CookieSettingsButton />
                
                <h3 className="font-semibold mt-6 mb-2">Browser-Einstellungen</h3>
                <p className="text-muted-foreground mb-4">
                  Sie können Cookies auch über Ihre Browser-Einstellungen verwalten oder löschen. 
                  Die meisten Browser bieten die Möglichkeit, Cookies zu blockieren oder zu löschen:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li><strong>Chrome:</strong> Einstellungen &gt; Datenschutz und Sicherheit &gt; Cookies</li>
                  <li><strong>Firefox:</strong> Einstellungen &gt; Datenschutz & Sicherheit &gt; Cookies</li>
                  <li><strong>Safari:</strong> Einstellungen &gt; Datenschutz &gt; Cookies</li>
                  <li><strong>Edge:</strong> Einstellungen &gt; Cookies und Websiteberechtigungen</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Rechtsgrundlage</h2>
                <p className="text-muted-foreground mb-4">
                  Die Verwendung von technisch notwendigen Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO 
                  (berechtigtes Interesse). Für alle anderen Cookies holen wir Ihre ausdrückliche Einwilligung gemäß 
                  Art. 6 Abs. 1 lit. a DSGVO ein.
                </p>
                <p className="text-muted-foreground">
                  Weitere Informationen zum Datenschutz finden Sie in unserer{" "}
                  <Link href="/datenschutz" className="text-primary underline">Datenschutzerklärung</Link>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Kontakt</h2>
                <p className="text-muted-foreground">
                  Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren:
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p><strong>KSHW München</strong></p>
                  <p>Komplettsanierungen Haus & Wohnung</p>
                  <p>E-Mail: info@089-sanierer.de</p>
                  <p>Telefon: 0152 122 740 43</p>
                </div>
              </CardContent>
            </Card>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link></li>
                <li><Link href="/agb" className="text-primary hover:underline">Allgemeine Geschäftsbedingungen (AGB)</Link></li>
                <li><Link href="/impressum" className="text-primary hover:underline">Impressum</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer className="pt-12 pb-6 bg-[hsl(220,75%,22%)] text-white">
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
                <li><Link href="/cookies" className="hover:text-white">Cookie-Richtlinie</Link></li>
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

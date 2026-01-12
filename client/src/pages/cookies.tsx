import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Shield, BarChart3, Megaphone, Settings } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import cookiesHeroImage from "@assets/generated_images/website_cookies_settings.png";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Cookie-Richtlinie | 089-sanierer.de"
        description="Welche Cookies nutzen wir? So können Sie Ihre Cookie-Einstellungen anpassen und Ihre Privatsphäre auf unserer Website schützen."
        keywords="Cookie Einstellungen Sanierung, Cookie-Richtlinie München, Datenschutz Cookies Website, welche Cookies nutzt 089-Sanierer, Cookie Consent Handwerker Website, notwendige Cookies Sanierung, Analyse Cookies Renovierung München, Marketing Cookies Handwerker, Cookie Präferenzen ändern, Cookies ablehnen Sanierung Website, DSGVO Cookies München, Cookie Banner Einstellungen, Tracking Cookies Handwerker, Third-Party Cookies Renovierung, Cookie-Richtlinie 089-Sanierer"
        canonicalPath="/cookies"
      />
      <SiteHeader />
      <PageHero 
        title="Cookie-Richtlinie" 
        subtitle="Transparenz über Cookies"
        showCta={false}
        compact={true}
        image={cookiesHeroImage}
        imageAlt="Cookie-Einstellungen"
      />
      <Breadcrumb items={[{ label: "Cookie-Richtlinie" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
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
                <h2 className="text-xl font-bold mb-4">Einsatz von Künstlicher Intelligenz (KI-Hinweis)</h2>
                <p className="text-sm text-muted-foreground mb-4">Transparenzhinweis gemäß Art. 50 Verordnung (EU) 2024/1689</p>
                <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg border">
                  089-Sanierer setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Rechtsgrundlage:</strong> Verordnung (EU) 2024/1689 (EU AI Act), Art. 22 DSGVO
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
                  <p><strong>089-Sanierer</strong></p>
                  <p>Komplettsanierungen Haus & Wohnung</p>
                  <p>E-Mail: info@089-sanierer.de</p>
                  <p>Telefon: 089 444438872</p>
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

      <SeoFooter />
    </div>
  );
}

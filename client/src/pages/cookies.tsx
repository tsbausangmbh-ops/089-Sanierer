import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Shield, BarChart3, UserCog, Settings, Info } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import cookiesHeroImage from "@assets/generated_images/webseite_cookie_einstellungen.webp";

const cookiesHeroContent: HeroContent = {
  backgroundImage: cookiesHeroImage,
  badge: "Volle Transparenz",
  titleLine1: "Cookie-Richtlinie.",
  titleLine2: "Sie behalten die Kontrolle.",
  descriptions: ["KSHW München – Ihr exklusiver Projekt-Kurator.", "Ihre Einstellungen, Ihre Entscheidung."],
  strongText: "DSGVO & TDDDG konform.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe", "Festpreisgarantie"],
  dataTestIdPrefix: "cookies"
};

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Cookie-Richtlinie | 089-sanierer.de"
        description="Cookie-Richtlinie für 089-sanierer.de. Erfahren Sie, welche Cookies wir verwenden und wie Sie Ihre Einstellungen anpassen können. DSGVO & TDDDG konform."
        keywords="Cookie Richtlinie Sanierung, Cookies Renovierungsfirma München, TDDDG Handwerker Website, Tracking Baufirma Bayern, Cookie Einstellungen Bauunternehmen"
        canonicalPath="/cookies"
      />
      <SiteHeader />
      <GlobalHero content={cookiesHeroContent} />
      <Breadcrumb items={[{ label: "Cookie-Richtlinie" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-6">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">

            <section className="bg-primary/10 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-primary" />
                Diese Webseite verwendet Cookies
              </h2>
              <p className="text-muted-foreground">
                Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren. Außerdem geben wir Informationen zu Ihrer Verwendung unserer Website an unsere Partner für soziale Medien, Werbung und Analysen weiter. Unsere Partner führen diese Informationen möglicherweise mit weiteren Daten zusammen, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung der Dienste gesammelt haben.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">Was sind Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies sind kleine Textdateien, die von Webseiten verwendet werden, um die Benutzererfahrung effizienter zu gestalten.
              </p>
              <p className="text-muted-foreground mt-4">
                Laut Gesetz können wir Cookies auf Ihrem Gerät speichern, wenn diese für den Betrieb dieser Seite unbedingt notwendig sind. Für alle anderen Cookie-Typen benötigen wir Ihre Erlaubnis.
              </p>
              <p className="text-muted-foreground mt-4">
                Diese Seite verwendet unterschiedliche Cookie-Typen. Einige Cookies werden von Drittparteien platziert, die auf unseren Seiten erscheinen.
              </p>
              <p className="text-muted-foreground mt-4">
                Sie können Ihre Einwilligung jederzeit von der Cookie-Erklärung auf unserer Website ändern oder widerrufen.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Einwilligung ändern / Einstellungen öffnen
              </h2>
              <p className="text-muted-foreground mb-4">
                Erfahren Sie in unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzrichtlinie</Link> mehr darüber, wer wir sind, wie Sie uns kontaktieren können und wie wir personenbezogene Daten verarbeiten.
              </p>
              <p className="text-muted-foreground mb-4">
                Bitte geben Sie Ihre Einwilligungs-ID und das Datum an, wenn Sie uns bezüglich Ihrer Einwilligung kontaktieren.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Ihre Einwilligung trifft auf die folgenden Domains zu:</strong> www.komplettsanierungen-haus-wohnung.de, 089-sanierer.de
              </p>
              <p className="text-sm text-muted-foreground">
                Die Cookie-Erklärung wurde das letzte Mal am <strong>21.1.2026</strong> aktualisiert.
              </p>
              <div className="mt-6">
                <CookieSettingsButton />
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <UserCog className="w-6 h-6" />
                Individuelle Cookie-Konfiguration
              </h2>
              <p className="text-muted-foreground mb-6">
                Verwalten Sie Ihre Präferenzen direkt hier auf der Seite.
              </p>

              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">Essenziell</h3>
                        <p className="text-muted-foreground text-sm">Notwendig für die Grundfunktionen (immer aktiv).</p>
                      </div>
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Immer aktiv</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">Analyse & Statistik</h3>
                        <p className="text-muted-foreground text-sm">Helfen uns, die Nutzung der Website zu verstehen.</p>
                      </div>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">Optional</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">Personalisierung</h3>
                        <p className="text-muted-foreground text-sm">Optimiert Ihr Erlebnis durch relevante Inhalte.</p>
                      </div>
                      <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">Optional</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Notwendig (2)
              </h2>
              <p className="text-muted-foreground mb-4">
                Notwendige Cookies helfen dabei, eine Webseite nutzbar zu machen, indem sie Grundfunktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Webseite ermöglichen. Die Webseite kann ohne diese Cookies nicht richtig funktionieren.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-lg">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold border-b">Name</th>
                      <th className="text-left p-3 font-semibold border-b">Anbieter</th>
                      <th className="text-left p-3 font-semibold border-b">Zweck</th>
                      <th className="text-left p-3 font-semibold border-b">Dauer</th>
                      <th className="text-left p-3 font-semibold border-b">Typ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs">CookieConsent</td>
                      <td className="p-3">Cookiebot</td>
                      <td className="p-3 text-muted-foreground">Speichert den Zustimmungsstatus des Benutzers für Cookies auf der aktuellen Domäne.</td>
                      <td className="p-3">1 Jahr</td>
                      <td className="p-3">HTTP-Cookie</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">hex (32)</td>
                      <td className="p-3">Dieser Dienst</td>
                      <td className="p-3 text-muted-foreground">Wird verwendet, um Server-Anfragen an das Webseitenbackend zu managen.</td>
                      <td className="p-3">Sitzung</td>
                      <td className="p-3">HTTP-Cookie</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Statistiken (3)
              </h2>
              <p className="text-muted-foreground mb-4">
                Statistik-Cookies helfen Webseiten-Besitzern zu verstehen, wie Besucher mit Webseiten interagieren, indem Informationen anonym gesammelt und gemeldet werden.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-lg">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold border-b">Name</th>
                      <th className="text-left p-3 font-semibold border-b">Anbieter</th>
                      <th className="text-left p-3 font-semibold border-b">Zweck</th>
                      <th className="text-left p-3 font-semibold border-b">Dauer</th>
                      <th className="text-left p-3 font-semibold border-b">Typ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs">_ga</td>
                      <td className="p-3">Google</td>
                      <td className="p-3 text-muted-foreground">Registriert eine eindeutige ID, die verwendet wird, um statistische Daten dazu, wie der Besucher die Website nutzt, zu generieren.</td>
                      <td className="p-3">2 Jahre</td>
                      <td className="p-3">HTTP-Cookie</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs">_gat</td>
                      <td className="p-3">Google</td>
                      <td className="p-3 text-muted-foreground">Wird von Google Analytics verwendet, um die Anforderungsrate einzuschränken.</td>
                      <td className="p-3">1 Tag</td>
                      <td className="p-3">HTTP-Cookie</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">_gid</td>
                      <td className="p-3">Google</td>
                      <td className="p-3 text-muted-foreground">Registriert eine eindeutige ID, die verwendet wird, um statistische Daten dazu, wie der Besucher die Website nutzt, zu generieren.</td>
                      <td className="p-3">1 Tag</td>
                      <td className="p-3">HTTP-Cookie</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Browser-Einstellungen
              </h2>
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
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Rechtsgrundlage</h2>
              <p className="text-muted-foreground mb-4">
                Die Verwendung von technisch notwendigen Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO 
                (berechtigtes Interesse). Für alle anderen Cookies holen wir Ihre ausdrückliche Einwilligung gemäß 
                Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG ein.
              </p>
              <p className="text-muted-foreground">
                Weitere Informationen zum Datenschutz finden Sie in unserer{" "}
                <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>Stand:</strong> 2026 – Diese Cookie-Richtlinie wurde gemäß den Anforderungen des TDDDG und der DSGVO erstellt.
              </p>
            </section>

            <section className="border-t pt-8">
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

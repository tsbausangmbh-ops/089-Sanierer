import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead } from "@/components/seo-head";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, AlertCircle, Mail, Phone, ExternalLink } from "lucide-react";

export default function Barrierefreiheit() {
  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead 
        title="Barrierefreiheit | Erklärung zur Zugänglichkeit | 089-Sanierer"
        description="Erklärung zur Barrierefreiheit von 089-Sanierer.de. Informationen zu WCAG 2.1, BITV 2.0 Konformität und Zugänglichkeitsmaßnahmen unserer Website."
      />
      <SiteHeader />
      
      <main id="main-content" className="flex-1">
        <PageHero
          title="Erklärung zur Barrierefreiheit"
          subtitle="Zugänglichkeit für alle Nutzer"
          description="089-Sanierer verpflichtet sich, seine Website barrierefrei zu gestalten – gemäß BITV 2.0 und WCAG 2.1 Richtlinien."
          showCta={false}
          compact={true}
        />

        <section className="py-12 lg:py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Stand der Barrierefreiheit</h2>
                <p className="text-muted-foreground mb-4">
                  Diese Erklärung zur Barrierefreiheit gilt für die Website <strong>089-sanierer.de</strong>.
                </p>
                <p className="text-muted-foreground mb-4">
                  Wir sind bestrebt, unsere Website im Einklang mit den Anforderungen der 
                  <strong> Barrierefreie-Informationstechnik-Verordnung (BITV 2.0)</strong> und den 
                  <strong> Web Content Accessibility Guidelines (WCAG 2.1)</strong> barrierefrei zugänglich zu machen.
                </p>
                <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    Diese Website ist weitgehend mit WCAG 2.1 Level AA kompatibel.
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Umgesetzte Maßnahmen</h2>
                <p className="text-muted-foreground mb-4">
                  Wir haben folgende Maßnahmen ergriffen, um die Barrierefreiheit zu gewährleisten:
                </p>
                <ul className="space-y-3">
                  {[
                    "Semantisch korrektes HTML mit logischer Überschriftenstruktur (H1-H6)",
                    "Ausreichende Farbkontraste (mindestens 4,5:1 für Texte)",
                    "Vollständige Tastaturnavigation für alle interaktiven Elemente",
                    "Alternative Texte (Alt-Attribute) für alle informativen Bilder",
                    "Skip-Links zum Überspringen der Navigation",
                    "ARIA-Labels für verbesserte Screenreader-Unterstützung",
                    "Responsive Design für alle Bildschirmgrößen",
                    "Fokus-Indikatoren für Tastaturnutzer",
                    "Formulare mit verknüpften Labels und Fehlermeldungen",
                    "Keine automatisch abspielenden Medien"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Technische Spezifikationen</h2>
                <p className="text-muted-foreground mb-4">
                  Die Barrierefreiheit dieser Website basiert auf den folgenden Technologien:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    "HTML5 mit semantischen Elementen",
                    "CSS3 mit relativen Einheiten",
                    "JavaScript (React) mit ARIA-Unterstützung",
                    "WAI-ARIA 1.2 Rollen und Attribute",
                    "SVG-Icons mit aria-hidden",
                    "Responsive Breakpoints"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Bekannte Einschränkungen</h2>
                <p className="text-muted-foreground mb-4">
                  Trotz unserer Bemühungen können einige Bereiche Einschränkungen aufweisen:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Externe Inhalte</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Eingebettete Karten und externe Widgets unterliegen nicht unserer Kontrolle.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">PDF-Dokumente</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Ältere PDF-Dokumente sind möglicherweise nicht vollständig barrierefrei.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Kompatibilität</h2>
                <p className="text-muted-foreground mb-4">
                  Diese Website wurde mit folgenden Technologien getestet:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Browser</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Chrome (aktuelle Version)</li>
                      <li>• Firefox (aktuelle Version)</li>
                      <li>• Safari (aktuelle Version)</li>
                      <li>• Edge (aktuelle Version)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Screenreader</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• NVDA (Windows)</li>
                      <li>• VoiceOver (macOS/iOS)</li>
                      <li>• TalkBack (Android)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Feedback und Kontakt</h2>
                <p className="text-muted-foreground mb-4">
                  Wenn Sie Barrieren auf unserer Website feststellen oder Verbesserungsvorschläge haben, 
                  kontaktieren Sie uns bitte. Wir nehmen Ihr Feedback ernst und arbeiten kontinuierlich 
                  an der Verbesserung der Zugänglichkeit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:info@089-sanierer.de?subject=Barrierefreiheit" data-testid="link-accessibility-email">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Mail className="w-4 h-4 mr-2" />
                      info@089-sanierer.de
                    </Button>
                  </a>
                  <a href="tel:+4989444438872" data-testid="link-accessibility-phone">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Phone className="w-4 h-4 mr-2" />
                      089 444438872
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Schlichtungsverfahren</h2>
                <p className="text-muted-foreground mb-4">
                  Sollten Sie der Meinung sein, dass wir auf Ihre Anfrage nicht oder nicht 
                  ausreichend reagiert haben, können Sie sich an die zuständige Schlichtungsstelle wenden:
                </p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2">Schlichtungsstelle nach § 16 BGG</p>
                  <p className="text-muted-foreground text-sm mb-2">
                    Beauftragter der Bundesregierung für die Belange von Menschen mit Behinderungen
                  </p>
                  <a 
                    href="https://www.schlichtungsstelle-bgg.de" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                    data-testid="link-schlichtungsstelle"
                  >
                    www.schlichtungsstelle-bgg.de
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Erstellung dieser Erklärung</h2>
                <p className="text-muted-foreground mb-2">
                  Diese Erklärung wurde am <strong>4. Februar 2026</strong> erstellt.
                </p>
                <p className="text-muted-foreground mb-4">
                  Die Überprüfung basiert auf einer Selbstbewertung anhand der WCAG 2.1 Richtlinien (Level AA).
                </p>
                <p className="text-muted-foreground text-sm">
                  Wir überprüfen diese Erklärung regelmäßig und aktualisieren sie bei Änderungen an der Website.
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Link href="/kontakt">
                <Button size="lg" data-testid="button-contact-accessibility">
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>

          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}

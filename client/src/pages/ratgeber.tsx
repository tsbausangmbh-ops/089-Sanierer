import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Paintbrush, Bath, ArrowRight, Euro, Calendar, CheckCircle, Building, Thermometer, DoorOpen, Zap, Triangle, Download, FileText, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { highlightKeywords, pageKeywords } from "@/lib/highlight";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { InternalLinks, linkSets } from "@/components/internal-links";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead, generatePageGraphSchema } from "@/components/seo-head";
const ratgeberHeroImage = "/images/sanierungsberater_experte.webp";

const ratgeberHeroContent: HeroContent = {
  backgroundImage: ratgeberHeroImage,
  mobileImageSrc: "/images/mobile/sanierungsberater_experte.webp",
  imageAlt: "Sanierung Ratgeber München – Expertentipps für Altbausanierung, Renovierungskosten kalkulieren und Handwerker finden bei Haus- und Wohnungsrenovierung",
  badge: "Exklusives Expertenwissen für anspruchsvolle Eigentümer",
  titleLine1: "Sanierung Ratgeber München – Kosten, Förderung & Tipps vom Experten.",
  titleLine2: "Haussanierung, Badsanierung & Dämmung im Überblick.",
  descriptions: ["Aus 150+ Projekten in München.", "Unser Expertenwissen für Ihre Entscheidung."],
  strongText: "Kostenloser Zugang zu Insider-Wissen.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe", "Festpreisgarantie"],
  dataTestIdPrefix: "ratgeber"
};

export default function Ratgeber() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Haussanierung München Kosten 2026 | KfW Förderung 45%"
        description="Was kostet Haussanierung München? Kernsanierung ab 400€/m², KfW-Förderung bis 45%, Altbau-Tipps. Erfahrung aus 268+ Projekten. Jetzt informieren!"
        keywords="Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung München, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Badsanierung München, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, KfW Förderung Sanierung, Altbausanierung München"
        canonicalPath="/ratgeber"
        schema={generatePageGraphSchema({ path: "/ratgeber", name: "Sanierungs-Ratgeber München", description: "Ratgeber für Haussanierung und Renovierung in München mit Kosten und Fördertipps." })}
      />
      <SiteHeader />
      <GlobalHero content={ratgeberHeroContent} />
      <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
        <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
        </p>
      </div>
      <Breadcrumb items={[{ label: "Ratgeber" }]} />

      <main id="main-content" className="pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-24 bg-primary/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold mb-2">Kostenloser Sanierungs-Ratgeber 2026</h2>
                  <p className="text-muted-foreground mb-3">
                    32 Seiten Expertenwissen: Kosten, Tipps, Checklisten und Förderungen für Ihre erfolgreiche Sanierung in München.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground justify-center md:justify-start">
                    <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> 32 Seiten</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 16 Kapitel</span>
                    <span className="flex items-center gap-1"><Euro className="w-4 h-4" /> Kostenübersichten</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a 
                    href="/downloads/sanierungs-ratgeber-2026.pdf" 
                    download
                    data-testid="button-download-ratgeber-pdf"
                  >
                    <Button size="lg" className="gap-2 text-xs sm:text-sm">
                      <Download className="w-5 h-5" />
                      PDF herunterladen
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <nav className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <h2 className="font-semibold mb-3">Welches Thema interessiert Sie?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <a href="#haus-sanieren" className="text-primary hover:underline flex items-center gap-1"><Home className="w-4 h-4" /> Haus sanieren</a>
              <a href="#fassade" className="text-primary hover:underline flex items-center gap-1"><Paintbrush className="w-4 h-4" /> Fassade</a>
              <a href="#dach" className="text-primary hover:underline flex items-center gap-1"><Triangle className="w-4 h-4" /> Dach</a>
              <a href="#badezimmer" className="text-primary hover:underline flex items-center gap-1"><Bath className="w-4 h-4" /> Badezimmer</a>
              <a href="#keller" className="text-primary hover:underline flex items-center gap-1"><Building className="w-4 h-4" /> Keller</a>
              <a href="#daemmung" className="text-primary hover:underline flex items-center gap-1"><Thermometer className="w-4 h-4" /> Dämmung</a>
              <a href="#wohnung" className="text-primary hover:underline flex items-center gap-1"><DoorOpen className="w-4 h-4" /> Wohnung</a>
              <a href="#energetisch" className="text-primary hover:underline flex items-center gap-1"><Zap className="w-4 h-4" /> Energetische Sanierung</a>
            </div>
          </nav>

          <div className="space-y-16">

            <section id="haus-sanieren" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Haussanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Haussanierung in München? Wie teuer ist eine Kernsanierung? Lohnt sich die Sanierung eines alten Hauses? 
                  Diese Fragen beschäftigen viele Immobilienbesitzer in der Region München. Als erfahrene Sanierungsfirma München begleiten wir Sie durch alle Sanierungsarbeiten.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Kernsanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was kostet eine Kernsanierung pro m²?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfache Kernsanierung:</strong> 400-600 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Mittlere Ausstattung:</strong> 600-900 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Hochwertig:</strong> 900-1.400 EUR/m²</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: Kernsanierung 120 m² Haus = ca. 72.000-108.000 EUR (mittlere Ausstattung)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Altbausanierung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Altes Haus sanieren - was ist zu beachten?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Bausubstanz prüfen:</strong> Fundament, Tragwerk, Feuchtigkeit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Schadstoffe:</strong> Asbest, Blei, PCB untersuchen lassen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Energieeffizienz:</strong> Dämmung, Fenster, Heizung erneuern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Denkmalschutz:</strong> Genehmigungen einholen</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="fassade" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Paintbrush className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Was kostet <span className="text-accent">Fassade streichen</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet Fassade streichen in München? Wo finde ich gute Malerarbeiten in meiner Nähe? 
                  Hier finden Sie alle Informationen zu Fassadensanierung und Renovierungsarbeiten für Ihr Gebäude.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Fassade streichen Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was kosten Malerarbeiten an der Fassade?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Nur Anstrich:</strong> 20-35 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Grundierung:</strong> 30-45 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Gerüst:</strong> 8-15 EUR/m² zusätzlich</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Rissausbesserung:</strong> 15-25 EUR/lfm</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: Fassade 150 m² streichen = ca. 4.500-7.500 EUR inkl. Gerüst
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Paintbrush className="w-5 h-5 text-primary" />
                      Fassadensanierung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Umfassende Fassadensanierung mit Dämmung:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>WDVS-System:</strong> 120-180 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Putz erneuern:</strong> 50-80 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Fördermöglichkeit:</strong> 15% BAFA-Zuschuss</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="dach" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Triangle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Wie teuer ist eine <span className="text-accent">Dachsanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Dachsanierung in München? Wie teuer ist ein Dachausbau? Welche Kosten fallen beim Dachboden ausbauen an? 
                  Alle wichtigen Informationen zu Dacharbeiten und Kosten – mit unserem Handwerkerservice München planen Sie sicher.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Dachsanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Neueindeckung:</strong> 120-240 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Dämmung:</strong> 180-360 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dachstuhl-Erneuerung:</strong> ab 72 EUR/m²</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: Dach 100 m² neu eindecken mit Dämmung = ca. 18.000-36.000 EUR
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Dachausbau Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfacher Ausbau:</strong> 600-960 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Mit Bad/Küche:</strong> 960-1.440 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dachgauben:</strong> 3.600-9.600 EUR/Stück</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Dachboden ausbauen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dämmung:</strong> 48-120 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Trockenbau:</strong> 60-96 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Fenster/Gauben:</strong> 1.200-6.000 EUR</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="badezimmer" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Bath className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Badsanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Badsanierung in München? Welche Kosten fallen bei einem neuen Badezimmer an? 
                  Alle Informationen zu Badsanierungen mit Preisbeispielen – Ihre Renovierungsfirma München berät Sie gerne.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Badezimmer Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was kostet ein neues Bad komplett?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kleines Bad (4-6 m²):</strong> 8.000-15.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Mittleres Bad (6-10 m²):</strong> 15.000-25.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Großes Bad (10+ m²):</strong> 25.000-40.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Luxusbad:</strong> ab 40.000 EUR</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Badsanierung Ablauf
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was gehört zu einer Badsanierung?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Demontage Altinstallation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sanitär- und Elektroinstallation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Abdichtung und Fliesen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sanitärobjekte montieren</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Dauer: 2-4 Wochen je nach Umfang
                    </p>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="keller" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Kellersanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Kellersanierung? Wie wird ein feuchter Keller trockengelegt? 
                  Informationen zu Kellerabdichtung, Kellersanierung und Kosten – als Generalunternehmer Sanierung übernehmen wir alle Gewerke.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Kellersanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Innenabdichtung:</strong> 100-200 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Außenabdichtung:</strong> 300-600 EUR/lfm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Drainage:</strong> 150-300 EUR/lfm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Horizontalsperre:</strong> 200-400 EUR/lfm</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Kellerausbau
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Keller als Wohnraum nutzen:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfacher Ausbau:</strong> 400-600 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Wohnraum-Standard:</strong> 700-1.000 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Bad/Küche:</strong> ab 1.200 EUR/m²</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="daemmung" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Thermometer className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Lohnt sich <span className="text-accent">Wärmedämmung</span> in <span className="text-accent">München</span>? <span className="text-accent">Kosten</span> & <span className="text-accent">Förderung</span></h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Dachdämmung? Wie teuer ist eine Innendämmung? 
                  Alle Informationen zu Dämmmaßnahmen, Kosten und Fördermöglichkeiten. Als Innenausbau Firma München koordinieren wir Ihre Sanierungen München fachgerecht.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Triangle className="w-5 h-5 text-primary" />
                      Aufsparrendämmung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kosten:</strong> 150-250 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>U-Wert:</strong> bis 0,14 W/m²K</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Förderung:</strong> bis 20% BAFA</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Zwischensparrendämmung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kosten:</strong> 50-100 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Material:</strong> Mineralwolle, Zellulose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfache Montage</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-primary" />
                      Innendämmung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kosten:</strong> 80-150 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Ideal für:</strong> Denkmalschutz</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Förderfähig:</strong> BAFA, KfW</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="wohnung" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DoorOpen className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Wohnungssanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Wohnungssanierung in München? Wie teuer ist die Renovierung einer Altbauwohnung? 
                  Alle Informationen zu Kosten und Ablauf – Renovierungen München vom erfahrenen Handwerker München.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Wohnungssanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Renovierung:</strong> 200-400 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Teil-Sanierung:</strong> 400-700 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Komplettsanierung:</strong> 700-1.200 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Luxus-Standard:</strong> ab 1.200 EUR/m²</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: 80 m² Wohnung komplett sanieren = ca. 56.000-96.000 EUR
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Was ist enthalten?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Leistungen bei Komplettsanierung:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Elektrik komplett erneuern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sanitärleitungen neu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Neue Böden (Parkett/Fliesen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Wände/Decken neu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Neues Bad und neue Küche</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </section>

            <section id="energetisch" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-3xl font-bold">Welche <span className="text-accent">Förderung</span> gibt es für <span className="text-accent">energetische Sanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine energetische Sanierung? Welche Förderungen gibt es von BAFA und KfW? 
                  Welche Vorteile hat die energetische Sanierung für den Kunden?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="bg-green-50 dark:bg-green-900/20">
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      Mit Förderung (BAFA/KfW)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dämmung:</strong> 15-20% Zuschuss (BAFA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Wärmepumpe:</strong> 30-70% Zuschuss (BAFA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Fenster:</strong> 15-20% Zuschuss (BAFA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Effizienzhaus:</strong> bis 150.000 EUR Kredit + Tilgungszuschuss (KfW)</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4 font-medium text-green-700 dark:text-green-300">
                      Beispiel Wärmepumpe: 30.000 EUR Kosten - 21.000 EUR Förderung = 9.000 EUR Eigenanteil
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Ohne Förderung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Fassadendämmung:</strong> 120-180 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Wärmepumpe:</strong> 25.000-40.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Fenster (10 Stk):</strong> 8.000-15.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Dachdämmung:</strong> 15.000-30.000 EUR</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Ohne Förderung zahlen Sie den vollen Preis selbst.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-4">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 text-green-700 dark:text-green-300">Das bringt Ihnen die energetische Sanierung:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Heizkosten senken:</strong> Bis zu 50-70% Ersparnis pro Jahr</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Immobilienwert steigern:</strong> Bessere Energieklasse = höherer Verkaufspreis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Wohnkomfort erhöhen:</strong> Keine kalten Wände, angenehmes Raumklima</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Unabhängigkeit:</strong> Weniger abhängig von Energiepreisen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Umwelt schützen:</strong> CO2-Ausstoß reduzieren</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Förderung nutzen:</strong> Bis zu 70% der Kosten zurückbekommen</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

            </section>

          </div>
        </div>
      </main>

      <section className="py-4 lg:py-6 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Bereit für Ihre <span className="text-accent">Sanierung</span> in <span className="text-accent">München</span>?</h2>
              <p className="mb-6 opacity-90 text-center">
                Unverbindliches Angebot, ehrliche Beratung, transparente Preise – starten Sie jetzt Ihr Projekt in München.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Link href="/termin" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto min-h-12 gap-2 bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500 text-xs sm:text-sm" data-testid="button-ratgeber-booking">
                    <Calendar className="w-5 h-5 flex-shrink-0" />
                    24 Std. Online Termin
                  </Button>
                </Link>
                <Link href="/anfrage" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-12 gap-2 text-xs sm:text-sm" data-testid="button-ratgeber-cta">
                    Jetzt kostenlos anfragen
                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <InternalLinks links={linkSets.fromRatgeber} />
      <SeoFooter />
    </div>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Paintbrush, Bath, ArrowRight, Euro, Calendar, CheckCircle, Building, Thermometer, DoorOpen, Zap, Triangle, Download, FileText, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { highlightKeywords, pageKeywords } from "@/lib/highlight";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import ratgeberHeroImage from "@assets/generated_images/expert_renovation_advisor.png";

const ratgeberHeroContent: HeroContent = {
  backgroundImage: ratgeberHeroImage,
  badge: "Exklusives Expertenwissen für anspruchsvolle Eigentümer",
  titleLine1: "Sanierungs-Ratgeber.",
  titleLine2: "Kosten, Förderung & Insider-Tipps.",
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
        title="Haussanierung München Kosten 2024 | KfW Förderung 45%"
        description="Was kostet Haussanierung München? Kernsanierung ab 400€/m², KfW-Förderung bis 45%, Altbau-Tipps. Erfahrung aus 268+ Projekten. Jetzt informieren!"
        keywords="Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung München, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Badsanierung München, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, KfW Förderung Sanierung, Altbausanierung München, 089-Sanierer Ratgeber, 089 Sanierer Tipps"
        canonicalPath="/ratgeber"
      />
      <SiteHeader />
      <GlobalHero content={ratgeberHeroContent} />
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
                  <h2 className="text-xl font-bold mb-2">Kostenloser Sanierungs-Ratgeber 2025</h2>
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
                    href="/downloads/sanierungs-ratgeber-2025.pdf" 
                    download
                    data-testid="button-download-ratgeber-pdf"
                  >
                    <Button size="lg" className="gap-2">
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
                <h2 className="text-2xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Haussanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Haussanierung in München? Wie teuer ist eine Kernsanierung? Lohnt sich die Sanierung eines alten Hauses? 
                  Diese Fragen beschäftigen viele Immobilienbesitzer in der Region München.
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Das fragen uns Münchner Hausbesitzer am häufigsten</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wie lange dauert eine Haussanierung?</p>
                      <p className="text-muted-foreground">Eine Kernsanierung dauert typischerweise 3-6 Monate, abhängig vom Umfang der Arbeiten.</p>
                    </div>
                    <div>
                      <p className="font-medium">Lohnt sich die Sanierung eines alten Hauses?</p>
                      <p className="text-muted-foreground">In München mit hohen Grundstückspreisen lohnt sich die Sanierung oft mehr als Abriss und Neubau. Zudem gibt es KfW-Förderungen bis zu 150.000 EUR.</p>
                    </div>
                    <div>
                      <p className="font-medium">Was ist bei einer Altbausanierung wichtig?</p>
                      <p className="text-muted-foreground">Fachgerechte Analyse der Bausubstanz, Schadstoffprüfung und ein realistischer Kostenplan mit Puffer (ca. 20%).</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20 flex flex-wrap gap-3">
                    <Link href="/faq-preise" className="text-primary hover:underline text-sm" data-testid="link-haus-preise">
                      Alle Sanierungskosten München im Überblick
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=komplettsanierung" className="text-primary hover:underline text-sm" data-testid="link-haus-anfrage">
                      Komplettsanierung in München anfragen
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="fassade" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Paintbrush className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Was kostet <span className="text-accent">Fassade streichen</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet Fassade streichen in München? Wo finde ich gute Malerarbeiten in meiner Nähe? 
                  Hier finden Sie alle Informationen zu Fassadensanierung und Malerarbeiten.
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Ihre Fragen zu Fassade und Malerarbeiten</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wie finde ich gute Malerarbeiten in meiner Nähe?</p>
                      <p className="text-muted-foreground">Achten Sie auf erfahrene <strong>Handwerker in München</strong> mit Referenzen aus Ihrer Region. Wir arbeiten mit <strong>geprüften Partnerbetrieben</strong> zusammen.</p>
                    </div>
                    <div>
                      <p className="font-medium">Wie oft muss man eine Fassade streichen?</p>
                      <p className="text-muted-foreground">Alle <strong>10-15 Jahre</strong> bei normaler Beanspruchung. Nordseiten und Wetterseiten können früher Auffrischung benötigen.</p>
                    </div>
                    <div>
                      <p className="font-medium">Wann ist die beste Zeit für Fassadenarbeiten?</p>
                      <p className="text-muted-foreground"><strong>April bis Oktober</strong> bei trockener Witterung und Temperaturen über 5°C. Keine direkte Sonneneinstrahlung beim Trocknen.</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20 flex flex-wrap gap-3">
                    <Link href="/gewerke" className="text-primary hover:underline text-sm" data-testid="link-fassade-gewerke">
                      Maler & Fassadenbauer in München finden
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=komplettsanierung" className="text-primary hover:underline text-sm" data-testid="link-fassade-anfrage">
                      Fassadenarbeiten München anfragen
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="dach" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Triangle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Wie teuer ist eine <span className="text-accent">Dachsanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Dachsanierung in München? Wie teuer ist ein Dachausbau? Welche Kosten fallen beim Dachboden ausbauen an? 
                  Alle wichtigen Informationen zu Dacharbeiten und Kosten.
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Das wollen Sie über Dachsanierung wissen</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wann muss ein Dach saniert werden?</p>
                      <p className="text-muted-foreground">Bei undichten Stellen, beschädigten Ziegeln, Moos-/Algenbefall oder nach <strong>40-60 Jahren Lebensdauer</strong>.</p>
                    </div>
                    <div>
                      <p className="font-medium">Gibt es Förderung für Dachsanierung?</p>
                      <p className="text-muted-foreground">Ja! <strong>BAFA fördert Dachdämmung</strong> mit 15% Zuschuss, bei iSFP sogar <strong>20%</strong>. KfW bietet günstige Kredite.</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20 flex flex-wrap gap-3">
                    <Link href="/faq-preise" className="text-primary hover:underline text-sm" data-testid="link-dach-preise">
                      Dachsanierung Kosten München im Detail
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=dachsanierung" className="text-primary hover:underline text-sm" data-testid="link-dach-anfrage">
                      Dachsanierung München anfragen
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="badezimmer" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Bath className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Badsanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Badsanierung in München? Welche Kosten fallen bei einem neuen Badezimmer an? 
                  Alle Informationen zu Badsanierungen mit Preisbeispielen.
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Ihre Fragen zur Badsanierung</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wie lange dauert eine Badsanierung?</p>
                      <p className="text-muted-foreground">Ein Standard-Bad dauert ca. 2-3 Wochen. Größere Umbauten mit Grundrissänderung 3-4 Wochen.</p>
                    </div>
                    <div>
                      <p className="font-medium">Gibt es Förderung für barrierefreie Bäder?</p>
                      <p className="text-muted-foreground">Ja! KfW fördert altersgerechte Umbauten mit bis zu 6.250 EUR Zuschuss (Programm 455-B).</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20 flex flex-wrap gap-3">
                    <Link href="/faq-preise" className="text-primary hover:underline text-sm" data-testid="link-bad-preise">
                      Detaillierte Badsanierung Preise in München
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=badsanierung" className="text-primary hover:underline text-sm" data-testid="link-bad-anfrage">
                      Jetzt Badsanierung in München anfragen
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="keller" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Kellersanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Kellersanierung? Wie wird ein feuchter Keller trockengelegt? 
                  Informationen zu Kellerabdichtung, Kellersanierung und Kosten.
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Link href="/faq-preise" className="text-primary hover:underline text-sm" data-testid="link-keller-preise">
                      Kellersanierung Kosten München
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=komplettsanierung" className="text-primary hover:underline text-sm" data-testid="link-keller-anfrage">
                      Kellersanierung in München anfragen
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="daemmung" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Thermometer className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Lohnt sich <span className="text-accent">Wärmedämmung</span> in <span className="text-accent">München</span>? <span className="text-accent">Kosten</span> & <span className="text-accent">Förderung</span></h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Dachdämmung? Wie teuer ist eine Innendämmung? 
                  Alle Informationen zu Dämmmaßnahmen, Kosten und Fördermöglichkeiten.
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Das wollen Sie über Dämmung wissen</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Was bringt eine Dachdämmung?</p>
                      <p className="text-muted-foreground">Bis zu <strong>30% Heizenergie-Ersparnis</strong>. Die Investition amortisiert sich oft in <strong>8-12 Jahren</strong>.</p>
                    </div>
                    <div>
                      <p className="font-medium">Welche Dämmung ist die beste?</p>
                      <p className="text-muted-foreground">Die <strong>Aufsparrendämmung</strong> bietet die beste Dämmwirkung, ist aber teurer. <strong>Zwischensparrendämmung</strong> ist ein guter Kompromiss.</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20 flex flex-wrap gap-3">
                    <Link href="/faq-preise" className="text-primary hover:underline text-sm" data-testid="link-daemmung-preise">
                      Dämmung Kosten München im Detail
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=energetische-sanierung" className="text-primary hover:underline text-sm" data-testid="link-daemmung-anfrage">
                      Energetische Sanierung München anfragen
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="wohnung" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DoorOpen className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Was kostet eine <span className="text-accent">Wohnungssanierung</span> in <span className="text-accent">München</span>?</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-4">
                <p className="text-muted-foreground">
                  Was kostet eine Wohnungssanierung in München? Wie teuer ist die Renovierung einer Altbauwohnung? 
                  Alle Informationen zu Kosten und Ablauf.
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

              <Card className="bg-primary/5 border-primary/20 mt-8">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3">
                    <Link href="/faq-preise" className="text-primary hover:underline text-sm" data-testid="link-wohnung-preise">
                      Wohnungssanierung Kosten München
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/anfrage?service=komplettsanierung" className="text-primary hover:underline text-sm" data-testid="link-wohnung-anfrage">
                      Wohnungssanierung in München anfragen
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link href="/gewerke" className="text-primary hover:underline text-sm" data-testid="link-wohnung-gewerke">
                      Handwerker in München finden
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="energetisch" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Welche <span className="text-accent">Förderung</span> gibt es für <span className="text-accent">energetische Sanierung</span> in <span className="text-accent">München</span>?</h2>
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

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">So funktioniert die Förderung</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Was ist der Unterschied zwischen BAFA und KfW Förderung?</p>
                      <p className="text-muted-foreground">BAFA bietet Zuschüsse für Einzelmaßnahmen (Heizung, Dämmung, Fenster). KfW bietet günstige Kredite mit Tilgungszuschuss für Komplettsanierungen zum Effizienzhaus.</p>
                    </div>
                    <div>
                      <p className="font-medium">Brauche ich einen Energieberater?</p>
                      <p className="text-muted-foreground">Für die meisten Förderungen ja. Der Energieberater erstellt den individuellen Sanierungsfahrplan (iSFP) und Sie erhalten 5% zusätzliche Förderung.</p>
                    </div>
                    <div>
                      <p className="font-medium">Wie beantrage ich die Förderung?</p>
                      <p className="text-muted-foreground">BAFA-Anträge werden online gestellt BEVOR die Arbeiten beginnen. Wir unterstützen Sie gerne dabei!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

          </div>

          <div className="mt-16 text-center">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Bereit für Ihre <span className="text-accent">Sanierung</span> in <span className="text-accent">München</span>?</h2>
                <p className="mb-6 opacity-90">
                  Unverbindliches Angebot, ehrliche Beratung, transparente Preise – starten Sie jetzt Ihr Projekt in München.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/termin">
                    <Button size="lg" className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-ratgeber-booking">
                      <Calendar className="w-5 h-5" />
                      24 Std. Online Termin
                    </Button>
                  </Link>
                  <Link href="/anfrage">
                    <Button size="lg" variant="secondary" className="gap-2" data-testid="button-ratgeber-cta">
                      Jetzt kostenlos anfragen
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      <SeoFooter />
    </div>
  );
}

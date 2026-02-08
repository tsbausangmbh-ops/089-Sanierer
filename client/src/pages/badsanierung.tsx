import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { InternalLinks, linkSets } from "@/components/internal-links";
import { SeoHead } from "@/components/seo-head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Bath,
  CheckCircle,
  Clock,
  Euro,
  Shield,
  Droplets,
  Sparkles,
  Users,
  HelpCircle,
  Phone,
  ArrowRight,
  Home as HomeIcon,
  Hammer,
  Calculator
} from "lucide-react";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { ServiceIntro } from "@/components/service-intro";
const bathroomImg = "/images/badsanierung_muenchen_2026.webp";

const badHeroContent: HeroContent = {
  backgroundImage: bathroomImg,
  imageAlt: "Badsanierung München – Badezimmer komplett sanieren lassen mit bodengleicher Dusche, barrierefreiem Umbau und Festpreisgarantie vom Meisterbetrieb",
  badge: "Über 120 realisierte Traumbäder in München",
  titleLine1: "Badsanierung München – Bad renovieren, Badumbau & Badmodernisierung.",
  titleLine2: "Fertig in 2-3 Wochen. Barrierefrei & bodengleich.",
  descriptions: ["Ihr persönlicher Bauleiter koordiniert alle Gewerke.", "Bodengleiche Dusche, LED-Ambiente, Premium-Armaturen."],
  strongText: "Volle Festpreisgarantie ab 18.500€.",
  subText: "Sie entspannen – wir verwandeln Ihr Bad in eine private Wellness-Oase.",
  ctaText: "Jetzt exklusives Bad-Konzept anfordern",
  ctaLink: "/anfrage?service=badsanierung",
  checkmarks: ["98% Weiterempfehlung", "5 Jahre Gewährleistung", "Meisterbetriebe"],
  dataTestIdPrefix: "bad"
};

const badFeatures = [
  { title: "Bodengleiche Dusche", description: "Modernes Design, barrierefrei" },
  { title: "Hochwertige Fliesen", description: "Große Auswahl, fachgerechte Verlegung" },
  { title: "Moderne Sanitärobjekte", description: "Markenqualität von führenden Herstellern" },
  { title: "LED-Beleuchtung", description: "Stimmungsvolle Lichtkonzepte" },
  { title: "Fußbodenheizung", description: "Auf Wunsch nachrüstbar" },
  { title: "Handtuchheizkörper", description: "Praktisch und stylisch" }
];

const prozessSteps = [
  { step: 1, title: "Beratung", description: "Kostenlose Erstberatung bei Ihnen vor Ort" },
  { step: 2, title: "Planung", description: "3D-Visualisierung Ihres neuen Bades" },
  { step: 3, title: "Festpreis", description: "Verbindliches Angebot ohne Nachforderungen" },
  { step: 4, title: "Umsetzung", description: "Ihr neues Bad in 2-3 Wochen" }
];

const badFaqs = [
  {
    frage: "Wie lange dauert eine Badsanierung?",
    antwort: "Ein Standard-Bad (6-8 m²) sanieren wir in 2-3 Wochen komplett. Bei größeren Bädern oder aufwendigen Umbauten kann es etwas länger dauern. Den genauen Zeitrahmen nennen wir Ihnen im Angebot."
  },
  {
    frage: "Kann ich während der Badsanierung in der Wohnung bleiben?",
    antwort: "Ja, in den meisten Fällen ist das möglich. Wir richten bei Bedarf eine provisorische Dusche ein. Nur bei sehr umfangreichen Arbeiten empfehlen wir, vorübergehend auszuziehen."
  },
  {
    frage: "Was kostet eine bodengleiche Dusche?",
    antwort: "Eine bodengleiche Dusche ist in unseren Standardpaketen ab 18.500€ bereits enthalten. Sie ist nicht nur optisch ansprechend, sondern auch barrierefrei und pflegeleicht."
  },
  {
    frage: "Welche Fliesen empfehlen Sie für das Bad?",
    antwort: "Wir empfehlen großformatige Fliesen (60x60 oder 60x120 cm) für ein modernes, großzügiges Raumgefühl. Bei der Auswahl beraten wir Sie gerne - wir arbeiten mit allen namhaften Herstellern."
  },
  {
    frage: "Ist eine Fußbodenheizung im Bad möglich?",
    antwort: "Ja, wir können eine elektrische Fußbodenheizung nachrüsten. Die Kosten liegen bei ca. 80-120€ pro m². Sie sorgt für warme Füße und hilft, das Bad schneller zu trocknen."
  }
];

export default function Badsanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Badsanierung München ab 18.500€ | Komplettbad mit Festpreisgarantie 2026"
        description="Badsanierung München: Komplettbad ab 18.500€ inkl. Fliesen, Sanitär & Elektro. Bodengleiche Dusche, barrierefrei möglich. In 2-3 Wochen fertig."
        canonicalPath="/badsanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Badsanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Badsanierung in München ab 18.500€"
        }}
        preloadImage={bathroomImg}
      />
      <SiteHeader />

      <main>
        <GlobalHero content={badHeroContent} />
        <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
          <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
            Stand: Februar 2026
          </p>
        </div>

        <ServiceIntro
          headline="Badsanierung in München – Ihr Handwerkerservice für das perfekte Bad"
          paragraphs={[
            "Eine professionelle Badsanierung ist mehr als nur neue Fliesen. Als erfahrene Sanierungsfirma in München übernehmen wir alle Renovierungsarbeiten aus einer Hand – von der Demontage Ihres alten Bades bis zur schlüsselfertigen Übergabe Ihres neuen Traumbads. Sanitär, Elektrik, Fliesen und Malerarbeiten: Alles koordiniert von einem persönlichen Bauleiter.",
            "Unsere Handwerker in München sind zertifizierte Meisterbetriebe mit jahrelanger Erfahrung in der Badsanierung. Ob barrierefreie Dusche, Luxusbad oder kompakte Gästetoilette – wir liefern Sanierungsarbeiten auf höchstem Niveau. Als Ihr Generalunternehmer für Badsanierungen garantieren wir Ihnen einen verbindlichen Festpreis ohne Nachforderungen."
          ]}
          benefits={["Festpreis ab 18.500€", "Fertig in 2-3 Wochen", "Barrierefrei & bodengleich", "5 Jahre Gewährleistung"]}
        />

        <section className="py-8 lg:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-6">
              Ihr altes Bad raubt Ihnen jeden Morgen die Freude?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-left space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong>Kennen Sie das?</strong> Schimmel in den Fugen. Eine Duschwanne mit hohem Einstieg. Fliesen aus den 80ern, die Sie jeden Tag an "damals" erinnern. Ein Bad, in dem Sie sich nicht wohlfühlen – obwohl Sie dort jeden Tag Zeit verbringen.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong>Die größte Angst:</strong> "Was, wenn das alles viel teurer wird als geplant? Was, wenn die Handwerker mitten in der Arbeit aufhören? Was, wenn ich wochenlang ohne Bad dastehe?"
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                <strong>Die Lösung:</strong> Bei uns bekommen Sie einen Festpreis – bevor wir anfangen. Keine Nachforderungen. Keine bösen Überraschungen. In 2-3 Wochen haben Sie Ihr Traumbad. Und wenn etwas schiefgeht? Dann haben Sie 5 Jahre Gewährleistung. Wir stehen zu unserer Arbeit.
              </p>
              <p className="text-sm sm:text-base text-primary font-semibold">
                <strong>Stellen Sie sich vor:</strong> In nur 3 Wochen betreten Sie morgens ein Bad, das sich anfühlt wie im Wellness-Hotel. Bodengleiche Dusche, moderne Fliesen, perfekte Beleuchtung. Das ist keine Fantasie – das ist das, was unsere 120+ Kunden in München schon erleben.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/anfrage?service=badsanierung">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold" data-testid="button-bad-nlp-cta">
                  Ja, ich will mein Traumbad
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-12">
              Unsere Sanierungsarbeiten – Was ist inklusive?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {badFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-12">
              So läuft Ihre Badsanierung ab – Renovierung aus einer Hand
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {prozessSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
                Ihre Vorteile – Sanierungsfirma München mit Festpreis
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                    <p className="text-muted-foreground text-sm">
                      Keine versteckten Kosten, keine Nachforderungen – Ihr Handwerkerservice München mit transparenter Preisgestaltung
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">2-3 Wochen</h3>
                    <p className="text-muted-foreground text-sm">
                      Schnelle Fertigstellung, fester Termin
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">5 Jahre Garantie</h3>
                    <p className="text-muted-foreground text-sm">
                      Langfristige Gewährleistung auf alle Arbeiten
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Häufige Fragen zur Badsanierung
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {badFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-bad-${index}`}>
                      {faq.frage}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.antwort}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Badsanierung München – Kosten und Preise im Überblick
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Was kostet eine Badsanierung pro Quadratmeter?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  In München liegen die Kosten für eine Badsanierung je nach Ausstattung zwischen 1.800€ und 3.500€ pro Quadratmeter. Alle Renovierungsarbeiten – von hochwertigen Fliesen über moderne Sanitärobjekte bis zur neuen Elektrik – kosten durchschnittlich 2.300€/m². Luxusausstattungen mit Naturstein, Regendusche und Smart-Home-Elementen können bis zu 4.000€/m² erreichen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kostenbeispiel: Badezimmer 8m² komplett sanieren</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Ein typisches 8m²-Bad in München kostet bei einer Komplettsanierung zwischen 18.500€ und 28.000€. Darin enthalten sind Demontage, neue Fliesen, bodengleiche Dusche, WC, Waschtisch, Armaturen, Elektrik und alle Installationsarbeiten. Bei uns erhalten Sie einen verbindlichen Festpreis – ohne Nachforderungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Barrierefreies Bad – Zukunftssicher sanieren vom Fachhandwerker
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Bodengleiche Dusche nachrüsten in München</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Eine bodengleiche Dusche ist das Herzstück jeder barrierefreien Badsanierung. In Münchner Altbauten setzen wir spezielle Flachduschtassen oder geflieste Duschbereiche mit Linienablauf ein. Der Umbau dauert in der Regel 3-5 Tage und kostet zwischen 3.500€ und 6.000€ je nach baulichen Gegebenheiten.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">KfW-Förderung für barrierefreie Badsanierung</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Die KfW fördert den barrierefreien Umbau Ihres Badezimmers mit dem Programm „Altersgerecht Umbauen" (455-B) mit Zuschüssen bis zu 6.250€. Voraussetzung ist die Einhaltung der DIN 18040-2 Normen. Wir beraten Sie zur Förderfähigkeit und unterstützen bei der Antragstellung, damit Sie den maximalen Zuschuss erhalten.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Materialien und Ausstattung – Renovierungen München für Ihr neues Bad
            </h2>
            <div className="max-w-3xl mx-auto">
              <h3 className="font-semibold mb-2">Fliesen-Trends 2026 für Münchner Bäder</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Großformatige Fliesen in 120x60 cm oder 120x120 cm dominieren 2026 die Münchner Badgestaltung. Natürliche Farbtöne wie Greige, warmes Taupe und sanftes Salbeigrün liegen im Trend. Besonders beliebt sind Fliesen in Natursteinoptik und Betonoptik, die pflegeleicht und zeitlos wirken. Wir arbeiten mit allen namhaften Fliesenherstellern zusammen und begleiten Sie gerne in die Ausstellung.
              </p>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Badsanierung in Münchner Stadtteilen
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Badsanierung in Altbauwohnungen – Sanierungen München</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Altbauten in Schwabing, Maxvorstadt oder Haidhausen stellen besondere Anforderungen an die Badsanierung. Oft müssen Steigleitungen erneuert, Holzbalkendecken verstärkt und unebene Böden ausgeglichen werden. Als erfahrene Innenausbau Firma München kennen unsere Handwerker die typischen Altbau-Herausforderungen und finden für jede Situation die passende Lösung.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Badsanierung in Neubauten und modernen Wohnungen</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Auch in neueren Münchner Wohnungen lohnt sich eine Badsanierung – etwa wenn das Bad nach 15-20 Jahren nicht mehr zeitgemäß ist. In Neubauten in Riem, Freiham oder Obersendling sind die Voraussetzungen ideal: Moderne Leitungen, gerade Wände und ausreichende Raumhöhe ermöglichen eine schnelle und kostengünstige Umsetzung.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-4">
              Wie lange wollen Sie noch mit Ihrem alten Bad leben?
            </h2>
            <div className="text-sm sm:text-base opacity-90 mb-4 flex flex-col gap-1">
              <span>Schimmel, kaputte Fliesen, veraltete Armaturen?</span>
              <span><strong>Das muss nicht sein.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>In 2-3 Wochen könnten Sie Ihr neues Traumbad genießen.</span>
              <span>Der erste Schritt dauert nur 2 Minuten.</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/anfrage?service=badsanierung" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-6 text-sm sm:text-base font-semibold shadow-xl" data-testid="button-anfrage-bad-cta">
                  Ja, ich will mein Badproblem lösen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white min-h-12 px-6 text-sm sm:text-base">
                  <Phone className="w-4 h-4 mr-2" />
                  Sofort anrufen
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Unverbindlich. Festpreisangebot in 24 Stunden.
            </p>
          </div>
        </section>
      </main>

      <InternalLinks links={linkSets.fromBadsanierung} />
      <SeoFooter />
    </div>
  );
}

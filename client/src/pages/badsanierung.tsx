import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
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
  ArrowRight
} from "lucide-react";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import bathroomImg from "@assets/generated_images/modern_bathroom_renovation.webp";

const badHeroContent: HeroContent = {
  backgroundImage: bathroomImg,
  badge: "Über 120 realisierte Traumbäder in München",
  titleLine1: "Badsanierung München – Bad renovieren, Badumbau & Badmodernisierung.",
  titleLine2: "Fertig in 2-3 Wochen. Barrierefrei & bodengleich.",
  descriptions: ["Ihr persönlicher Bauleiter koordiniert alle Gewerke.", "Bodengleiche Dusche, LED-Ambiente, Premium-Armaturen."],
  strongText: "Volle Festpreisgarantie ab 9.200€.",
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
    antwort: "Eine bodengleiche Dusche ist in unseren Standardpaketen ab 9.200€ bereits enthalten. Sie ist nicht nur optisch ansprechend, sondern auch barrierefrei und pflegeleicht."
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
        title="Badsanierung München ab 9.200€ | Festpreis | 089-Sanierer"
        description="Badsanierung München: Komplett-Bad ab 9.200€ mit Festpreisgarantie. Bodengleiche Dusche, moderne Fliesen, 5 Jahre Gewährleistung. In 2-3 Wochen fertig."
        canonicalPath="/badsanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Badsanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Badsanierung in München ab 9.200€"
        }}
      />
      <SiteHeader />

      <main>
        <GlobalHero content={badHeroContent} />
        <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
          <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
            Stand: Februar 2026
          </p>
        </div>

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
              Was ist inklusive?
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
              So läuft Ihre Badsanierung ab
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
                Ihre Vorteile
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                    <p className="text-muted-foreground text-sm">
                      Keine versteckten Kosten, keine Nachforderungen
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

      <SeoFooter />
    </div>
  );
}

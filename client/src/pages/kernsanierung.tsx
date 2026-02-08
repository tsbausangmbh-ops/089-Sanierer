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
  Hammer,
  CheckCircle,
  Clock,
  Euro,
  Shield,
  Zap,
  Droplets,
  Flame,
  Building2,
  HardHat,
  HelpCircle,
  Phone,
  ArrowRight
} from "lucide-react";
import { GlobalHero, HeroContent } from "@/components/global-hero";
const kernImg = "/images/haus_alt_vs_neu_vergleich.webp";

const kernHeroContent: HeroContent = {
  backgroundImage: kernImg,
  imageAlt: "Kernsanierung München – Altbau bis auf die Grundmauern sanieren und modernisieren",
  badge: "Über 20 exklusive Kernsanierungen realisiert",
  titleLine1: "Kernsanierung München – Entkernung, Totalsanierung & Grundsanierung.",
  titleLine2: "Neubau-Qualität im Altbau. Festpreis ab 1.200€/m².",
  descriptions: ["Ihr persönlicher Projekt-Kurator übernimmt die komplette Verantwortung.", "Modernste Haustechnik, zertifizierte Meisterbetriebe."],
  strongText: "Volle Festpreisgarantie ab 1.200€/m².",
  subText: "Für anspruchsvolle Eigentümer, die keine Kompromisse eingehen.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage?service=komplettsanierung",
  checkmarks: ["98% Weiterempfehlung", "5 Jahre Gewährleistung", "KfW-Förderung möglich"],
  dataTestIdPrefix: "kern"
};

const kernsanierungPhasen = [
  { 
    phase: 1, 
    title: "Entkernung", 
    description: "Rückbau bis auf den Rohbau. Alle alten Installationen werden entfernt." 
  },
  { 
    phase: 2, 
    title: "Rohbauarbeiten", 
    description: "Statische Anpassungen, neue Grundrisse, Wanddurchbrüche." 
  },
  { 
    phase: 3, 
    title: "Haustechnik", 
    description: "Komplett neue Elektrik, Sanitär und Heizung nach aktuellen Standards." 
  },
  { 
    phase: 4, 
    title: "Ausbau", 
    description: "Trockenbau, Estrich, Dämmung, Fenster und Türen." 
  },
  { 
    phase: 5, 
    title: "Innenausbau", 
    description: "Fliesen, Böden, Malerarbeiten, Sanitärobjekte, Küche." 
  }
];

const wasIstInklusive = [
  "Entkernung und Entsorgung",
  "Neue Elektroinstallation komplett",
  "Neue Sanitärleitungen",
  "Neue Heizungsanlage",
  "Dämmung nach EnEV",
  "Neue Fenster und Türen",
  "Fußbodenaufbau mit Estrich",
  "Bodenbeläge nach Wahl",
  "Komplette Bäder",
  "Malerarbeiten",
  "Bauleitung und Koordination",
  "5 Jahre Gewährleistung"
];

const kernFaqs = [
  {
    frage: "Was ist der Unterschied zwischen Kernsanierung und Komplettsanierung?",
    antwort: "Bei einer Kernsanierung wird das Gebäude bis auf die tragenden Wände zurückgebaut - alle Installationen, Böden, nicht-tragenden Wände werden entfernt. Eine Komplettsanierung kann auch bedeuten, dass bestehende Elemente erhalten bleiben. Die Kernsanierung ist umfassender und teurer, aber das Ergebnis entspricht einem Neubau."
  },
  {
    frage: "Wie lange dauert eine Kernsanierung?",
    antwort: "Je nach Größe und Umfang 12-24 Wochen. Eine 100m² Wohnung: ca. 12-14 Wochen. Ein Einfamilienhaus: 16-24 Wochen. Wir nennen Ihnen im Angebot den verbindlichen Zeitrahmen."
  },
  {
    frage: "Bleibt bei einer Kernsanierung wirklich nur der Rohbau?",
    antwort: "Ja, wir entfernen: alle Leitungen (Elektro, Wasser, Heizung), Böden inkl. Estrich, nicht-tragende Wände, Deckenverkleidungen, Fenster und Türen. Erhalten bleiben: tragende Wände, Decken, das Dach. Danach bauen wir komplett neu auf."
  },
  {
    frage: "Ist eine Kernsanierung günstiger als ein Neubau?",
    antwort: "In der Regel ja: Kernsanierung kostet 1.200-2.000€/m², Neubau 3.000-4.000€/m². Außerdem: Bei Bestandsgebäuden gilt oft Bestandsschutz, während für einen Neubau aktuelle Bauvorschriften gelten, die teurer umzusetzen sind."
  },
  {
    frage: "Welche Genehmigungen brauche ich für eine Kernsanierung?",
    antwort: "Für reine Innenarbeiten meist keine. Bei Änderungen an tragenden Wänden, Fenstern oder Fassade ist eine Baugenehmigung nötig. Wir klären das im Vorfeld und übernehmen bei Bedarf die komplette Antragsstellung."
  }
];

export default function Kernsanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Kernsanierung München ab 1.200€/m² | Altbau entkernen & neu aufbauen"
        description="Kernsanierung München: Komplettsanierung bis auf den Rohbau ab 1.200€/m². Neue Elektrik, Sanitär, Heizung. Festpreisgarantie, 5 Jahre Gewährleistung."
        canonicalPath="/kernsanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Kernsanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Kernsanierung in München"
        }}
        preloadImage={kernImg}
      />
      <SiteHeader />

      <main>
        <GlobalHero content={kernHeroContent} />
        <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
          <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
            Stand: Februar 2026
          </p>
        </div>

        <section className="py-8 lg:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-6">
              Ihr Altbau hat so viele Probleme, dass Flickwerk nicht mehr hilft?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-left space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong>Kennen Sie das?</strong> Die Elektrik ist aus den 60ern – Sie haben Angst vor einem Brand. Die Wasserleitungen sind aus Blei oder so verkalkt, dass kaum noch Druck kommt. Der Grundriss passt nicht mehr zum heutigen Leben. Und jede einzelne Reparatur scheint das Problem nur zu verschieben.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong>Das Dilemma:</strong> Verkaufen? Dann bekommen Sie weniger, als das Grundstück wert ist. Abreißen und neu bauen? Extrem teuer und zeitaufwendig. Weiter flicken? Dann wird es jedes Jahr schlimmer.
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                <strong>Die radikale Lösung:</strong> Kernsanierung. Wir nehmen alles raus – bis auf die tragenden Wände. Dann bauen wir komplett neu auf. Neue Elektrik. Neue Leitungen. Neue Böden. Neuer Grundriss. Das Ergebnis: Neubau-Qualität zum halben Preis eines Neubaus.
              </p>
              <p className="text-sm sm:text-base text-primary font-semibold">
                <strong>Das Ergebnis:</strong> Ein Haus, das aussieht und funktioniert wie ein Neubau – aber den Charakter Ihres Altbaus behält. Energieeffizient. Modern. Sicher. Mit einem komplett neuen Lebensgefühl. Und Sie behalten Ihren Bestandsschutz und oft auch die Möglichkeit auf KfW-Förderung.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/anfrage?service=komplettsanierung">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold" data-testid="button-kern-nlp-cta">
                  Ja, mein Altbau soll wie neu werden
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-4">
              Was ist eine Kernsanierung? – Sanierungsarbeiten komplett erklärt
            </h2>
            <p className="text-center text-muted-foreground max-w-7xl mx-auto mb-12">
              Bei einer Kernsanierung wird das Gebäude bis auf die tragenden Wände zurückgebaut. 
              Alle Installationen, Böden, Wände und Decken werden erneuert. 
              Das Ergebnis: Ein Altbau mit dem Komfort eines Neubaus – Renovierung aus einer Hand.
            </p>
            <div className="max-w-7xl mx-auto">
              <div className="space-y-6">
                {kernsanierungPhasen.map((item) => (
                  <div key={item.phase} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {item.phase}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-12">
              Was ist inklusive? – Sanierung aus einer Hand
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {wasIstInklusive.map((item) => (
                <div key={item} className="flex items-center gap-3 p-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
                Wann lohnt sich eine Kernsanierung? – Handwerkerservice München berät
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Altbau vor 1980
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Veraltete Elektrik (keine FI-Schalter)</li>
                      <li>Blei- oder Stahlleitungen</li>
                      <li>Keine/schlechte Dämmung</li>
                      <li>Ineffiziente Heizung</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <HardHat className="w-5 h-5 text-primary" />
                      Grundrissänderung gewünscht
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Wände sollen versetzt werden</li>
                      <li>Offene Küche gewünscht</li>
                      <li>Zusätzliches Badezimmer</li>
                      <li>Raumaufteilung optimieren</li>
                    </ul>
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
                Häufige Fragen zur Kernsanierung
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {kernFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-kern-${index}`}>
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
              Sanierungen München – Kosten realistisch kalkulieren
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Was kostet eine Kernsanierung pro Quadratmeter?</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  In München liegen die Kosten für eine Kernsanierung je nach Ausstattungsstandard zwischen 1.200 und 2.000 Euro pro Quadratmeter. Der Preis hängt von der Gebäudesubstanz, dem gewünschten Ausbaustandard und den notwendigen statischen Maßnahmen ab. Hochwertige Materialien und individuelle Grundrissänderungen können den Preis nach oben beeinflussen. Als erfahrene Sanierungsfirma München erstellen wir Ihnen ein detailliertes Festpreisangebot nach der kostenlosen Vor-Ort-Besichtigung.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kernsanierung vs. Neubau – Generalunternehmer Sanierung im Vorteil</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Ein Neubau in München kostet durchschnittlich 3.000 bis 4.500 Euro pro Quadratmeter – ohne Grundstück. Die Kernsanierung spart nicht nur erhebliche Kosten, sondern auch Zeit und bürokratischen Aufwand. Zudem profitieren Sie vom Bestandsschutz und können bestehende Baugenehmigungen nutzen. In den meisten Fällen ist die Kernsanierung die wirtschaftlichere und nachhaltigere Lösung für Renovierungen München.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Ablauf der Renovierungsarbeiten – Schritt für Schritt
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Entkernung und Rohbauarbeiten</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Im ersten Schritt werden alle nicht-tragenden Wände, Bodenbeläge, Installationen und Verkleidungen fachgerecht entfernt und entsorgt. Anschließend erfolgt die statische Prüfung und gegebenenfalls die Verstärkung tragender Elemente. Neue Wanddurchbrüche und Grundrissänderungen werden in dieser Phase realisiert. Die Rohbauarbeiten schaffen die Grundlage für den kompletten Neuaufbau.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Haustechnik komplett erneuern – Handwerker München</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Nach der Entkernung wird die gesamte Haustechnik auf den neuesten Stand gebracht. Dazu gehören die komplette Elektroinstallation nach aktuellen VDE-Normen, neue Sanitärleitungen und eine moderne Heizungsanlage. Auf Wunsch integrieren wir Smart-Home-Systeme, Fußbodenheizung und Lüftungsanlagen mit Wärmerückgewinnung. Unsere erfahrenen Handwerker dokumentieren und prüfen alle Installationen vor dem Verschließen der Wände.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Kernsanierung und Denkmalschutz – Innenausbau Firma München
            </h2>
            <div>
              <h3 className="font-semibold mb-2">Auflagen und Genehmigungen</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                München verfügt über zahlreiche denkmalgeschützte Gebäude, bei denen besondere Auflagen für Sanierungsarbeiten gelten. Die untere Denkmalschutzbehörde muss bei Veränderungen an der Fassade, den Fenstern oder der Dachform vorab genehmigen. Wir arbeiten eng mit den Behörden zusammen und kennen die spezifischen Anforderungen der Münchner Denkmalschutzbehörde. Zusätzlich können Sie bei denkmalgeschützten Gebäuden von erhöhten steuerlichen Abschreibungsmöglichkeiten nach §7i EStG profitieren.
              </p>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Kernsanierung für verschiedene Gebäudetypen – Renovierungsfirma München
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Altbau-Kernsanierung mit Charme-Erhalt</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Münchner Altbauten aus der Gründerzeit bestechen durch hohe Decken, Stuckelemente und Parkettböden. Bei unseren Sanierungsarbeiten bewahren wir diese charakteristischen Merkmale, während wir die gesamte Technik erneuern. Stuck wird restauriert, Dielenböden werden aufgearbeitet und historische Türen erhalten eine Auffrischung. So verbinden wir den unverwechselbaren Altbau-Charme mit modernem Wohnkomfort und aktueller Energieeffizienz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mehrfamilienhaus kernsanieren</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Die Kernsanierung eines Mehrfamilienhauses erfordert besondere Planung und Koordination. Wir erstellen einen Bauablaufplan, der die Interessen aller Parteien berücksichtigt und die Belastung für Bewohner minimiert. Etappenweise Sanierung einzelner Wohneinheiten ist ebenso möglich wie die Komplettsanierung des gesamten Gebäudes. Für Eigentümergemeinschaften bieten wir spezielle Beratung zur Beschlussfassung und Finanzierung.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-4">
              Ihr Gebäude hat eine Rundum-Erneuerung verdient!
            </h2>
            <div className="text-sm sm:text-base opacity-90 mb-4 flex flex-col gap-1">
              <span>Marode Leitungen, veraltete Heizung, undichte Fenster?</span>
              <span><strong>Mit einer Kernsanierung starten Sie komplett neu.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>Wir koordinieren alle Gewerke - Sie haben nur einen Ansprechpartner.</span>
              <span>Festpreis. Fester Termin. Qualitätsgarantie.</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/anfrage?service=komplettsanierung" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-6 text-sm sm:text-base font-semibold shadow-xl" data-testid="button-anfrage-kern-cta">
                  Ja, ich will komplett neu starten
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white min-h-12 px-6 text-sm sm:text-base">
                  <Phone className="w-4 h-4 mr-2" />
                  Erstberatung anfordern
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Wir prüfen vor Ort, ob eine Kernsanierung sinnvoll ist.
            </p>
          </div>
        </section>
      </main>

      <InternalLinks links={linkSets.fromKernsanierung} />
      <SeoFooter />
    </div>
  );
}

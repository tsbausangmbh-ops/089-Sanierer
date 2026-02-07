import { Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { highlightKeywords, pageKeywords } from "@/lib/highlight";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import pricingHeroImage from "@assets/generated_images/sanierung_preiskalkulation.webp";

const faqHeroContent: HeroContent = {
  backgroundImage: pricingHeroImage,
  badge: "Volle Transparenz für anspruchsvolle Eigentümer",
  titleLine1: "Sanierung München FAQ – Kosten, Preise & häufige Fragen.",
  titleLine2: "Alle Antworten zu Renovierung, Förderung & Ablauf.",
  descriptions: ["Was kostet Ihre Investition?", "Transparente Kalkulation ohne versteckte Posten."],
  strongText: "Festpreisgarantie ab 800€/m² – garantiert.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "5 Jahre Gewährleistung", "Meisterbetriebe"],
  dataTestIdPrefix: "faq"
};
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Bath,
  UtensilsCrossed,
  Layers,
  Zap,
  Flame,
  Home as HomeIcon,
  Euro,
  HelpCircle,
  CheckCircle,
  PaintBucket,
  Plug,
  Droplets,
  Thermometer,
  Wrench,
  Handshake,
  Calendar
} from "lucide-react";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "bodensanierung", title: "Bodensanierung" },
  { id: "elektrosanierung", title: "Elektrosanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung" },
];

const faqItems = [
  {
    question: "Wie lange dauert eine Komplettsanierung in München?",
    answer: "Die Dauer einer **Komplettsanierung in München** hängt von der Größe und dem Zustand der Immobilie ab. Eine **Wohnung (60-80 m²)** dauert in der Regel **6-10 Wochen**, ein **Einfamilienhaus 3-6 Monate**. Wir erstellen Ihnen einen detaillierten Zeitplan vor Projektbeginn.",
    link: "/anfrage?service=komplettsanierung"
  },
  {
    question: "Was kostet eine Badsanierung in München?",
    answer: "Eine **Badsanierung in München** kostet je nach Größe und Ausstattung zwischen **8.000 € und 50.000 €** (netto zzgl. MwSt., Stand 12/2025). Ein **Gäste-WC (3-4m²)** liegt bei etwa **8.000-12.000 €**, ein **Standard-Bad (5-6m²)** bei **16.000-22.000 €**, ein **Komfort-Bad** bei **22.000-32.000 €**. Barrierefreie Umbauten kosten ca. **+3.000-5.000 €** extra. Wir erstellen Ihnen ein individuelles Angebot.",
    link: "/anfrage?service=badsanierung"
  },
  {
    question: "Übernehmen Sie die Koordination aller Gewerke in München?",
    answer: "Ja, als **Generalunternehmer in München** koordinieren wir alle **Handwerker und Gewerke** für Sie. Sie haben **einen einzigen Ansprechpartner** und müssen sich um nichts kümmern. Wir übernehmen die **komplette Projektleitung** von der Planung bis zur Abnahme.",
    link: "/gewerke"
  },
  {
    question: "Welche Garantie erhalte ich auf Sanierungsarbeiten?",
    answer: "Wir gewähren **5 Jahre Gewährleistung** auf alle ausgeführten Arbeiten. Dies geht über die gesetzliche Gewährleistung hinaus und gibt Ihnen **zusätzliche Sicherheit**. Bei Mängeln reagieren wir **schnell und unkompliziert**.",
    link: "/kontakt"
  },
  {
    question: "Kann ich während der Sanierung in München wohnen bleiben?",
    answer: "Bei kleineren Sanierungen (z.B. **Badsanierung**) ist das oft möglich, jedoch mit Einschränkungen. Bei einer **Komplettsanierung** empfehlen wir, die Wohnung vorübergehend zu räumen. Wir beraten Sie individuell zu Ihren Möglichkeiten.",
    link: "/ratgeber"
  },
  {
    question: "Wie läuft die Kostenplanung für Sanierungen ab?",
    answer: "Nach einem **kostenlosen Vor-Ort-Termin** erstellen wir Ihnen ein detailliertes Angebot mit **transparenter Kostenaufstellung**. Sie erhalten einen **Festpreis ohne versteckte Kosten**. Änderungen während der Bauphase werden immer vorher mit Ihnen abgestimmt.",
    link: "/anfrage"
  },
  {
    question: "Arbeiten Ihre Handwerker auch am Wochenende?",
    answer: "Unsere regulären **Arbeitszeiten** sind **Montag bis Freitag von 7:00 bis 17:00 Uhr**. In Ausnahmefällen und nach Absprache können wir auch **samstags** arbeiten. Lärmintensive Arbeiten führen wir nur zu den gesetzlich erlaubten Zeiten durch.",
    link: "/kontakt"
  },
  {
    question: "Welche Fördermittel gibt es für Sanierungen in München?",
    answer: "Für **energetische Sanierungen** gibt es attraktive **KfW-Förderungen** und **BAFA-Zuschüsse**. Wir beraten Sie zu den Fördermöglichkeiten und unterstützen Sie bei der Antragstellung. So können Sie **bis zu 45% der Kosten sparen**.",
    link: "/anfrage?service=energetische-sanierung"
  },
  {
    question: "Wie schnell können Sie mit der Sanierung in München beginnen?",
    answer: "Nach Auftragserteilung können wir in der Regel **innerhalb von 2-4 Wochen** mit den Arbeiten beginnen. Bei **dringenden Projekten** versuchen wir, schnellere Lösungen zu finden. Die Materialbestellung und Planung benötigt jedoch etwas Vorlaufzeit.",
    link: "/anfrage"
  },
  {
    question: "Vermitteln Sie einzelne Handwerker in München?",
    answer: "Ja, über unseren **Handwerker-Vermittlungsservice** vermitteln wir auch einzelne **Gewerke** wie **Maler, Elektriker, Fliesenleger oder Sanitärinstallateure**. Alle Partner sind **geprüfte Handwerker aus München** und Umgebung.",
    link: "/gewerke"
  },
  {
    question: "Brauche ich eine Baugenehmigung für meine Sanierung in München?",
    answer: "Für reine **Innenraumsanierungen** ist in der Regel **keine Baugenehmigung** erforderlich. Bei **tragenden Wänden**, Fassadenänderungen oder **Dachausbauten** kann jedoch eine Genehmigung nötig sein. Wir klären dies im Vorfeld für Sie ab.",
    link: "/ratgeber"
  },
  {
    question: "Wie hoch ist die Anzahlung bei Sanierungsprojekten?",
    answer: "Wir arbeiten mit einer **fairen Zahlungsregelung**: **30% bei Auftragserteilung**, **40% bei Baubeginn** und **30% nach Fertigstellung** und Abnahme. So haben Sie Sicherheit und wir können Material vorfinanzieren.",
    link: "/anfrage"
  },
  {
    question: "Was passiert bei unvorhergesehenen Problemen während der Sanierung?",
    answer: "Unvorhergesehene Probleme wie **versteckte Wasserschäden** oder **marode Leitungen** können vorkommen. Wir informieren Sie **sofort**, dokumentieren alles und besprechen die Lösung mit Ihnen, **bevor zusätzliche Kosten entstehen**.",
    link: "/kontakt"
  },
  {
    question: "Sind Ihre Handwerker in München versichert?",
    answer: "Ja, alle unsere **Handwerker und Partnerunternehmen** sind vollständig versichert. Wir verfügen über eine **Betriebshaftpflichtversicherung** mit einer Deckungssumme von **5 Millionen Euro**.",
    link: "/gewerke"
  },
  {
    question: "Kann ich eigene Materialien für die Sanierung beistellen?",
    answer: "Grundsätzlich ja, allerdings übernehmen wir dann **keine Gewährleistung** für diese Materialien. Wir empfehlen, Materialien über uns zu beziehen, da wir **Handwerkerrabatte** weitergeben und die Qualität garantieren können.",
    link: "/anfrage"
  },
  {
    question: "Wie läuft die Kommunikation während der Bauphase?",
    answer: "Sie erhalten einen **festen Ansprechpartner**, der Sie regelmäßig über den Fortschritt informiert. Wir sind **telefonisch und per WhatsApp** erreichbar. Auf Wunsch erhalten Sie **wöchentliche Foto-Updates**.",
    link: "/kontakt"
  },
  {
    question: "Entsorgen Sie auch den Bauschutt bei Sanierungen?",
    answer: "Ja, die **fachgerechte Entsorgung** von Bauschutt und Altmaterialien ist in unseren Angeboten enthalten. Wir stellen Container und kümmern uns um die **umweltgerechte Entsorgung**.",
    link: "/anfrage"
  },
  {
    question: "In welchen Münchner Stadtteilen arbeiten Sie?",
    answer: "Wir arbeiten in **ganz München** und dem **Münchner Umland**: **Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen, Giesing** sowie **Dachau, Starnberg, Freising, Germering** und weitere Gemeinden.",
    link: "/kontakt"
  },
  {
    question: "Wie gehen Sie mit Altbausanierungen in München um?",
    answer: "**Altbauten** erfordern besondere Sorgfalt. Wir haben **langjährige Erfahrung mit Münchner Altbauten** und kennen die typischen Herausforderungen wie **Holzbalkendecken**, alte Leitungen und **Denkmalschutzauflagen**.",
    link: "/ratgeber"
  },
  {
    question: "Bieten Sie barrierefreie Sanierungen in München an?",
    answer: "Ja, wir sind spezialisiert auf **barrierefreie Umbauten nach DIN 18040**. Dazu gehören **bodengleiche Duschen**, verbreiterte Türen, Haltegriffe und rutschfeste Böden. Für solche Maßnahmen gibt es oft **KfW-Förderungen**.",
    link: "/anfrage?service=badsanierung"
  },
  {
    question: "Können Sie auch Teilsanierungen in München durchführen?",
    answer: "Selbstverständlich. Ob **Badsanierung**, **Küchenerneuerung** oder nur **neue Böden** – wir führen auch **Teilsanierungen** durch. Die **Mindestauftragssumme** liegt bei **5.000 Euro**.",
    link: "/anfrage"
  },
  {
    question: "Was ist der Unterschied zwischen Renovierung und Sanierung?",
    answer: "Eine Renovierung umfasst kosmetische Verbesserungen wie Streichen oder Tapezieren. Eine Sanierung beinhaltet tiefgreifende Maßnahmen wie neue Elektrik, Sanitär, Heizung oder Bausubstanzverbesserungen."
  },
  {
    question: "Wie schützen Sie meine Möbel und Böden während der Arbeiten?",
    answer: "Wir arbeiten mit professionellen Abdeckungen, Staubschutzwänden und Folien. Empfindliche Bereiche werden sorgfältig geschützt. Bei Komplettsanierungen empfehlen wir, Möbel vorübergehend auszulagern."
  },
  {
    question: "Erstellen Sie auch 3D-Visualisierungen?",
    answer: "Ja, auf Wunsch erstellen wir 3D-Visualisierungen Ihrer geplanten Sanierung. So können Sie sich vorab ein genaues Bild machen und Änderungen vor Baubeginn vornehmen."
  },
  {
    question: "Wie kann ich den Fortschritt meiner Sanierung verfolgen?",
    answer: "Sie erhalten regelmäßige Updates per WhatsApp oder E-Mail mit Fotos. Zusätzlich sind Baustellenbesuche nach Absprache jederzeit möglich. Bei größeren Projekten führen wir wöchentliche Baubesprechungen durch."
  }
];

const priceRanges = [
  {
    service: "Komplettsanierung",
    icon: HomeIcon,
    priceRange: "1.000 - 2.300 €/m²",
    description: "Je nach Zustand und Ausstattungswünschen (Stand 12/2025, netto zzgl. MwSt., Angabe ohne Gewähr)",
    examples: [
      "Standard: 1.000-1.300 €/m²",
      "Gehoben: 1.300-1.700 €/m²",
      "Premium: 1.700-2.300 €/m²"
    ]
  },
  {
    service: "Badsanierung",
    icon: Bath,
    priceRange: "8.000 - 50.000 €",
    description: "Abhängig von Größe und Ausstattung (Stand 12/2025, netto zzgl. MwSt., Angabe ohne Gewähr)",
    examples: [
      "Gäste-WC (3-4m²): ab 8.000 €",
      "Standard-Bad (5-6m²): ab 16.000 €",
      "Komfort-Bad (6-8m²): ab 22.000 €",
      "Barrierefrei: +3.000-5.000 €"
    ]
  },
  {
    service: "Küchensanierung",
    icon: UtensilsCrossed,
    priceRange: "6.500 - 22.000 €",
    description: "Nur Bauarbeiten OHNE Küchenmöbel (Stand 12/2025, netto zzgl. MwSt., Angabe ohne Gewähr)",
    examples: [
      "Kleine Küche (bis 10m²): ab 6.500 €",
      "Mittlere Küche (10-15m²): ab 10.000 €",
      "Große Küche (15m²+): ab 15.000 €"
    ]
  },
  {
    service: "Bodensanierung",
    icon: Layers,
    priceRange: "65 - 200 €/m²",
    description: "Material und Verlegung (Stand 12/2025, netto zzgl. MwSt., Angabe ohne Gewähr)",
    examples: [
      "Laminat/Vinyl: 65-100 €/m²",
      "Fliesen: 100-160 €/m²",
      "Parkett: 130-200 €/m²"
    ]
  },
  {
    service: "Elektrosanierung",
    icon: Zap,
    priceRange: "85 - 300 €/m²",
    description: "Kompletterneuerung der Elektrik (Stand 12/2025, netto zzgl. MwSt., Angabe ohne Gewähr)",
    examples: [
      "Teilsanierung: 85-130 €/m²",
      "Komplettsanierung Altbau: 130-200 €/m²",
      "Mit Smart Home: 200-300 €/m²"
    ]
  },
  {
    service: "Heizungssanierung",
    icon: Flame,
    priceRange: "12.000 - 65.000 €",
    description: "Neue Heizungsanlage inkl. Einbau (Stand 12/2025, netto zzgl. MwSt., Angabe ohne Gewähr)",
    examples: [
      "Gasheizung Brennwert: ab 12.000 €",
      "Wärmepumpe Luft-Wasser: ab 35.000 €",
      "Wärmepumpe Sole/Erdwärme: ab 52.000 €"
    ]
  }
];

const tradePrices = [
  {
    trade: "Maler & Lackierer",
    icon: PaintBucket,
    hourlyRate: "65 - 90 €/Std.",
    description: "Malerarbeiten in München (Stand 12/2025, netto zzgl. MwSt.)",
    examples: [
      "Wände streichen (pro m²): 15 - 25 €",
      "Decken streichen (pro m²): 18 - 28 €",
      "Türen/Zargen lackieren (pro Stück): 100 - 180 €",
      "Tapezieren (pro m²): 20 - 35 €",
      "Fassade streichen (pro m²): 35 - 60 €",
      "Schimmelbeseitigung: ab 450 €"
    ]
  },
  {
    trade: "Elektriker",
    icon: Plug,
    hourlyRate: "80 - 110 €/Std.",
    description: "Elektroinstallation in München (Stand 12/2025, netto zzgl. MwSt.)",
    examples: [
      "Steckdose setzen: 100 - 150 €",
      "Lichtschalter installieren: 80 - 130 €",
      "Lampe anschließen: 60 - 100 €",
      "Sicherungskasten erneuern: 2.600 - 4.000 €",
      "E-Herd Anschluss: 150 - 250 €",
      "Elektrocheck (E-Check): 180 - 300 €"
    ]
  },
  {
    trade: "Sanitär & Klempner",
    icon: Droplets,
    hourlyRate: "85 - 115 €/Std.",
    description: "Sanitärinstallation in München (Stand 12/2025, netto zzgl. MwSt.)",
    examples: [
      "Wasserhahn montieren: 100 - 180 €",
      "WC austauschen: 300 - 550 €",
      "Waschbecken montieren: 180 - 360 €",
      "Duschkabine einbauen: 500 - 1.000 €",
      "Rohrbruch reparieren: 250 - 600 €",
      "Abfluss verstopft: 100 - 220 €"
    ]
  },
  {
    trade: "Heizungsbauer",
    icon: Thermometer,
    hourlyRate: "85 - 120 €/Std.",
    description: "Heizungsinstallation in München (Stand 12/2025, netto zzgl. MwSt.)",
    examples: [
      "Heizkörper austauschen: 300 - 600 €",
      "Thermostat wechseln: 100 - 180 €",
      "Heizung entlüften: 100 - 150 €",
      "Gasbrennwertkessel: 12.000 - 20.000 €",
      "Wärmepumpe komplett: 35.000 - 52.000 €",
      "Fußbodenheizung (pro m²): 100 - 150 €"
    ]
  },
  {
    trade: "Fliesenleger",
    icon: Layers,
    hourlyRate: "70 - 95 €/Std.",
    description: "Fliesenarbeiten in München (Stand 12/2025, netto zzgl. MwSt.)",
    examples: [
      "Bodenfliesen verlegen (pro m²): 60 - 90 €",
      "Wandfliesen verlegen (pro m²): 65 - 100 €",
      "Großformat-Fliesen (pro m²): 85 - 130 €",
      "Mosaikfliesen (pro m²): 100 - 150 €",
      "Alte Fliesen entfernen (pro m²): 25 - 45 €",
      "Abdichtung Bad (pro m²): 35 - 55 €"
    ]
  },
  {
    trade: "Schreiner & Tischler",
    icon: Wrench,
    hourlyRate: "75 - 105 €/Std.",
    description: "Schreinerarbeiten in München (Stand 12/2025, netto zzgl. MwSt.)",
    examples: [
      "Zimmertür einbauen: 300 - 550 €",
      "Einbauschrank (pro lfm): 1.000 - 1.800 €",
      "Fenster austauschen: 650 - 1.000 €",
      "Parkett verlegen (pro m²): 130 - 200 €",
      "Treppe renovieren: 1.800 - 5.000 €",
      "Möbel nach Maß: ab 650 €"
    ]
  }
];

export default function FaqPreise() {
  // FAQPage Schema.org structured data for SEO
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer.replace(/\*\*/g, '')
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(faqSchema);
    
    // Remove existing schema if present
    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById('faq-schema');
      if (schemaScript) schemaScript.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoHead
        title="Sanierung München Preisliste 2024 | Badsanierung ab 8.000€"
        description="Sanierung München Preise: Badsanierung ab 8.000€, Komplettsanierung ab 800€/m², Küche ab 5.000€. Transparente Preisliste, alle FAQ beantwortet."
        keywords="Sanierung München Kosten, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Badsanierung München, Badsanierungen sofort, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, Komplettsanierung Preis München, Altbausanierung München, 089-Sanierer, 089 Sanierer"
        canonicalPath="/faq-preise"
        preloadImage={pricingHeroImage}
      />
      <SiteHeader />

      <GlobalHero content={faqHeroContent} />
      <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
        <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
          Stand: Februar 2026
        </p>
      </div>
      <Breadcrumb items={[{ label: "FAQ & Preise" }]} />

      <main id="main-content" className="flex-1">
        <section className="py-6 lg:py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold inline-flex items-center justify-center gap-1"><span className="text-accent">Preisübersicht</span> –
                <Euro className="w-6 h-6 text-primary" />
                Sanierungspreise München – Kostenübersicht
              </h2>
              <p className="text-muted-foreground mt-2">Faire Preise für Münchner Qualitätsarbeit – alle Preise sind Netto und können je nach Projekt variieren</p>
            </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-7xl mx-auto">
              {priceRanges.map((item) => (
                <Card key={item.service} className="overflow-hidden" data-testid={`card-price-${item.service.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.service}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary mb-4">{item.priceRange}</div>
                    <ul className="space-y-2">
                      {item.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mt-8 max-w-7xl mx-auto">
              <p className="text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Alle angegebenen Preise sind Durchschnittspreise für München und Umgebung und können von Angebot zu Angebot variieren. 
                Wir geben hierzu keine Garantie – jeder Handwerker und Handwerksbetrieb macht seine eigene Kalkulation. 
                Auf Wunsch übernehmen wir auch die <strong>Koordination, Bauleitung und Bauüberwachung</strong> gegen Aufpreis.
              </p>
            </div>

            <Card className="bg-primary/5 border-primary/20 mt-8 max-w-7xl mx-auto">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold mb-1">Ihr persönliches Festpreis-Angebot</h3>
                    <p className="text-sm text-muted-foreground">Kostenlose Beratung vor Ort – ohne Überraschungen am Ende</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Link href="/termin" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full sm:w-auto min-h-12 bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500 text-xs sm:text-sm" data-testid="button-cta-booking">
                        <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                        24 Std. Online Termin
                      </Button>
                    </Link>
                    <Link href="/anfrage" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full sm:w-auto min-h-12 text-xs sm:text-sm" data-testid="button-cta-angebot">
                        Jetzt Angebot anfordern
                        <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-6 lg:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Handshake className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold"><span className="text-accent">Handwerker Stundenlohn München</span> –<br />Preise für Maler, Elektriker & Sanitär</h2>
                <p className="text-muted-foreground">Geprüfte Handwerker aus München – faire Stundensätze</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {tradePrices.map((item) => (
                <Card key={item.trade} className="overflow-hidden" data-testid={`card-trade-price-${item.trade.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.trade}</CardTitle>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-green-600 mb-4">
                      Stundensatz: {item.hourlyRate}
                    </div>
                    <ul className="space-y-2">
                      {item.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Die angegebenen Stundensätze und Preise sind Durchschnittswerte für München und können variieren. 
                Jeder Handwerksbetrieb erstellt seine eigene Kalkulation. Auf Wunsch übernehmen wir auch die <strong>Koordination, Bauleitung und Bauüberwachung</strong> gegen Aufpreis.
              </p>
            </div>

            <Card className="bg-green-600/10 border-green-600/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold mb-1">Geprüfte Münchner Handwerker – kostenlos vermittelt</h3>
                    <p className="text-sm text-muted-foreground">Kein langes Suchen: Wir finden den passenden Handwerker für Sie</p>
                  </div>
                  <Link href="/gewerke" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto min-h-12 bg-green-600 hover:bg-green-700 text-xs sm:text-sm" data-testid="button-cta-gewerke">
                      Jetzt Handwerker finden
                      <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">FAQ <span className="text-accent">Sanierung München</span> –<br />Häufige Fragen & Antworten</h2>
                <p className="text-muted-foreground">Das wollen Münchner über Sanierung wissen</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background rounded-lg border px-4"
                  data-testid={`accordion-faq-${index}`}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium" itemProp="name">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-muted-foreground pb-4"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <p dangerouslySetInnerHTML={{ 
                        __html: item.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }} />
                      {item.link && (
                        <Link href={item.link}>
                          <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary">
                            Mehr erfahren <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center border border-primary/20">
              <h3 className="text-xl font-bold mb-2">Genug recherchiert. Zeit zu handeln.</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Sie haben die Fragen gelesen - wir haben die Antworten UND die Lösung für Ihr Sanierungsproblem. 
                <strong className="text-foreground"> Lassen Sie uns reden.</strong>
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Link href="/anfrage" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto min-h-12 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm" data-testid="button-booking-faq">
                    <Handshake className="w-4 h-4 mr-2 flex-shrink-0" />
                    Jetzt Problem lösen lassen
                  </Button>
                </Link>
                <a href="tel:+498944438872" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto min-h-12 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm" data-testid="button-call-faq">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    Sofort anrufen
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Kostenlos. Unverbindlich. Antwort in 24 Stunden garantiert.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}

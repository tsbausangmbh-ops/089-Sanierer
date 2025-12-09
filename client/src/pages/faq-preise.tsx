import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";
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
  Handshake
} from "lucide-react";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

const faqItems = [
  {
    question: "Wie lange dauert eine Komplettsanierung?",
    answer: "Die Dauer einer Komplettsanierung hängt von der Größe und dem Zustand der Immobilie ab. Eine Wohnung (60-80 m²) dauert in der Regel 6-10 Wochen, ein Einfamilienhaus 3-6 Monate. Wir erstellen Ihnen einen detaillierten Zeitplan vor Projektbeginn."
  },
  {
    question: "Was kostet eine Badsanierung in München?",
    answer: "Eine Badsanierung in München kostet je nach Größe und Ausstattung zwischen 8.000 € und 25.000 €. Ein Standard-Bad (ca. 6 m²) liegt bei etwa 12.000-15.000 €, ein Premium-Bad mit hochwertiger Ausstattung bei 20.000-30.000 €. Wir erstellen Ihnen ein individuelles Angebot."
  },
  {
    question: "Übernehmen Sie auch die Koordination aller Gewerke?",
    answer: "Ja, als Generalunternehmer koordinieren wir alle Handwerker und Gewerke für Sie. Sie haben einen einzigen Ansprechpartner und müssen sich um nichts kümmern. Wir übernehmen die komplette Projektleitung von der Planung bis zur Abnahme."
  },
  {
    question: "Welche Garantie erhalte ich auf die Arbeiten?",
    answer: "Wir gewähren 5 Jahre Gewährleistung auf alle ausgeführten Arbeiten. Dies geht über die gesetzliche Gewährleistung hinaus und gibt Ihnen zusätzliche Sicherheit. Bei Mängeln reagieren wir schnell und unkompliziert."
  },
  {
    question: "Kann ich während der Sanierung in der Wohnung bleiben?",
    answer: "Bei kleineren Sanierungen (z.B. Badsanierung) ist das oft möglich, jedoch mit Einschränkungen. Bei einer Komplettsanierung empfehlen wir, die Wohnung vorübergehend zu räumen. Wir beraten Sie individuell zu Ihren Möglichkeiten."
  },
  {
    question: "Wie läuft die Kostenplanung ab?",
    answer: "Nach einem kostenlosen Vor-Ort-Termin erstellen wir Ihnen ein detailliertes Angebot mit transparenter Kostenaufstellung. Sie erhalten einen Festpreis ohne versteckte Kosten. Änderungen während der Bauphase werden immer vorher mit Ihnen abgestimmt."
  },
  {
    question: "Arbeiten Sie auch am Wochenende?",
    answer: "Unsere regulären Arbeitszeiten sind Montag bis Freitag von 7:00 bis 17:00 Uhr. In Ausnahmefällen und nach Absprache können wir auch samstags arbeiten. Lärmintensive Arbeiten führen wir nur zu den gesetzlich erlaubten Zeiten durch."
  },
  {
    question: "Welche Fördermittel kann ich nutzen?",
    answer: "Für energetische Sanierungen gibt es attraktive KfW-Förderungen und BAFA-Zuschüsse. Wir beraten Sie zu den Fördermöglichkeiten und unterstützen Sie bei der Antragstellung. So können Sie bis zu 45% der Kosten sparen."
  },
  {
    question: "Wie schnell können Sie mit der Sanierung beginnen?",
    answer: "Nach Auftragserteilung können wir in der Regel innerhalb von 2-4 Wochen mit den Arbeiten beginnen. Bei dringenden Projekten versuchen wir, schnellere Lösungen zu finden. Die Materialbestellung und Planung benötigt jedoch etwas Vorlaufzeit."
  },
  {
    question: "Vermitteln Sie auch einzelne Handwerker?",
    answer: "Ja, über unseren Handwerker-Vermittlungsservice vermitteln wir auch einzelne Gewerke wie Maler, Elektriker, Fliesenleger oder Sanitärinstallateure. Alle Partner sind geprüfte Meisterbetriebe aus München und Umgebung."
  },
  {
    question: "Brauche ich eine Baugenehmigung für meine Sanierung?",
    answer: "Für reine Innenraumsanierungen ist in der Regel keine Baugenehmigung erforderlich. Bei tragenden Wänden, Fassadenänderungen oder Dachausbauten kann jedoch eine Genehmigung nötig sein. Wir klären dies im Vorfeld für Sie ab."
  },
  {
    question: "Wie hoch ist die Anzahlung?",
    answer: "Wir arbeiten mit einer fairen Zahlungsregelung: 30% bei Auftragserteilung, 40% bei Baubeginn und 30% nach Fertigstellung und Abnahme. So haben Sie Sicherheit und wir können Material vorfinanzieren."
  },
  {
    question: "Was passiert bei unvorhergesehenen Problemen während der Sanierung?",
    answer: "Unvorhergesehene Probleme wie versteckte Wasserschäden oder marode Leitungen können vorkommen. Wir informieren Sie sofort, dokumentieren alles und besprechen die Lösung mit Ihnen, bevor zusätzliche Kosten entstehen."
  },
  {
    question: "Sind Ihre Handwerker versichert?",
    answer: "Ja, alle unsere Handwerker und Partnerunternehmen sind vollständig versichert. Wir verfügen über eine Betriebshaftpflichtversicherung mit einer Deckungssumme von 5 Millionen Euro."
  },
  {
    question: "Kann ich eigene Materialien beistellen?",
    answer: "Grundsätzlich ja, allerdings übernehmen wir dann keine Gewährleistung für diese Materialien. Wir empfehlen, Materialien über uns zu beziehen, da wir Handwerkerrabatte weitergeben und die Qualität garantieren können."
  },
  {
    question: "Wie läuft die Kommunikation während der Bauphase?",
    answer: "Sie erhalten einen festen Ansprechpartner, der Sie regelmäßig über den Fortschritt informiert. Wir sind telefonisch und per WhatsApp erreichbar. Auf Wunsch erhalten Sie wöchentliche Foto-Updates."
  },
  {
    question: "Entsorgen Sie auch den Bauschutt?",
    answer: "Ja, die fachgerechte Entsorgung von Bauschutt und Altmaterialien ist in unseren Angeboten enthalten. Wir stellen Container und kümmern uns um die umweltgerechte Entsorgung."
  },
  {
    question: "Arbeiten Sie auch in meinem Stadtteil?",
    answer: "Wir arbeiten in ganz München und dem Münchner Umland: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen, Giesing sowie Dachau, Starnberg, Freising, Germering und weitere Gemeinden."
  },
  {
    question: "Wie gehen Sie mit Altbauten um?",
    answer: "Altbauten erfordern besondere Sorgfalt. Wir haben langjährige Erfahrung mit Münchner Altbauten und kennen die typischen Herausforderungen wie Holzbalkendecken, alte Leitungen und Denkmalschutzauflagen."
  },
  {
    question: "Bieten Sie auch barrierefreie Sanierungen an?",
    answer: "Ja, wir sind spezialisiert auf barrierefreie Umbauten nach DIN 18040. Dazu gehören bodengleiche Duschen, verbreiterte Türen, Haltegriffe und rutschfeste Böden. Für solche Maßnahmen gibt es oft KfW-Förderungen."
  },
  {
    question: "Können Sie auch nur Teilsanierungen durchführen?",
    answer: "Selbstverständlich. Ob Badsanierung, Küchenerneuerung oder nur neue Böden – wir führen auch Teilsanierungen durch. Die Mindestauftragssumme liegt bei 5.000 Euro."
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
    priceRange: "920 - 1.725 €/m²",
    description: "Je nach Zustand und Ausstattungswünschen",
    examples: [
      "Wohnung 60 m²: ab 55.000 €",
      "Wohnung 100 m²: ab 92.000 €",
      "Haus 150 m²: ab 138.000 €"
    ]
  },
  {
    service: "Badsanierung",
    icon: Bath,
    priceRange: "9.200 - 34.500 €",
    description: "Abhängig von Größe und Ausstattung",
    examples: [
      "Gäste-WC: ab 4.600 €",
      "Standard-Bad 6 m²: ab 13.800 €",
      "Premium-Bad 10 m²: ab 28.750 €"
    ]
  },
  {
    service: "Küchensanierung",
    icon: UtensilsCrossed,
    priceRange: "5.750 - 28.750 €",
    description: "Ohne Kücheneinrichtung",
    examples: [
      "Elektrik & Wasser: ab 3.450 €",
      "Fliesen & Boden: ab 2.875 €",
      "Komplett inkl. Malerarbeiten: ab 9.200 €"
    ]
  },
  {
    service: "Bodensanierung",
    icon: Layers,
    priceRange: "46 - 138 €/m²",
    description: "Material und Verlegung",
    examples: [
      "Laminat verlegen: ab 46 €/m²",
      "Parkett verlegen: ab 92 €/m²",
      "Fliesen verlegen: ab 69 €/m²"
    ]
  },
  {
    service: "Elektrosanierung",
    icon: Zap,
    priceRange: "92 - 172 €/m²",
    description: "Kompletterneuerung der Elektrik",
    examples: [
      "Steckdose setzen: ab 92 €",
      "Sicherungskasten erneuern: ab 1.725 €",
      "Wohnung komplett: ab 6.900 €"
    ]
  },
  {
    service: "Heizungssanierung",
    icon: Flame,
    priceRange: "9.200 - 40.250 €",
    description: "Neue Heizungsanlage inkl. Einbau",
    examples: [
      "Gasbrennwert: ab 9.200 €",
      "Wärmepumpe: ab 17.250 €",
      "Mit Fußbodenheizung: ab 28.750 €"
    ]
  }
];

const tradePrices = [
  {
    trade: "Maler & Lackierer",
    icon: PaintBucket,
    hourlyRate: "63 - 86 €/Std.",
    description: "Malerarbeiten in München",
    examples: [
      "Wände streichen (pro m²): 14 - 21 €",
      "Decken streichen (pro m²): 16 - 23 €",
      "Türen/Zargen lackieren (pro Stück): 92 - 172 €",
      "Tapezieren (pro m²): 17 - 29 €",
      "Fassade streichen (pro m²): 29 - 52 €",
      "Schimmelbeseitigung: ab 402 €"
    ]
  },
  {
    trade: "Elektriker",
    icon: Plug,
    hourlyRate: "75 - 98 €/Std.",
    description: "Elektroinstallation in München",
    examples: [
      "Steckdose setzen: 92 - 138 €",
      "Lichtschalter installieren: 69 - 115 €",
      "Lampe anschließen: 52 - 92 €",
      "Sicherungskasten erneuern: 1.725 - 3.450 €",
      "E-Herd Anschluss: 138 - 230 €",
      "Elektrocheck (E-Check): 172 - 287 €"
    ]
  },
  {
    trade: "Sanitär & Klempner",
    icon: Droplets,
    hourlyRate: "80 - 103 €/Std.",
    description: "Sanitärinstallation in München",
    examples: [
      "Wasserhahn montieren: 92 - 172 €",
      "WC austauschen: 287 - 517 €",
      "Waschbecken montieren: 172 - 345 €",
      "Duschkabine einbauen: 460 - 920 €",
      "Rohrbruch reparieren: 230 - 575 €",
      "Abfluss verstopft: 92 - 207 €"
    ]
  },
  {
    trade: "Heizungsbauer",
    icon: Thermometer,
    hourlyRate: "80 - 109 €/Std.",
    description: "Heizungsinstallation in München",
    examples: [
      "Heizkörper austauschen: 287 - 575 €",
      "Thermostat wechseln: 92 - 172 €",
      "Heizung entlüften: 92 - 138 €",
      "Gasbrennwertkessel: 9.200 - 13.800 €",
      "Wärmepumpe komplett: 17.250 - 28.750 €",
      "Fußbodenheizung (pro m²): 92 - 138 €"
    ]
  },
  {
    trade: "Fliesenleger",
    icon: Layers,
    hourlyRate: "63 - 86 €/Std.",
    description: "Fliesenarbeiten in München",
    examples: [
      "Bodenfliesen verlegen (pro m²): 52 - 80 €",
      "Wandfliesen verlegen (pro m²): 57 - 92 €",
      "Großformat-Fliesen (pro m²): 75 - 115 €",
      "Mosaikfliesen (pro m²): 92 - 138 €",
      "Alte Fliesen entfernen (pro m²): 23 - 40 €",
      "Abdichtung Bad (pro m²): 29 - 46 €"
    ]
  },
  {
    trade: "Schreiner & Tischler",
    icon: Wrench,
    hourlyRate: "69 - 98 €/Std.",
    description: "Schreinerarbeiten in München",
    examples: [
      "Zimmertür einbauen: 287 - 517 €",
      "Einbauschrank (pro lfm): 920 - 1.725 €",
      "Fenster austauschen: 460 - 920 €",
      "Parkett verlegen (pro m²): 69 - 115 €",
      "Treppe renovieren: 1.725 - 4.600 €",
      "Möbel nach Maß: ab 575 €"
    ]
  }
];

export default function FaqPreise() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-base leading-tight">KSHW München</span>
                  <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
                </div>
              </div>
            </Link>
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
              <Link href="/gewerke">
                <Button size="sm" className="text-sm bg-orange-500 hover:bg-orange-600 text-white border-orange-500">
                  Handwerkervermittlung
                </Button>
              </Link>
            </div>
            <a href="tel:+4915212274043" className="hidden sm:flex">
              <Button className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                <Phone className="w-4 h-4 mr-2" />
                0152 122 740 43
              </Button>
            </a>
            <Link href="/anfrage">
              <Button data-testid="button-header-cta">
                Kostenlose Anfrage
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">Sanierung München: Was kostet es? Ihre wichtigsten Fragen beantwortet</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparente Preise, ehrliche Antworten – so wissen Sie vorab, was Ihre Sanierung in München kostet.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Euro className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mit diesen Kosten können Sie rechnen</h2>
                <p className="text-muted-foreground">Faire Preise für Münchner Qualitätsarbeit</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

            <div className="bg-muted/50 rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Alle angegebenen Preise sind Durchschnittspreise für München und Umgebung und können von Angebot zu Angebot variieren. 
                Wir geben hierzu keine Garantie – jeder Handwerker und Handwerksbetrieb macht seine eigene Kalkulation. 
                Auf Wunsch übernehmen wir auch die <strong>Koordination, Bauleitung und Bauüberwachung</strong> gegen Aufpreis.
              </p>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold mb-1">Ihr persönliches Festpreis-Angebot</h3>
                    <p className="text-sm text-muted-foreground">Kostenlose Beratung vor Ort – ohne Überraschungen am Ende</p>
                  </div>
                  <Link href="/anfrage">
                    <Button size="lg" data-testid="button-cta-angebot">
                      Jetzt Angebot anfordern
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Handshake className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Nur einen Handwerker gesucht? So viel kostet es</h2>
                <p className="text-muted-foreground">Geprüfte Meisterbetriebe aus München – faire Stundensätze</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

            <div className="bg-muted/50 rounded-lg p-4 mb-8">
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
                    <p className="text-sm text-muted-foreground">Kein langes Suchen: Wir finden den passenden Meisterbetrieb für Sie</p>
                  </div>
                  <Link href="/gewerke">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-cta-gewerke">
                      Jetzt Handwerker finden
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ihre Fragen – ehrliche Antworten aus der Praxis</h2>
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
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Haben Sie weitere Fragen?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+4915212274043">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white border-green-500" data-testid="button-call-faq">
                    <Phone className="w-4 h-4 mr-2" />
                    Anrufen
                  </Button>
                </a>
                <Link href="/kontakt">
                  <Button size="lg" data-testid="button-contact-faq">
                    Kontakt aufnehmen
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-12 pb-6 bg-[hsl(220,85%,10%)] text-white">
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

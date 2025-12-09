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
  }
];

const priceRanges = [
  {
    service: "Komplettsanierung",
    icon: HomeIcon,
    priceRange: "800 - 1.500 €/m²",
    description: "Je nach Zustand und Ausstattungswünschen",
    examples: [
      "Wohnung 60 m²: ab 48.000 €",
      "Wohnung 100 m²: ab 80.000 €",
      "Haus 150 m²: ab 120.000 €"
    ]
  },
  {
    service: "Badsanierung",
    icon: Bath,
    priceRange: "8.000 - 30.000 €",
    description: "Abhängig von Größe und Ausstattung",
    examples: [
      "Gäste-WC: ab 4.000 €",
      "Standard-Bad 6 m²: ab 12.000 €",
      "Premium-Bad 10 m²: ab 25.000 €"
    ]
  },
  {
    service: "Küchensanierung",
    icon: UtensilsCrossed,
    priceRange: "5.000 - 25.000 €",
    description: "Ohne Kücheneinrichtung",
    examples: [
      "Elektrik & Wasser: ab 3.000 €",
      "Fliesen & Boden: ab 2.500 €",
      "Komplett inkl. Malerarbeiten: ab 8.000 €"
    ]
  },
  {
    service: "Bodensanierung",
    icon: Layers,
    priceRange: "40 - 120 €/m²",
    description: "Material und Verlegung",
    examples: [
      "Laminat verlegen: ab 40 €/m²",
      "Parkett verlegen: ab 80 €/m²",
      "Fliesen verlegen: ab 60 €/m²"
    ]
  },
  {
    service: "Elektrosanierung",
    icon: Zap,
    priceRange: "80 - 150 €/m²",
    description: "Kompletterneuerung der Elektrik",
    examples: [
      "Steckdose setzen: ab 80 €",
      "Sicherungskasten erneuern: ab 1.500 €",
      "Wohnung komplett: ab 6.000 €"
    ]
  },
  {
    service: "Heizungssanierung",
    icon: Flame,
    priceRange: "8.000 - 35.000 €",
    description: "Neue Heizungsanlage inkl. Einbau",
    examples: [
      "Gasbrennwert: ab 8.000 €",
      "Wärmepumpe: ab 15.000 €",
      "Mit Fußbodenheizung: ab 25.000 €"
    ]
  }
];

const tradePrices = [
  {
    trade: "Maler & Lackierer",
    icon: PaintBucket,
    hourlyRate: "55 - 75 €/Std.",
    description: "Malerarbeiten in München",
    examples: [
      "Wände streichen (pro m²): 12 - 18 €",
      "Decken streichen (pro m²): 14 - 20 €",
      "Türen/Zargen lackieren (pro Stück): 80 - 150 €",
      "Tapezieren (pro m²): 15 - 25 €",
      "Fassade streichen (pro m²): 25 - 45 €",
      "Schimmelbeseitigung: ab 350 €"
    ]
  },
  {
    trade: "Elektriker",
    icon: Plug,
    hourlyRate: "65 - 85 €/Std.",
    description: "Elektroinstallation in München",
    examples: [
      "Steckdose setzen: 80 - 120 €",
      "Lichtschalter installieren: 60 - 100 €",
      "Lampe anschließen: 45 - 80 €",
      "Sicherungskasten erneuern: 1.500 - 3.000 €",
      "E-Herd Anschluss: 120 - 200 €",
      "Elektrocheck (E-Check): 150 - 250 €"
    ]
  },
  {
    trade: "Sanitär & Klempner",
    icon: Droplets,
    hourlyRate: "70 - 90 €/Std.",
    description: "Sanitärinstallation in München",
    examples: [
      "Wasserhahn montieren: 80 - 150 €",
      "WC austauschen: 250 - 450 €",
      "Waschbecken montieren: 150 - 300 €",
      "Duschkabine einbauen: 400 - 800 €",
      "Rohrbruch reparieren: 200 - 500 €",
      "Abfluss verstopft: 80 - 180 €"
    ]
  },
  {
    trade: "Heizungsbauer",
    icon: Thermometer,
    hourlyRate: "70 - 95 €/Std.",
    description: "Heizungsinstallation in München",
    examples: [
      "Heizkörper austauschen: 250 - 500 €",
      "Thermostat wechseln: 80 - 150 €",
      "Heizung entlüften: 80 - 120 €",
      "Gasbrennwertkessel: 8.000 - 12.000 €",
      "Wärmepumpe komplett: 15.000 - 25.000 €",
      "Fußbodenheizung (pro m²): 80 - 120 €"
    ]
  },
  {
    trade: "Fliesenleger",
    icon: Layers,
    hourlyRate: "55 - 75 €/Std.",
    description: "Fliesenarbeiten in München",
    examples: [
      "Bodenfliesen verlegen (pro m²): 45 - 70 €",
      "Wandfliesen verlegen (pro m²): 50 - 80 €",
      "Großformat-Fliesen (pro m²): 65 - 100 €",
      "Mosaikfliesen (pro m²): 80 - 120 €",
      "Alte Fliesen entfernen (pro m²): 20 - 35 €",
      "Abdichtung Bad (pro m²): 25 - 40 €"
    ]
  },
  {
    trade: "Schreiner & Tischler",
    icon: Wrench,
    hourlyRate: "60 - 85 €/Std.",
    description: "Schreinerarbeiten in München",
    examples: [
      "Zimmertür einbauen: 250 - 450 €",
      "Einbauschrank (pro lfm): 800 - 1.500 €",
      "Fenster austauschen: 400 - 800 €",
      "Parkett verlegen (pro m²): 60 - 100 €",
      "Treppe renovieren: 1.500 - 4.000 €",
      "Möbel nach Maß: ab 500 €"
    ]
  }
];

export default function FaqPreise() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-[hsl(220,85%,18%)] text-white shadow-lg">
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
            </div>
            <a href="tel:+4915212274043" className="hidden sm:flex">
              <Button className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                <Phone className="w-4 h-4 mr-2" />
                0152 122 740 43
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">FAQ & Preise</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Häufig gestellte Fragen und transparente Preisübersicht für Ihre Sanierung in München
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
                <h2 className="text-2xl font-bold">Preisübersicht</h2>
                <p className="text-muted-foreground">Orientierungspreise für Ihre Sanierung</p>
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

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold mb-1">Individuelles Angebot gewünscht?</h3>
                    <p className="text-sm text-muted-foreground">Kostenlose Vor-Ort-Beratung und Festpreisangebot</p>
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
                <h2 className="text-2xl font-bold">Handwerker-Vermittlung München</h2>
                <p className="text-muted-foreground">Preise für einzelne Gewerke (Münchner Niveau)</p>
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

            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold mb-1">Handwerker gesucht?</h3>
                    <p className="text-sm text-muted-foreground">Kostenlose Vermittlung an geprüfte Meisterbetriebe</p>
                  </div>
                  <Link href="/gewerke">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600" data-testid="button-cta-gewerke">
                      Handwerker anfragen
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
                <h2 className="text-2xl font-bold">Häufig gestellte Fragen</h2>
                <p className="text-muted-foreground">Antworten auf Ihre wichtigsten Fragen</p>
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
                  <Button variant="outline" size="lg" data-testid="button-call-faq">
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

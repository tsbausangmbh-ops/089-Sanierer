import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead, generateFaqSchema } from "@/components/seo-head";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import houseBeforeAfter from "@assets/generated_images/house_old_vs_new_clear_split.png";
import bathroomImg from "@assets/generated_images/modern_bathroom_renovation.png";
import kitchenImg from "@assets/generated_images/modern_kitchen_renovation.png";
import floorImg from "@assets/generated_images/floor_renovation_parquet.png";
import electricImg from "@assets/generated_images/electrical_renovation_work.png";
import heatingImg from "@assets/generated_images/heating_system_installation.png";
import completeImg from "@assets/generated_images/complete_home_renovation.png";

import { 
  Bath, 
  UtensilsCrossed, 
  Layers, 
  Zap, 
  Flame, 
  Home as HomeIcon,
  Shield,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Calculator,
  MessageSquare,
  Hammer,
  Euro,
  Handshake,
  Users,
  ArrowRight,
  AlertTriangle,
  XCircle,
  Award,
  ThumbsUp,
  Calendar,
  FileCheck,
  HeartHandshake,
  Building,
  Wrench
} from "lucide-react";

const allServices = [
  { 
    id: "komplettsanierung", 
    title: "Komplettsanierung", 
    icon: HomeIcon, 
    image: completeImg,
    description: "Rundum-Sanierung aus einer Hand",
    price: "ab 920€/m²",
    features: ["Alle Gewerke koordiniert", "Festpreisgarantie", "Ein Ansprechpartner"]
  },
  { 
    id: "badsanierung", 
    title: "Badsanierung", 
    icon: Bath, 
    image: bathroomImg,
    description: "Ihr Traumbad in 2-3 Wochen",
    price: "ab 9.200€",
    features: ["Barrierefreie Optionen", "Moderne Designs", "Sanitär & Fliesen"]
  },
  { 
    id: "kuechensanierung", 
    title: "Küchensanierung", 
    icon: UtensilsCrossed, 
    image: kitchenImg,
    description: "Bauarbeiten für Ihre Traumküche",
    price: "ab 6.500€",
    features: ["Fliesen & Elektrik", "Wasser & Abfluss", "Wanddurchbrüche"]
  },
  { 
    id: "bodensanierung", 
    title: "Bodensanierung", 
    icon: Layers, 
    image: floorImg,
    description: "Parkett, Fliesen oder Vinyl",
    price: "ab 65€/m²",
    features: ["Fachgerechte Verlegung", "Untergrundvorbereitung", "Fußbodenheizung"]
  },
  { 
    id: "elektrosanierung", 
    title: "Elektrosanierung", 
    icon: Zap, 
    image: electricImg,
    description: "VDE-konforme Installation",
    price: "ab 85€/m²",
    features: ["Neue Leitungen", "Smart-Home ready", "Sicherheitstechnik"]
  },
  { 
    id: "heizungssanierung", 
    title: "Heizungssanierung", 
    icon: Flame, 
    image: heatingImg,
    description: "Bis zu 40% Heizkosten sparen",
    price: "ab 12.000€",
    features: ["Wärmepumpen", "Fußbodenheizung", "Fördermittelberatung"]
  },
];

const painPoints = [
  { 
    icon: Users, 
    title: "Handwerker sind unauffindbar",
    description: "Wochenlange Suche, keine Rückmeldungen, endlose Absagen. Jeder kennt das Gefühl der Frustration."
  },
  { 
    icon: Euro, 
    title: "Kostenexplosion befürchtet",
    description: "Angebote, die plötzlich doppelt so teuer werden. Nachforderungen ohne Ende. Die Angst vor dem Ruin."
  },
  { 
    icon: Clock, 
    title: "Chaos bei der Koordination",
    description: "Elektriker wartet auf den Fliesenleger, der Maler kann nicht anfangen. Wer behält den Überblick?"
  },
  { 
    icon: AlertTriangle, 
    title: "Qualität ist Glückssache",
    description: "Pfusch am Bau, mangelnde Sorgfalt, fehlende Gewährleistung. Und Sie bleiben auf den Problemen sitzen."
  },
];

const solutions = [
  {
    icon: Handshake,
    title: "Ein Ansprechpartner für alles",
    description: "Ihr persönlicher Projektleiter koordiniert alle Gewerke. Sie haben nur einen Anruf zu machen, wenn Fragen auftauchen."
  },
  {
    icon: FileCheck,
    title: "Festpreisgarantie",
    description: "Der Preis, den wir Ihnen nennen, ist der Preis, den Sie zahlen. Keine versteckten Kosten, keine bösen Überraschungen am Ende."
  },
  {
    icon: Calendar,
    title: "Termingarantie",
    description: "Wir nennen Ihnen einen verbindlichen Fertigstellungstermin und halten ihn. Planungssicherheit für Ihr Leben."
  },
  {
    icon: Shield,
    title: "5 Jahre Gewährleistung",
    description: "Alle Arbeiten mit voller Gewährleistung. Sollte etwas nicht stimmen, sind wir sofort für Sie da."
  },
];

const stats = [
  { value: "268+", label: "Abgeschlossene Projekte", icon: Building },
  { value: "20+", label: "Jahre Erfahrung", icon: Award },
  { value: "98%", label: "Weiterempfehlungsrate", icon: ThumbsUp },
  { value: "40+", label: "Fachbetriebe im Netzwerk", icon: Wrench },
];

const processSteps = [
  {
    number: 1,
    title: "Kostenlose Anfrage",
    description: "Füllen Sie unser kurzes Formular aus. In nur 2 Minuten erfahren wir, was Sie brauchen. Keine Verpflichtungen, kein Spam.",
    icon: Calculator,
    duration: "2 Minuten"
  },
  {
    number: 2,
    title: "Persönliche Beratung",
    description: "Innerhalb von 24 Stunden meldet sich Ihr persönlicher Projektleiter. Er besucht Sie vor Ort und bespricht alle Details.",
    icon: MessageSquare,
    duration: "Innerhalb 24h"
  },
  {
    number: 3,
    title: "Festpreis-Angebot",
    description: "Sie erhalten ein detailliertes Angebot mit garantiertem Festpreis und verbindlichem Fertigstellungstermin.",
    icon: FileCheck,
    duration: "Innerhalb 48h"
  },
  {
    number: 4,
    title: "Sorgenfrei sanieren",
    description: "Wir koordinieren alle Handwerker, Sie lehnen sich zurück. Ein Ansprechpartner für alle Fragen.",
    icon: Hammer,
    duration: "Nach Vereinbarung"
  },
];

const testimonials = [
  {
    name: "Familie Huber",
    location: "München-Schwabing",
    project: "Komplettsanierung 85m² Altbauwohnung",
    text: "Wir haben jahrelang gezögert, weil wir Angst vor dem Chaos hatten. Mit KSHW war alles durchorganisiert. Der Projektleiter hat sich um alles gekümmert, wir mussten uns um nichts sorgen.",
    rating: 5
  },
  {
    name: "Dr. Thomas Meier",
    location: "München-Bogenhausen",
    project: "Badsanierung + Gäste-WC",
    text: "Professionell, pünktlich, sauber. Das Festpreis-Angebot stimmte am Ende exakt. So stelle ich mir deutsche Handwerksarbeit vor. Würde ich jederzeit wieder machen.",
    rating: 5
  },
  {
    name: "Immobilienverwaltung Schmidt",
    location: "München-Sendling",
    project: "3 Wohnungen saniert",
    text: "Als Hausverwaltung haben wir schon viel erlebt. KSHW ist unser zuverlässiger Partner für alle Sanierungsprojekte. Die Kommunikation ist vorbildlich.",
    rating: 5
  },
];

const faqs = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Aus unserer Erfahrung mit 268+ Projekten: Eine Komplettsanierung in München kostet zwischen 920€ und 2.300€ pro Quadratmeter, abhängig von Ausstattungsniveau und Umfang. Eine 80m² Wohnung liegt damit zwischen 73.600€ und 184.000€. Wir erstellen Ihnen eine kostenlose, unverbindliche Kostenschätzung innerhalb von 24 Stunden."
  },
  {
    question: "Was kostet eine Badsanierung in München?",
    answer: "Eine Badsanierung in München beginnt bei etwa 9.200€ für ein kleines Bad (4m²) mit Standardausstattung. Ein mittelgroßes Bad (6-8m²) mit gehobener Ausstattung liegt bei 15.000-25.000€. Luxusbäder mit Wellness-Elementen können 35.000€ und mehr kosten. Der genaue Preis hängt von Ihren Wünschen ab."
  },
  {
    question: "Wie lange dauert eine Sanierung?",
    answer: "Die Dauer hängt vom Umfang ab: Badsanierung 2-3 Wochen, Küchenbauarbeiten 1-2 Wochen, Komplettsanierung 6-12 Wochen je nach Größe. Dank unseres eingespielten Handwerkernetzwerks arbeiten wir schneller als Einzelhandwerker. Wir nennen Ihnen einen verbindlichen Endtermin."
  },
  {
    question: "Was bedeutet Festpreisgarantie?",
    answer: "Festpreisgarantie bedeutet: Der Preis in unserem Angebot ist der Preis, den Sie am Ende zahlen. Keine versteckten Kosten, keine Nachforderungen, keine bösen Überraschungen. Ausgenommen sind nur Änderungswünsche Ihrerseits oder unvorhersehbare Bausubstanzprobleme, die wir vorher dokumentieren."
  },
  {
    question: "Sind Ihre Handwerker qualifiziert?",
    answer: "Ja, alle unsere Partnerfirmen sind geprüfte Fachbetriebe aus München und Umgebung. Meisterpflichtige Gewerke werden ausschließlich von qualifizierten Meisterbetrieben ausgeführt. Wir arbeiten nur mit Partnern zusammen, die unsere strengen Qualitätsstandards erfüllen."
  },
  {
    question: "In welchen Stadtteilen sind Sie tätig?",
    answer: "Wir sind in ganz München und Umgebung tätig: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen, Neuperlach, Solln, Hadern und alle anderen Stadtteile. Im Umland: Dachau, Starnberg, Germering, Fürstenfeldbruck, Freising, Garching und weitere Gemeinden."
  },
  {
    question: "Gibt es Fördermittel für Sanierungen?",
    answer: "Ja! Für energetische Sanierungen gibt es attraktive Fördermittel: KfW-Förderung bis zu 45.000€ pro Wohneinheit, BAFA-Zuschüsse für Heizungsaustausch, Münchner Förderprogramm Klimaneutrale Gebäude. Wir beraten Sie kostenlos zu allen Fördermöglichkeiten."
  },
  {
    question: "Kann ich während der Sanierung wohnen bleiben?",
    answer: "Das hängt vom Umfang ab. Bei einer Badsanierung können Sie meist wohnen bleiben - wir richten ein Provisorium ein. Bei Komplettsanierungen empfehlen wir oft einen temporären Auszug, um die Arbeiten schneller und effizienter durchzuführen. Wir beraten Sie individuell."
  },
];

const urgencyOptions = [
  { id: "sofort", label: "So schnell wie möglich", sublabel: "Innerhalb der nächsten 4 Wochen" },
  { id: "bald", label: "In den nächsten 1-3 Monaten", sublabel: "Gute Planungszeit" },
  { id: "planung", label: "Ich plane erst mal", sublabel: "Mehr als 3 Monate" },
];

function MiniLeadFunnel() {
  const [step, setStep] = useState(1);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [urgency, setUrgency] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!postalCode || !city || !selectedService || !urgency || !firstName || !lastName || !contact || !address) return;
    
    const isEmail = contact.includes("@");
    const params = new URLSearchParams({
      postalCode,
      city,
      address,
      service: selectedService,
      urgency,
      name: `${firstName} ${lastName}`,
      ...(isEmail ? { email: contact } : { phone: contact }),
    });
    
    toast({
      title: "Fast geschafft!",
      description: "Bitte vervollständigen Sie Ihre Angaben.",
    });
    
    navigate(`/anfrage?${params.toString()}`);
  };

  const progressPercent = (step / 3) * 100;

  return (
    <section id="anfrage-form" className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Kostenlos & Unverbindlich
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Jetzt Ihre kostenlose Beratung sichern
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur 3 Schritten zur persönlichen Beratung. Innerhalb von 24 Stunden meldet sich Ihr Ansprechpartner.
          </p>
        </div>

        <Card className="p-6 lg:p-10 shadow-lg">
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span className="font-medium">Schritt {step} von 3</span>
              <span>{Math.round(progressPercent)}% abgeschlossen</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wo befindet sich Ihr Objekt?
                </h3>
                <p className="text-muted-foreground">
                  Ihr Standort hilft uns, die richtigen Handwerker zu finden
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postal-code" className="text-sm font-medium">Postleitzahl</Label>
                  <Input
                    id="postal-code"
                    placeholder="z.B. 80331"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    maxLength={5}
                    className="mt-1"
                    data-testid="input-mini-postal-code"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">Stadt</Label>
                  <Input
                    id="city"
                    placeholder="z.B. München"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1"
                    data-testid="input-mini-city"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Welche Sanierung planen Sie?
                </h3>
                <p className="text-muted-foreground">
                  Wählen Sie den passenden Service
                </p>
              </div>
              <RadioGroup value={selectedService} onValueChange={setSelectedService} className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {allServices.map((service) => (
                  <Label
                    key={service.id}
                    htmlFor={`service-${service.id}`}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedService === service.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`radio-service-${service.id}`}
                  >
                    <RadioGroupItem value={service.id} id={`service-${service.id}`} className="sr-only" />
                    <service.icon className={`w-8 h-8 ${selectedService === service.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-medium text-center text-sm">{service.title}</span>
                  </Label>
                ))}
              </RadioGroup>
              
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedService || !postalCode || !city}
                className="w-full"
                size="lg"
                data-testid="button-funnel-step1"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wie dringend ist Ihr Projekt?
                </h3>
                <p className="text-muted-foreground">
                  Je früher Sie anfragen, desto schneller können wir Ihnen helfen
                </p>
              </div>
              <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-4">
                {urgencyOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={`urgency-${option.id}`}
                    className={`flex items-center gap-4 p-5 rounded-lg border cursor-pointer transition-all ${
                      urgency === option.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`radio-urgency-${option.id}`}
                  >
                    <RadioGroupItem value={option.id} id={`urgency-${option.id}`} />
                    <div>
                      <span className="font-semibold block">{option.label}</span>
                      <span className="text-sm text-muted-foreground">{option.sublabel}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              {urgency === "sofort" && (
                <div className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Gute Nachricht:</strong> Wir haben aktuell freie Kapazitäten und können zeitnah mit Ihrem Projekt starten.
                  </p>
                </div>
              )}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  size="lg"
                  data-testid="button-funnel-back2"
                >
                  Zurück
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!urgency}
                  className="flex-1"
                  size="lg"
                  data-testid="button-funnel-step2"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wie können wir Sie erreichen?
                </h3>
                <p className="text-muted-foreground">
                  In 24 Stunden meldet sich Ihr persönlicher Ansprechpartner
                </p>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="funnel-firstname" className="text-sm font-medium">Vorname</Label>
                    <Input
                      id="funnel-firstname"
                      placeholder="z.B. Thomas"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1"
                      data-testid="input-funnel-firstname"
                    />
                  </div>
                  <div>
                    <Label htmlFor="funnel-lastname" className="text-sm font-medium">Nachname</Label>
                    <Input
                      id="funnel-lastname"
                      placeholder="z.B. Müller"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1"
                      data-testid="input-funnel-lastname"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="funnel-contact" className="text-sm font-medium">Telefon oder E-Mail</Label>
                  <Input
                    id="funnel-contact"
                    placeholder="z.B. 0170 1234567 oder name@email.de"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1"
                    data-testid="input-funnel-contact"
                  />
                </div>
                <div>
                  <Label htmlFor="funnel-address" className="text-sm font-medium">Adresse des Objekts</Label>
                  <Input
                    id="funnel-address"
                    placeholder="z.B. Marienplatz 1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                    data-testid="input-funnel-address"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PLZ/Stadt: {postalCode} {city}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Ihre Daten sind sicher:</strong> Kein Spam, kein Weiterverkauf. Wir nutzen Ihre Daten ausschließlich zur Kontaktaufnahme.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                  size="lg"
                  data-testid="button-funnel-back3"
                >
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!firstName || !lastName || !contact || !address}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                  data-testid="button-funnel-submit"
                >
                  Jetzt Beratung sichern
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>100% kostenlos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Unverbindlich</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Antwort in 24h</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Sanierung München | Festpreis ab 920€/m² | KSHW München"
        description="Was kostet Sanierung München? Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². 268+ Projekte, Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h!"
        keywords="Sanierung München Kosten, Badsanierung München Preis, Komplettsanierung München, Haussanierung München, Wohnungssanierung, Küchensanierung, Altbausanierung, Kernsanierung München"
        canonicalPath="/"
        schema={generateFaqSchema(faqs)}
      />
      <SiteHeader />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-16 min-h-[90vh] lg:min-h-[85vh] flex items-center">
          <div className="absolute inset-0 pt-16">
            <img 
              src={houseBeforeAfter} 
              alt="Professionelle Haussanierung: Links unsaniert, rechts komplett renoviert - KSHW München"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              data-testid="img-hero-main"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-medium">268+ zufriedene Kunden in München</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Sanierung München
                <br />
                <span className="text-primary">ohne Stress & Chaos</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Schluss mit wochenlanger Handwerkersuche, Kostenexplosionen und Koordinationschaos. 
                <strong className="text-white"> Ein Ansprechpartner. Festpreisgarantie. Termingarantie.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="#anfrage-form">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 w-full sm:w-auto" data-testid="button-hero-cta">
                    Kostenlose Beratung sichern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="tel:+4915212274043">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 w-full sm:w-auto backdrop-blur-sm" data-testid="button-hero-phone">
                    <Phone className="w-5 h-5 mr-2" />
                    0152 122 740 43
                  </Button>
                </a>
              </div>
              
              <div className="flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Festpreisgarantie</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>5 Jahre Gewährleistung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Beratung in 24h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm lg:text-base opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full text-sm font-medium mb-4">
                Kennen Sie das?
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Sanierung in München - ein Albtraum?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sie sind nicht allein. Diese Probleme kennen wir von hunderten Kunden.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-300">{point.title}</h3>
                      <p className="text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 lg:py-24 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-medium mb-4">
                Die Lösung
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                KSHW München macht Sanierung einfach
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ein Ansprechpartner koordiniert alles. Sie lehnen sich zurück.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="p-6 border-green-200 dark:border-green-900/50 bg-white dark:bg-card">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <solution.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{solution.title}</h3>
                      <p className="text-muted-foreground">{solution.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Unsere Sanierungsleistungen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von der Badsanierung bis zur Komplettsanierung - alles aus einer Hand.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Card className="overflow-hidden hover-elevate cursor-pointer h-full" data-testid={`card-service-${service.id}`}>
                    <div className="aspect-video relative">
                      <img 
                        src={service.image} 
                        alt={`${service.title} München - KSHW`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white">
                          <service.icon className="w-5 h-5" />
                          <span className="font-bold text-lg">{service.title}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-muted-foreground mb-3">{service.description}</p>
                      <div className="text-xl font-bold text-primary mb-3">{service.price}</div>
                      <ul className="space-y-1">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                So einfach funktioniert's
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                In 4 Schritten von der Anfrage zur fertigen Sanierung
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <Card key={step.number} className="p-6 relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                    {step.number}
                  </div>
                  <div className="pt-4">
                    <step.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {step.duration}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Das sagen unsere Kunden
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                268+ zufriedene Kunden in München und Umgebung
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary mt-1">{testimonial.project}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Funnel Form */}
        <MiniLeadFunnel />

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Häufige Fragen zur Sanierung
              </h2>
              <p className="text-lg text-muted-foreground">
                Antworten auf die wichtigsten Fragen unserer Kunden
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Bereit für Ihre stressfreie Sanierung?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich jetzt kostenlos beraten. Ihr persönlicher Ansprechpartner meldet sich innerhalb von 24 Stunden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#anfrage-form">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6" data-testid="button-final-cta">
                  Jetzt kostenlos anfragen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:+4915212274043">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6" data-testid="button-final-phone">
                  <Phone className="w-5 h-5 mr-2" />
                  0152 122 740 43
                </Button>
              </a>
            </div>
            <p className="mt-8 text-sm opacity-70">
              Mo-Fr: 8:00-16:30 Uhr | Zielstattstr. 9, 81379 München
            </p>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}

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
import { highlightKeywords, pageKeywords } from "@/lib/highlight";
import { SeoHead, generateFaqSchema } from "@/components/seo-head";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImage from "@assets/generated_images/modern_renovated_home_interior.png";
import bathroomImg from "@assets/generated_images/modern_bathroom_renovation.png";
import kitchenImg from "@assets/generated_images/kitchen_renovation_work.png";
import floorImg from "@assets/generated_images/parquet_floor_renovation.png";
import electricImg from "@assets/generated_images/electrical_renovation_installation.png";
import heatingImg from "@assets/generated_images/heating_system_installation.png";
import completeImg from "@assets/generated_images/complete_home_renovation_result.png";

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
  Wrench,
  Download,
  Gift,
  Target,
  Heart,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  Timer,
  FileText,
  HelpCircle,
  CircleCheck
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
    icon: XCircle, 
    title: "Endlose Suche nach Handwerkern",
    description: "Sie rufen an, niemand meldet sich zurück. Wochen vergehen. Die Frustration wächst."
  },
  { 
    icon: Euro, 
    title: "Angst vor Kostenexplosion",
    description: "Ihr Budget wird gesprengt. Nachforderungen kommen. Das Projekt wird zum finanziellen Albtraum."
  },
  { 
    icon: AlertTriangle, 
    title: "Chaos ohne Ende",
    description: "Handwerker kommen nicht, Material fehlt, keiner koordiniert. Ihr Leben steht still."
  },
  { 
    icon: Timer, 
    title: "Monate statt Wochen",
    description: "Die Sanierung zieht sich. Kein Ende in Sicht. Sie fragen sich: War das richtig?"
  },
];

const problemSolutions = [
  {
    question: "Wer koordiniert all die verschiedenen Handwerker?",
    problem: "Sie müssten selbst 5-8 verschiedene Gewerke abstimmen: Elektriker, Fliesenleger, Sanitär, Maler... Wer hat dafür Zeit?",
    solution: "Als Ihr Generalunternehmer übernehmen wir die komplette Koordination. Sie haben einen Ansprechpartner - wir regeln den Rest.",
    keyword: "Generalunternehmer"
  },
  {
    question: "Was passiert, wenn die Kosten explodieren?",
    problem: "Die größte Angst: Am Ende zahlen Sie das Doppelte. Versteckte Kosten, Nachträge, böse Überraschungen.",
    solution: "Unser Festpreisangebot ist verbindlich. Der genannte Preis ist der Endpreis. Punkt. Keine Nachforderungen.",
    keyword: "Festpreis"
  },
  {
    question: "Wie lange dauert eine Badsanierung wirklich?",
    problem: "Ihr Badezimmer ist wochenlang nicht nutzbar. Handwerker kommen und gehen. Kein Ende in Sicht.",
    solution: "Wir nennen Ihnen den genauen Zeitrahmen vorher. Ein Standard-Bad: 2-3 Wochen. Wir halten den Termin.",
    keyword: "Badsanierung"
  },
  {
    question: "Kann ich während der Sanierung wohnen bleiben?",
    problem: "Sie haben Angst vor monatelangem Chaos in Ihrer Wohnung. Staub überall, kein normaler Alltag möglich.",
    solution: "Bei Teilsanierungen: ja. Bei Komplettsanierungen beraten wir Sie individuell. Wir minimieren die Belastung.",
    keyword: "Wohnungssanierung"
  },
  {
    question: "Was ist, wenn nach der Sanierung Mängel auftreten?",
    problem: "Der Albtraum: Die Handwerker sind weg, aber Probleme tauchen auf. Keiner fühlt sich zuständig.",
    solution: "5 Jahre Gewährleistung auf alle Arbeiten. Wir stehen zu unserem Wort - auch Jahre später.",
    keyword: "Garantie"
  },
  {
    question: "Wie finde ich einen seriösen Handwerker in München?",
    problem: "Bewertungen lesen, Angebote vergleichen, Referenzen prüfen... Woher wissen Sie, wem Sie vertrauen können?",
    solution: "268+ zufriedene Familien in München. 98% Weiterempfehlungsrate. Über 20 Jahre Erfahrung. Prüfbar.",
    keyword: "Handwerker München"
  },
];

const transformations = [
  {
    icon: Handshake,
    title: "Ein Partner, der alles regelt",
    description: "Stellen Sie sich vor: Sie haben einen einzigen Ansprechpartner, der alle Handwerker koordiniert. Sie lehnen sich zurück."
  },
  {
    icon: FileCheck,
    title: "Ihr Budget bleibt sicher",
    description: "Der Preis, den wir nennen, ist der Preis, den Sie zahlen. Punkt. Keine Überraschungen, keine Nachforderungen."
  },
  {
    icon: Calendar,
    title: "Ihr Termin steht",
    description: "Wir nennen Ihnen den Fertigstellungstermin. Und halten ihn. Sie können planen."
  },
  {
    icon: Shield,
    title: "5 Jahre Sicherheit",
    description: "Wenn etwas nicht stimmt, sind wir da. 5 Jahre lang. Das ist unser Versprechen."
  },
];

const stats = [
  { value: "268+", label: "zufriedene Familien", icon: Heart },
  { value: "20", label: "Jahre Meistererfahrung", icon: Award },
  { value: "98%", label: "empfehlen uns weiter", icon: ThumbsUp },
  { value: "0€", label: "versteckte Kosten", icon: BadgeCheck },
];

const processSteps = [
  {
    number: 1,
    title: "Sie beschreiben Ihren Traum",
    description: "2 Minuten genügen. Erzählen Sie uns, was Sie sich wünschen. Wir hören zu.",
    icon: MessageSquare,
    duration: "2 Min"
  },
  {
    number: 2,
    title: "Wir kommen zu Ihnen",
    description: "Innerhalb von 24 Stunden. Kostenlos. Wir schauen uns alles an und beraten Sie.",
    icon: Users,
    duration: "24h"
  },
  {
    number: 3,
    title: "Ihr Festpreis-Angebot",
    description: "Transparent, detailliert, verbindlich. Sie wissen genau, was Sie bekommen.",
    icon: FileCheck,
    duration: "48h"
  },
  {
    number: 4,
    title: "Sie genießen das Ergebnis",
    description: "Wir arbeiten. Sie entspannen. Und am Ende: Ihr Traumzuhause.",
    icon: Sparkles,
    duration: "Ihr Termin"
  },
];

const testimonials = [
  {
    name: "Familie Huber",
    location: "München-Schwabing",
    project: "Komplettsanierung",
    text: "Wir hatten Jahre lang gezögert. Zu viel Angst vor dem Chaos. Aber mit KSHW war es anders: Ein Anruf, ein Ansprechpartner, null Stress. Heute sitzen wir in unserer Traumwohnung und können es noch immer nicht glauben.",
    rating: 5,
    highlight: "null Stress"
  },
  {
    name: "Dr. Thomas M.",
    location: "Bogenhausen",
    project: "Luxus-Badsanierung",
    text: "Als Chirurg bin ich Präzision gewöhnt. Diese Handwerker haben mich beeindruckt: Pünktlich, sauber, auf den Cent genau wie angeboten. So muss Handwerk sein.",
    rating: 5,
    highlight: "Präzision"
  },
  {
    name: "Hausverwaltung Schmidt",
    location: "Sendling",
    project: "3 Wohnungen",
    text: "Wir verwalten 200 Wohnungen. Seit 4 Jahren arbeiten wir nur noch mit KSHW. Warum? Weil die Mieter danach glücklich sind. Und wir auch.",
    rating: 5,
    highlight: "seit 4 Jahren"
  },
];

const faqs = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Aus unserer Erfahrung mit 268+ Projekten: Eine Komplettsanierung in München kostet zwischen 920€ und 2.300€ pro Quadratmeter. Eine 80m² Wohnung liegt damit zwischen 73.600€ und 184.000€. In Ihrer kostenlosen Beratung erhalten Sie eine genaue Schätzung für Ihr Projekt."
  },
  {
    question: "Was kostet eine Badsanierung in München?",
    answer: "Eine Badsanierung startet bei etwa 9.200€ für ein kleines Bad mit Standardausstattung. Mittelgroße Bäder liegen bei 15.000-25.000€, Luxusbäder bei 35.000€+. Wir erstellen Ihnen ein verbindliches Festpreis-Angebot."
  },
  {
    question: "Wie lange dauert eine Sanierung?",
    answer: "Badsanierung: 2-3 Wochen. Küchenbauarbeiten: 1-2 Wochen. Komplettsanierung: 6-12 Wochen. Wir nennen Ihnen einen verbindlichen Endtermin und halten ihn."
  },
  {
    question: "Was bedeutet Festpreisgarantie?",
    answer: "Der Preis in unserem Angebot ist der Preis, den Sie zahlen. Keine versteckten Kosten, keine Nachforderungen. Ausgenommen sind nur Änderungswünsche Ihrerseits oder dokumentierte Bausubstanzprobleme."
  },
  {
    question: "In welchen Stadtteilen sind Sie tätig?",
    answer: "Wir sind in ganz München und Umgebung tätig: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen und alle anderen Stadtteile. Im Umland: Dachau, Starnberg, Germering, Freising und weitere."
  },
  {
    question: "Gibt es Fördermittel für Sanierungen?",
    answer: "Ja! KfW-Förderung bis 45.000€ pro Wohneinheit, BAFA-Zuschüsse für Heizungsaustausch, Münchner Förderprogramm. Wir beraten Sie kostenlos zu allen Fördermöglichkeiten."
  },
];

const urgencyOptions = [
  { id: "sofort", label: "So schnell wie möglich", sublabel: "In den nächsten 4 Wochen" },
  { id: "bald", label: "In 1-3 Monaten", sublabel: "Gute Planungszeit" },
  { id: "planung", label: "Ich plane erst", sublabel: "Mehr als 3 Monate" },
];

function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Ratgeber wird gesendet!",
      description: "Prüfen Sie Ihr E-Mail-Postfach.",
    });
  };

  return (
    <section className="py-4 lg:py-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-600 rounded-full text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              <span>Kostenloses Geschenk</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Der Ratgeber, der Ihnen <span className="text-primary">tausende Euro</span> spart
            </h2>
            
            <div className="space-y-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Die 7 teuersten Fehler</strong> bei Sanierungen und wie Sie sie vermeiden
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Realistische Kostenübersicht</strong> für alle Sanierungsarten in München
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Checkliste Handwerkerauswahl</strong>: Woran Sie seriöse Betriebe erkennen
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Fördermittel-Guide 2025</strong>: Bis zu 70% Zuschüsse sichern
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Über 1.200 Münchner haben diesen Ratgeber bereits heruntergeladen.
            </p>
          </div>

          <Card className="p-8 shadow-xl border-2 border-primary/20">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Kostenloser Sanierungs-Ratgeber</h3>
                  <p className="text-muted-foreground text-sm mt-1">32 Seiten geballtes Expertenwissen</p>
                </div>

                <div>
                  <Label htmlFor="lead-email" className="sr-only">E-Mail</Label>
                  <Input
                    id="lead-email"
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                    data-testid="input-lead-email"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  disabled={isSubmitting}
                  data-testid="button-download-guide"
                >
                  {isSubmitting ? (
                    "Wird gesendet..."
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Jetzt kostenlos herunterladen
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Kein Spam. Sie können sich jederzeit abmelden.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Geschafft!</h3>
                <p className="text-muted-foreground mb-6">
                  Der Ratgeber ist auf dem Weg zu Ihnen. Prüfen Sie Ihr Postfach.
                </p>
                <Link href="/anfrage">
                  <Button className="bg-primary hover:bg-primary/90" data-testid="button-after-download-cta">
                    Oder: Jetzt kostenlose Beratung anfragen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

function FunnelForm() {
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
    <section id="anfrage-form" className="py-4 lg:py-6 bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Starten Sie jetzt. <span className="text-accent">Kostenlos.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In nur 2 Minuten zu Ihrer persönlichen Beratung. 
            Keine Verpflichtungen. Keine versteckten Kosten.
          </p>
        </div>

        <Card className="p-6 lg:p-10 shadow-xl border-2">
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span className="font-medium">Schritt {step} von 3</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wo dürfen wir Ihnen helfen?
                </h3>
                <p className="text-muted-foreground">
                  Ihr Standort hilft uns, das beste Team für Sie zu finden
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postal-code" className="text-sm font-medium">PLZ</Label>
                  <Input
                    id="postal-code"
                    placeholder="z.B. 80331"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    maxLength={5}
                    className="mt-1 h-12"
                    data-testid="input-funnel-plz"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">Stadt</Label>
                  <Input
                    id="city"
                    placeholder="z.B. München"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 h-12"
                    data-testid="input-funnel-city"
                  />
                </div>
              </div>
              
              <div className="text-center pt-4">
                <h3 className="text-xl font-bold mb-2">
                  Was möchten Sie sanieren?
                </h3>
              </div>
              <RadioGroup value={selectedService} onValueChange={setSelectedService} className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {allServices.map((service) => (
                  <Label
                    key={service.id}
                    htmlFor={`service-${service.id}`}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? "border-primary bg-primary/5"
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
                className="w-full h-12"
                data-testid="button-funnel-step1"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wann soll es losgehen?
                </h3>
                <p className="text-muted-foreground">
                  Je früher wir wissen, desto besser können wir planen
                </p>
              </div>
              <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-4">
                {urgencyOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={`urgency-${option.id}`}
                    className={`flex items-center gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all ${
                      urgency === option.id
                        ? "border-primary bg-primary/5"
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
                <div className="flex items-start gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Sparkles className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Gute Nachricht:</strong> Wir haben aktuell freie Kapazitäten und können zeitnah starten.
                  </p>
                </div>
              )}
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12"
                  data-testid="button-funnel-back2"
                >
                  Zurück
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!urgency}
                  className="flex-1 h-12"
                  data-testid="button-funnel-step2"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wie erreichen wir Sie?
                </h3>
                <p className="text-muted-foreground">
                  Morgen meldet sich Ihr persönlicher Berater
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
                      className="mt-1 h-12"
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
                      className="mt-1 h-12"
                      data-testid="input-funnel-lastname"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="funnel-contact" className="text-sm font-medium">Telefon oder E-Mail</Label>
                  <Input
                    id="funnel-contact"
                    placeholder="z.B. 0170 1234567"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 h-12"
                    data-testid="input-funnel-contact"
                  />
                </div>
                <div>
                  <Label htmlFor="funnel-address" className="text-sm font-medium">Straße & Hausnummer</Label>
                  <Input
                    id="funnel-address"
                    placeholder="z.B. Marienplatz 1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 h-12"
                    data-testid="input-funnel-address"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PLZ/Ort: {postalCode} {city}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Ihre Daten sind sicher.</strong> Kein Spam. Kein Weiterverkauf. Versprochen.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 h-12"
                  data-testid="button-funnel-back3"
                >
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!firstName || !lastName || !contact || !address}
                  className="flex-1 h-12 bg-orange-500 hover:bg-orange-600"
                  data-testid="button-funnel-submit"
                >
                  Kostenlose Beratung sichern
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
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
  const faqSchema = generateFaqSchema(faqs);
  
  const scrollToForm = () => {
    document.getElementById('anfrage-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SeoHead
        title="Sanierung München | Festpreis & 5 Jahre Garantie | KSHW München"
        description="Ihre Sanierung ohne Stress: Ein Ansprechpartner, Festpreisgarantie, verbindlicher Termin. 268+ zufriedene Familien in München. Kostenlose Beratung in 24h."
        keywords="Sanierung München, Sanierungen München, Sanierung aus einer Hand, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Renovierung München, Renovierung, Renovierungen, renovierung aus einer Hand, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Haussanierung München, Haussanierungen, Haus sanieren lassen, Badsanierung München, Badsanierungen sofort, Innenausbau, Kosten, Angebote, Komplettsanierung München Festpreis, Altbausanierung München, KSHW München, 089 Sanierer"
        canonicalPath="/"
        schema={faqSchema}
      />
      
      <div className="min-h-screen bg-background">
        <SiteHeader />

        {/* Hero Section - Clean & Professional */}
        <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/20">
                <BadgeCheck className="w-4 h-4 text-green-400" />
                <span>268+ zufriedene Familien in München</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ihre Sanierung. <br />
                <span className="text-orange-400">Stressfrei & zum Festpreis.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 mb-5 leading-relaxed max-w-lg">
                Ein Ansprechpartner. Ein verbindlicher Termin. 
                <strong className="text-white"> Keine Überraschungen.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 text-base font-semibold shadow-lg"
                  data-testid="button-hero-cta"
                >
                  Kostenlose Beratung
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="tel:+4915212274043">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-6 text-base border-white/40 text-white backdrop-blur-sm"
                    data-testid="button-hero-phone"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    089 - Anrufen
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Festpreisgarantie</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>5 Jahre Garantie</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>24h Antwort</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section - NLP: Problem-Agitation */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Kennen Sie das Gefühl?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Eine <span className="text-accent font-semibold">Sanierung</span> planen, aber nur an Probleme denken?
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 bg-background border-destructive/20 hover-elevate">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-bold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Problem-Solution FAQ Section - NLP: Question-based targeting */}
        <section className="py-6 lg:py-8 bg-background">
          <div className="max-w-5xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4" />
                <span>Ihre Fragen - Unsere Antworten</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                Das fragen uns Kunden am häufigsten
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wir verstehen Ihre Bedenken. Hier sind die ehrlichen Antworten auf die Fragen, 
                die Sie sich bei einer <span className="text-accent font-medium">Renovierung in München</span> stellen.
              </p>
            </div>

            <div className="space-y-4">
              {problemSolutions.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <HelpCircle className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-3">{item.question}</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive/30">
                            <div className="flex items-center gap-2 text-destructive font-medium text-sm mb-2">
                              <XCircle className="w-4 h-4" />
                              Das Problem
                            </div>
                            <p className="text-sm text-muted-foreground">{item.problem}</p>
                          </div>
                          
                          <div className="bg-green-500/5 rounded-lg p-4 border-l-4 border-green-500/50">
                            <div className="flex items-center gap-2 text-green-600 font-medium text-sm mb-2">
                              <CircleCheck className="w-4 h-4" />
                              Unsere Lösung
                            </div>
                            <p className="text-sm text-muted-foreground">{item.solution}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                            {item.keyword}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Noch Fragen? Wir beraten Sie persönlich - kostenlos und unverbindlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('anfrage-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-accent hover:bg-accent/90"
                  data-testid="button-faq-cta"
                >
                  Jetzt Beratung anfragen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Link href="tel:+4915212274043">
                  <Button size="lg" variant="outline" data-testid="button-faq-phone">
                    <Phone className="w-4 h-4 mr-2" />
                    0152 122 740 43
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - NLP: Future Pacing + Transformation */}
        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                <span>Die Lösung</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                So fühlt sich <span className="text-accent">Sanierung</span> wirklich an
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Mit uns an Ihrer Seite wird Ihre Sanierung zum entspannten Erlebnis.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transformations.map((item, index) => (
                <Card key={index} className="p-6 border-primary/20 hover-elevate">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-6 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <LeadMagnetSection />

        {/* Process Section */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ihr Weg zum <span className="text-accent">Traumzuhause</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                In 4 einfachen Schritten von der Idee zur fertigen Sanierung.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - NLP: Social Proof + Emotional Language */}
        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Das sagen unsere <span className="text-accent">Kunden</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Echte Erfahrungen. Echte Ergebnisse.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                      {testimonial.project}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Unsere <span className="text-accent">Leistungen</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von der kleinen Badrenovierung bis zur kompletten Haussanierung.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service) => (
                <Card key={service.id} className="overflow-hidden group hover-elevate">
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <p className="text-white/80 text-sm">{service.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{service.price}</span>
                      <Link href={`/anfrage?service=${service.id}`}>
                        <Button variant="ghost" size="sm" data-testid={`button-service-${service.id}`}>
                          Anfragen
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Funnel Form */}
        <FunnelForm />

        {/* FAQ Section */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Häufige <span className="text-accent">Fragen</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Alles, was Sie wissen müssen.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4" data-testid={`accordion-faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA - NLP: Urgency + Future Pacing */}
        <section className="py-4 lg:py-6 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              In 3 Monaten könnten Sie in Ihrem <br className="hidden lg:block" />
              frisch sanierten Zuhause sitzen.
            </h2>
            <p className="text-xl opacity-90 mb-4 max-w-2xl mx-auto">
              Der erste Schritt ist kostenlos. Unverbindlich. 
              Und er dauert nur 2 Minuten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold"
                data-testid="button-final-cta"
              >
                Jetzt kostenlose Beratung starten
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-70">
              Keine Verpflichtungen. Kein Spam. Nur Klarheit.
            </p>
          </div>
        </section>

        <SeoFooter />
      </div>
    </>
  );
}

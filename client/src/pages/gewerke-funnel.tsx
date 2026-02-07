import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { Breadcrumb } from "@/components/breadcrumb";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";
import { SeoHead } from "@/components/seo-head";
import gewerkeHeroImage from "@assets/generated_images/fachhandwerker_meisterbetriebe.webp";

const gewerkeHeroContent: HeroContent = {
  backgroundImage: gewerkeHeroImage,
  imageAlt: "Einzelgewerk beauftragen München – Elektriker, Sanitär oder Maler direkt buchen",
  badge: "Exklusive Meisterbetriebe für Einzelgewerke",
  titleLine1: "Handwerker München – Maler, Elektriker, Sanitär & Fachbetriebe.",
  titleLine2: "Zertifizierte Meisterbetriebe zum Festpreis.",
  descriptions: ["Maler, Elektriker, Sanitär.", "Nur geprüfte Meisterbetriebe aus München."],
  strongText: "Festpreisgarantie für jedes Gewerk.",
  ctaText: "Jetzt exklusiven Meisterbetrieb anfragen",
  checkmarks: ["98% Weiterempfehlung", "Zertifizierte Meister", "Festpreisgarantie"],
  dataTestIdPrefix: "gewerke"
};
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  Phone,
  Loader2,
  Mail,
  Star,
  PaintBucket,
  Plug,
  Droplets,
  Thermometer,
  Layers,
  Wrench,
  Handshake,
  Clock,
  Home,
  Building2,
  Euro,
  MapPin,
  Calendar
} from "lucide-react";
import { Link } from "wouter";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

const tradeOptions = [
  { 
    id: "maler", 
    label: "Maler & Lackierer", 
    icon: PaintBucket,
    description: "Wände, Decken, Fassaden streichen und tapezieren"
  },
  { 
    id: "elektriker", 
    label: "Elektriker", 
    icon: Plug,
    description: "Elektroinstallation, Steckdosen, Beleuchtung, Sicherungskasten"
  },
  { 
    id: "sanitaer", 
    label: "Sanitär & Klempner", 
    icon: Droplets,
    description: "Wasseranschlüsse, Abflüsse, Armaturen, Rohrleitungen"
  },
  { 
    id: "heizung", 
    label: "Heizungsbauer", 
    icon: Thermometer,
    description: "Heizungsinstallation, Wartung, Reparatur, Wärmepumpen"
  },
  { 
    id: "fliesenleger", 
    label: "Fliesenleger", 
    icon: Layers,
    description: "Fliesen, Naturstein, Mosaik in Bad, Küche, Wohnräumen"
  },
  { 
    id: "schreiner", 
    label: "Schreiner & Tischler", 
    icon: Wrench,
    description: "Möbelbau, Einbauschränke, Türen, Fenster, Treppen"
  },
];

const tradeQuestions: Record<string, {
  title: string;
  questions: { id: string; label: string; type: "select" | "checkbox" | "number" | "text"; options?: string[] }[];
}> = {
  maler: {
    title: "Malerarbeiten - Details",
    questions: [
      { id: "arbeit", label: "Welche Malerarbeiten benötigen Sie?", type: "select", options: ["Wände neu streichen", "Decken streichen", "Türen/Zargen lackieren", "Fassade streichen", "Schimmelbeseitigung", "Tapeten entfernen/neu", "Spachteln/Glätten (Q1-Q4)", "Sonstiges"] },
      { id: "zustand", label: "Aktueller Zustand der Flächen?", type: "select", options: ["Normaler Verschmutzungsgrad", "Starke Verschmutzung/Nikotin", "Schimmelbefall", "Alte Farbe blättert ab", "Tapete vorhanden"] },
      { id: "vorbereitung", label: "Oberflächenvorbereitung gewünscht?", type: "select", options: ["Nur streichen", "Spachtelarbeiten nötig", "Glätten Q2/Q3/Q4", "Tapeten entfernen", "Unsicher"] },
      { id: "farbsystem", label: "Welches Farbsystem?", type: "select", options: ["Standard Weiß", "Farbig nach Wunsch", "Premium/Allergikerfarbe", "Schmutzabweisend", "Noch unklar"] },
    ]
  },
  elektriker: {
    title: "Elektroarbeiten - Details",
    questions: [
      { id: "art", label: "Art der Arbeit", type: "select", options: ["Neuinstallation", "Renovierung/Erweiterung", "Reparatur", "Sicherungskasten erneuern", "Komplettsanierung Elektrik"] },
      { id: "gebaeude", label: "Gebäudeart", type: "select", options: ["Altbau (vor 1970)", "Altbau (1970-1990)", "Neubau/Modernbau", "Gewerbe"] },
      { id: "umfang", label: "Umfang der Arbeiten", type: "select", options: ["1-2 Steckdosen/Schalter", "Ganzer Raum", "Mehrere Räume", "Ganze Wohnung", "Ganzes Haus"] },
      { id: "zusatz", label: "Zusätzliche Leistungen?", type: "select", options: ["Keine", "Smart Home", "Netzwerk/LAN", "Beleuchtungskonzept", "E-Auto Wallbox"] },
    ]
  },
  sanitaer: {
    title: "Sanitärarbeiten - Details",
    questions: [
      { id: "bereich", label: "Welcher Bereich?", type: "select", options: ["Badezimmer", "Gäste-WC", "Küche", "Waschküche/Keller", "Mehrere Bereiche"] },
      { id: "art", label: "Art der Arbeit", type: "select", options: ["Neuinstallation", "Austausch Armaturen", "Rohrleitungen erneuern", "Verstopfung/Reparatur", "Komplettsanierung"] },
      { id: "objekte", label: "Anzahl Sanitärobjekte", type: "select", options: ["1-2 Objekte", "3-4 Objekte", "5-6 Objekte", "Mehr als 6"] },
      { id: "problem", label: "Aktuelles Problem?", type: "select", options: ["Kein akutes Problem", "Undichtigkeit", "Verstopfung", "Niedriger Wasserdruck", "Defekte Armatur"] },
    ]
  },
  heizung: {
    title: "Heizungsarbeiten - Details",
    questions: [
      { id: "system", label: "Aktuelles Heizsystem", type: "select", options: ["Gasheizung", "Ölheizung", "Fernwärme", "Elektroheizung", "Wärmepumpe", "Unbekannt"] },
      { id: "baujahr", label: "Baujahr der Heizung", type: "select", options: ["Neuer als 10 Jahre", "10-20 Jahre", "20-30 Jahre", "Älter als 30 Jahre", "Unbekannt"] },
      { id: "art", label: "Gewünschte Leistung", type: "select", options: ["Wartung/Reparatur", "Heizungstausch", "Neue Wärmepumpe", "Hybridheizung", "Fußbodenheizung nachrüsten"] },
      { id: "flaeche", label: "Zu beheizende Fläche", type: "select", options: ["Bis 80 m²", "80-120 m²", "120-180 m²", "180-250 m²", "Über 250 m²"] },
    ]
  },
  fliesenleger: {
    title: "Fliesenarbeiten - Details",
    questions: [
      { id: "arbeit", label: "Welche Fliesenarbeiten benötigen Sie?", type: "select", options: ["Bad/WC komplett fliesen", "Bodenfliesen/Bodensanierung", "Großformatfliesen (ab 60x120)", "Dusche/Walk-In Abdichtung + Fliesen", "Küchenrückwand", "Reparaturen/einzelne Fliesen", "Balkon/Terrasse fliesen"] },
      { id: "zustand", label: "Aktueller Zustand?", type: "select", options: ["Rohbau/Neubau", "Altbestand - Entfernen nötig", "Altbelag teilweise vorhanden", "Nur Reparatur"] },
      { id: "demontage", label: "Alte Fliesen entfernen?", type: "select", options: ["Ja", "Nein", "Unklar"] },
      { id: "material", label: "Sind die neuen Fliesen vorhanden?", type: "select", options: ["Ja, vorhanden", "Nein, bitte mit anbieten", "Noch unklar"] },
    ]
  },
  schreiner: {
    title: "Schreinerarbeiten - Details",
    questions: [
      { id: "projekt", label: "Art des Projekts", type: "select", options: ["Einbauschrank", "Küche/Küchenzeile", "Türen", "Fenster", "Treppe", "Möbel nach Maß", "Sonstiges"] },
      { id: "anzahl", label: "Anzahl/Umfang", type: "select", options: ["Einzelstück", "2-3 Elemente", "4-6 Elemente", "Kompletter Raum", "Mehrere Räume"] },
      { id: "material", label: "Gewünschtes Material", type: "select", options: ["Holz massiv", "Furnier", "MDF/Spanplatte", "Kombination", "Noch offen"] },
      { id: "zustand", label: "Aktueller Zustand", type: "select", options: ["Neubau/leerer Raum", "Renovierung", "Austausch vorhandener Elemente", "Reparatur"] },
    ]
  },
};

const tradeBudgets: Record<string, { id: string; label: string; description: string }[]> = {
  maler: [
    { id: "1150-2875", label: "1.150 - 2.875 EUR", description: "1-2 Räume streichen" },
    { id: "2875-5175", label: "2.875 - 5.175 EUR", description: "3-4 Räume oder kleine Wohnung" },
    { id: "5175-8050", label: "5.175 - 8.050 EUR", description: "Große Wohnung komplett" },
    { id: "8050-13800", label: "8.050 - 13.800 EUR", description: "Haus innen komplett" },
    { id: "13800+", label: "Über 13.800 EUR", description: "Großprojekt inkl. Fassade" },
  ],
  elektriker: [
    { id: "575-1725", label: "575 - 1.725 EUR", description: "Kleine Reparaturen, wenige Steckdosen" },
    { id: "1725-4025", label: "1.725 - 4.025 EUR", description: "Raum komplett, Sicherungskasten" },
    { id: "4025-6900", label: "4.025 - 6.900 EUR", description: "Mehrere Räume, Smart Home Basis" },
    { id: "6900-13800", label: "6.900 - 13.800 EUR", description: "Wohnung komplett erneuern" },
    { id: "13800+", label: "Über 13.800 EUR", description: "Haus komplett, inkl. Unterverteilung" },
  ],
  sanitaer: [
    { id: "575-1725", label: "575 - 1.725 EUR", description: "Armaturentausch, kleine Reparaturen" },
    { id: "1725-4600", label: "1.725 - 4.600 EUR", description: "WC/Waschbecken austauschen" },
    { id: "4600-9200", label: "4.600 - 9.200 EUR", description: "Gäste-WC komplett" },
    { id: "9200-17250", label: "9.200 - 17.250 EUR", description: "Badezimmer Sanitärinstallation" },
    { id: "17250+", label: "Über 17.250 EUR", description: "Mehrere Bäder, Rohrleitungen komplett" },
  ],
  heizung: [
    { id: "575-2300", label: "575 - 2.300 EUR", description: "Wartung, kleine Reparaturen" },
    { id: "2300-6900", label: "2.300 - 6.900 EUR", description: "Heizkörper austauschen, Thermostate" },
    { id: "6900-17250", label: "6.900 - 17.250 EUR", description: "Gasheizung/Brennwert erneuern" },
    { id: "17250-28750", label: "17.250 - 28.750 EUR", description: "Wärmepumpe Luft-Wasser" },
    { id: "28750+", label: "Über 28.750 EUR", description: "Erdwärme, Hybridanlage, Fußbodenheizung" },
  ],
  fliesenleger: [
    { id: "1150-2875", label: "1.150 - 2.875 EUR", description: "Kleiner Bereich bis 10 m²" },
    { id: "2875-5750", label: "2.875 - 5.750 EUR", description: "Gäste-WC oder Küche" },
    { id: "5750-9200", label: "5.750 - 9.200 EUR", description: "Badezimmer komplett" },
    { id: "9200-13800", label: "9.200 - 13.800 EUR", description: "Großes Bad oder mehrere Räume" },
    { id: "13800+", label: "Über 13.800 EUR", description: "Mehrere Bäder, großflächig" },
  ],
  schreiner: [
    { id: "1725-4600", label: "1.725 - 4.600 EUR", description: "Einzelmöbel, Türen" },
    { id: "4600-9200", label: "4.600 - 9.200 EUR", description: "Einbauschrank, Garderobe" },
    { id: "9200-17250", label: "9.200 - 17.250 EUR", description: "Begehbarer Schrank, mehrere Möbel" },
    { id: "17250-28750", label: "17.250 - 28.750 EUR", description: "Maßküche, kompletter Raum" },
    { id: "28750+", label: "Über 28.750 EUR", description: "Mehrere Räume, Luxusausstattung" },
  ],
};

interface FormData {
  trade: string;
  propertyType: string;
  livingArea: string;
  tradeDetails: Record<string, string>;
  budget: string;
  timeline: string;
  isUrgent: boolean;
  description: string;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  city: string;
  privacyAccepted: boolean;
}

export default function GewerkeFunnel() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [formSent, setFormSent] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    trade: "",
    propertyType: "wohnung",
    livingArea: "",
    tradeDetails: {},
    budget: "",
    timeline: "flexibel",
    isUrgent: false,
    description: "",
    name: "",
    phone: "",
    email: "",
    postalCode: "",
    city: "München",
    privacyAccepted: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const tradeParam = params.get("trade");
    if (tradeParam && tradeOptions.find(t => t.id === tradeParam)) {
      setFormData(prev => ({ ...prev, trade: tradeParam }));
      setStep(2);
    }
  }, [searchString]);

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const tradeLabel = tradeOptions.find(t => t.id === data.trade)?.label || data.trade;
      const leadData = {
        service: "handwerker-vermittlung",
        propertyType: data.propertyType,
        serviceDetails: { 
          tradeType: data.trade,
          tradeLabel: tradeLabel,
          scopeAnswers: data.tradeDetails,
          livingArea: data.livingArea,
        },
        budgetRange: data.budget,
        timeline: data.timeline,
        isUrgent: data.isUrgent,
        description: data.description,
        name: data.name,
        phone: data.phone,
        email: data.email,
        postalCode: data.postalCode,
        city: data.city,
        additionalNotes: `Gewerk: ${tradeLabel}, Budget: ${data.budget}`,
      };
      return apiRequest("POST", "/api/leads", leadData);
    },
    onSuccess: () => {
      setFormSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const currentTradeQuestions = formData.trade ? tradeQuestions[formData.trade] : null;
  const currentTradeBudgets = formData.trade ? tradeBudgets[formData.trade] : [];

  const canProceedStep1 = formData.trade !== "";
  const canProceedStep2 = formData.propertyType !== "";
  const canProceedStep3 = formData.livingArea !== "";
  const firstTwoQuestions = currentTradeQuestions?.questions.slice(0, 2) || [];
  const lastTwoQuestions = currentTradeQuestions?.questions.slice(2, 4) || [];
  const canProceedStep4 = firstTwoQuestions.every(q => formData.tradeDetails[q.id]);
  const canProceedStep5 = lastTwoQuestions.every(q => formData.tradeDetails[q.id]);
  const canProceedStep6 = formData.budget !== "";
  const canProceedStep7 = formData.timeline !== "" && formData.description.length >= 10;
  const canProceedStep8 = 
    formData.name.length >= 2 &&
    formData.phone.length >= 6 &&
    formData.email.includes("@") &&
    formData.postalCode.length >= 4 &&
    formData.privacyAccepted;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (canProceedStep8) {
      submitMutation.mutate(formData);
    }
  };

  const setTradeDetail = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      tradeDetails: { ...prev.tradeDetails, [questionId]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SeoHead
        title="Handwerker München gesucht? | Maler Elektriker Sanitär"
        description="Handwerker München finden: Maler, Elektriker, Sanitär, Fliesenleger, Schreiner. Geprüfte Fachbetriebe, kostenlose Vermittlung, Angebot in 48h."
        keywords="Handwerker München gesucht, Maler München günstig, Elektriker München schnell, Sanitär München Notdienst, Fliesenleger München Empfehlung, Schreiner München finden, Trockenbauer München Angebot, Parkettleger München Kosten, Dachdecker München zuverlässig, Handwerker München kostenlos vermittelt, Maler München Wohnung streichen Kosten, Elektriker München Altbau Sanierung, Sanitär München Bad renovieren, Fliesenleger München Bad Preise, Handwerker München geprüft empfohlen"
        canonicalPath="/gewerke"
      />
      <SiteHeader />
      <GlobalHero content={gewerkeHeroContent} />
      <Breadcrumb items={[{ label: "Handwerker finden" }]} />

      <main id="main-content" className="pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {formSent ? (
            <Card className="max-w-2xl mx-auto mt-8">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3" data-testid="text-gewerke-success-title">Ihre Anfrage wurde erfolgreich gesendet!</h2>
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-3" data-testid="text-gewerke-email-badge">
                  <Mail className="w-4 h-4" />
                  Bestätigungs-E-Mail wurde versendet
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Sie haben eine Bestätigung per E-Mail erhalten. Bitte prüfen Sie auch Ihren Spam-Ordner.
                </p>

                <Card className="p-5 text-left mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    So geht es weiter
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Prüfung Ihrer Anfrage</p>
                        <p className="text-sm text-muted-foreground">Wir analysieren Ihre Angaben innerhalb von 24 Stunden.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Persönliche Kontaktaufnahme</p>
                        <p className="text-sm text-muted-foreground">Ihr Projektberater meldet sich bei Ihnen für ein Erstgespräch.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Kostenlose Vor-Ort-Beratung</p>
                        <p className="text-sm text-muted-foreground">Wir besichtigen Ihr Objekt und erstellen ein unverbindliches Festpreis-Angebot.</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="inline-flex items-center gap-2 bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Clock className="w-4 h-4" />
                  Erwartete Rückmeldung: Innerhalb von 48 Stunden
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+4989444438872">
                    <Button variant="outline" className="min-h-11 w-full" data-testid="button-gewerke-call">
                      <Phone className="w-4 h-4 mr-2" />
                      089 / 444 438 872
                    </Button>
                  </a>
                  <Button onClick={() => { setFormSent(false); setStep(1); setFormData(prev => ({ ...prev, trade: "", tradeDetails: {}, privacyAccepted: false })); }} variant="outline" className="min-h-11" data-testid="button-gewerke-new-request">
                    Neue Anfrage stellen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
          <>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Schritt {step} von {totalSteps}</span>
              <span>{Math.round(progress)}% abgeschlossen</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Was brauchen Sie erledigt?</h2>
                <p className="text-muted-foreground">Wählen Sie Ihr Gewerk – wir finden den Experten</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tradeOptions.map((trade) => {
                  const isSelected = formData.trade === trade.id;
                  return (
                    <Card
                      key={trade.id}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover-elevate"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, trade: trade.id, tradeDetails: {} }))}
                      data-testid={`card-trade-${trade.id}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10"
                        }`}>
                          <trade.icon className={`w-7 h-7 ${isSelected ? "" : "text-primary"}`} />
                        </div>
                        <h3 className="font-semibold mb-2">{trade.label}</h3>
                        <p className="text-sm text-muted-foreground">{trade.description}</p>
                        {isSelected && (
                          <div className="mt-3">
                            <CheckCircle className="w-5 h-5 text-primary mx-auto" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                    data-testid="button-back-step1"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Zurück
                  </Button>
                </Link>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep1}
                  size="lg"
                  data-testid="button-next-step1"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Wo soll gearbeitet werden?</h2>
                <p className="text-muted-foreground">
                  {formData.trade === "fliesenleger" 
                    ? "Um welche Art von Immobilie handelt es sich?" 
                    : formData.trade === "maler"
                    ? "In welchem Objekt sollen die Malerarbeiten stattfinden?"
                    : "Um welchen Immobilientyp handelt es sich?"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formData.trade === "fliesenleger" ? [
                  { id: "wohnung", label: "Wohnung", icon: Building2 },
                  { id: "haus", label: "Haus", icon: Home },
                  { id: "neubau", label: "Neubau", icon: Building2 },
                  { id: "gewerbe", label: "Gewerbe", icon: Building2 },
                  { id: "vermietet", label: "Vermietete Immobilie", icon: Building2 },
                ] : (formData.trade === "maler" ? [
                  { id: "wohnung", label: "Wohnung", icon: Building2 },
                  { id: "haus", label: "Haus", icon: Home },
                  { id: "neubau", label: "Neubau", icon: Building2 },
                  { id: "gewerbe", label: "Gewerbe/Büro", icon: Building2 },
                ] : [
                  { id: "wohnung", label: "Wohnung", icon: Building2 },
                  { id: "einfamilienhaus", label: "Einfamilienhaus", icon: Home },
                  { id: "mehrfamilienhaus", label: "Mehrfamilienhaus", icon: Building2 },
                  { id: "gewerbe", label: "Gewerbe", icon: Building2 },
                ])).map((type) => {
                  const isSelected = formData.propertyType === type.id;
                  return (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : "hover-elevate"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, propertyType: type.id }))}
                      data-testid={`card-property-${type.id}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10"
                        }`}>
                          <type.icon className={`w-6 h-6 ${isSelected ? "" : "text-primary"}`} />
                        </div>
                        <h3 className="font-semibold">{type.label}</h3>
                        {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-2" />}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step2"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep2}
                  size="lg"
                  data-testid="button-next-step2"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Wie groß ist Ihr Objekt?</h2>
                <p className="text-muted-foreground">Wählen Sie die ungefähre Wohnfläche</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "Bis 50 m²",
                  "50-80 m²",
                  "80-120 m²",
                  "120-180 m²",
                  "180-250 m²",
                  "Über 250 m²",
                ].map((area) => {
                  const isSelected = formData.livingArea === area;
                  return (
                    <Card
                      key={area}
                      className={`cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : "hover-elevate"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, livingArea: area }))}
                      data-testid={`card-area-${area}`}
                    >
                      <CardContent className="p-4 text-center">
                        <h3 className="font-semibold">{area}</h3>
                        {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-2" />}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step3"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep3}
                  size="lg"
                  data-testid="button-next-step3"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && currentTradeQuestions && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">{currentTradeQuestions.title} (1/2)</h2>
                <p className="text-muted-foreground">Bitte beantworten Sie die folgenden Fragen</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  {firstTwoQuestions.map((question) => (
                    <div key={question.id}>
                      <Label className="text-base font-medium">{question.label}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                        {question.options?.map((option) => (
                          <Button
                            key={option}
                            type="button"
                            variant={formData.tradeDetails[question.id] === option ? "default" : "outline"}
                            className="w-full text-sm h-auto py-3 whitespace-normal"
                            onClick={() => setTradeDetail(question.id, option)}
                            data-testid={`button-${question.id}-${option}`}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step4"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep4}
                  size="lg"
                  data-testid="button-next-step4"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 5 && currentTradeQuestions && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">{currentTradeQuestions.title} (2/2)</h2>
                <p className="text-muted-foreground">Noch zwei Fragen zu Ihrem Projekt</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  {lastTwoQuestions.map((question) => (
                    <div key={question.id}>
                      <Label className="text-base font-medium">{question.label}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                        {question.options?.map((option) => (
                          <Button
                            key={option}
                            type="button"
                            variant={formData.tradeDetails[question.id] === option ? "default" : "outline"}
                            className="w-full text-sm h-auto py-3 whitespace-normal"
                            onClick={() => setTradeDetail(question.id, option)}
                            data-testid={`button-${question.id}-${option}`}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step5"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep5}
                  size="lg"
                  data-testid="button-next-step5"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Euro className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Mit welchem Budget planen Sie?</h2>
                <p className="text-muted-foreground">Realistische Preise für {tradeOptions.find(t => t.id === formData.trade)?.label} in München</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <RadioGroup
                    value={formData.budget}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                    className="space-y-3"
                  >
                    {currentTradeBudgets.map((budget) => (
                      <div
                        key={budget.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                          formData.budget === budget.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, budget: budget.id }))}
                        data-testid={`radio-budget-${budget.id}`}
                      >
                        <RadioGroupItem value={budget.id} id={budget.id} />
                        <div className="flex-1">
                          <Label htmlFor={budget.id} className="font-semibold cursor-pointer">
                            {budget.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{budget.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    * Preise basieren auf durchschnittlichen Münchner Handwerkerpreisen (Stand 2024/2025)
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step6"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep6}
                  size="lg"
                  data-testid="button-next-step6"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Wann soll es losgehen?</h2>
                <p className="text-muted-foreground">Zeitplan und kurze Beschreibung Ihres Projekts</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label className="text-base font-medium">Gewünschter Zeitraum</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      {[
                        { id: "sofort", label: "Sofort / Notfall" },
                        { id: "2-wochen", label: "In 2 Wochen" },
                        { id: "1-monat", label: "In 1 Monat" },
                        { id: "flexibel", label: "Flexibel" },
                      ].map((option) => (
                        <Button
                          key={option.id}
                          type="button"
                          variant={formData.timeline === option.id ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setFormData(prev => ({ ...prev, timeline: option.id }))}
                          data-testid={`button-timeline-${option.id}`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="urgent"
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isUrgent: checked === true }))
                      }
                      data-testid="checkbox-urgent"
                    />
                    <Label htmlFor="urgent" className="cursor-pointer">
                      Dringend / Notfall (z.B. Wasserschaden, Heizungsausfall)
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-medium">
                      Beschreiben Sie Ihr Projekt kurz *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="z.B.: 3-Zimmer-Wohnung Altbau, Wände sollen weiß gestrichen werden, alte Tapete muss entfernt werden..."
                      className="mt-2 min-h-28"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      data-testid="input-description"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Mindestens 10 Zeichen ({formData.description.length}/10)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step7"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceedStep7}
                  size="lg"
                  data-testid="button-next-step7"
                >
                  Weiter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Fast geschafft – wie erreichen wir Sie?</h2>
                <p className="text-muted-foreground">Wir verbinden Sie schnell mit dem richtigen Handwerker</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Ihr vollständiger Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Ihre Telefonnummer"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ihre@email.de"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                      data-testid="input-email"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postleitzahl *</Label>
                      <Input
                        id="postalCode"
                        placeholder="z.B. 80331"
                        value={formData.postalCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                        className="mt-1"
                        data-testid="input-postalCode"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Stadt</Label>
                      <Input
                        id="city"
                        placeholder="München"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="mt-1"
                        data-testid="input-city"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-4 border-t">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, privacyAccepted: checked === true }))
                      }
                      data-testid="checkbox-privacy"
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                      Ich habe die <Link href="/datenschutz" className="text-primary underline">Datenschutzerklärung</Link> gelesen 
                      und bin mit der Verarbeitung meiner Daten einverstanden. Ich stimme zu, dass meine Anfrage 
                      zur Kontaktaufnahme und Angebotserstellung genutzt wird. *
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Ihre Daten sind sicher</p>
                      <p className="text-muted-foreground">
                        Wir geben Ihre Daten nur an geprüfte Partnerbetriebe weiter und behandeln sie vertraulich.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-700 dark:text-green-400">Leistungsangebot in 48 Stunden</p>
                      <p className="text-muted-foreground">
                        Sie erhalten innerhalb von 48 Stunden ein detailliertes Leistungsangebot von uns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                  data-testid="button-back-step8"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedStep8 || submitMutation.isPending}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600"
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Kostenlos anfragen
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">100% kostenlos</p>
                <p className="text-xs text-muted-foreground">Unverbindliche Anfrage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Geprüfte Betriebe</p>
                <p className="text-xs text-muted-foreground">Geprüfte Fachbetriebe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Leistungsangebot in 48h</p>
                <p className="text-xs text-muted-foreground">Detailliertes Angebot</p>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  Phone,
  Loader2,
  Mail,
  MapPin,
  PaintBucket,
  Plug,
  Droplets,
  Thermometer,
  Layers,
  Wrench,
  Handshake,
  Clock
} from "lucide-react";
import { Link } from "wouter";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "bodensanierung", title: "Bodensanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung" },
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

interface FormData {
  trades: string[];
  description: string;
  timeline: string;
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
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    trades: [],
    description: "",
    timeline: "flexibel",
    name: "",
    phone: "",
    email: "",
    postalCode: "",
    city: "München",
    privacyAccepted: false,
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const leadData = {
        service: "handwerker-vermittlung",
        propertyType: "wohnung",
        serviceDetails: { trades: data.trades },
        timeline: data.timeline,
        description: data.description,
        name: data.name,
        phone: data.phone,
        email: data.email,
        postalCode: data.postalCode,
        city: data.city,
        additionalNotes: `Gewünschte Gewerke: ${data.trades.map(t => tradeOptions.find(o => o.id === t)?.label).join(", ")}`,
      };
      return apiRequest("POST", "/api/leads", leadData);
    },
    onSuccess: () => {
      setLocation("/danke");
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const toggleTrade = (tradeId: string) => {
    setFormData(prev => ({
      ...prev,
      trades: prev.trades.includes(tradeId)
        ? prev.trades.filter(t => t !== tradeId)
        : [...prev.trades, tradeId]
    }));
  };

  const canProceedStep1 = formData.trades.length > 0;
  const canProceedStep2 = formData.description.length >= 20;
  const canProceedStep3 = 
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
    if (canProceedStep3) {
      submitMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight text-white">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
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

      <main className="pt-20 pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Handwerker-Vermittlung</h1>
            <p className="text-muted-foreground">
              Wir vermitteln Sie an geprüfte Meisterbetriebe in München
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Schritt {step} von {totalSteps}</span>
              <span>{Math.round(progress)}% abgeschlossen</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Welches Gewerk benötigen Sie?</h2>
                <p className="text-muted-foreground">Wählen Sie ein oder mehrere Gewerke aus</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tradeOptions.map((trade) => {
                  const isSelected = formData.trades.includes(trade.id);
                  return (
                    <Card
                      key={trade.id}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover-elevate"
                      }`}
                      onClick={() => toggleTrade(trade.id)}
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

              <div className="flex justify-end pt-6">
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
                <h2 className="text-xl font-semibold mb-2">Beschreiben Sie Ihr Projekt</h2>
                <p className="text-muted-foreground">Je detaillierter, desto besser können wir Ihnen helfen</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="description" className="text-base font-medium">
                      Was soll gemacht werden? *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Beschreiben Sie hier Ihr Projekt, z.B.: Wände in 3-Zimmer-Wohnung streichen, ca. 80m² Wohnfläche, weiße Farbe, Decken müssen nicht gestrichen werden..."
                      className="mt-2 min-h-32"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      data-testid="input-description"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Mindestens 20 Zeichen ({formData.description.length}/20)
                    </p>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Wann soll es losgehen?</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                      {[
                        { id: "sofort", label: "Sofort" },
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
                </CardContent>
              </Card>

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
                <h2 className="text-xl font-semibold mb-2">Ihre Kontaktdaten</h2>
                <p className="text-muted-foreground">Damit wir Sie mit dem passenden Handwerker verbinden können</p>
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
                  onClick={handleSubmit}
                  disabled={!canProceedStep3 || submitMutation.isPending}
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
                <p className="text-xs text-muted-foreground">Nur Meisterbetriebe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Schnelle Rückmeldung</p>
                <p className="text-xs text-muted-foreground">Innerhalb von 24h</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-[hsl(220,85%,10%)] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <span>|</span>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <span>|</span>
            <Link href="/agb" className="hover:text-white">AGB</Link>
            <span>|</span>
            <a href="tel:+4915212274043" className="hover:text-white flex items-center gap-1">
              <Phone className="w-3 h-3" />
              0152 122 740 43
            </a>
            <span>|</span>
            <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="hover:text-white flex items-center gap-1">
              <Mail className="w-3 h-3" />
              info@komplettsanierungen-haus-wohnung.de
            </a>
          </div>
          <p className="text-center text-xs text-white/50 mt-4">
            © 2025 KSHW München. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

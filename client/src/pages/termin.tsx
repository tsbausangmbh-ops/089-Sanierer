import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, CalendarDays, PhoneCall, User, Mail, MessageSquare, MapPin, Loader2, CheckCircle, Clock } from "lucide-react";
import { SeoHead } from "@/components/seo-head";
import { AppointmentBooking } from "@/components/appointment-booking";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";
import terminHeroImage from "@assets/generated_images/terminbuchung_kalender.webp";

const terminHeroContent: HeroContent = {
  backgroundImage: terminHeroImage,
  imageAlt: "Kostenlosen Beratungstermin buchen – Sanierungsberatung vor Ort in München",
  badge: "Ihr persönlicher Beratungstermin",
  titleLine1: "Sanierung München Termin – Kostenlose Beratung & Besichtigung vor Ort.",
  titleLine2: "Festpreis-Angebot in 48h. Unverbindlich.",
  descriptions: ["Exklusive Vor-Ort-Beratung durch Ihren persönlichen Bauleiter.", "Detailliertes Festpreis-Konzept in 48h."],
  strongText: "100% kostenlos – ohne Verpflichtung.",
  ctaText: "Jetzt exklusiven Termin wählen",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe vor Ort", "Festpreis in 48h"],
  dataTestIdPrefix: "termin"
};

const callbackServiceOptions = [
  { value: "komplettsanierung", label: "Komplettsanierung" },
  { value: "badsanierung", label: "Badsanierung" },
  { value: "kuechensanierung", label: "Küchensanierung" },
  { value: "bodensanierung", label: "Bodensanierung" },
  { value: "elektrosanierung", label: "Elektrosanierung" },
  { value: "heizungssanierung", label: "Heizungssanierung" },
  { value: "energetische-sanierung", label: "Energetische Sanierung" },
  { value: "dachsanierung", label: "Dachsanierung" },
];

function CallbackRequest() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
  });

  const callbackMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/appointments", {
        ...data,
        preferredDate: format(new Date(), "yyyy-MM-dd"),
        preferredTime: "R\u00fcckruf erbeten",
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "R\u00fcckruf angefordert",
        description: "Wir rufen Sie schnellstm\u00f6glich zur\u00fcck.",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "R\u00fcckruf konnte nicht angefordert werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      toast({
        title: "Datenschutz",
        description: "Bitte akzeptieren Sie die Datenschutzerkl\u00e4rung.",
        variant: "destructive",
      });
      return;
    }
    callbackMutation.mutate(formData);
  };

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">R\u00fcckruf angefordert!</h3>
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4" data-testid="text-callback-success-badge">
            <Phone className="w-4 h-4" />
            Wir melden uns bei Ihnen
          </div>
          <p className="text-muted-foreground mb-4">
            Unser Team ruft Sie <strong>schnellstm\u00f6glich</strong> unter der angegebenen Nummer zur\u00fcck.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            \u00dcbliche R\u00fcckrufzeit: innerhalb von 2 Stunden (Mo-Fr)
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-primary" />
          R\u00fcckruf anfordern
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Wir rufen Sie kostenlos zur\u00fcck \u2013 schnell und unkompliziert.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cb-service">Service</Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
            >
              <SelectTrigger data-testid="select-callback-service">
                <SelectValue placeholder="Welcher Bereich interessiert Sie?" />
              </SelectTrigger>
              <SelectContent>
                {callbackServiceOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cb-name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="cb-name"
                placeholder="Ihr vollst\u00e4ndiger Name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="pl-10"
                required
                data-testid="input-callback-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cb-phone">Telefon</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="cb-phone"
                type="tel"
                placeholder="Unter welcher Nummer erreichen wir Sie?"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="pl-10"
                required
                data-testid="input-callback-phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cb-email">E-Mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="cb-email"
                type="email"
                placeholder="ihre@email.de"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                required
                data-testid="input-callback-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cb-address">Adresse (Ort der Sanierung)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="cb-address"
                placeholder="Stra\u00dfe, PLZ Ort"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="pl-10"
                required
                data-testid="input-callback-address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cb-message">Nachricht (optional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="cb-message"
                placeholder="Worum geht es? Gibt es etwas, das wir wissen sollten?"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="pl-10 min-h-[80px]"
                data-testid="textarea-callback-message"
              />
            </div>
          </div>

          <div className="flex items-start space-x-3 py-2">
            <Checkbox
              id="privacy-callback"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
              data-testid="checkbox-privacy-callback"
            />
            <Label htmlFor="privacy-callback" className="text-sm font-normal leading-relaxed cursor-pointer">
              Ich stimme der Verarbeitung meiner Daten gem\u00e4\u00df der <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerkl\u00e4rung</Link> zu. *
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={callbackMutation.isPending || !formData.name || !formData.phone || !formData.email || !formData.service || !privacyAccepted}
            data-testid="button-submit-callback"
          >
            {callbackMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4 mr-2" />
                Jetzt R\u00fcckruf anfordern
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Kostenlos und unverbindlich. R\u00fcckruf i.d.R. innerhalb von 2 Stunden (Mo-Fr).
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function TerminPage() {
  const [mode, setMode] = useState<"termin" | "rueckruf">("termin");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Sanierung München Termin | Kostenlose Beratung vor Ort"
        description="Sanierung München: Jetzt kostenlosen Beratungstermin buchen oder R\u00fcckruf anfordern. Experte kommt zu Ihnen, Festpreis-Angebot in 48h. Online-Terminbuchung Mo-Fr 8:00-16:30 Uhr."
        keywords="Sanierung München Termin, Beratung Renovierung München, Handwerker Termin buchen, Sanierung Besichtigung kostenlos, R\u00fcckruf Sanierung München, Badsanierung München Termin online buchen, Komplettsanierung Beratungstermin München, kostenlose Besichtigung Sanierung München, Handwerker München Termin vereinbaren, Renovierung München Vor-Ort-Termin, Sanierung München Kalender online, 089-Sanierer Terminbuchung, Sanierung München 24h R\u00fcckmeldung"
        canonicalPath="/termin"
      />
      <SiteHeader />
      <GlobalHero content={terminHeroContent} />
      <Breadcrumb items={[{ label: "Termin buchen" }]} />

      <main className="flex-1 pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="flex gap-2 mb-6">
            <Button
              variant={mode === "termin" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setMode("termin")}
              data-testid="button-mode-termin"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Termin buchen
            </Button>
            <Button
              variant={mode === "rueckruf" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setMode("rueckruf")}
              data-testid="button-mode-rueckruf"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              R\u00fcckruf erbitten
            </Button>
          </div>

          {mode === "termin" ? <AppointmentBooking /> : <CallbackRequest />}

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">Alternativ erreichen Sie uns auch telefonisch:</p>
            <a 
              href="tel:+498944438872"
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              <Phone className="w-4 h-4" />
              089 444 438 872
            </a>
            <p className="mt-1">Mo-Fr 08:00\u201316:30 Uhr</p>
          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}

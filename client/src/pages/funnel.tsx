import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Bath,
  UtensilsCrossed,
  Layers,
  Zap,
  Flame,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  Building2,
  Building,
  Store,
  Shield,
  Award,
  Clock,
  Users,
  Star,
  Phone,
  Leaf,
  Hammer,
} from "lucide-react";

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: HomeIcon, benefit: "Alles aus einer Hand" },
  { id: "badsanierung", title: "Badsanierung", icon: Bath, benefit: "In 2-3 Wochen fertig" },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed, benefit: "Traumküche realisieren" },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers, benefit: "Parkett, Fliesen, Vinyl" },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap, benefit: "Sicher nach VDE" },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame, benefit: "Energiekosten senken" },
  { id: "energetische-sanierung", title: "Energetische Sanierung", icon: Leaf, benefit: "KfW-Förderung nutzen" },
  { id: "dachsanierung", title: "Dachsanierung", icon: Hammer, benefit: "Dämmung & Eindeckung" },
];

const propertyTypes = [
  { id: "wohnung", title: "Wohnung", icon: Building2, description: "Eigentums- oder Mietwohnung" },
  { id: "einfamilienhaus", title: "Einfamilienhaus", icon: HomeIcon, description: "Ihr Eigenheim" },
  { id: "mehrfamilienhaus", title: "Mehrfamilienhaus", icon: Building, description: "Mehrere Wohneinheiten" },
  { id: "gewerbe", title: "Gewerbe", icon: Store, description: "Büro, Laden, Praxis" },
];

const trustBadges = [
  { icon: Shield, label: "100% Versichert" },
  { icon: Award, label: "Meisterqualität" },
  { icon: Clock, label: "Pünktlich" },
  { icon: Users, label: "268 Projekte" },
];

const nlpBenefits = [
  "Kostenlose Beratung vor Ort in München",
  "Unverbindliches Angebot innerhalb 48h",
  "Festpreisgarantie ohne versteckte Kosten",
  "Persönlicher Ansprechpartner für Ihr Projekt",
];

const formSchema = z.object({
  service: z.string().min(1, "Bitte wählen Sie eine Leistung"),
  propertyType: z.string().min(1, "Bitte wählen Sie einen Objekttyp"),
  description: z.string().min(10, "Bitte beschreiben Sie Ihr Projekt (mind. 10 Zeichen)"),
  isUrgent: z.boolean().default(false),
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  phone: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein"),
  mobile: z.string().optional(),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  address: z.string().min(5, "Bitte geben Sie Ihre Adresse ein"),
  postalCode: z.string().min(4, "Bitte geben Sie Ihre Postleitzahl ein"),
  datenschutz: z.boolean().refine(val => val === true, "Bitte akzeptieren Sie die Datenschutzerklärung"),
});

type FormData = z.infer<typeof formSchema>;

export default function Funnel() {
  const [step, setStep] = useState(1);
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      propertyType: "",
      description: "",
      isUrgent: false,
      name: "",
      phone: "",
      mobile: "",
      email: "",
      address: "",
      postalCode: "",
      datenschutz: false,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const serviceParam = params.get("service");
    if (serviceParam && services.some(s => s.id === serviceParam)) {
      form.setValue("service", serviceParam);
    }
  }, [searchString, form]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { datenschutz, ...leadData } = data;
      const response = await apiRequest("POST", "/api/leads", leadData);
      return response.json();
    },
    onSuccess: () => {
      navigate("/bestaetigung");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      });
      console.error("Submit error:", error);
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["service", "propertyType"];
    } else if (step === 2) {
      fieldsToValidate = ["description"];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const selectedService = services.find(s => s.id === form.watch("service"));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" data-testid="link-home">
            <HomeIcon className="w-5 h-5 text-primary" />
            <span className="font-bold">KSHW München</span>
          </a>
          <a 
            href="tel:+4915212274043"
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium"
            data-testid="link-phone-header"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">0152 122 740 43</span>
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                        s < step
                          ? "bg-green-500 text-white"
                          : s === step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                      data-testid={`step-indicator-${s}`}
                    >
                      {s < step ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${
                          s < step ? "bg-green-500" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Leistung wählen</span>
                <span>Projekt beschreiben</span>
                <span>Angebot erhalten</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                        Ihre Sanierung in München starten
                      </h1>
                      <p className="text-muted-foreground">
                        Wählen Sie Ihre gewünschte Leistung – wir melden uns innerhalb von 24 Stunden bei Ihnen.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        Was möchten Sie sanieren lassen?
                        <Badge variant="secondary" className="text-xs">Schritt 1</Badge>
                      </h2>
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {services.map((service) => (
                                  <Card
                                    key={service.id}
                                    className={`p-3 cursor-pointer hover-elevate active-elevate-2 transition-all ${
                                      field.value === service.id
                                        ? "ring-2 ring-primary bg-primary/5"
                                        : ""
                                    }`}
                                    onClick={() => field.onChange(service.id)}
                                    data-testid={`select-service-${service.id}`}
                                  >
                                    <div className="flex flex-col items-center text-center gap-2">
                                      <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                          field.value === service.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-primary/10 text-primary"
                                        }`}
                                      >
                                        <service.icon className="w-5 h-5" />
                                      </div>
                                      <span className="font-medium text-sm">
                                        {service.title}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {service.benefit}
                                      </span>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        Um welches Objekt handelt es sich?
                        <Badge variant="secondary" className="text-xs">Schritt 2</Badge>
                      </h2>
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {propertyTypes.map((property) => (
                                  <Card
                                    key={property.id}
                                    className={`p-3 cursor-pointer hover-elevate active-elevate-2 transition-all ${
                                      field.value === property.id
                                        ? "ring-2 ring-primary bg-primary/5"
                                        : ""
                                    }`}
                                    onClick={() => field.onChange(property.id)}
                                    data-testid={`select-property-${property.id}`}
                                  >
                                    <div className="flex flex-col items-center text-center gap-2">
                                      <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                          field.value === property.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-primary/10 text-primary"
                                        }`}
                                      >
                                        <property.icon className="w-5 h-5" />
                                      </div>
                                      <span className="font-medium text-sm">
                                        {property.title}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {property.description}
                                      </span>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                        Erzählen Sie uns von Ihrem Projekt
                      </h1>
                      <p className="text-muted-foreground">
                        Je mehr Details Sie uns geben, desto genauer können wir Ihr Angebot kalkulieren.
                      </p>
                    </div>

                    {selectedService && (
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <selectedService.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{selectedService.title}</p>
                          <p className="text-sm text-muted-foreground">{selectedService.benefit}</p>
                        </div>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            Projektbeschreibung
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Beispiel: Ich möchte mein 20 Jahre altes Bad komplett sanieren lassen. Das Bad ist ca. 8 qm groß. Ich wünsche mir eine bodengleiche Dusche und neue Fliesen..."
                              className="min-h-32"
                              data-testid="input-description"
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">
                            Tipp: Größe, aktueller Zustand und besondere Wünsche helfen uns bei der Kalkulation.
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isUrgent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-lg bg-accent/30 border border-accent/50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-urgent"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer font-semibold">
                              Ja, ich habe es eilig!
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Priorisierte Bearbeitung – wir rufen Sie noch heute zurück.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                        Fast geschafft – Ihr kostenloses Angebot wartet!
                      </h1>
                      <p className="text-muted-foreground">
                        Tragen Sie Ihre Kontaktdaten ein und wir melden uns schnellstmöglich bei Ihnen.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ihr Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Max Mustermann"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-Mail-Adresse *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="max@beispiel.de"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefonnummer *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="089 123 456 789"
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Handynummer (optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="0170 123 456 789"
                                data-testid="input-mobile"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Straße und Hausnummer *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Musterstraße 123"
                                data-testid="input-address"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PLZ und Ort *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="80331 München"
                                data-testid="input-postalcode"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="datenschutz"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-datenschutz"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer text-sm">
                              Ich habe die <a href="/datenschutz" className="text-primary underline" target="_blank">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu. *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex justify-between gap-4 mt-6 pt-4 border-t">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      data-testid="button-back"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      size="lg"
                      data-testid="button-next"
                    >
                      Weiter
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={mutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? "Wird gesendet..." : "Kostenloses Angebot anfordern"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Das erwartet Sie
                </h3>
                <ul className="space-y-2">
                  {nlpBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium">
                        {i === 1 ? "MK" : i === 2 ? "TS" : "JW"}
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Super Arbeit bei unserer Badsanierung in Schwabing. Pünktlich, sauber und professionell!"
                </p>
                <p className="text-xs text-muted-foreground mt-2">– M. Kramer, München</p>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded-md">
                    <badge.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href="/impressum" className="hover:underline" data-testid="link-impressum">Impressum</a>
          <a href="/datenschutz" className="hover:underline" data-testid="link-datenschutz">Datenschutz</a>
          <a href="/agb" className="hover:underline" data-testid="link-agb">AGB</a>
          <span>KSHW München - Komplettsanierungen Haus & Wohnung</span>
        </div>
      </footer>
    </div>
  );
}

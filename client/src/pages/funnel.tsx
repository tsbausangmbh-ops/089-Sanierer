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
} from "lucide-react";

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: HomeIcon },
  { id: "badsanierung", title: "Badsanierung", icon: Bath },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame },
];

const propertyTypes = [
  { id: "wohnung", title: "Wohnung", icon: Building2 },
  { id: "einfamilienhaus", title: "Einfamilienhaus", icon: HomeIcon },
  { id: "mehrfamilienhaus", title: "Mehrfamilienhaus", icon: Building },
  { id: "gewerbe", title: "Gewerbe", icon: Store },
];

const trustBadges = [
  { icon: Shield, label: "Vollversichert" },
  { icon: Award, label: "Meisterbetrieb" },
  { icon: Clock, label: "Termingerecht" },
  { icon: Users, label: "20+ Jahre" },
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
      const response = await apiRequest("POST", "/api/leads", data);
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <HomeIcon className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">KSHW München</span>
          </a>
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-1">
                <badge.icon className="w-4 h-4" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    s < step
                      ? "bg-primary text-primary-foreground"
                      : s === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  data-testid={`step-indicator-${s}`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      s < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Leistung & Objekt</span>
            <span>Projektdetails</span>
            <span>Kontaktdaten</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    Welche Sanierungsleistung benötigen Sie in München?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Wählen Sie die gewünschte Leistung für Ihr Projekt in München und Umgebung.
                  </p>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {services.map((service) => (
                              <Card
                                key={service.id}
                                className={`p-4 cursor-pointer hover-elevate active-elevate-2 transition-all ${
                                  field.value === service.id
                                    ? "ring-2 ring-primary"
                                    : ""
                                }`}
                                onClick={() => field.onChange(service.id)}
                                data-testid={`select-service-${service.id}`}
                              >
                                <div className="flex flex-col items-center text-center gap-3">
                                  <div
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                      field.value === service.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-primary/10 text-primary"
                                    }`}
                                  >
                                    <service.icon className="w-6 h-6" />
                                  </div>
                                  <span className="font-medium text-sm">
                                    {service.title}
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
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    Welches Objekt in München möchten Sie sanieren?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Wählen Sie den Objekttyp Ihrer Münchner Immobilie.
                  </p>
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {propertyTypes.map((property) => (
                              <Card
                                key={property.id}
                                className={`p-4 cursor-pointer hover-elevate active-elevate-2 transition-all ${
                                  field.value === property.id
                                    ? "ring-2 ring-primary"
                                    : ""
                                }`}
                                onClick={() => field.onChange(property.id)}
                                data-testid={`select-property-${property.id}`}
                              >
                                <div className="flex flex-col items-center text-center gap-3">
                                  <div
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                      field.value === property.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-primary/10 text-primary"
                                    }`}
                                  >
                                    <property.icon className="w-6 h-6" />
                                  </div>
                                  <span className="font-medium text-sm">
                                    {property.title}
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
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    Beschreiben Sie Ihr Sanierungsprojekt in München
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Je mehr Details Sie uns geben, desto besser können wir Sie für Ihr Münchner Projekt beraten.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projektbeschreibung</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Beschreiben Sie Ihr Renovierungsprojekt: Welche Räume sollen saniert werden? Was ist der aktuelle Zustand? Haben Sie besondere Wünsche?"
                          className="min-h-32"
                          data-testid="input-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isUrgent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-lg bg-accent/20">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-urgent"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Dringende Anfrage
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Aktivieren Sie dies, wenn Sie eine schnelle Rückmeldung benötigen.
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
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                    Ihre Kontaktdaten für München
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Wie können wir Sie für ein kostenloses Beratungsgespräch in München erreichen?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefonnummer</FormLabel>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>E-Mail-Adresse</FormLabel>
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Straße und Hausnummer</FormLabel>
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
                        <FormLabel>Postleitzahl</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="80331"
                            data-testid="input-postalcode"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between gap-4 mt-8 pt-6 border-t">
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
                  data-testid="button-next"
                >
                  Weiter
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  data-testid="button-submit"
                >
                  {mutation.isPending ? "Wird gesendet..." : "Anfrage absenden"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}

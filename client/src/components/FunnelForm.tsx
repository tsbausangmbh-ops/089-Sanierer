import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wrench, CloudLightning, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ServiceCard } from "./ServiceCard";
import { StepIndicator } from "./StepIndicator";

const services = [
  {
    id: "dacharbeiten",
    icon: Wrench,
    title: "Dacharbeiten",
    description: "Reparaturen, Neueindeckungen und Wartungsarbeiten an Ihrem Dach.",
  },
  {
    id: "sturmschaden",
    icon: CloudLightning,
    title: "Sturmschaden",
    description: "Schnelle Hilfe bei Schäden durch Sturm, Hagel oder andere Unwetter.",
  },
  {
    id: "notdienst",
    icon: Phone,
    title: "Notdienst",
    description: "24 Stunden erreichbar für dringende Dachreparaturen und Notfälle.",
  },
];

const formSchema = z.object({
  service: z.string().min(1, "Bitte wählen Sie einen Service"),
  description: z.string().min(10, "Bitte beschreiben Sie Ihr Anliegen (min. 10 Zeichen)"),
  isUrgent: z.boolean().default(false),
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  phone: z.string().min(6, "Bitte geben Sie eine gültige Telefonnummer ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  address: z.string().min(5, "Bitte geben Sie Ihre Adresse ein"),
  postalCode: z.string().min(4, "Bitte geben Sie Ihre Postleitzahl ein"),
});

type FormData = z.infer<typeof formSchema>;

interface FunnelFormProps {
  onSubmit: (data: FormData) => void;
}

export function FunnelForm({ onSubmit }: FunnelFormProps) {
  const [step, setStep] = useState(0);
  const steps = ["Service", "Details", "Kontakt"];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      description: "",
      isUrgent: false,
      name: "",
      phone: "",
      email: "",
      address: "",
      postalCode: "",
    },
  });

  const selectedService = form.watch("service");

  const handleNext = async () => {
    let isValid = false;

    if (step === 0) {
      isValid = await form.trigger("service");
    } else if (step === 1) {
      isValid = await form.trigger(["description"]);
    } else if (step === 2) {
      isValid = await form.trigger(["name", "phone", "email", "address", "postalCode"]);
      if (isValid) {
        form.handleSubmit(onSubmit)();
        return;
      }
    }

    if (isValid && step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator steps={steps} currentStep={step} />

      <Form {...form}>
        <form className="space-y-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6">
                Welchen Service benötigen Sie?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    isSelected={selectedService === service.id}
                    onClick={() => form.setValue("service", service.id, { shouldValidate: true })}
                  />
                ))}
              </div>
              {form.formState.errors.service && (
                <p className="text-sm text-destructive text-center">
                  {form.formState.errors.service.message}
                </p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                Beschreiben Sie Ihr Anliegen
              </h2>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Projektbeschreibung *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Was können wir für Sie tun? Beschreiben Sie bitte kurz Ihr Anliegen..."
                        className="min-h-32"
                        data-testid="input-description"
                        {...field}
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-urgent"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Dringend - Ich benötige schnelle Hilfe</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                Ihre Kontaktdaten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max Mustermann"
                          data-testid="input-name"
                          {...field}
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
                      <FormLabel>Telefon *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+49 89 123456789"
                          data-testid="input-phone"
                          {...field}
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
                      <FormLabel>E-Mail *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="ihre@email.de"
                          data-testid="input-email"
                          {...field}
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
                      <FormLabel>Adresse *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Musterstraße 123"
                          data-testid="input-address"
                          {...field}
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
                      <FormLabel>PLZ *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="80331"
                          data-testid="input-postal-code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between gap-4 pt-4">
            {step > 0 ? (
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                data-testid="button-back"
              >
                Zurück
              </Button>
            ) : (
              <div />
            )}
            <Button
              type="button"
              onClick={handleNext}
              data-testid="button-next"
            >
              {step === 2 ? "Anfrage senden" : "Weiter"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

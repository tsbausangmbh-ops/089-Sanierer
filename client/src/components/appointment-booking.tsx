import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CalendarDays, Clock, User, Phone, Mail, Loader2, CheckCircle, MessageSquare } from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import { de } from "date-fns/locale";

interface AppointmentBookingProps {
  preSelectedService?: string;
  onSuccess?: () => void;
}

const serviceOptions = [
  { value: "komplettsanierung", label: "Komplettsanierung" },
  { value: "badsanierung", label: "Badsanierung" },
  { value: "kuechensanierung", label: "Küchensanierung" },
  { value: "bodensanierung", label: "Bodensanierung" },
  { value: "elektrosanierung", label: "Elektrosanierung" },
  { value: "heizungssanierung", label: "Heizungssanierung" },
  { value: "energetische-sanierung", label: "Energetische Sanierung" },
  { value: "dachsanierung", label: "Dachsanierung" },
];

export function AppointmentBooking({ preSelectedService, onSuccess }: AppointmentBookingProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<"date" | "time" | "contact" | "success">("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preSelectedService || "",
    message: "",
  });

  const dateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const { data: availabilityData, isLoading: loadingSlots } = useQuery<{ date: string; slots: string[] }>({
    queryKey: ["/api/calendar/availability", dateString],
    queryFn: async () => {
      const res = await fetch(`/api/calendar/availability?date=${dateString}`);
      if (!res.ok) throw new Error("Fehler beim Laden");
      return res.json();
    },
    enabled: !!selectedDate && step === "time",
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof formData & { preferredDate: string; preferredTime: string }) => {
      return apiRequest("POST", "/api/appointments", data);
    },
    onSuccess: () => {
      setStep("success");
      queryClient.invalidateQueries({ queryKey: ["/api/calendar/availability"] });
      toast({
        title: "Termin angefragt",
        description: "Wir bestätigen Ihren Termin in Kürze per E-Mail.",
      });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Termin konnte nicht gebucht werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep("time");
      setSelectedTime("");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("contact");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    bookingMutation.mutate({
      ...formData,
      preferredDate: format(selectedDate, "yyyy-MM-dd"),
      preferredTime: selectedTime,
    });
  };

  const minDate = addDays(new Date(), 1);
  const maxDate = addDays(new Date(), 60);

  const isDateDisabled = (date: Date) => {
    return date < minDate || date > maxDate || isWeekend(date);
  };

  if (step === "success") {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Terminanfrage gesendet!</h3>
          <p className="text-muted-foreground mb-4">
            Wir haben Ihre Anfrage für den{" "}
            <strong>{selectedDate && format(selectedDate, "dd. MMMM yyyy", { locale: de })}</strong> um{" "}
            <strong>{selectedTime} Uhr</strong> erhalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Sie erhalten in Kürze eine Bestätigung per E-Mail.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          Beratungstermin buchen
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <span className={step === "date" ? "text-primary font-medium" : ""}>1. Datum</span>
          <span className="text-muted-foreground/50">-</span>
          <span className={step === "time" ? "text-primary font-medium" : ""}>2. Uhrzeit</span>
          <span className="text-muted-foreground/50">-</span>
          <span className={step === "contact" ? "text-primary font-medium" : ""}>3. Kontakt</span>
        </div>
      </CardHeader>
      <CardContent>
        {step === "date" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Wählen Sie einen Tag für Ihren kostenlosen Beratungstermin:
            </p>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                locale={de}
                className="rounded-md border"
                data-testid="calendar-date-picker"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Termine verfügbar: Mo-Fr, 08:00-17:00 Uhr
            </p>
          </div>
        )}

        {step === "time" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("date")}
                data-testid="button-back-to-date"
              >
                Zurück
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedDate && format(selectedDate, "EEEE, dd. MMMM yyyy", { locale: de })}
              </span>
            </div>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Lade verfügbare Zeiten...</span>
              </div>
            ) : availabilityData?.slots && availabilityData.slots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availabilityData.slots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="flex items-center gap-1"
                    onClick={() => handleTimeSelect(time)}
                    data-testid={`button-time-${time.replace(":", "")}`}
                  >
                    <Clock className="w-3 h-3" />
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Keine Termine an diesem Tag verfügbar.</p>
                <Button
                  variant="ghost"
                  onClick={() => setStep("date")}
                  className="mt-2"
                >
                  Anderen Tag wählen
                </Button>
              </div>
            )}
          </div>
        )}

        {step === "contact" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep("time")}
                data-testid="button-back-to-time"
              >
                Zurück
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedDate && format(selectedDate, "dd.MM.yyyy", { locale: de })} um {selectedTime} Uhr
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
              >
                <SelectTrigger data-testid="select-service">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Ihr vollständiger Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                  required
                  data-testid="input-appointment-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                  required
                  data-testid="input-appointment-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0151 12345678"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                  required
                  data-testid="input-appointment-phone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Nachricht (optional)</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="message"
                  placeholder="Kurze Beschreibung Ihres Projekts..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="pl-10 min-h-[80px]"
                  data-testid="textarea-appointment-message"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={bookingMutation.isPending || !formData.name || !formData.email || !formData.phone || !formData.service}
              data-testid="button-submit-appointment"
            >
              {bookingMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Termin anfragen
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Sie erhalten eine Bestätigung per E-Mail. Der Termin ist unverbindlich.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

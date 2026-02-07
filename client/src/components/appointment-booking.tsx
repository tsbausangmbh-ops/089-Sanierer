import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CalendarDays, Clock, User, Phone, Mail, Loader2, CheckCircle, MessageSquare, MapPin } from "lucide-react";
import { format, addDays, isSunday } from "date-fns";
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
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: preSelectedService || "",
    message: "",
  });

  const dateString = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const currentYear = calendarMonth.getFullYear();
  const currentMonth = calendarMonth.getMonth() + 1;
  const nextMonthDate = new Date(currentYear, calendarMonth.getMonth() + 1, 1);
  const nextYear = nextMonthDate.getFullYear();
  const nextMonth = nextMonthDate.getMonth() + 1;

  const { data: bookedCurrent } = useQuery<{ bookedDays: string[] }>({
    queryKey: ["/api/calendar/booked-days", currentYear, currentMonth],
    queryFn: async () => {
      const res = await fetch(`/api/calendar/booked-days?year=${currentYear}&month=${currentMonth}`);
      if (!res.ok) throw new Error("Fehler");
      return res.json();
    },
  });

  const { data: bookedNext } = useQuery<{ bookedDays: string[] }>({
    queryKey: ["/api/calendar/booked-days", nextYear, nextMonth],
    queryFn: async () => {
      const res = await fetch(`/api/calendar/booked-days?year=${nextYear}&month=${nextMonth}`);
      if (!res.ok) throw new Error("Fehler");
      return res.json();
    },
  });

  const bookedDaysSet = new Set<string>([
    ...(bookedCurrent?.bookedDays || []),
    ...(bookedNext?.bookedDays || []),
  ]);

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
    if (!privacyAccepted) {
      toast({
        title: "Datenschutz",
        description: "Bitte akzeptieren Sie die Datenschutzerklärung.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate({
      ...formData,
      preferredDate: format(selectedDate, "yyyy-MM-dd"),
      preferredTime: selectedTime,
    });
  };

  const minDate = addDays(new Date(), 1);
  const maxDate = addDays(new Date(), 60);

  const isDateDisabled = (date: Date) => {
    if (date < minDate || date > maxDate || isSunday(date)) return true;
    const ds = format(date, "yyyy-MM-dd");
    return bookedDaysSet.has(ds);
  };

  if (step === "success") {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Terminanfrage gesendet!</h3>
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4" data-testid="text-appointment-email-badge">
            <Mail className="w-4 h-4" />
            Bestätigungs-E-Mail wurde versendet
          </div>
          <p className="text-muted-foreground mb-4">
            Wir haben Ihre Anfrage für den{" "}
            <strong>{selectedDate && format(selectedDate, "dd. MMMM yyyy", { locale: de })}</strong> um{" "}
            <strong>{selectedTime} Uhr</strong> erhalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Sie haben eine Bestätigung per E-Mail erhalten. Bitte prüfen Sie auch Ihren Spam-Ordner.
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
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                className="rounded-md border"
                data-testid="calendar-date-picker"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-primary/15 border border-primary/30" />
                <span>Verfügbar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-muted line-through opacity-50" />
                <span>Belegt</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Mo–Sa, 08:00–16:30 Uhr
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
              <Label htmlFor="address">Adresse (Ort der Sanierung)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="Straße, PLZ Ort"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  className="pl-10"
                  required
                  data-testid="input-appointment-address"
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

            <div className="flex items-start space-x-3 py-2">
              <Checkbox
                id="privacy-appointment"
                checked={privacyAccepted}
                onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                data-testid="checkbox-privacy-appointment"
              />
              <Label htmlFor="privacy-appointment" className="text-sm font-normal leading-relaxed cursor-pointer">
                Ich stimme der Verarbeitung meiner Daten gemäß der <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> zu. *
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={bookingMutation.isPending || !formData.name || !formData.email || !formData.phone || !formData.service || !privacyAccepted}
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

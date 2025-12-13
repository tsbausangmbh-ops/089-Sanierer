import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { MessageCircle, X, Send, Bot, User, Phone, Calendar, Euro, HelpCircle, CalendarPlus, Check, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface QuickReply {
  icon: typeof HelpCircle;
  label: string;
  message: string;
}

const quickReplies: QuickReply[] = [
  { icon: Euro, label: "Kosten", message: "Was kostet eine Sanierung bei Ihnen?" },
  { icon: Calendar, label: "Ablauf", message: "Wie läuft eine Sanierung bei Ihnen ab?" },
  { icon: Phone, label: "Kontakt", message: "Wie kann ich Sie erreichen?" },
  { icon: HelpCircle, label: "Services", message: "Welche Sanierungen bieten Sie an?" },
];

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

const fallbackTimeOptions = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hallo!\n\nIch bin Ihr digitaler Berater von KSHW München.\n\nWie kann ich Ihnen bei Ihrer Sanierung helfen?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [availableSlots, setAvailableSlots] = useState<string[]>(fallbackTimeOptions);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current && !showAppointmentForm) {
      inputRef.current.focus();
    }
  }, [isOpen, showAppointmentForm]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!appointmentData.preferredDate) {
      setAvailableSlots(fallbackTimeOptions);
      return;
    }
    
    const fetchAvailableSlots = async () => {
      setIsLoadingSlots(true);
      setAppointmentData(prev => ({ ...prev, preferredTime: "" }));
      try {
        const response = await fetch(`/api/calendar/availability?date=${appointmentData.preferredDate}`);
        if (response.ok) {
          const data = await response.json();
          if (data.slots && data.slots.length > 0) {
            setAvailableSlots(data.slots);
          } else {
            setAvailableSlots(fallbackTimeOptions);
          }
        } else {
          setAvailableSlots(fallbackTimeOptions);
        }
      } catch {
        setAvailableSlots(fallbackTimeOptions);
      } finally {
        setIsLoadingSlots(false);
      }
    };
    
    fetchAvailableSlots();
  }, [appointmentData.preferredDate]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: messageText }]);
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", { message: messageText });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: 0152 122 740 43" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input.trim());

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!appointmentData.name || appointmentData.name.length < 2) {
      errors.name = "Name ist erforderlich";
    }
    if (!appointmentData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appointmentData.email)) {
      errors.email = "Gültige E-Mail erforderlich";
    }
    if (!appointmentData.phone || appointmentData.phone.length < 6) {
      errors.phone = "Telefonnummer erforderlich";
    }
    if (!appointmentData.service) {
      errors.service = "Service wählen";
    }
    if (!appointmentData.preferredDate) {
      errors.preferredDate = "Datum wählen";
    }
    if (!appointmentData.preferredTime) {
      errors.preferredTime = "Uhrzeit wählen";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/appointments", appointmentData);
      setAppointmentSuccess(true);
      setFormErrors({});
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Vielen Dank, ${appointmentData.name}! Ihre Terminanfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen, um den Termin zu bestätigen.` 
      }]);
      setTimeout(() => {
        setShowAppointmentForm(false);
        setAppointmentSuccess(false);
        setAppointmentData({
          name: "",
          email: "",
          phone: "",
          service: "",
          preferredDate: "",
          preferredTime: "",
          message: ""
        });
      }, 2000);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Entschuldigung, die Terminanfrage konnte nicht gesendet werden. Bitte rufen Sie uns direkt an: 0152 122 740 43" 
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const showQuickReplies = messages.length <= 2 && !isLoading && !showAppointmentForm;

  if (!isOpen) {
    return (
      <div className="fixed bottom-32 right-6 z-50 flex items-center gap-3">
        <div className="bg-[hsl(220,75%,25%)] text-white shadow-lg rounded-2xl px-4 py-2">
          <p className="text-sm font-medium">KSHW München KI-Agent für Beratung</p>
          <p className="text-xs opacity-90">Beratung, Tipps und 24h Termine vereinbaren</p>
        </div>
        <div className="relative">
          {showPulse && (
            <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30" />
          )}
          <Button
            onClick={() => {
              setIsOpen(true);
              setShowPulse(false);
            }}
            className="relative rounded-full w-14 h-14 shadow-lg bg-orange-500 hover:bg-orange-600"
            data-testid="button-open-chat"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card 
      className="fixed bottom-32 right-6 z-50 w-[450px] h-[560px] flex flex-col shadow-2xl border-0 overflow-hidden" 
      data-testid="chat-container"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          {showAppointmentForm && (
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => {
                setShowAppointmentForm(false);
                setAppointmentSuccess(false);
                setFormErrors({});
              }} 
              className="text-primary-foreground no-default-hover-elevate"
              data-testid="button-back-chat"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">{showAppointmentForm ? "Termin vereinbaren" : "KSHW Berater"}</p>
            <p className="text-xs opacity-80">{showAppointmentForm ? "Kostenlose Beratung" : "Antwort in wenigen Sekunden"}</p>
          </div>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => setIsOpen(false)} 
          className="text-primary-foreground no-default-hover-elevate"
          data-testid="button-close-chat"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {showAppointmentForm ? (
        <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
          {appointmentSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-lg">Terminanfrage gesendet!</p>
                <p className="text-sm text-muted-foreground mt-1">Wir melden uns in Kürze bei Ihnen.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAppointmentSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Name *</label>
                <input
                  type="text"
                  value={appointmentData.name}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full mt-1 px-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${formErrors.name ? "border-destructive" : ""}`}
                  placeholder="Ihr Name"
                  data-testid="input-appointment-name"
                />
                {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">E-Mail *</label>
                <input
                  type="email"
                  value={appointmentData.email}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full mt-1 px-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${formErrors.email ? "border-destructive" : ""}`}
                  placeholder="ihre@email.de"
                  data-testid="input-appointment-email"
                />
                {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Telefon *</label>
                <input
                  type="tel"
                  value={appointmentData.phone}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full mt-1 px-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${formErrors.phone ? "border-destructive" : ""}`}
                  placeholder="0123 456789"
                  data-testid="input-appointment-phone"
                />
                {formErrors.phone && <p className="text-xs text-destructive mt-1">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Service *</label>
                <Select 
                  value={appointmentData.service} 
                  onValueChange={(value) => setAppointmentData(prev => ({ ...prev, service: value }))}
                >
                  <SelectTrigger className={`w-full mt-1 ${formErrors.service ? "border-destructive" : ""}`} data-testid="select-appointment-service">
                    <SelectValue placeholder="Service wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.service && <p className="text-xs text-destructive mt-1">{formErrors.service}</p>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Wunschtermin *</label>
                  <input
                    type="date"
                    min={getTomorrowDate()}
                    value={appointmentData.preferredDate}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, preferredDate: e.target.value }))}
                    className={`w-full mt-1 px-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${formErrors.preferredDate ? "border-destructive" : ""}`}
                    data-testid="input-appointment-date"
                  />
                  {formErrors.preferredDate && <p className="text-xs text-destructive mt-1">{formErrors.preferredDate}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Uhrzeit *</label>
                  <Select 
                    value={appointmentData.preferredTime} 
                    onValueChange={(value) => setAppointmentData(prev => ({ ...prev, preferredTime: value }))}
                    disabled={isLoadingSlots || !appointmentData.preferredDate}
                  >
                    <SelectTrigger className={`w-full mt-1 ${formErrors.preferredTime ? "border-destructive" : ""}`} data-testid="select-appointment-time">
                      <SelectValue placeholder={isLoadingSlots ? "Laden..." : "Zeit"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.length > 0 ? (
                        availableSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time} Uhr
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>Keine freien Termine</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {formErrors.preferredTime && <p className="text-xs text-destructive mt-1">{formErrors.preferredTime}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Nachricht (optional)</label>
                <textarea
                  value={appointmentData.message}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={2}
                  placeholder="Kurze Beschreibung Ihres Projekts..."
                  data-testid="input-appointment-message"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isSubmitting}
                data-testid="button-submit-appointment"
              >
                {isSubmitting ? "Wird gesendet..." : "Termin anfragen"}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                Kostenlose und unverbindliche Beratung
              </p>
            </form>
          )}
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-card shadow-sm rounded-bl-sm"
                  }`} 
                  data-testid={`message-${msg.role}-${idx}`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-card shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showQuickReplies && (
            <div className="px-3 py-2 border-t bg-card">
              <p className="text-xs text-muted-foreground mb-2">Häufige Fragen:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs gap-1.5"
                    data-testid={`quick-reply-${idx}`}
                  >
                    <reply.icon className="w-3 h-3" />
                    {reply.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t bg-card space-y-2">
            <Button
              onClick={() => setShowAppointmentForm(true)}
              variant="outline"
              className="w-full gap-2 border-orange-500 text-orange-600 dark:text-orange-400"
              data-testid="button-open-appointment"
            >
              <CalendarPlus className="w-4 h-4" />
              Kostenlosen Termin vereinbaren
            </Button>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Schreiben Sie Ihre Frage..."
                className="flex-1 px-4 py-2.5 text-sm bg-muted border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
                data-testid="input-chat-message"
              />
              <Button 
                size="icon" 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                className="rounded-full"
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              KI-Assistent nach EU AI Act. <Link href="/datenschutz" className="underline">Datenschutz</Link>
            </p>
          </div>
        </>
      )}
    </Card>
  );
}

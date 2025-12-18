import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, Bot, User, HelpCircle, Calculator, FileText, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface QuickQuestion {
  text: string;
  icon: typeof HelpCircle;
}

interface EmbeddedServiceAdvisorProps {
  serviceName: string;
  serviceDescription: string;
  priceRange: string;
  serviceId: string;
}

const serviceQuickQuestions: Record<string, QuickQuestion[]> = {
  komplettsanierung: [
    { text: "Was kostet eine Komplettsanierung?", icon: Calculator },
    { text: "Wie lange dauert die Sanierung?", icon: Clock },
    { text: "Was ist im Festpreis enthalten?", icon: FileText },
    { text: "Können wir während der Sanierung wohnen?", icon: HelpCircle },
  ],
  badsanierung: [
    { text: "Was kostet eine Badsanierung?", icon: Calculator },
    { text: "Wie lange dauert eine Badsanierung?", icon: Clock },
    { text: "Welche Materialien empfehlen Sie?", icon: FileText },
    { text: "Gibt es eine barrierefreie Option?", icon: HelpCircle },
  ],
  kuechensanierung: [
    { text: "Was kostet eine Küchensanierung?", icon: Calculator },
    { text: "Wie lange dauert der Umbau?", icon: Clock },
    { text: "Ist eine Kücheninsel möglich?", icon: FileText },
    { text: "Welche Geräte sind empfehlenswert?", icon: HelpCircle },
  ],
  bodensanierung: [
    { text: "Was kostet ein neuer Boden?", icon: Calculator },
    { text: "Welcher Bodenbelag ist am besten?", icon: FileText },
    { text: "Ist Fußbodenheizung möglich?", icon: HelpCircle },
    { text: "Wie lange muss der Boden trocknen?", icon: Clock },
  ],
  elektrosanierung: [
    { text: "Was kostet eine Elektrosanierung?", icon: Calculator },
    { text: "Wann ist eine Erneuerung nötig?", icon: HelpCircle },
    { text: "Welche Normen gelten aktuell?", icon: FileText },
    { text: "Wie lange dauert die Elektrosanierung?", icon: Clock },
  ],
  heizungssanierung: [
    { text: "Was kostet eine neue Heizung?", icon: Calculator },
    { text: "Welches Heizsystem ist am effizientesten?", icon: FileText },
    { text: "Gibt es staatliche Förderungen?", icon: HelpCircle },
    { text: "Wie schnell amortisiert sich die Investition?", icon: Clock },
  ],
};

export function EmbeddedServiceAdvisor({ 
  serviceName, 
  serviceDescription, 
  priceRange, 
  serviceId 
}: EmbeddedServiceAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions = serviceQuickQuestions[serviceId] || serviceQuickQuestions.komplettsanierung;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = (initialQuestion?: string) => {
    setHasStarted(true);
    const welcomeMessage: Message = {
      role: "assistant",
      content: `Willkommen beim ${serviceName}-Berater!\n\nIch helfe Ihnen gerne mit Informationen zu:\n- Kosten und Preisgestaltung\n- Zeitplanung und Ablauf\n- Materialien und Qualität\n- Förderungen und Finanzierung\n\n${priceRange}\n\nWie kann ich Ihnen helfen?`,
    };
    setMessages([welcomeMessage]);

    if (initialQuestion) {
      setTimeout(() => {
        handleSendMessage(initialQuestion);
      }, 500);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setIsLoading(true);

    try {
      const contextMessage = `[Kontext: Der Kunde ist auf der ${serviceName}-Seite. ${serviceDescription}. Preisinfo: ${priceRange}]\n\nKunde: ${messageText}`;
      
      const response = await apiRequest("POST", "/api/chat", {
        message: contextMessage,
        conversationHistory: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message || "Entschuldigung, es gab einen Fehler." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch unter 0152 122 740 43.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const message = input.trim();
    setInput("");
    handleSendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    if (!hasStarted) {
      startConversation(question);
    } else {
      handleSendMessage(question);
    }
  };

  if (!hasStarted) {
    return (
      <Card className="border-2 border-primary bg-card shadow-lg">
        <CardHeader className="pb-4 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl text-primary">{serviceName}-Berater</CardTitle>
              <p className="text-sm text-muted-foreground">Fragen zu Kosten, Ablauf & Materialien</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Stellen Sie Ihre Fragen zu {serviceName} - ich helfe Ihnen mit Preisinformationen, Ratschlägen und Planungstipps.
          </p>
          
          <div className="mb-4">
            <p className="text-sm font-medium mb-3">Häufige Fragen:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4"
                  onClick={() => handleQuickQuestion(q.text)}
                  data-testid={`button-quick-question-${index}`}
                >
                  <q.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{q.text}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  startConversation(input.trim());
                  setInput("");
                }
              }}
              placeholder="Oder stellen Sie Ihre eigene Frage..."
              data-testid="input-advisor-start"
            />
            <Button
              onClick={() => {
                if (input.trim()) {
                  startConversation(input.trim());
                  setInput("");
                } else {
                  startConversation();
                }
              }}
              data-testid="button-start-advisor"
            >
              Starten
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary bg-card shadow-lg">
      <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-md">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5" />
          <div>
            <CardTitle className="text-base">{serviceName}-Berater</CardTitle>
            <p className="text-xs text-primary-foreground/80">Ihr persönlicher Ansprechpartner</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  data-testid={`advisor-message-${message.role}-${index}`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted rounded-md px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex flex-wrap gap-1 mb-2">
            {quickQuestions.slice(0, 2).map((q, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() => handleSendMessage(q.text)}
                data-testid={`badge-quick-question-${index}`}
              >
                {q.text}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ihre Frage..."
              disabled={isLoading}
              data-testid="input-advisor-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              data-testid="button-send-advisor"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

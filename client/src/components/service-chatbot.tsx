import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ServiceChatbotProps {
  serviceName: string;
  serviceDescription: string;
  priceRange: string;
}

export function ServiceChatbot({ serviceName, serviceDescription, priceRange }: ServiceChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hallo! Ich bin Ihr persönlicher Berater für ${serviceName}.\n\nSie interessieren sich für eine ${serviceName}? Ich helfe Ihnen gerne bei Fragen zu Kosten, Ablauf und Zeitplanung.\n\n${priceRange}\n\nWie kann ich Ihnen helfen?`,
        },
      ]);
    }
  }, [isOpen, serviceName, priceRange, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const contextMessage = `[Kontext: Der Kunde ist auf der ${serviceName}-Seite. ${serviceDescription}]\n\nKunde: ${userMessage}`;
      
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
          content: "Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es erneut.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg bg-primary"
        size="icon"
        data-testid="button-open-chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 shadow-xl border-primary/20">
      <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <CardTitle className="text-base">Preisberater</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
            data-testid="button-close-chatbot"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-primary-foreground/80">
          Fragen zu Kosten & Ablauf? Ich helfe sofort!
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-72 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  data-testid={`chat-message-${message.role}-${index}`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted rounded-md px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ihre Frage..."
              disabled={isLoading}
              data-testid="input-chatbot-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              data-testid="button-send-chatbot"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

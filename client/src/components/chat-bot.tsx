import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, Calendar, Euro, HelpCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

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

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hallo! Ich bin Ihr digitaler Berater von KSHW München. Wie kann ich Ihnen bei Ihrer Sanierung helfen?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

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

  const showQuickReplies = messages.length <= 2 && !isLoading;

  if (!isOpen) {
    return (
      <div className="fixed bottom-32 right-6 z-50 flex items-center gap-3">
        <div className="bg-primary text-primary-foreground shadow-lg rounded-2xl px-4 py-2">
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
      className="fixed bottom-32 right-6 z-50 w-[380px] h-[520px] flex flex-col shadow-2xl border-0 overflow-hidden" 
      data-testid="chat-container"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">KSHW Berater</p>
            <p className="text-xs opacity-80">Antwort in wenigen Sekunden</p>
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
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
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

      <div className="p-3 border-t bg-card">
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
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          KI-Assistent nach EU AI Act. <Link href="/datenschutz" className="underline">Datenschutz</Link>
        </p>
      </div>
    </Card>
  );
}

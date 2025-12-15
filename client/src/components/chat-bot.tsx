import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MessageCircle, X, Send, Bot, User, Phone, Calendar, Euro, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hallo!\n\nIch bin Ihr digitaler Berater von KSHW München.\n\nWie kann ich Ihnen bei Ihrer Sanierung helfen?" }
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

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setInput("");
    const newUserMessage: Message = { role: "user", content: messageText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const conversationHistory = updatedMessages.slice(1).map(m => ({
        role: m.role,
        content: m.content
      }));
      
      const response = await apiRequest("POST", "/api/chat", { 
        message: messageText,
        conversationHistory 
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut." 
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

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 rounded-l-lg rounded-r-none px-2 py-8 shadow-lg bg-primary hover:bg-primary/90 transition-all ${isOpen ? 'translate-x-full opacity-0' : ''}`}
        data-testid="button-toggle-chat-sidebar"
      >
        <div className="flex flex-col items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-medium [writing-mode:vertical-lr] rotate-180">KI-Berater</span>
          <ChevronLeft className="w-4 h-4" />
        </div>
      </Button>

      <div 
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '380px' }}
      >
        <div className="h-full bg-card border-l shadow-2xl flex flex-col">
          <div className="flex items-center justify-between gap-2 px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">KSHW KI-Berater</p>
                <p className="text-xs opacity-80">Rund um die Uhr für Sie da</p>
              </div>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setIsOpen(false)} 
              className="text-primary-foreground no-default-hover-elevate"
              data-testid="button-close-chat"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30"
            role="log"
            aria-live="polite"
            aria-label="Chat-Verlauf"
            aria-busy={isLoading}
          >
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
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-background shadow-sm rounded-bl-sm border"
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
                <div className="bg-background shadow-sm border rounded-2xl rounded-bl-sm px-4 py-3">
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
            <div className="px-3 py-2 border-t bg-background">
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

          <div className="p-3 border-t bg-background">
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
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              KI-Assistent nach EU AI Act. <Link href="/datenschutz" className="underline">Datenschutz</Link>
            </p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

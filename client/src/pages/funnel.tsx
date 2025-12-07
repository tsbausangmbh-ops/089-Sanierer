import { useState } from "react";
import { Header } from "@/components/Header";
import { NotdienstBadge } from "@/components/NotdienstBadge";
import { FunnelForm } from "@/components/FunnelForm";
import { ConfirmationPage } from "@/components/ConfirmationPage";
import { TrustBadges } from "@/components/TrustBadges";
import { useToast } from "@/hooks/use-toast";

export default function FunnelPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (data: unknown) => {
    console.log("Lead submitted:", data);
    setIsSubmitted(true);
    toast({
      title: "Anfrage gesendet",
      description: "Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.",
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NotdienstBadge />
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-12 space-y-4">
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  data-testid="text-headline"
                >
                  Ihr Dach in besten Händen
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professionelle Dacharbeiten in München und Umgebung. Schnell, zuverlässig
                  und zu fairen Preisen. Jetzt kostenlose Anfrage stellen!
                </p>
              </div>

              <FunnelForm onSubmit={handleSubmit} />

              <div className="mt-16 border-t pt-8">
                <TrustBadges />
              </div>
            </>
          ) : (
            <ConfirmationPage onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="border-t py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>089Dach - Ihr zuverlässiger Partner für alle Dacharbeiten in München</p>
          <p className="mt-2">
            Leopoldstraße 123, 80802 München | info@089dach.de | 089 123 456 789
          </p>
        </div>
      </footer>
    </div>
  );
}

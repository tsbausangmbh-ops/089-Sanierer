import { CheckCircle, Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConfirmationPageProps {
  onReset?: () => void;
}

export function ConfirmationPage({ onReset }: ConfirmationPageProps) {
  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-8">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold" data-testid="text-confirmation-title">
          Vielen Dank für Ihre Anfrage!
        </h1>
        <p className="text-muted-foreground text-lg">
          Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.
        </p>
      </div>

      <Card className="p-6 text-left space-y-4">
        <h2 className="font-semibold text-lg">So geht es weiter:</h2>
        <ol className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              1
            </span>
            <span>Wir prüfen Ihre Anfrage und erstellen ein individuelles Angebot.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              2
            </span>
            <span>Ein Mitarbeiter kontaktiert Sie innerhalb von 24 Stunden.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              3
            </span>
            <span>Bei Bedarf vereinbaren wir einen kostenlosen Vor-Ort-Termin.</span>
          </li>
        </ol>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Reaktion innerhalb 24h</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-5 h-5" />
          <a href="tel:+4989123456789" className="text-sm hover:text-foreground">
            089 123 456 789
          </a>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-5 h-5" />
          <a href="mailto:info@089dach.de" className="text-sm hover:text-foreground">
            info@089dach.de
          </a>
        </div>
      </div>

      {onReset && (
        <Button
          variant="outline"
          onClick={onReset}
          data-testid="button-new-request"
        >
          Neue Anfrage stellen
        </Button>
      )}
    </div>
  );
}

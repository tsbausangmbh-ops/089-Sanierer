import { Home } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight" data-testid="text-logo">
              089Dach
            </h1>
            <p className="text-xs text-muted-foreground">Ihr Dachdecker in München</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span>Kostenlose Beratung:</span>
          <a
            href="tel:+4989123456789"
            className="font-semibold text-foreground hover:text-primary"
            data-testid="link-phone"
          >
            089 123 456 789
          </a>
        </div>
      </div>
    </header>
  );
}

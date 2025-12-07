import { Phone } from "lucide-react";

export function NotdienstBadge() {
  return (
    <a
      href="tel:+4989123456789"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-md shadow-lg"
      data-testid="link-notdienst-call"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive-foreground opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive-foreground"></span>
      </span>
      <Phone className="w-4 h-4" />
      <span className="font-semibold text-sm">24h Notdienst</span>
    </a>
  );
}

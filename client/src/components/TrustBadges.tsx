import { Shield, MapPin, Clock, Award } from "lucide-react";

const badges = [
  { icon: Shield, label: "Vollversichert" },
  { icon: MapPin, label: "München & Umgebung" },
  { icon: Clock, label: "Schnelle Reaktion" },
  { icon: Award, label: "Meisterbetrieb" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex flex-col items-center gap-2 text-muted-foreground"
          data-testid={`badge-trust-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <badge.icon className="w-8 h-8" />
          <span className="text-sm font-medium">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

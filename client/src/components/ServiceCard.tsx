import { Card } from "@/components/ui/card";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  isSelected = false,
  onClick,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all hover-elevate active-elevate-2",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={onClick}
      data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </Card>
  );
}

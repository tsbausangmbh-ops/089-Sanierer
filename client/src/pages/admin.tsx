import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Home as HomeIcon,
  Bath,
  UtensilsCrossed,
  Layers,
  Zap,
  Flame,
  Building2,
  Building,
  Store,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SeoHead } from "@/components/seo-head";
import type { Lead } from "@shared/schema";

const serviceLabels: Record<string, { label: string; icon: typeof HomeIcon }> = {
  komplettsanierung: { label: "Komplettsanierung", icon: HomeIcon },
  badsanierung: { label: "Badsanierung", icon: Bath },
  kuechensanierung: { label: "Küchensanierung", icon: UtensilsCrossed },
  bodensanierung: { label: "Bodensanierung", icon: Layers },
  elektrosanierung: { label: "Elektrosanierung", icon: Zap },
  heizungssanierung: { label: "Heizungssanierung", icon: Flame },
};

const propertyLabels: Record<string, { label: string; icon: typeof HomeIcon }> = {
  wohnung: { label: "Wohnung", icon: Building2 },
  einfamilienhaus: { label: "Einfamilienhaus", icon: HomeIcon },
  mehrfamilienhaus: { label: "Mehrfamilienhaus", icon: Building },
  gewerbe: { label: "Gewerbe", icon: Store },
};

function formatDate(date: string | Date | null): string {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LeadCard({ lead }: { lead: Lead }) {
  const serviceInfo = serviceLabels[lead.service] || { label: lead.service, icon: HomeIcon };
  const propertyInfo = propertyLabels[lead.propertyType] || { label: lead.propertyType, icon: Building2 };
  const ServiceIcon = serviceInfo.icon;
  const PropertyIcon = propertyInfo.icon;

  return (
    <Card data-testid={`card-lead-${lead.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="gap-1">
              <ServiceIcon className="w-3 h-3" />
              {serviceInfo.label}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <PropertyIcon className="w-3 h-3" />
              {propertyInfo.label}
            </Badge>
            {lead.isUrgent && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                Dringend
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(lead.createdAt)}
          </span>
        </div>
        <CardTitle className="text-lg mt-2" data-testid={`text-lead-name-${lead.id}`}>
          {lead.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{lead.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <a href={`tel:${lead.phone}`} className="hover:text-primary">
              {lead.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a href={`mailto:${lead.email}`} className="hover:text-primary">
              {lead.email}
            </a>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{lead.address}, {lead.postalCode}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LeadCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-48 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-48 col-span-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminPage() {
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const { logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  const apiUrl = serviceFilter === "all" 
    ? "/api/leads" 
    : `/api/leads?service=${serviceFilter}`;

  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads", serviceFilter],
    queryFn: async () => {
      const response = await fetch(apiUrl, { credentials: "include" });
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }
      return response.json();
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/admin-login");
      }
    });
  };

  const filteredLeads = leads;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Admin Dashboard | Sanierungsverwaltung"
        description="Admin-Bereich zur Lead-Verwaltung"
        noIndex={true}
      />
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-to-funnel">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold" data-testid="text-admin-title">
                Lead-Übersicht
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredLeads?.length ?? 0} Anfragen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-48" data-testid="select-service-filter">
                <SelectValue placeholder="Alle Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Leistungen</SelectItem>
                <SelectItem value="komplettsanierung">Komplettsanierung</SelectItem>
                <SelectItem value="badsanierung">Badsanierung</SelectItem>
                <SelectItem value="kuechensanierung">Küchensanierung</SelectItem>
                <SelectItem value="bodensanierung">Bodensanierung</SelectItem>
                <SelectItem value="elektrosanierung">Elektrosanierung</SelectItem>
                <SelectItem value="heizungssanierung">Heizungssanierung</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <LeadCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredLeads && filteredLeads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Mail className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Noch keine Anfragen</h2>
            <p className="text-muted-foreground mb-6">
              Sobald Kunden das Formular ausfüllen, erscheinen die Leads hier.
            </p>
            <Link href="/anfrage">
              <Button data-testid="button-go-to-funnel">
                Zum Anfrage-Formular
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

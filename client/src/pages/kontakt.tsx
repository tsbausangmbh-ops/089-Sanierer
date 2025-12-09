import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Calendar, Menu, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

const contactFormSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().optional(),
  address: z.string().optional(),
  message: z.string().min(10, "Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen)"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Kontakt() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/leads", {
        service: "kontakt",
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        message: data.message,
        address: data.address || "",
        postalCode: "",
        preferredContact: "email",
      });
    },
    onSuccess: () => {
      toast({
        title: "Nachricht gesendet",
        description: "Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-base leading-tight">KSHW München</span>
                  <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
                </div>
              </div>
            </Link>
            <div className="flex lg:hidden items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <a href="tel:+4915212274043">
                <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Phone className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {headerServices.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                    {service.title}
                  </Button>
                </Link>
              ))}
              <Link href="/ratgeber">
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Ratgeber
                </Button>
              </Link>
              <Link href="/faq-preise">
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                  FAQ & Preise
                </Button>
              </Link>
              <a href="tel:+4915212274043" className="ml-2">
                <Button size="sm" className="text-sm bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Phone className="w-4 h-4 mr-1" />
                  0152 122 740 43
                </Button>
              </a>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[hsl(220,85%,15%)] border-t border-white/10">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {headerServices.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>{service.title}</Button>
                </Link>
              ))}
              <div className="border-t border-white/20 my-2" />
              <Link href="/ratgeber"><Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Ratgeber</Button></Link>
              <Link href="/faq-preise"><Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>FAQ & Preise</Button></Link>
              <Link href="/kontakt"><Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(false)}>Kontakt</Button></Link>
                          </nav>
          </div>
        )}
      </header>

      <main className="pt-24 pb-16 flex-1">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Sprechen Sie mit uns – wir sind für Sie da</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Fragen zur Sanierung? Unverbindliches Angebot gewünscht? Schreiben Sie uns oder rufen Sie direkt an.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Schreiben Sie uns eine Nachricht</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ihr vollständiger Name" 
                                data-testid="input-contact-name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-Mail *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="ihre@email.de" 
                                data-testid="input-contact-email"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="Ihre Telefonnummer" 
                                data-testid="input-contact-phone"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse / Ort (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Straße, PLZ Ort" 
                                data-testid="input-contact-address"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nachricht *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Ihre Nachricht an uns..." 
                                className="min-h-32"
                                data-testid="input-contact-message"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                        disabled={mutation.isPending}
                        data-testid="button-contact-submit"
                      >
                        {mutation.isPending ? (
                          "Wird gesendet..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Nachricht senden
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">So erreichen Sie uns</h2>
                  <div className="space-y-4">
                    <a href="tel:+4915212274043" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-medium">0152 122 740 43</p>
                      </div>
                    </a>
                    <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-Mail</p>
                        <p className="font-medium">info@komplettsanierungen-haus-wohnung.de</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Adresse</p>
                        <p className="font-medium">Zielstattstr. 9, 81379 München</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Öffnungszeiten</p>
                        <p className="font-medium">Mo-Fr: 8:00-17:00 Uhr</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Direkt zur Projektanfrage</h2>
                  <p className="text-muted-foreground mb-4">
                    Sie wissen schon, was Sie brauchen? In 2 Minuten zum kostenlosen Festpreis-Angebot.
                  </p>
                  <div className="space-y-4">
                    <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-contact-booking">
                        <Calendar className="w-4 h-4 mr-2" />
                        24 Std. Online Termin
                      </Button>
                    </a>
                    <Link href="/anfrage" className="block mt-4">
                      <Button className="w-full" data-testid="button-contact-funnel">
                        Zur Projektanfrage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="pt-12 pb-6 bg-[hsl(220,85%,10%)] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Ihr zuverlässiger Partner für Komplettsanierungen in München und Umgebung.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-white/70">
                <a href="tel:+4915212274043" className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" />
                  0152 122 740 43
                </a>
                <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" />
                  info@komplettsanierungen-haus-wohnung.de
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Zielstattstr. 9<br />81379 München</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mo-Fr: 8:00-17:00 Uhr
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {headerServices.map((service) => (
                  <li key={service.id}>
                    <Link href={`/anfrage?service=${service.id}`} className="hover:text-white">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/impressum" className="hover:text-white">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-white">AGB</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
                <li><Link href="/faq-preise" className="hover:text-white">FAQ & Preise</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <h4 className="font-bold mb-2 text-sm">Haus oder Wohnung sanieren in München – Planung, Kosten & Handwerker</h4>
            <p className="text-xs text-white/60 mb-2">
              München Pasing · Allach · Untermenzing · Obermenzing · Aubing · Moosach · Feldmoching · Schwabing · Sendling · Bogenhausen · Haidhausen · Neuhausen · Laim · Nymphenburg · Giesing · Berg am Laim · Trudering · Riem · Milbertshofen · Freimann · Solln · Großhadern · Hadern · Fürstenried · Forstenried · Thalkirchen · Obersendling · Ramersdorf · Perlach · Neuperlach
            </p>
            <p className="text-xs text-white/60">
              Sowie im Münchner Umland: Dachau · Karlsfeld · Germering · Fürstenfeldbruck · Freising · Starnberg · Garching · Unterschleißheim · Oberschleißheim · Ottobrunn · Haar · Gräfelfing · Planegg · Pullach · Grünwald
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} <a href="https://komplettsanierungen-haus-wohnung.de" className="hover:text-white underline">komplettsanierungen-haus-wohnung.de</a> - Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}

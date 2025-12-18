import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Sanierung München Anfrage | Kostenlose Beratung 24h"
        description="Sanierung München anfragen: Kostenlose Beratung, Antwort in 24h, Festpreis-Angebot. Tel: 0152 122 740 43. Jetzt unverbindlich Projekt besprechen!"
        keywords="Sanierung München Anfrage, Handwerker München kontaktieren, Renovierung Angebot München, Sanierung Beratung kostenlos"
        canonicalPath="/kontakt"
      />
      <SiteHeader />

      <PageHero
        title="Kontakt"
        subtitle="Wir sind für Sie da"
        description="Kostenlose Erstberatung, unverbindliches Angebot, persönlicher Ansprechpartner. Wir antworten innerhalb von 24 Stunden."
        badge="Ihr direkter Draht zu uns"
        showCta={false}
        compact={true}
      />
      <Breadcrumb items={[{ label: "Kontakt" }]} />

      <main id="main-content" className="py-12 flex-1">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Ihre kostenlose Sanierungsanfrage – 100% unverbindlich</h2>
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
                  <h2 className="text-xl font-bold mb-4">Wie erreichen Sie <strong>KSHW München</strong>?</h2>
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
                        <p className="font-medium">Zielstattstr. 9, 81379 <strong>München-Sendling</strong></p>
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
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Sanierungsbetrieb München</strong> – Wir sind in allen Stadtteilen für Sie da: Schwabing, Bogenhausen, Haidhausen, Sendling, Pasing, Trudering und Umland.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Welche <strong>Sanierung</strong> brauchen Sie in <strong>München</strong>?</h2>
                  <p className="text-muted-foreground mb-4">
                    Sie wissen schon, was Sie brauchen? In 2 Minuten zum kostenlosen <strong>Festpreis-Angebot</strong>.
                  </p>
                  <div className="space-y-4">
                    <Link href="/termin">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-contact-booking">
                        <Calendar className="w-4 h-4 mr-2" />
                        24 Std. Online Termin
                      </Button>
                    </Link>
                    <Link href="/anfrage" className="block mt-4">
                      <Button className="w-full" data-testid="button-contact-funnel">
                        Zur Projektanfrage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Weiterführende Informationen</h2>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/ratgeber" className="text-primary hover:underline flex items-center gap-2" data-testid="link-kontakt-ratgeber">
                        Sanierung München Ratgeber – Kosten, Förderung & Tipps
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq-preise" className="text-primary hover:underline flex items-center gap-2" data-testid="link-kontakt-faq">
                        FAQ & Preise – Handwerkerkosten in München
                      </Link>
                    </li>
                    <li>
                      <Link href="/gewerke" className="text-primary hover:underline flex items-center gap-2" data-testid="link-kontakt-gewerke">
                        Handwerker-Vermittlung München – Geprüfte Partnerbetriebe
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, type Lead } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, requireAuth } from "./auth";
import OpenAI from "openai";
import nodemailer from "nodemailer";

const serviceLabels: Record<string, string> = {
  komplettsanierung: "Komplettsanierung",
  badsanierung: "Badsanierung",
  kuechensanierung: "Küchensanierung",
  bodensanierung: "Bodensanierung",
  elektrosanierung: "Elektrosanierung",
  heizungssanierung: "Heizungssanierung",
  "energetische-sanierung": "Energetische Sanierung",
  dachsanierung: "Dachsanierung",
};

const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  ...(smtpPort === 587 && { requireTLS: true }),
});

async function sendCustomerConfirmationEmail(lead: Lead): Promise<void> {
  const serviceLabel = serviceLabels[lead.service] || lead.service;
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a5f; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .highlight { background: #fff; padding: 15px; border-left: 4px solid #1e3a5f; margin: 15px 0; }
    .steps { background: #fff; padding: 15px; margin: 15px 0; }
    .steps li { margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>KSHW München</h1>
      <p>Komplettsanierungen Haus & Wohnung</p>
    </div>
    <div class="content">
      <h2>Vielen Dank für Ihre Anfrage, ${lead.name}!</h2>
      <p>Wir haben Ihre Anfrage für <strong>${serviceLabel}</strong> erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
      
      <div class="highlight">
        <strong>Ihre Anfrage:</strong><br>
        Service: ${serviceLabel}<br>
        PLZ: ${lead.postalCode}${lead.city ? `, ${lead.city}` : ""}<br>
        ${lead.isUrgent ? "<strong>Dringend</strong>" : ""}
      </div>
      
      <div class="steps">
        <h3>So geht es weiter:</h3>
        <ol>
          <li><strong>Innerhalb von 24 Stunden</strong> meldet sich Ihr persönlicher Ansprechpartner bei Ihnen.</li>
          <li>Gemeinsam besprechen wir Ihr Projekt und Ihre Wünsche.</li>
          <li>Sie erhalten ein <strong>unverbindliches Festpreis-Angebot</strong>.</li>
        </ol>
      </div>
      
      <p>Bei dringenden Fragen erreichen Sie uns unter:</p>
      <p>
        <strong>Telefon:</strong> 0152 122 740 43<br>
        <strong>E-Mail:</strong> info@089-sanierer.de
      </p>
    </div>
    <div class="footer">
      <p>KSHW München | Zielstattstr. 9, 81379 München</p>
      <p>www.089-sanierer.de</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"KSHW München" <${process.env.SMTP_FROM_EMAIL}>`,
      to: lead.email,
      subject: `Ihre Anfrage bei KSHW München: ${serviceLabel}`,
      html: htmlContent,
    });
    console.log(`Confirmation email sent to ${lead.email}`);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.post("/api/leads", async (req, res) => {
    const result = insertLeadSchema.safeParse(req.body);
    if (!result.success) {
      const validationError = fromZodError(result.error);
      return res.status(400).json({ error: validationError.message });
    }

    const lead = await storage.createLead(result.data);
    
    // Send confirmation email to customer (non-blocking)
    sendCustomerConfirmationEmail(lead).catch(err => {
      console.error("Email sending failed:", err);
    });
    
    res.status(201).json(lead);
  });

  app.get("/api/leads", requireAuth, async (req, res) => {
    const { service } = req.query;
    
    if (service && typeof service === "string") {
      const leads = await storage.getLeadsByService(service);
      return res.json(leads);
    }

    const leads = await storage.getLeads();
    res.json(leads);
  });

  app.get("/api/leads/:id", requireAuth, async (req, res) => {
    const lead = await storage.getLead(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead nicht gefunden" });
    }
    res.json(lead);
  });

  const openai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Nachricht erforderlich" });
      }

      const systemPrompt = `Du bist der KI-Assistent von KSHW München (Komplettsanierungen Haus & Wohnung). 
Du hilfst Interessenten bei Fragen zu Sanierungen in München.

Wichtige Informationen über KSHW:
- Spezialisiert auf: Komplettsanierung, Badsanierung, Küchensanierung, Bodensanierung, Elektrosanierung, Heizungssanierung, Dachsanierung, Energetische Sanierung
- Erfahrung: 268+ abgeschlossene Projekte, 20+ Jahre Erfahrung
- Servicegebiet: München und Umgebung
- Kontakt: 0152 122 740 43, info@komplettsanierungen-haus-wohnung.de
- Adresse: Zielstattstr. 9, 81379 München
- Öffnungszeiten: Mo-Fr 8:00-17:00 Uhr

Preisrichtlinien (grobe Schätzungen):
- Badsanierung: ab ca. 8.000€
- Küchensanierung: ab ca. 12.000€
- Komplettsanierung: ab ca. 800€/m²

Vorteile von KSHW:
- Festpreisgarantie
- Ein Ansprechpartner
- 2 Jahre Gewährleistung
- Kostenlose Beratung innerhalb 24 Stunden

Antworte freundlich, professionell und auf Deutsch. Halte Antworten kurz und hilfreich. 
Bei komplexen Fragen empfehle eine kostenlose Beratung oder den direkten Kontakt.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";
      res.json({ reply });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Fehler bei der Verarbeitung Ihrer Anfrage" });
    }
  });

  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertAppointmentSchema, type Lead, type Appointment } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, requireAuth } from "./auth";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import { getAvailableSlots, createCalendarEvent } from "./calendar";

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

async function sendAppointmentEmails(appointment: Appointment): Promise<void> {
  const serviceLabel = serviceLabels[appointment.service] || appointment.service;
  
  const customerHtml = `
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
    .highlight { background: #fff; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>KSHW München</h1>
      <p>Terminbestätigung</p>
    </div>
    <div class="content">
      <h2>Vielen Dank für Ihre Terminanfrage, ${appointment.name}!</h2>
      <p>Wir haben Ihre Terminanfrage erhalten und werden uns in Kürze bei Ihnen melden, um den Termin zu bestätigen.</p>
      
      <div class="highlight">
        <strong>Ihre Terminanfrage:</strong><br>
        Service: ${serviceLabel}<br>
        Wunschtermin: ${appointment.preferredDate}<br>
        Uhrzeit: ${appointment.preferredTime}<br>
        ${appointment.message ? `Nachricht: ${appointment.message}` : ""}
      </div>
      
      <p>Bei Fragen erreichen Sie uns unter:</p>
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

  const companyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .info-box { background: #fff; padding: 15px; margin: 15px 0; border: 1px solid #ddd; }
    .info-box strong { color: #1e3a5f; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Neue Terminanfrage</h1>
      <p>Über KI-Bot eingegangen</p>
    </div>
    <div class="content">
      <h2>Neue Terminanfrage eingegangen</h2>
      
      <div class="info-box">
        <strong>Kundendaten:</strong><br>
        Name: ${appointment.name}<br>
        E-Mail: ${appointment.email}<br>
        Telefon: ${appointment.phone}
      </div>
      
      <div class="info-box">
        <strong>Termindetails:</strong><br>
        Service: ${serviceLabel}<br>
        Wunschtermin: ${appointment.preferredDate}<br>
        Uhrzeit: ${appointment.preferredTime}
      </div>
      
      ${appointment.message ? `
      <div class="info-box">
        <strong>Nachricht:</strong><br>
        ${appointment.message}
      </div>
      ` : ""}
      
      <p><strong>Bitte kontaktieren Sie den Kunden zeitnah, um den Termin zu bestätigen.</strong></p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"KSHW München" <${process.env.SMTP_FROM_EMAIL}>`,
        to: appointment.email,
        subject: `Terminanfrage bei KSHW München: ${serviceLabel}`,
        html: customerHtml,
      }),
      transporter.sendMail({
        from: `"KSHW München Bot" <${process.env.SMTP_FROM_EMAIL}>`,
        to: process.env.SMTP_FROM_EMAIL,
        subject: `Neue Terminanfrage: ${appointment.name} - ${serviceLabel}`,
        html: companyHtml,
      })
    ]);
    console.log(`Appointment emails sent for ${appointment.email}`);
  } catch (error) {
    console.error("Failed to send appointment emails:", error);
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

  app.post("/api/appointments", async (req, res) => {
    const result = insertAppointmentSchema.safeParse(req.body);
    if (!result.success) {
      const validationError = fromZodError(result.error);
      return res.status(400).json({ error: validationError.message });
    }

    const appointment = await storage.createAppointment(result.data);
    
    createCalendarEvent(
      appointment.service,
      appointment.name,
      appointment.email,
      appointment.phone,
      appointment.preferredDate,
      appointment.preferredTime,
      appointment.message || undefined
    ).catch(err => {
      console.error("Calendar event creation failed:", err);
    });
    
    sendAppointmentEmails(appointment).catch(err => {
      console.error("Appointment email sending failed:", err);
    });
    
    res.status(201).json(appointment);
  });

  app.get("/api/appointments", requireAuth, async (req, res) => {
    const appointments = await storage.getAppointments();
    res.json(appointments);
  });

  app.get("/api/calendar/availability", async (req, res) => {
    try {
      const { date } = req.query;
      if (!date || typeof date !== "string") {
        return res.status(400).json({ error: "Datum erforderlich (YYYY-MM-DD)" });
      }
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res.status(400).json({ error: "Ungültiges Datumsformat" });
      }
      
      const slots = await getAvailableSlots(date);
      res.json({ date, slots });
    } catch (error) {
      console.error("Calendar availability error:", error);
      res.status(500).json({ error: "Kalender nicht verfügbar" });
    }
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

      const systemPrompt = `Du bist der empathische Lead-Berater von KSHW München (Komplettsanierungen Haus & Wohnung). Dein Ziel ist es, Interessenten durch gezielte Fragen zu verstehen und ihre Kontaktdaten für eine persönliche Beratung zu sammeln.

## DEINE ROLLE
- Du bist ein einfühlsamer, professioneller Berater
- Du stellst Fragen, um das Projekt des Kunden zu verstehen
- Du sammelst schrittweise Informationen für eine individuelle Beratung
- Du gibst NIEMALS unsere Telefonnummer oder E-Mail heraus

## ÜBER KSHW MÜNCHEN (Hintergrundwissen)
- Spezialisierung: Komplettsanierung, Badsanierung, Küchensanierung, Bodensanierung, Elektrosanierung, Heizungssanierung, Dachsanierung, Energetische Sanierung
- Erfahrung: 268+ erfolgreich abgeschlossene Projekte, über 20 Jahre Branchenerfahrung
- Servicegebiet: München und gesamter Großraum (ca. 50km Umkreis)
- Vorteile: Festpreisgarantie, ein Ansprechpartner, 2 Jahre Gewährleistung

## PREISRICHTLINIEN (nur als Orientierung nennen)
- Badsanierung: ab 8.000€
- Küchensanierung: ab 12.000€
- Komplettsanierung: ab 800€/m²
- Immer betonen: Genaue Preise erst nach persönlicher Beratung

## GESPRÄCHSFÜHRUNG - SCHRITT FÜR SCHRITT
1. Begrüßung & Verständnis zeigen für das Anliegen
2. Frage nach der gewünschten Sanierungsart
3. Frage nach Objekttyp (Wohnung/Haus) und Größe
4. Frage nach Zeitrahmen/Dringlichkeit
5. Frage nach Name und Kontaktdaten für Rückruf
6. Bestätigung und Zusicherung einer schnellen Rückmeldung

## KOMMUNIKATIONSREGELN
- Antworte IMMER auf Deutsch
- Sei empathisch: Zeige Verständnis für Sorgen und Wünsche
- Stelle am Ende JEDER Antwort eine Frage
- Halte Antworten kurz (2-3 Sätze + Frage)
- GIB NIEMALS Telefonnummer oder E-Mail von uns heraus
- Frage stattdessen nach DEREN Kontaktdaten für einen Rückruf
- Vermeide Fachsprache, erkläre einfach verständlich

## BEISPIEL-PHRASEN
- "Das klingt nach einem spannenden Projekt! Darf ich fragen, um welche Art Sanierung es geht?"
- "Ich verstehe, das ist eine wichtige Entscheidung. Wie groß ist die Fläche ungefähr?"
- "Damit wir Ihnen ein passendes Angebot erstellen können - wie darf ich Sie erreichen?"
- "Wunderbar! Unter welcher Nummer können wir Sie für eine kostenlose Beratung zurückrufen?"

## WENN KUNDE NACH KONTAKT FRAGT
Sage NIEMALS unsere Nummer. Stattdessen:
"Ich organisiere gerne einen Rückruf für Sie! Unter welcher Nummer erreichen wir Sie am besten?"

## FORMATIERUNG
- Verwende Zeilenumbrüche zwischen Absätzen
- Bei Listen jeden Punkt auf eigene Zeile

## WICHTIG
- Du sammelst Leads - immer nach Kontaktdaten fragen
- Niemals Telefon/E-Mail von KSHW nennen
- Immer empathisch und verständnisvoll
- Jede Antwort endet mit einer Frage`;

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

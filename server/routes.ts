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

async function sendCompanyLeadNotification(lead: Lead): Promise<void> {
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
    .data-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    .data-table td { padding: 10px; border-bottom: 1px solid #ddd; }
    .data-table td:first-child { font-weight: bold; width: 40%; background: #fff; }
    .urgent { background: #fee2e2; color: #dc2626; padding: 10px; text-align: center; font-weight: bold; margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Neue Anfrage eingegangen!</h1>
      <p>${serviceLabel}</p>
    </div>
    <div class="content">
      ${lead.isUrgent ? '<div class="urgent">DRINGEND</div>' : ''}
      
      <h3>Kontaktdaten:</h3>
      <table class="data-table">
        <tr><td>Name</td><td>${lead.name}</td></tr>
        <tr><td>E-Mail</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td>Telefon</td><td><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
        ${lead.mobile ? `<tr><td>Mobil</td><td><a href="tel:${lead.mobile}">${lead.mobile}</a></td></tr>` : ''}
      </table>
      
      <h3>Projektdetails:</h3>
      <table class="data-table">
        <tr><td>Service</td><td>${serviceLabel}</td></tr>
        <tr><td>Objekttyp</td><td>${lead.propertyType || '-'}</td></tr>
        <tr><td>PLZ / Stadt</td><td>${lead.postalCode}${lead.city ? `, ${lead.city}` : ''}</td></tr>
        ${lead.address ? `<tr><td>Adresse</td><td>${lead.address}</td></tr>` : ''}
        ${lead.timeline ? `<tr><td>Zeitrahmen</td><td>${lead.timeline}</td></tr>` : ''}
        ${lead.qualityLevel ? `<tr><td>Qualitätsstufe</td><td>${lead.qualityLevel}</td></tr>` : ''}
        ${lead.budgetRange ? `<tr><td>Budget</td><td>${lead.budgetRange}</td></tr>` : ''}
      </table>
      
      ${lead.description ? `<h3>Beschreibung:</h3><p>${lead.description}</p>` : ''}
      ${lead.additionalNotes ? `<h3>Zusätzliche Anmerkungen:</h3><p>${lead.additionalNotes}</p>` : ''}
      
      ${lead.serviceDetails ? `<h3>Service-Details:</h3><pre style="background: #fff; padding: 10px; overflow-x: auto;">${JSON.stringify(lead.serviceDetails, null, 2)}</pre>` : ''}
    </div>
    <div class="footer">
      <p>Lead-ID: ${lead.id}</p>
      <p>Eingegangen am: ${new Date(lead.createdAt!).toLocaleString('de-DE')}</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"KSHW Lead-Bot" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_FROM_EMAIL,
      subject: `${lead.isUrgent ? '[DRINGEND] ' : ''}Neue Anfrage: ${lead.name} - ${serviceLabel}`,
      html: htmlContent,
    });
    console.log(`Company notification email sent for lead ${lead.id}`);
  } catch (error) {
    console.error("Failed to send company notification email:", error);
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
    
    // Send emails (non-blocking)
    sendCustomerConfirmationEmail(lead).catch(err => {
      console.error("Customer email failed:", err);
    });
    sendCompanyLeadNotification(lead).catch(err => {
      console.error("Company notification failed:", err);
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

  const chatTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
    {
      type: "function",
      function: {
        name: "create_appointment",
        description: "Erstellt einen Beratungstermin im Kalender und sendet Bestätigungs-E-Mails an Kunde und KSHW. Nutze diese Funktion NUR wenn du alle erforderlichen Daten hast.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Vollständiger Name des Kunden"
            },
            email: {
              type: "string",
              description: "E-Mail-Adresse des Kunden"
            },
            phone: {
              type: "string",
              description: "Telefonnummer des Kunden"
            },
            service: {
              type: "string",
              enum: ["komplettsanierung", "badsanierung", "kuechensanierung", "bodensanierung", "elektrosanierung", "heizungssanierung", "dachsanierung", "energetische-sanierung"],
              description: "Art der gewünschten Sanierung"
            },
            date: {
              type: "string",
              description: "Gewünschtes Datum im Format YYYY-MM-DD"
            },
            time: {
              type: "string",
              description: "Gewünschte Uhrzeit im Format HH:00 (z.B. 10:00, 14:00)"
            },
            message: {
              type: "string",
              description: "Optionale zusätzliche Nachricht oder Projektbeschreibung"
            }
          },
          required: ["name", "email", "phone", "service", "date", "time"]
        }
      }
    }
  ];

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Nachricht erforderlich" });
      }

      const systemPrompt = `Du bist der empathische Lead-Berater von KSHW München (Komplettsanierungen Haus & Wohnung). Dein Ziel ist es, Interessenten zu beraten und Termine direkt zu buchen.

## DEINE ROLLE
- Du bist ein einfühlsamer, professioneller Berater
- Du stellst Fragen, um das Projekt des Kunden zu verstehen
- Du kannst Termine DIREKT im Kalender buchen
- Du gibst NIEMALS unsere Telefonnummer oder E-Mail heraus

## ÜBER KSHW MÜNCHEN
- Spezialisierung: Komplettsanierung, Badsanierung, Küchensanierung, Bodensanierung, Elektrosanierung, Heizungssanierung, Dachsanierung, Energetische Sanierung
- Erfahrung: 268+ erfolgreich abgeschlossene Projekte, über 20 Jahre Branchenerfahrung
- Servicegebiet: München und gesamter Großraum (ca. 50km Umkreis)
- Vorteile: Festpreisgarantie, ein Ansprechpartner, 5 Jahre Gewährleistung

## PREISRICHTLINIEN
- Badsanierung: ab 8.000€
- Küchensanierung: ab 12.000€
- Komplettsanierung: ab 800€/m²
- Genaue Preise erst nach persönlicher Beratung

## TERMINBUCHUNG - WICHTIG!
Du kannst Termine direkt buchen! Wenn der Kunde einen Termin möchte:
1. Frage nach NAME
2. Frage nach E-MAIL
3. Frage nach TELEFONNUMMER
4. Frage nach SERVICE (welche Sanierung)
5. Frage nach WUNSCHDATUM (Format: YYYY-MM-DD)
6. Frage nach WUNSCHUHRZEIT (8:00-16:00)

Sobald du ALLE Daten hast, nutze die create_appointment Funktion!
Der Termin wird dann automatisch:
- Im Google Kalender eingetragen
- Bestätigungs-E-Mail an den Kunden gesendet
- Benachrichtigung an KSHW gesendet

## GESPRÄCHSFÜHRUNG
1. Begrüßung & Verständnis zeigen
2. Frage nach Sanierungsart
3. Frage nach Objektdetails
4. Angebot zur Terminbuchung
5. Wenn Termin gewünscht: Alle Daten sammeln
6. Termin buchen und bestätigen

## KOMMUNIKATIONSREGELN
- Antworte IMMER auf Deutsch
- Sei empathisch und verständnisvoll
- Stelle am Ende JEDER Antwort eine Frage
- Halte Antworten kurz (2-3 Sätze + Frage)
- GIB NIEMALS Telefonnummer oder E-Mail von KSHW heraus

## FORMATIERUNG - SEHR WICHTIG!
Du MUSST Zeilenumbrüche verwenden für bessere Lesbarkeit:
- Zwischen jedem Absatz eine Leerzeile einfügen
- Bei Aufzählungen JEDEN Punkt auf eine EIGENE Zeile
- NIEMALS mehrere Punkte in einer Zeile

RICHTIG:
"Wir bieten folgende Services:

1. Badsanierung

2. Küchensanierung

3. Komplettsanierung

Was interessiert Sie?"

FALSCH:
"Wir bieten: 1. Badsanierung 2. Küchensanierung 3. Komplettsanierung"

## WENN ALLE TERMINDATEN VORHANDEN
Wenn du Name, E-Mail, Telefon, Service, Datum und Uhrzeit hast:
1. Rufe die create_appointment Funktion auf
2. Bestätige dem Kunden: "Ich habe Ihren Termin eingetragen und Sie erhalten gleich eine Bestätigung per E-Mail."`;

      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt }
      ];

      if (Array.isArray(conversationHistory)) {
        for (const msg of conversationHistory) {
          if (msg.role === "user" || msg.role === "assistant") {
            messages.push({ role: msg.role, content: msg.content });
          }
        }
      }

      messages.push({ role: "user", content: message });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        tools: chatTools,
        tool_choice: "auto",
        max_tokens: 500,
        temperature: 0.7,
      });

      const responseMessage = completion.choices[0]?.message;

      if (responseMessage?.tool_calls && responseMessage.tool_calls.length > 0) {
        const toolCall = responseMessage.tool_calls[0];
        
        if (toolCall.type === "function" && toolCall.function.name === "create_appointment") {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            
            const appointment = await storage.createAppointment({
              name: args.name,
              email: args.email,
              phone: args.phone,
              service: args.service,
              preferredDate: args.date,
              preferredTime: args.time,
              message: args.message || null,
            });

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

            const serviceLabel = serviceLabels[args.service] || args.service;
            const confirmationReply = `Wunderbar, ${args.name}! Ich habe Ihren Beratungstermin erfolgreich eingetragen:

Termin: ${args.date} um ${args.time} Uhr
Service: ${serviceLabel}

Sie erhalten in Kürze eine Bestätigung per E-Mail an ${args.email}.

Wir freuen uns auf das Gespräch mit Ihnen!`;

            return res.json({ 
              reply: confirmationReply,
              appointmentCreated: true,
              appointment: {
                date: args.date,
                time: args.time,
                service: serviceLabel
              }
            });
          } catch (error) {
            console.error("Error creating appointment:", error);
            return res.json({ 
              reply: "Es tut mir leid, bei der Terminbuchung ist leider ein Fehler aufgetreten. Können Sie es bitte noch einmal versuchen oder uns über das Kontaktformular erreichen?" 
            });
          }
        }
      }

      const reply = responseMessage?.content || "Entschuldigung, ich konnte keine Antwort generieren.";
      res.json({ reply });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Fehler bei der Verarbeitung Ihrer Anfrage" });
    }
  });

  return httpServer;
}

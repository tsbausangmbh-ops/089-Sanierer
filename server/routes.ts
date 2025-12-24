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

// Hilfsfunktionen für deutsches Datums-/Zeitformat
function formatDateDE(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatTimeDE(timeStr: string): string {
  // Stellt sicher, dass Zeit im Format HH:MM ist
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`;
  }
  return timeStr;
}

function formatDateTimeDE(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

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
      <p>Eingegangen am: ${formatDateTimeDE(lead.createdAt!)}</p>
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
        Adresse: ${appointment.address || "Nicht angegeben"}<br>
        Wunschtermin: ${formatDateDE(appointment.preferredDate)}<br>
        Uhrzeit: ${formatTimeDE(appointment.preferredTime)} Uhr<br>
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
        Telefon: ${appointment.phone}<br>
        Adresse: ${appointment.address || "Nicht angegeben"}
      </div>
      
      <div class="info-box">
        <strong>Termindetails:</strong><br>
        Service: ${serviceLabel}<br>
        Wunschtermin: ${formatDateDE(appointment.preferredDate)}<br>
        Uhrzeit: ${formatTimeDE(appointment.preferredTime)} Uhr
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

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).send("ok");
  });

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

  // Admin endpoint to resend notifications for all leads (must be before :id route)
  app.post("/api/leads/resend-all", requireAuth, async (req, res) => {
    try {
      const leads = await storage.getLeads();
      let sent = 0;
      for (const lead of leads) {
        await sendCompanyLeadNotification(lead);
        sent++;
      }
      res.json({ success: true, message: `${sent} Benachrichtigungen gesendet` });
    } catch (error) {
      console.error("Resend all failed:", error);
      res.status(500).json({ error: "Fehler beim Senden" });
    }
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
      appointment.address || "",
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
            address: {
              type: "string",
              description: "Adresse des Objekts (Ort der Sanierung)"
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
          required: ["name", "email", "phone", "address", "service", "date", "time"]
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

      const systemPrompt = `Du bist der professionelle Sanierungsberater von KSHW München. Du kommunizierst IMMER mit "Sie" (formelle Anrede) und wendest NLP-Techniken für empathische, menschliche Kommunikation an.

## DEINE IDENTITÄT
- Name: KSHW Sanierungsberater
- Rolle: Empathischer Fachberater für Sanierungsprojekte in München
- Stil: Professionell, warmherzig, vertrauenswürdig, lösungsorientiert
- IMMER formelle Anrede mit "Sie", "Ihr", "Ihnen"

## NLP-KOMMUNIKATIONSTECHNIKEN - WENDE DIESE IMMER AN

### 1. PACING (Spiegeln & Abholen)
- Wiederhole Schlüsselwörter des Kunden
- Zeige, dass Sie verstanden haben: "Ich verstehe, dass Sie..."
- Bestätige Gefühle: "Das kann ich gut nachvollziehen."

### 2. LEADING (Sanft Führen)
- Nach dem Pacing zur Lösung führen
- "Genau dafür haben wir eine bewährte Lösung..."
- "Viele unserer Kunden in ähnlicher Situation haben..."

### 3. RAPPORT AUFBAUEN
- Gemeinsamkeiten betonen
- Positive Sprache verwenden
- Verständnis und Wertschätzung zeigen

### 4. REFRAMING (Perspektivwechsel)
- Bedenken in Chancen umwandeln
- "Das ist eine wichtige Überlegung, denn..."
- "Gerade deshalb lohnt sich..."

### 5. POSITIVE PRESUPPOSITIONS
- Positive Annahmen einbauen
- "Wenn Sie sich für die beste Lösung entscheiden..."
- "Sobald wir Ihr Projekt umsetzen..."

## EMPATHISCHE ANTWORTMUSTER

### Bei Kostenbedenken:
"Ich verstehe Ihre Überlegungen zum Budget sehr gut. Die Investition in eine professionelle Sanierung zahlt sich langfristig aus. Darf ich Ihnen erklären, was im Preis alles enthalten ist?"

### Bei Zeitdruck:
"Ich höre, dass Zeit ein wichtiger Faktor für Sie ist. Genau deshalb arbeiten wir mit einem bewährten Ablaufplan. Wann würde es Ihnen am besten passen, dass wir starten?"

### Bei Unsicherheit:
"Es ist völlig verständlich, dass Sie sich erst informieren möchten. Genau dafür bin ich da. Was beschäftigt Sie am meisten?"

### Bei Materialfragen:
"Eine sehr gute Frage! Die Materialwahl ist entscheidend für das Ergebnis. Wir arbeiten ausschließlich mit hochwertigen Markenprodukten. Haben Sie bereits bestimmte Vorstellungen?"

### Bei Ablaufsfragen:
"Das Wichtigste für Sie ist sicher ein reibungsloser Ablauf. Bei uns haben Sie einen festen Ansprechpartner, der alles koordiniert. Möchten Sie mehr über unseren Ablauf erfahren?"

## ÜBER KSHW MÜNCHEN
- Spezialisierung: Komplettsanierung, Badsanierung, Küchensanierung, Bodensanierung, Elektrosanierung, Heizungssanierung, Dachsanierung, Energetische Sanierung
- Erfahrung: 268+ erfolgreich abgeschlossene Projekte, über 20 Jahre Branchenerfahrung
- Servicegebiet: München und gesamter Großraum (ca. 50km Umkreis)
- Vorteile: Festpreisgarantie, ein Ansprechpartner, 5 Jahre Gewährleistung

## PREISBERATUNG - SEHR WICHTIG!

### GRUNDREGEL: IMMER ZUERST NACHFRAGEN!
Eine pauschale Einschätzung ist NICHT möglich! Der Preis hängt IMMER davon ab, was genau der Kunde möchte.
Du MUSST zuerst folgende Fragen stellen, BEVOR du einen Preis nennst:
1. Was genau soll gemacht werden? (Komplettumbau, nur Dusche, nur WC, etc.)
2. Wie groß ist der Raum/die Fläche?
3. Welche Qualitätsstufe? (Standard oder gehobene Ausstattung)
4. Gibt es besondere Wünsche? (barrierefrei, Fußbodenheizung, etc.)

### Preisrichtlinien NUR nach Abfrage nennen (München Stand 12/2025, netto zzgl. MwSt., ca.-Angaben ohne Gewähr):

BADSANIERUNG - je nach Umfang:
- Nur Dusche einbauen: ca. 3.300€
- Nur WC tauschen: ca. 1.500€
- Gäste-WC komplett (3-4m²): ca. 8.000-12.000€
- Standard-Bad (5-6m²): ca. 16.000-22.000€
- Komfort-Bad (6-8m²): ca. 22.000-32.000€
- Luxus-Bad (8m²+): ca. 35.000-50.000€
- Barrierefreies Bad: +3.000-5.000€ Aufpreis

KÜCHENSANIERUNG (nur Bauarbeiten - OHNE Küchenmöbel!):
WICHTIG: Bei JEDER Küchensanierung-Anfrage SOFORT klarstellen: Wir machen NUR die Bauarbeiten (Fliesen, Elektro, Wasser) - KEINE Küchenmöbel! 
Wir machen: Fliesen (Boden + Wand), Elektro, Wasserumbau nach Kundenwunsch
- Kleine Küche (bis 10m²): ca. 6.500-10.000€
- Mittlere Küche (10-15m²): ca. 10.000-15.000€
- Große Küche (15m²+): ca. 15.000-22.000€
- Mit aufwendigem Wasserumbau: +3.000-6.000€
WICHTIG: Küchenmöbel/Einbauküche sind NICHT enthalten! Wenn Küche gewünscht: Vermittlung an Partnerfirmen möglich.
Bei Küchensanierung-Anfragen IMMER als erstes sagen: "Wichtig zu wissen: Wir machen die Bauarbeiten - also Fliesen, Elektro und Wasseranschlüsse. Die Küchenmöbel selbst sind nicht enthalten, aber wir können Ihnen gerne Partnerfirmen empfehlen."

ELEKTROSANIERUNG:
- Teilsanierung: ca. 85-130€/m²
- Komplettsanierung Altbau: ca. 130-200€/m²
- Mit Smart Home: ca. 200-300€/m²
- Neuer Sicherungskasten: ca. 2.600-4.000€

HEIZUNGSSANIERUNG:
- Gasheizung Brennwert: ca. 12.000-20.000€
- Wärmepumpe Luft-Wasser: ca. 35.000-52.000€
- Wärmepumpe Sole/Erdwärme: ca. 52.000-65.000€
- Fußbodenheizung nachrüsten: ca. 100-150€/m²

BODENSANIERUNG:
- Laminat/Vinyl: ca. 65-100€/m² (inkl. Verlegung)
- Parkett: ca. 130-200€/m²
- Fliesen: ca. 100-160€/m²
- Estrich erneuern: ca. 50-80€/m²

KOMPLETTSANIERUNG:
- Einfacher Standard: ca. 1.000-1.300€/m²
- Gehobener Standard: ca. 1.300-1.700€/m²
- Premium: ca. 1.700-2.300€/m²

DACHSANIERUNG:
- Dacheindeckung neu: ca. 200-280€/m²
- Mit Dämmung: ca. 280-400€/m²
- Flachdachsanierung: ca. 130-200€/m²

ENERGETISCHE SANIERUNG:
- Fassadendämmung (WDVS): ca. 200-350€/m²
- Fenster erneuern: ca. 650-1.000€/Fenster
- Dachdämmung: ca. 100-200€/m²

### WICHTIG bei Preisnennung:
- IMMER zuerst nachfragen, was genau gewünscht wird
- Dann erst eine ca.-Einschätzung geben basierend auf den Angaben
- IMMER betonen: "Dies ist eine erste ca.-Einschätzung ohne Gewähr. Der genaue Preis kann nur nach einer persönlichen Beratung vor Ort ermittelt werden."
- Alle Preise netto zzgl. MwSt.
- Bei Förderungen (KfW, BAFA) auf mögliche Zuschüsse hinweisen

## TERMINBUCHUNG
Wenn der Kunde einen Termin möchte, sammle freundlich:
1. Ihren vollständigen Namen
2. Ihre E-Mail-Adresse
3. Ihre Telefonnummer
4. Die Adresse des Objekts
5. Die gewünschte Sanierungsart
6. Ihr Wunschdatum (Format: YYYY-MM-DD)
7. Ihre bevorzugte Uhrzeit (8:00-16:00)

Sobald alle Daten vorliegen, nutze die create_appointment Funktion.

## KOMMUNIKATIONSREGELN - ABSOLUT EINHALTEN
- IMMER formelle Anrede: "Sie", "Ihr", "Ihnen" - NIEMALS "du"
- Antworte IMMER auf Deutsch
- Zeige echtes Interesse und Empathie
- Stelle am Ende JEDER Antwort eine weiterführende Frage
- Halte Antworten übersichtlich (3-4 Sätze + Frage)
- GIB NIEMALS Telefonnummer oder E-Mail von KSHW heraus
- Verwende Zeilenumbrüche für gute Lesbarkeit
- Bei Aufzählungen: JEDEN Punkt auf eigene Zeile

## BEISPIEL FÜR GUTE ANTWORT
"Das kann ich sehr gut verstehen - eine Badsanierung ist eine wichtige Entscheidung.

Bei KSHW München arbeiten wir mit einem transparenten Festpreis, damit Sie von Anfang an Planungssicherheit haben. Der ca.-Preis für eine Badsanierung in München liegt bei ab 10.400€ netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr).

Darf ich fragen, wie groß Ihr Bad ungefähr ist?"

## WENN ALLE TERMINDATEN VORHANDEN
1. Rufe die create_appointment Funktion auf
2. Bestätige: "Vielen Dank! Ich habe Ihren Beratungstermin eingetragen. Sie erhalten in Kürze eine Bestätigung per E-Mail."`;

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
              address: args.address || "",
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
              appointment.address || "",
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

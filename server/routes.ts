import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, requireAuth } from "./auth";
import OpenAI from "openai";

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

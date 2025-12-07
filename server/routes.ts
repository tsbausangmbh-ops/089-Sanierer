import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    const result = insertLeadSchema.safeParse(req.body);
    if (!result.success) {
      const validationError = fromZodError(result.error);
      return res.status(400).json({ error: validationError.message });
    }

    const lead = await storage.createLead(result.data);
    res.status(201).json(lead);
  });

  app.get("/api/leads", async (req, res) => {
    const { service } = req.query;
    
    if (service && typeof service === "string") {
      const leads = await storage.getLeadsByService(service);
      return res.json(leads);
    }

    const leads = await storage.getLeads();
    res.json(leads);
  });

  app.get("/api/leads/:id", async (req, res) => {
    const lead = await storage.getLead(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead nicht gefunden" });
    }
    res.json(lead);
  });

  return httpServer;
}

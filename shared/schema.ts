import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service: text("service").notNull(),
  propertyType: text("property_type").notNull().default("wohnung"),
  serviceDetails: jsonb("service_details"),
  qualityLevel: text("quality_level").default("standard"),
  timeline: text("timeline").default("flexibel"),
  preferredStartDate: text("preferred_start_date"),
  budgetRange: text("budget_range"),
  additionalNotes: text("additional_notes").default(""),
  description: text("description").default(""),
  isUrgent: boolean("is_urgent").default(false),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  mobile: text("mobile"),
  email: text("email").notNull(),
  address: text("address").default(""),
  city: text("city"),
  postalCode: text("postal_code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const serviceTypes = [
  "komplettsanierung",
  "badsanierung",
  "kuechensanierung", 
  "bodensanierung",
  "elektrosanierung",
  "heizungssanierung",
  "energetische-sanierung",
  "dachsanierung",
] as const;

export const propertyTypes = [
  "wohnung",
  "einfamilienhaus",
  "mehrfamilienhaus",
  "gewerbe",
] as const;

export type ServiceType = typeof serviceTypes[number];
export type PropertyType = typeof propertyTypes[number];

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull().default(""),
  service: text("service").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  message: text("message").default(""),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name ist erforderlich"),
  email: z.string().email("Gültige E-Mail-Adresse erforderlich"),
  phone: z.string().min(6, "Telefonnummer ist erforderlich"),
  address: z.string().min(5, "Adresse ist erforderlich"),
  service: z.string().min(1, "Service auswählen"),
  preferredDate: z.string().min(1, "Datum auswählen"),
  preferredTime: z.string().min(1, "Uhrzeit auswählen"),
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

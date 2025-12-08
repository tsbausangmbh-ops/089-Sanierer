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

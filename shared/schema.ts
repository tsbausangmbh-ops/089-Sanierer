import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
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
  description: text("description").notNull(),
  isUrgent: boolean("is_urgent").default(false),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
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
] as const;

export const propertyTypes = [
  "wohnung",
  "einfamilienhaus",
  "mehrfamilienhaus",
  "gewerbe",
] as const;

export type ServiceType = typeof serviceTypes[number];
export type PropertyType = typeof propertyTypes[number];

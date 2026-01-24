import { type User, type InsertUser, type Lead, type InsertLead, type Appointment, type InsertAppointment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPassword(id: string, password: string): Promise<User | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  getLeadsByService(service: string): Promise<Lead[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private leads: Map<string, Lead> = new Map();
  private appointments: Map<string, Appointment> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: randomUUID(),
      username: insertUser.username,
      password: insertUser.password,
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUserPassword(id: string, password: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.password = password;
      this.users.set(id, user);
      return user;
    }
    return undefined;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const lead: Lead = {
      id: randomUUID(),
      service: insertLead.service,
      propertyType: insertLead.propertyType ?? "wohnung",
      serviceDetails: insertLead.serviceDetails ?? null,
      qualityLevel: insertLead.qualityLevel ?? "standard",
      timeline: insertLead.timeline ?? "flexibel",
      preferredStartDate: insertLead.preferredStartDate ?? null,
      budgetRange: insertLead.budgetRange ?? null,
      additionalNotes: insertLead.additionalNotes ?? "",
      description: insertLead.description ?? "",
      isUrgent: insertLead.isUrgent ?? false,
      name: insertLead.name,
      phone: insertLead.phone,
      mobile: insertLead.mobile ?? null,
      email: insertLead.email,
      address: insertLead.address ?? "",
      city: insertLead.city ?? null,
      postalCode: insertLead.postalCode,
      createdAt: new Date(),
    };
    this.leads.set(lead.id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async getLeadsByService(service: string): Promise<Lead[]> {
    return Array.from(this.leads.values())
      .filter(lead => lead.service === service)
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const appointment: Appointment = {
      id: randomUUID(),
      name: insertAppointment.name,
      email: insertAppointment.email,
      phone: insertAppointment.phone,
      address: insertAppointment.address,
      service: insertAppointment.service,
      preferredDate: insertAppointment.preferredDate,
      preferredTime: insertAppointment.preferredTime,
      message: insertAppointment.message ?? "",
      status: "pending",
      createdAt: new Date(),
    };
    this.appointments.set(appointment.id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
}

export const storage = new MemStorage();

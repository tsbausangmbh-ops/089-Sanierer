import { storage } from "./storage";
import { hashPassword } from "./auth";

export async function seedAdminUser() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.log("ADMIN_PASSWORD not set, skipping admin user creation");
    return;
  }

  const existingAdmin = await storage.getUserByUsername("admin");
  
  if (existingAdmin) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await hashPassword(adminPassword);
  
  await storage.createUser({
    username: "admin",
    password: hashedPassword,
  });
  
  console.log("Admin user created successfully");
}

import { storage } from "./storage";
import { hashPassword } from "./auth";

export async function seedAdminUser() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.log("ADMIN_PASSWORD not set, skipping admin user creation");
    return;
  }

  const hashedPassword = await hashPassword(adminPassword);
  const existingAdmin = await storage.getUserByUsername("admin");
  
  if (existingAdmin) {
    await storage.updateUserPassword(existingAdmin.id, hashedPassword);
    console.log("Admin password updated successfully");
    return;
  }

  await storage.createUser({
    username: "admin",
    password: hashedPassword,
  });
  
  console.log("Admin user created successfully");
}

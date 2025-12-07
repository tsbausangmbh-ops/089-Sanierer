import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL must be set. Did you forget to provision a database?");
  console.error("Available PG env vars:", {
    PGHOST: process.env.PGHOST ? "set" : "not set",
    PGPORT: process.env.PGPORT ? "set" : "not set",
    PGUSER: process.env.PGUSER ? "set" : "not set",
    PGDATABASE: process.env.PGDATABASE ? "set" : "not set",
  });
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export const db = drizzle(pool, { schema });

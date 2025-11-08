import { Pool } from "pg";
import { config } from "./env";

export const pool = new Pool({
  connectionString: config.dbUrl,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

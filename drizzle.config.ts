import { type Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./lib/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

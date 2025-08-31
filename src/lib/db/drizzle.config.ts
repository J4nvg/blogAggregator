import { readConfig } from "../../config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.ts",
  out: "./",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});


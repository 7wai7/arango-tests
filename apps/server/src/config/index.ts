import { registerAs } from "@nestjs/config";
import * as z from "zod";

export const configSchema = z.object({
  ARANGODB_URL: z.url(),
  ARANGODB_NAME: z.string(),
  ARANGODB_USER: z.string(),
  ARANGODB_PASSWORD: z.string(),

  STAGE_NAME: z.enum(["dev", "test", "prod"]),
});

export const databaseConfig = registerAs("database", () => ({
  url: process.env.ARANGODB_URL,
  name: process.env.ARANGODB_NAME,
  user: process.env.ARANGODB_USER,
  password: process.env.ARANGODB_PASSWORD,
}));
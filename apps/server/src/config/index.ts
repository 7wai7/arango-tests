import * as Joi from "joi";
import { registerAs } from "@nestjs/config";

export const configSchema = Joi.object({
  ARANGODB_URL: Joi.string().uri().required(),
  ARANGODB_NAME: Joi.string().required(),
  ARANGODB_USER: Joi.string().required(),
  ARANGODB_PASSWORD: Joi.string().required(),

  STAGE_NAME: Joi.string()
    .valid("dev", "prod")
    .required(),
});

export const databaseConfig = registerAs("database", () => ({
  url: process.env.ARANGODB_URL,
  name: process.env.ARANGODB_NAME,
  user: process.env.ARANGODB_USER,
  password: process.env.ARANGODB_PASSWORD,
}));
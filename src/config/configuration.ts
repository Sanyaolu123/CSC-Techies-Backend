import { Configuration } from '@/interfaces';
import * as Joi from 'joi';

export const configurationSchema = Joi.object<Configuration>({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),

  // Database
  DATABASE_URL: Joi.string().required(),

  // JWT Configuration
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),

  // Redis Configuration
  CACHE_TTL: Joi.number().default(60),
  CACHE_MAX_ITEMS: Joi.number().default(100),
});

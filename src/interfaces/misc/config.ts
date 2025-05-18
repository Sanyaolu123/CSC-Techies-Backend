export interface Configuration {
  NODE_ENV: string;
  PORT: number;

  // Database
  DATABASE_URL: string;

  // JWT Configuration
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  // Redis
  CACHE_TTL: number;
  CACHE_MAX_ITEMS: number;
}

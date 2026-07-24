import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

if (!process.env.WEATHER_API_KEY && process.env.NODE_ENV !== 'test') {
  throw new Error('A WEATHER_API_KEY não está definida.');
}

export const env = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  weatherApiKey: process.env.WEATHER_API_KEY || 'dummy_test_key',
  weatherApiBaseUrl:
    process.env.WEATHER_API_BASE_URL || 'http://api.weatherapi.com/v1',
  cacheTtlSeconds: process.env.CACHE_TTL_SECONDS
    ? parseInt(process.env.CACHE_TTL_SECONDS, 10)
    : 600,
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['*'],
};

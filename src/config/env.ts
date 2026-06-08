import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const parseArray = (value: string | undefined, fallback: string[]) => {
  if (!value) {
    return fallback;
  }

  return value.split(',').map((item) => item.trim());
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseNumber(process.env.PORT, 4000),
  appName: process.env.APP_NAME ?? 'employee-salary-tool',
  databaseUrl: process.env.DATABASE_URL ?? '',
  corsOrigins: parseArray(process.env.CORS_ORIGINS, ['*']),
};

export const isDevelopment = env.nodeEnv === 'development';

/**
 * Validate critical environment configuration at startup.
 */
export const validateConfiguration = (): void => {
  const errors: string[] = [];

  if (!env.databaseUrl) {
    errors.push('DATABASE_URL is not set');
  }

  if (errors.length > 0) {
    console.error('❌ Configuration validation failed:');
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }

  console.log('✓ Configuration validated successfully');
};

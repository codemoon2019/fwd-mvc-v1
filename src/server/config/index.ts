import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    SECRET_KEY,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    SI_URL,
    SI_USER,
    SI_PASSWORD,
    GEN_API_URL,
    GEN_API_USER,
    GEN_API_PASSWORD,
    AUTH_API_URL,
    AUTH_API_USER,
    AUTH_API_PASSWORD,
    AGENT_API_URL,
    AGENT_API_USER,
    AGENT_API_PASSWORD
} = process.env;

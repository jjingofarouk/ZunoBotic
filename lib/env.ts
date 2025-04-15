// lib/env.ts
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Export environment variables
export const DATABASE_URL = process.env.DATABASE_URL;
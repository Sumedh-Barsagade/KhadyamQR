// This file MUST be imported as the very first thing before any other imports
// It ensures environment variables from .env are loaded before Supabase client initialization
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({
  path: envPath,
  override: true  // Allow .env to override process.env vars
});

if (result.error) {
  console.warn('Could not load .env file:', result.error.message);
}

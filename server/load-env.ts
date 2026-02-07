// This file MUST be imported as the very first thing
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env file BEFORE any other code runs
const envPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({
  path: envPath,
  override: true  // Force override existing vars
});

if (result.error) {
  console.warn('WARNING: Could not load .env file:', result.error.message);
} else {
  console.log('✓ Environment variables loaded from .env');
  if (result.parsed) {
    console.log('  Loaded:', Object.keys(result.parsed).length, 'variables');
    console.log('  SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET ✓' : 'NOT SET ✗');
  }
}

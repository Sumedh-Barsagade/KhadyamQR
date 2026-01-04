import { createClient } from "@supabase/supabase-js";

// Get Supabase configuration from environment variables
// These will be replaced by Vite at build time with actual values from netlify.toml
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = 'Missing Supabase configuration. Please check your environment variables.';
  console.error(errorMessage, {
    supabaseUrl: supabaseUrl ? '✅ Set' : '❌ Missing',
    supabaseAnonKey: supabaseAnonKey ? '✅ Set' : '❌ Missing',
    env: {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'
    }
  });
  throw new Error(errorMessage);
}

// Supabase client initialized

// Helper function to get the base URL for API requests
export function getBaseUrl() {
  // Always use relative URLs (same origin) - works for both development and Netlify
  // Frontend and Netlify functions are served from the same origin
  // So we can use relative paths like /api/restaurants
  return '';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

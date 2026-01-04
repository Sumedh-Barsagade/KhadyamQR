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
      VITE_SUPABASE_URL: getEnv("VITE_SUPABASE_URL") ? '✅ Set' : '❌ Missing',
      VITE_SUPABASE_ANON_KEY: getEnv("VITE_SUPABASE_ANON_KEY") ? '✅ Set' : '❌ Missing'
    }
  });
  throw new Error(errorMessage);
}

// Supabase client initialized

// Helper function to get the base URL for API requests
export function getBaseUrl() {
  // In development, use the current host and port
  if (process.env.NODE_ENV === 'development') {
    return ''; // Use relative URLs in development (same origin)
  }
  
  // Get the base URL from environment variables or use the current origin
  const env = (import.meta as any).env || {};
  return env.VITE_BASE_URL || 
         env.NEXT_PUBLIC_BASE_URL || 
         (globalThis as any).__env?.NEXT_PUBLIC_BASE_URL || 
         (supabaseUrl ? new URL(supabaseUrl).origin : window.location.origin);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

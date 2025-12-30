import dotenv from "dotenv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Load environment variables from .env file (in case it wasn't loaded yet)
dotenv.config();

// Get environment variables with fallbacks
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 
            process.env.VITE_SUPABASE_URL || 
            process.env.SUPABASE_URL;
            
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseClient: SupabaseClient | null = null;

// Lazy initialization function
function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  // Validate required environment variables
  if (!url) {
    const errorMsg = 'Missing Supabase URL. Please set SUPABASE_URL, VITE_SUPABASE_URL, or NEXT_PUBLIC_SUPABASE_URL in your .env file.';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  if (!serviceKey) {
    const errorMsg = 'Missing Supabase Service Role Key. Please set SUPABASE_SERVICE_ROLE_KEY in your .env file.';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  try {
    supabaseClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    
    console.log('✅ Supabase client initialized successfully');
    console.log('📍 Supabase URL:', url);
    
    // Test the connection asynchronously (don't block initialization)
    (async () => {
      try {
        const { error } = await supabaseClient!.from('restaurants').select('*').limit(1);
        if (error) {
          console.error('❌ Supabase connection test failed:', error.message, error.code);
          if (error.code === '42501') {
            console.error('Permission denied. Please check if your service role key has the correct permissions.');
          } else if (error.code === '42P01') {
            console.error('Table not found. Please ensure the "restaurants" table exists in your Supabase database.');
          }
        } else {
          console.log('✅ Successfully connected to Supabase');
        }
      } catch (err) {
        console.error('❌ Error testing Supabase connection:', err);
        if (err instanceof Error) {
          console.error('Error details:', {
            message: err.message,
            name: err.name,
          });
        }
      }
    })();
    
    return supabaseClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    throw error;
  }
}

// Export getter that initializes on first access
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});

// Helper function to get the Supabase URL
export const getSupabaseUrl = () => url;

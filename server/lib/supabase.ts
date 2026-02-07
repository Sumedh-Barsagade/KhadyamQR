import { createClient } from "@supabase/supabase-js";

// Get environment variables with fallbacks
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL;

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a null client if credentials are missing (will be handled in routes)
let supabaseAdmin: any = null;

// Validate and initialize if credentials are available
if (url && serviceKey) {
  try {
    supabaseAdmin = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Test the connection (non-blocking)
    (async () => {
      try {
        const { error } = await supabaseAdmin
          .from("restaurants")
          .select("*")
          .limit(1);
        if (error) {
          console.warn("Supabase connection test warning:", error.message);
          if (error.code === "42501") {
            console.warn(
              "Permission denied. Please check if your service role key has the correct permissions.",
            );
          } else if (error.code === "42P01") {
            console.warn(
              'Table not found. Please ensure the "restaurants" table exists in your Supabase database.',
            );
          }
        } else {
          console.log("Supabase connection successful ✓");
        }
      } catch (err) {
        console.warn(
          "Error testing Supabase connection:",
          err instanceof Error ? err.message : String(err),
        );
      }
    })();
  } catch (error) {
    console.error(
      "Failed to initialize Supabase client:",
      error instanceof Error ? error.message : String(error),
    );
  }
} else {
  console.warn(
    "Supabase credentials not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
}

// Helper function to get the base URL
export const getSupabaseUrl = () => url;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return supabaseAdmin !== null;
};

// Export the client (may be null if not configured)
export { supabaseAdmin };

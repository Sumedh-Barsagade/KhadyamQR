import serverless from "serverless-http";

// Set environment variables for Netlify functions BEFORE importing server
// This ensures they're available when the server initializes
process.env.SUPABASE_URL = "https://dshrfgqoarhwpbhbdobt.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzaHJmZ3FvYXJod3BiaGJkb2J0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTkyMzM2OCwiZXhwIjoyMDc1NDk5MzY4fQ.N3uUFiN42e5FT3XiOgzNIcZB8tGetbye9hg5U3Ya8VU";
process.env.VITE_SUPABASE_URL = "https://dshrfgqoarhwpbhbdobt.supabase.co";
process.env.VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzaHJmZ3FvYXJod3BiaGJkb2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjMzNjgsImV4cCI6MjA3NTQ5OTM2OH0.dPjEYMN7IclTS08VUKLaJrwZOo8lXxKtg53tTbXr8DU";

import { createServer } from "../../server/index";

export const handler = serverless(createServer());

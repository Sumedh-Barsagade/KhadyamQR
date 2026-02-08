/**
 * Ensures Vite gets Supabase env vars at build time.
 * If Netlify (or similar) only sets SUPABASE_URL and SUPABASE_ANON_KEY,
 * we copy them to VITE_SUPABASE_* so the client bundle is configured.
 */
const { spawnSync } = require("child_process");
const env = { ...process.env };

if (!env.VITE_SUPABASE_URL && env.SUPABASE_URL) {
  env.VITE_SUPABASE_URL = env.SUPABASE_URL;
}
if (!env.VITE_SUPABASE_ANON_KEY && env.SUPABASE_ANON_KEY) {
  env.VITE_SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;
}

const result = spawnSync("pnpm", ["exec", "vite", "build"], {
  stdio: "inherit",
  env,
  shell: true,
  cwd: process.cwd(),
});

process.exit(result.status ?? 1);

# Deployment Guide

## Prerequisites
- ✅ Supabase database setup complete
- ✅ Local dev server running successfully
- ⏳ Git repository (need to initialize)
- ⏳ GitHub account
- ⏳ Netlify or Vercel account

## Step 1: Initialize Git

```powershell
cd c:\Users\sumed\Downloads\KhadyamQR
git init
git add .
git commit -m "Initial commit: KhadyamQR MVP with React + Vite + Express + Supabase"
```

## Step 2: Create GitHub Repository

**Option A: Using GitHub CLI**
```powershell
gh repo create KhadyamQR --public --source=. --push
```

**Option B: Manual**
1. Go to https://github.com/new
2. Name: `KhadyamQR`
3. Public repository
4. Don't initialize with README (we have code)
5. Create repository
6. Run:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/KhadyamQR.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify (Recommended)

### Why Netlify?
- ✅ Free tier with serverless functions
- ✅ Automatic deployments from GitHub
- ✅ Built-in CI/CD

### Steps:
1. Go to https://app.netlify.com/start
2. Click "Import from Git" → Select GitHub
3. Choose `KhadyamQR` repository (or your fork)
4. **Build settings** (optional; `netlify.toml` already sets these):
   - Build command: `pnpm run build:client`
   - Publish directory: `dist/spa`
   - Functions directory: `netlify/functions`

5. **Environment variables** (required for build):
   - In Netlify: **Site configuration → Environment variables** (or use Netlify’s Supabase integration).
   - The app supports **either** naming scheme:
     - **Option A:** `SUPABASE_URL` and `SUPABASE_ANON_KEY` (e.g. from Netlify’s Supabase integration). The build script copies these into `VITE_SUPABASE_*` for the client.
     - **Option B:** Set explicitly: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
   - Get values from [Supabase Dashboard → Settings → API](https://supabase.com/dashboard/project/_/settings/api).
   - After changing env vars, **Trigger deploy → Deploy site** (or push a commit) so the build runs again.

6. Click "Deploy site"

### Post-Deploy:
- Your site will be at: `https://khadyamqr-RANDOM.netlify.app`
- Test: `https://your-site.netlify.app/admin`
- QR codes will work at: `https://your-site.netlify.app/menu/[slug]`

## Alternative: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import `KhadyamQR` from GitHub
3. **Framework Preset:** Vite
4. **Build settings:**
   - Build Command: `pnpm build`
   - Output Directory: `dist/spa`
5. Add same environment variables as above
6. Deploy

## Step 4: Update QR Codes

After deployment, regenerate QR codes in admin panel so they point to your production URL instead of `localhost:8080`.

## Troubleshooting

**Build fails: "pnpm not found"**
- Netlify/Vercel auto-detects pnpm from `package.json` packageManager field

**API routes 404 in production**
- Check `netlify.toml` or `vercel.json` for serverless function config

**Database connection fails**
- Verify environment variables are set in deployment platform
- Check Supabase project is not paused (free tier pauses after 7 days inactivity)

**Storage upload fails**
- Verify `khadyamqr` bucket exists in Supabase Storage
- Check RLS policies allow service role access

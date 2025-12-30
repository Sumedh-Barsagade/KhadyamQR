# Deploy KhadyamQR to Vercel

This guide will help you deploy your KhadyamQR project to Vercel.

## Prerequisites

- ✅ GitHub repository with your code
- ✅ Vercel account (free tier available)
- ✅ Supabase credentials

## Step 1: Install Vercel CLI (Optional)

You can deploy via the web interface, but CLI is useful for testing:

```bash
pnpm add -g vercel
```

Or install via npm:
```bash
npm install -g vercel
```

## Step 2: Deploy via Vercel Web Interface

1. **Go to:** https://vercel.com/new

2. **Import your repository:**
   - Click "Import Project"
   - Connect your GitHub account if needed
   - Select your `KhadyamQR` repository

3. **Configure project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (root)
   - **Build Command:** `pnpm install && pnpm run build:client`
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install`

4. **Environment Variables:**
   
   Add these environment variables:
   ```
   VITE_SUPABASE_URL=https://dshrfgqoarhwpbhbdobt.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_URL=https://dshrfgqoarhwpbhbdobt.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   PING_MESSAGE=ping pong
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

## Step 3: Update CORS Configuration

After deployment, update the CORS allowed origins in `server/index.ts` to include your Vercel domain:

```typescript
const allowedOrigins = [
  'https://your-app-name.vercel.app',
  // Add other production domains here
];
```

Then redeploy.

## Step 4: Verify Deployment

Your app will be available at:
- **Production URL:** `https://your-app-name.vercel.app`
- **Preview URLs:** Automatically generated for each branch/PR

## API Routes

All API routes under `/api/*` will be handled by the Express serverless function:
- `/api/ping` - Health check
- `/api/demo` - Demo endpoint
- `/api/restaurants` - Restaurant management
- `/api/menu-items` - Menu management
- etc.

## Deploy via CLI (Alternative)

If you prefer CLI:

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Troubleshooting

**Build fails:**
- Check that all environment variables are set
- Verify build command is correct
- Check Vercel build logs for errors

**API routes return 404:**
- Ensure `api/index.ts` exists
- Check that routes start with `/api/`
- Verify `vercel.json` rewrites are configured correctly

**CORS errors:**
- Update allowed origins in `server/index.ts` to include Vercel domain
- Redeploy after making changes

## Files Added for Vercel

- `vercel.json` - Vercel configuration
- `api/index.ts` - Serverless API handler
- `@vercel/node` - Vercel Node.js runtime (added to devDependencies)

## Comparison with Netlify

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Serverless Functions | `netlify/functions/` | `api/` |
| Config File | `netlify.toml` | `vercel.json` |
| Build | Auto-detected | Framework preset |
| Preview Deploys | ✅ | ✅ |
| Free Tier | ✅ | ✅ |



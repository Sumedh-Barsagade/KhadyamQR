# GitHub Pages Deployment Guide

## Current Issue
Your GitHub Pages site is showing a blank page because it's trying to load source files instead of built files.

## Quick Fix (Automatic - Recommended)

### Step 1: Enable GitHub Pages
1. Go to your repository: https://github.com/sumedhbarsagade22/KhadyamQR
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save

### Step 2: Add Secrets (for environment variables)
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:
   - Name: `VITE_SUPABASE_URL`
     Value: `https://dshrfgqoarhwpbhbdobt.supabase.co`
   - Name: `VITE_SUPABASE_ANON_KEY`
     Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzaHJmZ3FvYXJod3BiaGJkb2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjMzNjgsImV4cCI6MjA3NTQ5OTM2OH0.dPjEYMN7IclTS08VUKLaJrwZOo8lXxKtg53tTbXr8DU`

### Step 3: Push the workflow file
The `.github/workflows/deploy.yml` file has been created. Just commit and push:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

GitHub Actions will automatically build and deploy your site!

## Manual Fix (If needed)

### Option 1: Build and push dist folder to gh-pages branch

```bash
# Build for GitHub Pages
GITHUB_PAGES=true pnpm run build:client

# Create and push to gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
git checkout main
```

Then in GitHub Settings → Pages, select `gh-pages` branch as source.

### Option 2: Use GitHub Pages with /docs folder

1. Build the project:
```bash
GITHUB_PAGES=true pnpm run build:client
```

2. Copy dist to docs:
```bash
cp -r dist/* docs/
```

3. Commit and push:
```bash
git add docs/
git commit -m "Deploy to GitHub Pages"
git push
```

4. In GitHub Settings → Pages, select `/docs` as source.

## Verify Deployment

After deployment, your site should work at:
**https://sumedhbarsagade22.github.io/KhadyamQR/**

You should see:
- ✅ Landing page loads
- ✅ No console errors
- ✅ Assets load correctly (CSS, JS, images)

## Troubleshooting

### Still seeing blank page?
1. Check browser console for errors
2. Verify the base path in built files includes `/KhadyamQR/`
3. Clear browser cache (Ctrl+Shift+R)

### Assets not loading?
- Make sure `GITHUB_PAGES=true` is set when building
- Check that paths in `dist/index.html` start with `/KhadyamQR/`

### Need to update deployment?
Just push to `main` branch - GitHub Actions will automatically rebuild and redeploy!


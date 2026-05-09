# WebToolkit Pro: Satellite Site Deployer
# This script deploys your high-authority satellite site to Vercel (Free)

Write-Host "🚀 Starting Satellite Site Deployment..." -ForegroundColor Cyan

# 1. Check for Vercel CLI
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# 2. Deploy the satellite-site folder
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Green
cd satellite-site
vercel deploy --name wtkpro-hub --yes --prod

Write-Host "✅ Done! Your Satellite Site is now live and passing authority to wtkpro.site" -ForegroundColor Green

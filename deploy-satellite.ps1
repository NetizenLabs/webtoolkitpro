# WebToolkit Pro: Satellite Site Deployer
# This script deploys your high-authority satellite site to Vercel (Free)

Write-Host "Starting Satellite Site Deployment..." -ForegroundColor Cyan

# 1. Check for Vercel CLI
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# 2. Deploy the satellite-site folder
Write-Host "Deploying to Vercel..." -ForegroundColor Green
Set-Location -Path "satellite-site"
vercel deploy --name wtkpro-hub --yes --prod
Set-Location -Path ".."

Write-Host "Done! Your Satellite Site is now live." -ForegroundColor Green

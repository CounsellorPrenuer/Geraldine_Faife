# Geraldine Faife - Local Deployment Script
# Use this script to build and deploy your site without GitHub Actions.

Write-Host "Building website... 🏗️" -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check for errors above." -ForegroundColor Red
    exit
}

Write-Host "Build successful! Your static files are in 'build_output'." -ForegroundColor Green
Write-Host "To deploy to 'Main and Root', you need to push these files to your repository." -ForegroundColor Yellow
Write-Host "Note: This script only builds. You should now manually move the contents of 'build_output' to your deployment location if not using Actions." -ForegroundColor Gray

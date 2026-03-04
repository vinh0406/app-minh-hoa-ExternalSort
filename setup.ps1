# External Merge Sort Visualizer - Setup & Run Script
# This script automates the installation and startup process

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   External Merge Sort Visualizer - Setup Script          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "   Please install Node.js from: https://nodejs.org/" -ForegroundColor Red
    Write-Host "   Recommended: LTS version (v18 or higher)" -ForegroundColor Yellow
    pause
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    pause
    exit 1
}

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "`n📦 Dependencies already installed." -ForegroundColor Cyan
    $response = Read-Host "   Do you want to reinstall? (y/N)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "`n🧹 Cleaning old installation..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
        Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
    } else {
        Write-Host "   Skipping installation..." -ForegroundColor Yellow
        $skipInstall = $true
    }
}

# Install dependencies
if (-not $skipInstall) {
    Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
    Write-Host "   This may take a few minutes..." -ForegroundColor Gray
    
    try {
        npm install
        Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
        Write-Host "   Error: $_" -ForegroundColor Red
        pause
        exit 1
    }
}

# Ask user if they want to start the app
Write-Host "`n🎯 Setup complete!" -ForegroundColor Green
Write-Host "`nOptions:" -ForegroundColor Cyan
Write-Host "  1. Start the application now" -ForegroundColor White
Write-Host "  2. Exit (you can run 'npm run dev' later)" -ForegroundColor White

$choice = Read-Host "`nEnter your choice (1/2)"

if ($choice -eq '1') {
    Write-Host "`n🚀 Starting External Merge Sort Visualizer..." -ForegroundColor Green
    Write-Host "   Vite server will start on http://localhost:5173" -ForegroundColor Gray
    Write-Host "   Electron window will open automatically" -ForegroundColor Gray
    Write-Host "`n   Press Ctrl+C to stop the application`n" -ForegroundColor Yellow
    
    Start-Sleep -Seconds 2
    
    # Start the application
    npm run dev
} else {
    Write-Host "`n✨ All set! Run these commands to start:" -ForegroundColor Green
    Write-Host "   npm run dev        - Start development server" -ForegroundColor Cyan
    Write-Host "   npm run build      - Build for production" -ForegroundColor Cyan
    Write-Host "`n   See README.md for more information`n" -ForegroundColor Gray
}

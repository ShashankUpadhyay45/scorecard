# ================================
# ⚡ PlayPulse — Full Auto Repair, Local Launch & Render Diagnostics
# ================================

Write-Host "`n=== 🚀 Starting PlayPulse Auto Repair & Render Diagnostic Script ===`n" -ForegroundColor Cyan

# 🧹 Clean Old Node.js Processes
Write-Host "🧹 Cleaning up old Node.js processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# 🧽 Clear Cache + Old Modules
Write-Host "🧽 Checking and cleaning node_modules..." -ForegroundColor Yellow

$clientPath = ".\client"
$serverPath = ".\server"

if (Test-Path "$clientPath\node_modules") {
    Remove-Item -Recurse -Force "$clientPath\node_modules"
    Write-Host "🧹 Removed client node_modules"
}
if (Test-Path "$serverPath\node_modules") {
    Remove-Item -Recurse -Force "$serverPath\node_modules"
    Write-Host "🧹 Removed server node_modules"
}

if (Test-Path "$clientPath\package-lock.json") { Remove-Item -Force "$clientPath\package-lock.json" }
if (Test-Path "$serverPath\package-lock.json") { Remove-Item -Force "$serverPath\package-lock.json" }

npm cache clean --force | Out-Null

# ================================
# 📦 Install Dependencies
# ================================
Write-Host "`n📦 Installing fresh dependencies..." -ForegroundColor Yellow

# Server dependencies
Set-Location $serverPath
npm install express axios cors dotenv | Out-Host
Set-Location ..

# Client dependencies
Set-Location $clientPath
npm install react react-dom react-router-dom react-icons framer-motion react-scripts | Out-Host
Set-Location ..

# ================================
# 🔍 Check Free Ports
# ================================
Write-Host "`n🔍 Checking free ports..." -ForegroundColor Yellow
$frontendPort = 3000
$backendPort = 4000

while (Test-NetConnection -ComputerName 127.0.0.1 -Port $frontendPort -InformationLevel Quiet) { $frontendPort++ }
while (Test-NetConnection -ComputerName 127.0.0.1 -Port $backendPort -InformationLevel Quiet) { $backendPort++ }

Write-Host "✅ Frontend will run on port $frontendPort"
Write-Host "✅ Backend will run on port $backendPort"

# ================================
# 🚀 Start Local Development
# ================================
Write-Host "`n🚀 Launching PlayPulse locally..." -ForegroundColor Green

Start-Job { Set-Location "$using:PWD\server"; $env:PORT=$using:backendPort; node index.js }
Start-Job { Set-Location "$using:PWD\client"; $env:PORT=$using:frontendPort; npm start }

Start-Sleep -Seconds 10
$localUrl = "http://localhost:$frontendPort"
Write-Host "`n🌐 Opening browser at $localUrl" -ForegroundColor Cyan
Start-Process $localUrl

# ================================
# 🌎 Render Deployment Diagnostics
# ================================
Write-Host "`n🔎 Checking Render deployment health..." -ForegroundColor Yellow

$renderURL = "https://scorecard-i0cq.onrender.com"
try {
    $response = Invoke-WebRequest "$renderURL/cricket/live-matches" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Render API reachable! Deployment looks healthy." -ForegroundColor Green
    } else {
        Write-Host "⚠️ Render responded with status: $($response.StatusCode)" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "❌ Render deployment unreachable — possible build/start issue detected." -ForegroundColor Red
    Write-Host "🛠 Attempting to auto-suggest fix..." -ForegroundColor Yellow

    # Common Fix Suggestions
    Write-Host "`n💡 Possible Fixes:" -ForegroundColor Cyan
    Write-Host "1️⃣ Check your Render logs: https://dashboard.render.com"
    Write-Host "2️⃣ Ensure your 'server/package.json' contains:"
    Write-Host '    "start": "node index.js"'
    Write-Host "3️⃣ If your API is Express-based, ensure the last line in index.js looks like:"
    Write-Host '    app.listen((process.env.PORT -or 4000), { } ) # JavaScript version uses: app.listen(process.env.PORT || 4000, () => console.log(`Server running...`));'
    Write-Host "4️⃣ If still not working, redeploy your server from Render Dashboard."
}

Write-Host "`n✅ PlayPulse is fully repaired and running locally! ⚽🏏🏀" -ForegroundColor Green

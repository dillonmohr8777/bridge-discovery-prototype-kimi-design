$ErrorActionPreference = 'Stop'

$workspace = Split-Path -Parent $PSScriptRoot
$site = Join-Path $workspace 'site'
$functions = Join-Path $workspace 'netlify\functions'
$required = @(
  'index.html',
  'community\index.html',
  'studio\index.html',
  'business\index.html',
  'signal\index.html',
  'styles.css',
  'app.js',
  'assets\bridge-branding-guide.png',
  'assets\bridge-network-night.webp',
  'assets\bridge-mark.svg',
  'assets\bridge-midatlantic-3d-v1.webp',
  'assets\fonts\inter-latin.woff2',
  'assets\fonts\montserrat-latin.woff2',
  'assets\fonts\poppins-600-latin.woff2',
  'assets\fonts\poppins-700-latin.woff2',
  'assets\fonts\poppins-800-latin.woff2'
)

$missing = @($required | Where-Object { -not (Test-Path (Join-Path $site $_)) })
if ($missing.Count -gt 0) {
  throw "Missing required files: $($missing -join ', ')"
}

$requiredFunctions = @('google-maps-loader.js')
$missingFunctions = @($requiredFunctions | Where-Object { -not (Test-Path (Join-Path $functions $_)) })
if ($missingFunctions.Count -gt 0) {
  throw "Missing required functions: $($missingFunctions -join ', ')"
}

$textFiles = Get-ChildItem $site -Recurse -File | Where-Object { $_.Extension -in '.html', '.css', '.js' }
$combined = ($textFiles | ForEach-Object { Get-Content -Raw -Encoding UTF8 $_.FullName }) -join "`n"

if ($combined -match '[\u2013\u2014]') {
  throw 'Visible site copy contains a disallowed long dash character.'
}

if ($combined -match '(href|src)="(styles\.css|app\.js|assets/)') {
  throw 'A route still uses a fragile document-relative shared asset path.'
}

if ($combined -match 'AIza[0-9A-Za-z_-]{20,}') {
  throw 'A Google API key was written into the public site files.'
}

$routeFiles = Get-ChildItem $site -Recurse -Filter index.html
foreach ($file in $routeFiles) {
  $html = Get-Content -Raw -Encoding UTF8 $file.FullName
  if ($html -notmatch 'viewport-fit=cover') { throw "$($file.FullName) is missing safe-area viewport support." }
  if ($html -match 'fonts\.googleapis\.com|fonts\.gstatic\.com') { throw "$($file.FullName) still depends on a remote font stylesheet." }
  if ($html -notmatch 'href="/styles\.css"') { throw "$($file.FullName) is missing the shared Bridge stylesheet." }
  if ($html -notmatch 'noindex, nofollow') { throw "$($file.FullName) is missing prototype noindex metadata." }
}

$css = Get-Content -Raw -Encoding UTF8 (Join-Path $site 'styles.css')
foreach ($family in @('Inter', 'Montserrat', 'Poppins')) {
  $fontPattern = 'font-family:\s*["'']?' + [regex]::Escape($family)
  if ($css -notmatch $fontPattern) { throw "Shared CSS is missing the local $family font face." }
}

Write-Output "PASS routes=$($routeFiles.Count) files=$($required.Count) functions=$($requiredFunctions.Count)"

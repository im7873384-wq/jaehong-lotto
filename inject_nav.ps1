$nav = @'
  <nav class="nav">
    <a href="/">Home</a>
    <a href="/lotto">Lotto</a>
    <a href="/saju">Saju</a>
  </nav>
'@

$style = @'
  <style>
    .nav{display:flex;gap:12px;padding:12px 14px;border-bottom:1px solid rgba(0,0,0,.08);position:sticky;top:0;background:rgba(255,255,255,.85);backdrop-filter:blur(6px);z-index:50;}
    .nav a{text-decoration:none;color:inherit;padding:6px 10px;border-radius:8px;font-weight:600;}
    .nav a:hover{background:rgba(0,0,0,.06);}
  </style>
'@

function Inject($path) {
  $h = Get-Content -Raw -Path $path
  if ($h -notmatch 'class="nav"') {
    $h = [regex]::Replace($h, '<body([^>]*)>', "<body`$1>`n$nav", 1)
  }
  if ($h -notmatch '\.nav\{') {
    $h = [regex]::Replace($h, '</head>', "$style</head>", 1)
  }
  Set-Content -NoNewline -Encoding UTF8 -Path $path -Value $h
}

Inject (Join-Path $PSScriptRoot 'lotto\index.html')
Inject (Join-Path $PSScriptRoot 'saju\index.html')
Write-Host "nav injected"

# Paylaşım görselleri (1200x630): public/og-<dil>.png ve public/og-couples-<dil>.png
# Çalıştırma: powershell -ExecutionPolicy Bypass -File scripts/og-image.ps1
Add-Type -AssemblyName System.Drawing

$site = Split-Path $PSScriptRoot -Parent
$shots = Join-Path (Split-Path $site -Parent) 'gorseller'

function Color($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function RoundedPath($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x, $y, 2 * $r, 2 * $r, 180, 90)
  $p.AddArc($x + $w - 2 * $r, $y, 2 * $r, 2 * $r, 270, 90)
  $p.AddArc($x + $w - 2 * $r, $y + $h - 2 * $r, 2 * $r, 2 * $r, 0, 90)
  $p.AddArc($x, $y + $h - 2 * $r, 2 * $r, 2 * $r, 90, 90)
  $p.CloseFigure()
  $p
}

function Phone($g, $file, $x, $y, $w, $frame) {
  $img = [System.Drawing.Image]::FromFile($file)
  $h = [int]($w * $img.Height / $img.Width)
  $b = 12
  $shadow = RoundedPath ($x - $b + 10) ($y - $b + 18) ($w + 2 * $b) ($h + 2 * $b) 52
  $g.FillPath((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 14, 36, 51))), $shadow)
  $outer = RoundedPath ($x - $b) ($y - $b) ($w + 2 * $b) ($h + 2 * $b) 52
  $g.FillPath((New-Object System.Drawing.SolidBrush (Color $frame)), $outer)
  $inner = RoundedPath $x $y $w $h 40
  $g.SetClip($inner)
  $g.DrawImage($img, $x, $y, $w, $h)
  $g.ResetClip()
  $img.Dispose()
}

function Render($lang, $out, $siteName, $title, $note, $bg, $soft, $accent, $ink, $muted, $back, $front) {
  $bmp = New-Object System.Drawing.Bitmap 1200, 630
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear((Color $bg))
  $g.FillEllipse((New-Object System.Drawing.SolidBrush (Color $soft)), 560, -160, 820, 820)

  $icon = [System.Drawing.Image]::FromFile((Join-Path $site 'public/icon-192.png'))
  $g.DrawImage($icon, 72, 72, 64, 64)
  $icon.Dispose()
  $name = New-Object System.Drawing.Font 'Segoe UI', 26, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString($siteName, $name, (New-Object System.Drawing.SolidBrush (Color $ink)), 150, 86)

  $big = New-Object System.Drawing.Font 'Segoe UI Black', 54, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString($title, $big, (New-Object System.Drawing.SolidBrush (Color $ink)), (New-Object System.Drawing.RectangleF 66, 180, 560, 300))

  $small = New-Object System.Drawing.Font 'Segoe UI', 24, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush (Color $accent)), 72, 520, 48, 6)
  $g.DrawString($note, $small, (New-Object System.Drawing.SolidBrush (Color $muted)), 66, 540)

  Phone $g (Join-Path $shots "$lang/$back") 700 90 300 '#0e2433'
  Phone $g (Join-Path $shots "$lang/$front") 880 150 300 '#0e2433'

  $bmp.Save((Join-Path $site "public/$out"), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

foreach ($lang in 'tr', 'en') {
  $homeText = Get-Content (Join-Path $site "src/i18n/$lang/home.json") -Raw -Encoding UTF8 | ConvertFrom-Json
  $common = Get-Content (Join-Path $site "src/i18n/$lang/common.json") -Raw -Encoding UTF8 | ConvertFrom-Json
  $topics = Get-Content (Join-Path $site "src/i18n/$lang/topics.json") -Raw -Encoding UTF8 | ConvertFrom-Json
  $note = $common.store.note

  Render $lang "og-$lang.png" $common.meta.siteName $homeText.hero.title $note '#f3f9fb' '#dff0fd' '#1670cc' '#0e2433' '#4b6577' '28-ana-sayfa-yakinlar.png' '15-grup-sohbeti.png'
  Render $lang "og-couples-$lang.png" $common.meta.siteName $topics.couples.title $note '#fff4f8' '#ffdde9' '#e85d8e' '#5b1631' '#9c5a74' '01-ana-sayfa.png' '16-sevgili-planlar.png'
}
Write-Output 'og images written to public/'

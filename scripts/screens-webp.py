# Ekran görüntülerini siteye çevirir: ../gorseller/<dil>/*.png → src/assets/screens/<dil>/<no>-400|800.webp
# Pillow ister (projenin bağımlılığı değildir): python -m venv .venv-webp && .venv-webp/Scripts/pip install pillow
# Çalıştırma (bu klasörde): .venv-webp/Scripts/python scripts/screens-webp.py
import glob
import os

from PIL import Image

# Sitede kullanılan görseller; liste ../GORSELLER.md bölüm 2 ile aynı tutulur.
USED = '01 02 03 04 05 06 07 09 10 11 13 14 15 16 18 19 22 24 25 26 27 28 29 30 31 32 33'.split()
SRC = os.environ.get('SHOTS_DIR', '../gorseller')
DST = 'src/assets/screens'

for lang in ('tr', 'en'):
    os.makedirs(f'{DST}/{lang}', exist_ok=True)
    for old in glob.glob(f'{DST}/{lang}/*.webp'):
        if os.path.basename(old)[:2] not in USED:
            os.remove(old)
    for no in USED:
        found = glob.glob(f'{SRC}/{lang}/{no}-*.png')
        if len(found) != 1:
            raise SystemExit(f'{lang}/{no}: PNG bulunamadı ya da birden fazla ({found})')
        image = Image.open(found[0]).convert('RGB')
        for width in (400, 800):
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.LANCZOS).save(f'{DST}/{lang}/{no}-{width}.webp', 'WEBP', quality=80, method=6)
print(f'{len(USED)} görsel × 2 dil × 2 boyut yazıldı.')

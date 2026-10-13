# Yakın Çevrem — tanıtım sitesi

Yakın Çevrem Android uygulamasının tanıtım sitesi: **https://yakin-cevrem.vercel.app**

Yakın Çevrem, yakın çevrenle (arkadaşlar, aile, ev arkadaşları, küçük ekipler ve sevgililer) planlarını, programını ve işlerini tek yerde tuttuğun bir plan ve program uygulamasıdır. Site uygulamanın her alanını anlatır, Google Play'e yönlendirir ve Play'in istediği gizlilik politikası, kullanım koşulları ve hesap silme sayfalarını barındırır.

Site içeriği uygulamanın **6.32.0** sürümüne göredir (13 Ekim 2026).

## Teknoloji

- Vue 3 + TypeScript + Vite; sayfalar `vite-ssg` ile derlemede HTML'e çevrilir (her sayfa arama motoruna ve paylaşım önizlemesine hazır gelir).
- `vue-router`, `@unhead/vue`; stil Tailwind CSS 4; yazı tipi Plus Jakarta Sans (siteye gömülü).
- Çok dil: Türkçe (`/`) ve İngilizce (`/en/`). Kendi küçük çeviri katmanı, `vue-i18n` yok.
- Çerez ve analiz aracı yok. Tek form erken katılım listesi (aşağıda).

## Komutlar

```bash
npm install          # bağımlılıklar
npm run dev          # geliştirme sunucusu
npm run check        # tür denetimi (vue-tsc) + TR/EN dil dosyaları aynı anahtarlara sahip mi
npm run build        # dil denetimi + statik derleme (dist/) + SEO denetimi, sitemap.xml, 404.html
npm run preview      # derlenmiş siteyi yerelde aç
npm run legal:check  # yasal metinler uygulamadakiyle aynı mı
npm run legal:sync   # yasal metinleri uygulamadan kopyala
```

`legal:*` komutları uygulamanın kaynak kodunu okur; varsayılan yer `../..`. Site başka bir klasördeyse: `APP_DIR=/uygulamanın/yolu npm run legal:check`.

## Klasörler

```
src/
  pages/              sayfalar (ana sayfa, konu sayfası, tüm özellikler, yol haritası, SSS, yasal, hesap silme, 404)
  components/         home/, topic/, roadmap/, layout/, common/, sky/ …
  config/             app.ts (adres, sürüm, Play bağlantısı, destek e-postası), features.ts (özellik → durum),
                      topics.ts (konu sayfası → satırlar ve görseller), faq.ts, roadmap.ts, shots.ts
  i18n/tr|en/*.json   sitedeki bütün metinler; kodda metin yazılmaz
  content/legal/      uygulamadan kopyalanan gizlilik politikası ve kullanım koşulları
  assets/screens/     uygulamanın ekran görüntüleri (WebP, 400 ve 800 px)
scripts/              i18n-check, legal-*, postbuild (SEO + sitemap), og-image.ps1, screens-webp.py
public/               simgeler, paylaşım görselleri (og-*.png), robots.txt
```

## Sayfalar

| Türkçe                                           | İngilizce                                                   | İçerik                                                                                                                         |
| ------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                              | `/en`                                                       | Vitrin: nasıl çalışır, "Kendin dene" (ortak boşluk denemesi), kimlerle, neler var, yeni gelenler, paketler, sırada ne var, SSS |
| `/program`                                       | `/en/schedule`                                              | Haftalık program, ortak boş zaman, yakınlar                                                                                    |
| `/planlar`                                       | `/en/plans`                                                 | Buluşmalar, anket, canlı buluşma, Gündem                                                                                       |
| `/projeler`                                      | `/en/projects`                                              | Yöntem seçimi, rehberli araçlar, pano, onay, çizelge, yapay zekâ için dışa aktarma                                             |
| `/sohbet`                                        | `/en/chat`                                                  | Sohbet, "hakkında konuş", bildirimler                                                                                          |
| `/sevgilinle`                                    | `/en/couples`                                               | Sevgili alanı                                                                                                                  |
| `/guven`                                         | `/en/trust`                                                 | Gizlilik ve kontrol                                                                                                            |
| `/ozellikler`                                    | `/en/features`                                              | Bütün özellikler, durumlarıyla (var · yakında · Pro)                                                                           |
| `/yol-haritasi`                                  | `/en/roadmap`                                               | Gelecek aşamalar (tarihsiz)                                                                                                    |
| `/erken-katilim`                                 | `/en/early-access`                                          | Erken katılım listesi (e-posta formu)                                                                                          |
| `/sss`, `/gizlilik`, `/kosullar`, `/hesap-silme` | `/en/faq`, `/en/privacy`, `/en/terms`, `/en/delete-account` |                                                                                                                                |

## İçerik kuralları

- Uygulamada olmayan bir özellik "var" diye yazılmaz; yakında olanlar "Yakında", tarih verilmez.
- Mesajlar sunucuda şifreli saklanır, **uçtan uca şifreli değildir**; site bunu böyle söyler.
- Uygulama şu an yalnızca Android'de.
- Pro (sesli ve görüntülü arama) henüz yok; fiyat yazılmaz.

## Erken katılım listesi (Vercel ayarı)

Form, uygulamanın Supabase'indeki `join_waitlist` RPC'sine yazar (tablo `site_waitlist`; okuma kapalı, listeyi Supabase panelinden görürsün). Vercel → Project → Settings → Environment Variables:

| Ad                          | Değer                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `_SUPABASE_URL`             | Uygulamanın Supabase adresi (`https://<proje>.supabase.co`)                                                                   |
| `_SUPABASE_PUBLISHABLE_KEY` | Uygulamanın kullandığı publishable (anon) anahtar; tarayıcıya açık olması güvenlidir, `service_role` anahtarı **asla** konmaz |

Değişkenler boşsa sayfa formu göstermez, e-posta bağlantısına düşer. Listeyi görmek: Supabase → SQL Editor → `select * from site_waitlist order by created_at desc;`. Birini silmek: `delete from site_waitlist where email = '...';`. Not: uygulamanın `reset.sql`'i bu tabloyu da siler.

## Ekran görüntülerini yenilemek

Görseller uygulamanın deposundaki üreticiden gelir (kurgusal kişiler, gerçek kullanıcı verisi yok):

1. Uygulama kökünde: `flutter test tool/screenshots/screenshots_test.dart` → `../gorseller/<dil>/*.png`
2. Bu klasörde: `python scripts/screens-webp.py` (Pillow gerekir; projeye bağımlılık olarak eklenmez, geçici bir sanal ortama kurulur)
3. Bu klasörde: `powershell -ExecutionPolicy Bypass -File scripts/og-image.ps1` (paylaşım görselleri)

## Yayın

Vercel; ayarlar `vercel.json`'da (derleme `npm run build`, çıktı `dist/`, güvenlik başlıkları). Uygulama Play'de yayımlanınca `src/config/app.ts` → `playStoreUrl` doldurulur; indirme düğmeleri doğrudan Play'e gider.

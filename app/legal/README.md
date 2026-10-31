# Yasal metinler

Bu klasör hukukçunun onayladığı metinleri tutar (S13-07). Onay gelene kadar boştur; sayfalar adreslerini korur ve "Bu metin hazırlanıyor" der.

Onay günü yapılacaklar (hepsi aynı gün, S13-02 5.1 adım 7):

1. Her metnin "Yayınlanacak metin" bölümü onaylı haliyle buraya kopyalanır. Köşeli parantezli yer tutucular ve **[Karar: ...]**, **[HS-n]** işaretleri kalmaz.

   | Dosya | Kaynak |
   | --- | --- |
   | `gizlilik.md` | `docs/legal/s4-09-gizlilik-politikasi.md` |
   | `kullanim-sartlari.md` | `docs/legal/s4-09-kullanim-sartlari.md` |
   | `kvkk.md` | `docs/legal/s4-09-kvkk-aydinlatma-metni.md` |
   | `bekleme-listesi-bilgilendirme.md` | `docs/legal/s1-06-bekleme-listesi-onaylari.md`, bölüm 1 |

2. `app/site.ts` içinde `legalApproved: true` yapılır.
3. `npm run generate` çalıştırılır. `scripts/check-site.mjs` dört dosyadan biri eksikse ya da metinde yer tutucu kalmışsa yayını durdurur.

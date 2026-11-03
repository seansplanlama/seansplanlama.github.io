# Seans tanıtım sitesi (S12-08)

Tek sayfalık tanıtım sitesi ve yasal metin sayfaları. Yayın adresi `https://seansplanlama.github.io` (S13-02 K-3 b, 30 Ekim 2026). Görev: [#115](https://github.com/MrKacmaz/ozel-ders-mobil/issues/115). Metin kaynağı: [S13-02 landing taslağı](../docs/marketing/s13-02-landing-taslagi.md).

- **Yığın:** Nuxt 4 ve Tailwind CSS 4. Bütün sayfalar build sırasında HTML'e çevrilir (`nuxt generate`), sunucu yok.
- **JavaScript yok.** `features.noScripts` sayfalardan Nuxt'ın betiklerini çıkarır. SSS `<details>` ile açılır. Yalnız tarayıcıya aynı sitedeki sayfaları önceden yükleme ipucu veren `speculationrules` bloğu kalır, o çalışan bir betik değildir.
- **Üçüncü taraf yok.** Çerez, ziyaretçi analizi, gömülü form ya da başka bir siteden yüklenen yazı tipi, betik veya görsel yok. Nunito (`@fontsource-variable/nunito`) ve Ionicons build'e girer. Gizlilik politikası taslağı bölüm 6'daki "Sitemizde çerez, reklam ya da ziyaretçi analizi aracı kullanılmaz" cümlesi bu yüzden doğru; `scripts/check-site.mjs` bunu her build'de denetler.
- **Barındırma kaydı.** GitHub, Pages sitesini ziyaret edenin IP adresini güvenlik için kaydediyor, ziyaretçi GitHub'a giriş yapmış olsun olmasın ([GitHub Docs: What is GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), "Data collection", 31 Ekim 2026'da okundu). Gizlilik politikasındaki `[BARINDIRMA HİZMETİ]` bu yüzden GitHub, Inc. (ABD) olur.

## Neden bu klasörde

GitHub'ın ücretsiz planında Pages yalnız public depoda çalışır ve organizasyon sitesinin deposu `<organizasyon>.github.io` adını taşımalıdır ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), 31 Ekim 2026'da okundu). Uygulama deposu açılmayacağı için site ayrı bir depoda yayınlanır: `seansplanlama/seansplanlama.github.io`. Organizasyonu ve depoyu ürün sahibi açar. O güne kadar kod burada durur; uygulamanın araçları (ESLint, Prettier, TypeScript, Jest) bu klasörü yok sayar.

## Komutlar

Node 24 gerekir (`.nvmrc`; Nuxt 4.6 Node 22.22.3 ya da 24.15 ve üstünü istiyor).

```bash
cd landing
npm install
npm run dev          # geliştirme sunucusu, http://localhost:3000
npm run generate     # .output/public altında statik site, ardından scripts/check-site.mjs
npm run preview      # üretilen siteyi http://localhost:4173 adresinde açar (python3)
npm run typecheck    # vue-tsc
npm run format:check # Prettier (düzeltme: npm run format)
```

## Yapı

| Yol | Ne |
| --- | --- |
| `app/site.ts` | Yayından önce değişen her şey: adres, form ve mağaza bağlantıları, sosyal hesaplar, aşama anahtarları. Aşağıdaki tablo |
| `app/pages/index.vue` | Landing. Metin taslağın 1.2 … 1.8 bölümlerinden, yorumlarda bölüm numaraları |
| `app/pages/gizlilik.vue`, `kullanim-sartlari.vue`, `kvkk.vue`, `bekleme-listesi-bilgilendirme.vue` | Yasal sayfalar. Uygulama ilk üçünü açar (`src/services/support/index.ts`), Tally formu sonuncusunu bağlar |
| `app/legal/` | Hukukçunun onayladığı metinler. Onaya kadar boş ([README](app/legal/README.md)) |
| `app/error.vue` | 404 sayfası. GitHub Pages bilinmeyen adreslerde `404.html`'i gösterir |
| `app/assets/css/main.css` | Uygulamanın renk token'ları (S2-02 1.2, açık ve koyu tema) |
| `public/gorseller/` | Ekran görüntüleri (aşağıda) |
| `public/app-ads.txt` | AdMob yayıncı doğrulaması (aşağıda) |
| `public/paylasim.png` | Paylaşım görseli, 1200 × 630 (S12-05, `docs/design/magaza/paylasim-1200x630.png`) |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | İşaret (`docs/design/magaza/ikon/isaret.svg`, `ios-acik.png`) |
| `scripts/check-site.mjs` | Üretilen siteyi kararlara göre denetler, hata varsa yayını durdurur |
| `.github/workflows/deploy.yml` | Yayın iş akışı. Burada çalışmaz, ayrı depoda çalışır |

## `app/site.ts`: yer tutucular ve anahtarlar

Boş (`null`) bir değer sayfada o parçanın hiç görünmemesi demektir; ziyaretçi köşeli parantezli bir yer tutucu görmez.

| Alan | Şimdi | Ne zaman, kim | Sayfada ne değişir |
| --- | --- | --- | --- |
| `url` | `https://seansplanlama.github.io` | Organizasyon açılınca ad doğrulanır (ürün sahibi) | Kanonik adres, paylaşım görselinin adresi |
| `waitlistUrl` | `null` | Tally formu kurulup S13-07 onayı gelince (ürün sahibi) | Üst alandaki "Bekleme listesine yazıl" düğmesi ve kapanış bandı. `legalApproved` `false` iken build hata verir |
| `legalApproved` | `false` | S13-07 onay günü, `app/legal/*.md` ile birlikte | Dört yasal sayfa "Bu metin hazırlanıyor" yerine onaylı metni gösterir, `noindex` kalkar |
| `deviceTestPassed` | `false` | S13-08 iPhone'da geçince (K-5) | "Dersten önce hatırlatma bildirimi gelir." cümlesi ve "Derslerim telefonumun takviminde görünür mü?" sorusu aynı gün girer |
| `testFlightUrl` | `null` | Apple hesabı ve ilk TestFlight incelemesinden sonra (K-4 b) | SSS'deki iPhone cevabı TestFlight bağlantısını verir |
| `supportEmail` | `null` | S13-01 | Alt bilgide "Destek:" satırı |
| `developerName` | `null` | Mağazadaki satıcı adı | Alt bilgide "Seans · ad" |
| `instagramUrl`, `tiktokUrl` | `null` | Hesaplar açılınca (lansman planı 3.4) | Alt bilgideki bağlantılar, "Ne zaman çıkıyor?" cevabındaki kanal adları |
| `phase` | `'prelaunch'` | İki mağaza da açılınca `'launched'` | Üst alanda ve kapanış bandında mağaza rozetleri, SSS 3 ve 7'nin yayından sonraki hali |
| `appStoreUrl`, `googlePlayUrl` | `null` | Yayın günü, kampanya parametreleriyle (lansman planı 4.2) | Rozet bağlantıları |

Sayfanın üç hali:

1. **Şimdi (yayından önce, form kapalı).** Düğme ve kapanış bandı yok (taslak 2.2, "Form kapalıyken"). Üst alanda düğmenin yerinde "Ücretsiz, reklamsız, hesap gerektirmez." satırı durur; bu satır taslakta meta açıklamada ve yayından sonraki üst alanda geçer.
2. **Form açık (S13-07'den sonra).** Düğme formu yeni sekmede açar, form siteye gömülmez (taslak 1.11).
3. **Yayından sonra.** Rozetler gelir. Resmi, Türkçe ve değiştirilmemiş rozetler yayın günü Apple'ın ve Google'ın rozet sayfalarından indirilip `public/rozetler/app-store.svg` ve `public/rozetler/google-play.png` adıyla konur; Google'ın atıf satırı da o gün eklenir (taslak 1.9). Dosyalar yoksa build hata verir.

## Denetimler (`scripts/check-site.mjs`)

Her `npm run generate` sonunda çalışır:

- Bütün sayfalar `lang="tr"`, başlıklı; betik yok, başka bir siteden yüklenen dosya yok; büyük harf dönüşümü yok (ı/İ).
- Landing metninde taslak bölüm 4'ün yasakladığı ifadeler yok ("güvenli", "en iyi", "yakında", "Seans Pro", koşulsuz "Google Takvim'e yansır", uyarı dışında "şifreli" vb.), düz kesme işareti yok (’ kullanılır), köşeli parantezli yer tutucu yok.
- Üretilen hiçbir dosyada reklam, çerez ya da analiz izi yok (`adsbygoogle`, `doubleclick`, `googletagmanager`, `document.cookie`, `<iframe>` vb.): site reklamsız kalır.
- `app-ads.txt` kökte ve içinde yalnız tek bir AdMob satırı var.
- K-5: `deviceTestPassed` `false` iken hatırlatma cümlesi ve takvim sorusu yok.
- Bekleme listesi düğmesi yasal metinler onaylanmadan görünmez.
- `phase: 'launched'` iken iki mağaza bağlantısı ve iki rozet dosyası var.
- Yasal sayfalar: onaydan önce "Bu metin hazırlanıyor" ve `noindex`; onaydan sonra `app/legal/` altında dört dosya, içinde yer tutucu ya da karar işareti yok.

## `app-ads.txt` (S12-26)

AdMob, mağaza kaydındaki geliştirici sitesinin kökünde `app-ads.txt` arar ve yayıncıyı onunla doğrular; doğrulanmayan uygulamaya reklam tam sunulmaz (reklam karar notu RK-6). Dosya `public/app-ads.txt`, build'de sitenin köküne kopyalanır ve `https://seansplanlama.github.io/app-ads.txt` adresinden düz metin olarak açılır.

```
google.com, pub-9902700337568115, DIRECT, f08c47fec0942fa0
```

- Yayıncı kimliği ürün sahibinin AdMob hesabınınkidir; uygulamanın AdMob uygulama kimlikleri (`ca-app-pub-9902700337568115~…`, uygulama deposunda `.env` ve [docs/release.md](../docs/release.md) "Reklam") aynı kimlikle başlar. Son alan Google'ın sertifika kimliğidir, AdMob'un verdiği satırla aynı.
- AdMob tarayıcısı geliştirici sitesinin adresindeki ana makine adını kullanır, önce `https://<ad>/app-ads.txt`'e bakar ve bir alt alan düzeyi yukarı çıkabilir ([AdMob: Set up an app-ads.txt file](https://support.google.com/admob/answer/9363762), 3 Kasım 2026'da okundu). Yol önemsizdir, ana makine adı sayılır; bu yüzden iki mağaza kaydındaki geliştirici sitesi adresi (Google Play'de Website, App Store'da Marketing URL ve Support URL) `seansplanlama.github.io` alan adında olur (S12-09). Adres değişirse dosya yeni adresin kökünde de durmalı.
- Doğrulama yayından sonra AdMob'da uygulama mağaza kaydına bağlanınca başlar (S13-13); o zamana kadar AdMob'da "app-ads.txt bulunamadı" görünmesi beklenir. Satır bir reklam ağı daha eklenmedikçe değişmez.

## Ekran görüntüleri

`public/gorseller/` altındaki dosyalar S12-05'in ham ekran görüntülerinden (`builds/magaza/ham/`, uydurma veri; depoya girmez) ImageMagick ile WebP'ye çevrildi. Görüntü yeniden çizilmedi, yalnız ölçeklendi ve meslek kartlarında kırpıldı:

```bash
H=../builds/magaza/ham
magick $H/ios/ogretmen-01-bugun-acik.png -resize 640x -quality 82 public/gorseller/bugun-iphone.webp
magick $H/android/ogretmen-02-takvim-acik.png -resize 560x -quality 82 public/gorseller/takvim-android.webp
# meslek kartları: ogretmen, antrenor, danisan, musteri -> egitim, spor, danismanlik, evcil-ev
magick $H/ios/antrenor-01-bugun-acik.png -crop 1320x1440+0+345 +repage -resize 560x -quality 82 public/gorseller/meslek-spor.webp
# nasıl çalışır: ogretmen-06-meslek, ogretmen-04b-ders-formu-ust, ogretmen-03-alacaklar
magick $H/ios/ogretmen-06-meslek-acik.png -resize 480x -quality 82 public/gorseller/adim-meslek.webp
```

Uygulamanın ekranı değişirse görüntüler aynı komutlarla yenilenir.

## Ayrı depoya taşıma (ürün sahibi)

1. GitHub'da ücretsiz `seansplanlama` organizasyonu açılır (ad 26 Ekim 2026'da boştu, açarken doğrulanır).
2. Organizasyonda **public** `seansplanlama.github.io` deposu boş olarak açılır.
3. Bu klasör geçmişiyle birlikte yeni deponun köküne taşınır. Uygulama deposunun kökünde:

   ```bash
   git subtree split --prefix=landing -b landing-export
   git push https://github.com/seansplanlama/seansplanlama.github.io.git landing-export:main
   git branch -D landing-export
   ```

4. Yeni depoda Settings > Pages > Build and deployment > Source: **GitHub Actions**.
5. İş akışı (`Yayın`) ilk push'ta çalışır; bitince site `https://seansplanlama.github.io` adresinde açılır.
6. Uygulamadaki `LANDING_URL` (`src/services/support/index.ts`) 31 Ekim 2026'dan beri bu adres, gizlilik politikası taslağı 0.5 da; mağaza konsolları ve sosyal medya profilleri de bu adresi kullanır. Uygulama deposundaki `landing/` klasörü bundan sonra kaldırılabilir; `docs/architecture.md` yeni depoyu gösterir.

Site yayına girdikten sonra da duyurulmaz: duyuru, form ve yasal metinler S13-07 onayıyla aynı gün açılır (taslak 5.1, adım 7).

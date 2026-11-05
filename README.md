# Seans tanıtım sitesi (S12-08)

Tek sayfalık tanıtım sitesi ve yasal metin sayfaları. Yayın adresi `https://seansplanlama.github.io` (S13-02 K-3 b, 30 Ekim 2026). Görev: [#115](https://github.com/MrKacmaz/ozel-ders-mobil/issues/115). Metin kaynağı: [S13-02 landing taslağı](https://github.com/MrKacmaz/ozel-ders-mobil/blob/master/docs/marketing/s13-02-landing-taslagi.md).

- **Yığın:** Nuxt 4 ve Tailwind CSS 4. Bütün sayfalar build sırasında HTML'e çevrilir (`nuxt generate`), sunucu yok.
- **Betikler.** `features.noScripts` sayfalardan Nuxt'ın betiklerini çıkarır. Sayfada dört şey çalışır, hepsi bu siteden gelir: satır içi tema hafızası (seçilen temayı `localStorage`'da `seans-tema` anahtarıyla tutar; çerez değildir, ağa çıkmaz), satır içi hareket anahtarı (hareket izinliyse `<html>`'e `hareket` sınıfını ekler, GSAP 2,5 saniyede gelmezse geri alır), GSAP (`public/vendor/gsap`) ve sayfanın hareketi (`public/js/hareket.js`). Sayfa betiksiz de eksiksiz okunur: SSS `<details>`, meslek ve tema seçicileri radyo düğmeleriyle CSS'te çalışır, adım kartları CSS `sticky` ile yığılır; betik yalnız temayı hatırlamayı ve hareketi ekler. Bir de tarayıcıya aynı sitedeki sayfaları önceden yükleme ipucu veren `speculationrules` bloğu var, o çalışan bir betik değildir.
- **Üçüncü taraf yok.** Çerez, ziyaretçi analizi, gömülü form ya da başka bir siteden yüklenen yazı tipi, betik veya görsel yok. Nunito (`@fontsource-variable/nunito`) ve Ionicons build'e girer; GSAP (`gsap` npm paketi, sürüm `package.json`'da sabit, GSAP Standard ücretsiz lisansı) `scripts/vendor.mjs` ile `public/vendor/gsap`'e kopyalanıp bu siteden sunulur, CDN kullanılmaz. Gizlilik politikası taslağı bölüm 6'daki "Sitemizde çerez, reklam ya da ziyaretçi analizi aracı kullanılmaz" cümlesi bu yüzden doğru; `scripts/check-site.mjs` bunu her build'de denetler.
- **Uygulama reklamlı, site reklamsız** (S12-26, 3 Kasım 2026). Uygulama kişiselleştirilmemiş reklam gösterir (S12-16); sitenin kendisinde reklam, çerez ve analiz yok. "Reklamsız" sayfada uygulama için geçmez (S13-02 1.11), denetim bunu da yakalar. Sitenin kökündeki `app-ads.txt` AdMob'un yayıncıyı doğruladığı düz metin dosyasıdır, sayfaya bir şey eklemez.
- **Barındırma kaydı.** GitHub, Pages sitesini ziyaret edenin IP adresini güvenlik için kaydediyor, ziyaretçi GitHub'a giriş yapmış olsun olmasın ([GitHub Docs: What is GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), "Data collection", 31 Ekim 2026'da okundu). Gizlilik politikasındaki `[BARINDIRMA HİZMETİ]` bu yüzden GitHub, Inc. (ABD) olur.

## Tasarım (5 Kasım 2026)

Sayfa logodan çıkar: işaretin arkasındaki üç takvim bloğu (köşesi yuvarlak dikdörtgen) uygulamanın haftalık takvimindeki ders bloğunun kendisidir ve sayfadaki tek şekil odur. Üst alanda işaret poster boyutunda, ekranın kenarlarından taşar ve çekirdek karede Bugün ekranı durur; fayda karoları blok dolgularının üstünde ekran kırpımlarıdır; düğme, madde işareti ve alt bilgideki bloklardan kurulmuş "Seans" adı aynı şekildir. Yön `design-taste-frontend` skill'inin `one-motif` yönünden alındı (çalışma dosyaları `.taste-skill/`, depoya girmez).

- **Renk.** Zemin ve mürekkep uygulamanın token'ları (S2-02 1.2, 1.4). Mavi `#1D5FE0`, turkuaz `#0B8577`, mor `#8B3FE0` logonun blokları ve uygulamanın öğrenci paletindeki aynı adlı anahtarların `mark` tonlarıdır; karo zeminleri aynı anahtarların `fill` tonları, nane noktası `#3FE0C8`. Uygulamada olmayan renk yok. Bütün renkler `light-dark()` ile iki temada tanımlı (`app/assets/css/main.css`).
- **Tema.** Üst bardaki seçici: Cihazın ayarı (varsayılan), Açık, Koyu. Yalnız `:root`'un `color-scheme` değeri değişir. `light-dark()` bilmeyen tarayıcı (Safari 17.5 öncesi) seçiciyi görmez, cihazın ayarıyla açılır.
- **Meslekler.** Dört meslek grubu bir anahtarla seçilir; alan o grubun blok rengine döner, o grubun sözcükleri ve Bugün ekranı gelir. `:has()` bilmeyen tarayıcıda anahtar gizlenir, dört grup alt alta görünür.
- **Yazı.** Yalnız Nunito, beş boy: büyük başlık, bölüm başlığı, ara başlık, giriş, gövde (17 px).
- **Hareket (GSAP, `gpt-taste` skill'inin bölüm 5'i).** `public/js/hareket.js`, GSAP 3 ile ScrollTrigger ve SplitText:
  - Üst alan: başlık maskenin arkasından satır satır yükselir, işaretin blokları sırayla gelir, Bugün ekranı perde gibi açılır; aşağı kaydırınca bloklar farklı hızlarda ayrılır (scrub).
  - Neler yapar: geniş ekranda başlık solda sabit kalır, karolar sağda akar (pin). Ekran kırpımları küçük başlayıp görünüme girerken büyür, çıkarken solar.
  - Nasıl çalışır: adım kartları CSS `sticky` ile üst üste yığılır, her kart bir öncekinin başlığını sekme gibi açık bırakır; GSAP alttaki kartı geri iter ve karartır.
  - Bilgilerin telefonunda: panel büyüyerek açılır, giriş paragrafı okundukça kelime kelime netleşir (scrub).
  - Alt bilgi: "Seans" bloklarının her biri sırayla yerine yükselir. Bölüm başlıkları, metinler ve görseller ekrana girdikçe sırayla yükselir.
  - `prefers-reduced-motion: reduce` açıkken hiçbiri çalışmaz (`gsap.matchMedia`), sayfa son haliyle durur. Meslek değişince panelin gelişi CSS'tir.

## Neden ayrı depo

GitHub'ın ücretsiz planında Pages yalnız public depoda çalışır ve organizasyon sitesinin deposu `<organizasyon>.github.io` adını taşımalıdır ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), 31 Ekim 2026'da okundu). Uygulama deposu private kaldığı için site bu public depoda durur. Site 31 Ekim 2026'da uygulama deposunun `landing/` klasöründe kuruldu ve 5 Kasım 2026'da geçmişiyle buraya taşındı; taşırken commit'lerin yazar ve committer adresi GitHub'ın noreply adresine çevrildi. Depo public olduğu için yeni commit'ler de o adresle atılır:

```bash
git config user.name MrKacmaz
git config user.email 57367737+MrKacmaz@users.noreply.github.com
```

Görevler, kararlar ve metin taslakları uygulama deposunda kalır (private); bu README'deki o depoya giden bağlantılar yalnız ürün sahibine açılır.

## Komutlar

Node 24 gerekir (`.nvmrc`; Nuxt 4.6 Node 22.22.3 ya da 24.15 ve üstünü istiyor).

```bash
npm install
npm run dev          # GSAP'ı public/vendor'a kopyalar, geliştirme sunucusu http://localhost:3000
npm run generate     # GSAP'ı kopyalar, .output/public altında statik site, ardından scripts/check-site.mjs
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
| `app/assets/css/main.css` | Renk ve yazı token'ları (iki tema, `light-dark()`), şekil, düğme ve hareket |
| `app/components/ThemeSwitch.vue` | Tema seçici (Cihazın ayarı, Açık, Koyu) |
| `app/components/LogoMark.vue` | İşaret, satır içi SVG |
| `public/gorseller/` | Ekran görüntüleri (aşağıda) |
| `public/app-ads.txt` | AdMob yayıncı doğrulaması (aşağıda) |
| `public/paylasim.png` | Paylaşım görseli, 1200 × 630 (S12-05, `docs/design/magaza/paylasim-1200x630.png`) |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | İşaret (`docs/design/magaza/ikon/isaret.svg`, `ios-acik.png`) |
| `public/js/hareket.js` | Sayfanın hareketi (GSAP) |
| `public/vendor/gsap/` | GSAP dosyaları; depoda yok, `scripts/vendor.mjs` her `dev` ve `generate`'te `node_modules`'tan kopyalar |
| `scripts/check-site.mjs` | Üretilen siteyi kararlara göre denetler, hata varsa yayını durdurur |
| `.github/workflows/deploy.yml` | Yayın iş akışı (`Yayın`): `main`'e her push'ta biçim, tip, build ve denetim; geçerse GitHub Pages'e yayın |

## `app/site.ts`: yer tutucular ve anahtarlar

Boş (`null`) bir değer sayfada o parçanın hiç görünmemesi demektir; ziyaretçi köşeli parantezli bir yer tutucu görmez.

| Alan | Şimdi | Ne zaman, kim | Sayfada ne değişir |
| --- | --- | --- | --- |
| `url` | `https://seansplanlama.github.io` | Organizasyon açılınca ad doğrulanır (ürün sahibi) | Kanonik adres, paylaşım görselinin adresi |
| `waitlistUrl` | `null` | Tally formu kurulup S13-07 onayı gelince (ürün sahibi) | Üst alandaki "Bekleme listesine yazıl" düğmesi ve kapanış bandı. `legalApproved` `false` iken build hata verir |
| `legalApproved` | `false` | S13-07 onay günü, `app/legal/*.md` ile birlikte | Dört yasal sayfa "Bu metin hazırlanıyor" yerine onaylı metni gösterir, `noindex` kalkar |
| `deviceTestPassed` | `false` | S13-08 iPhone'da geçince (K-5) | "Dersten önce hatırlatma bildirimi gelir." cümlesi ve "Derslerim telefonumun takviminde görünür mü?" sorusu aynı gün girer |
| `appShowsAds` | `false` | Reklamlı build kapalı teste yüklendiği gün (reklam karar notu R11, mağaza beyanları 3.5 Aşama B), gizlilik politikasının reklamlı haliyle aynı gün. Yayından önce mutlaka `true` | SSS 2 reklamsız aşama halinden ("Mağazaya çıkacak sürümde var.") reklamlı cevaba ("Evet. ...") geçer, "Bilgilerin telefonunda"ya reklam maddesi girer (S13-02 1.10, K-7). Kapalı test reklamlı build'le başlarsa baştan `true` |
| `testFlightUrl` | `null` | Apple hesabı ve ilk TestFlight incelemesinden sonra (K-4 b) | SSS'deki iPhone cevabı TestFlight bağlantısını verir |
| `supportEmail` | `null` | S13-01 | Alt bilgide "Destek:" satırı |
| `developerName` | `null` | Mağazadaki satıcı adı | Alt bilgide "Seans · ad" |
| `instagramUrl`, `tiktokUrl` | `null` | Hesaplar açılınca (lansman planı 3.4) | Alt bilgideki bağlantılar, "Ne zaman çıkıyor?" cevabındaki kanal adları |
| `phase` | `'prelaunch'` | İki mağaza da açılınca `'launched'` | Üst alanda ve kapanış bandında mağaza rozetleri, SSS 3 ve 7'nin yayından sonraki hali |
| `appStoreUrl`, `googlePlayUrl` | `null` | Yayın günü, kampanya parametreleriyle (lansman planı 4.2) | Rozet bağlantıları |

Sayfanın üç hali:

1. **Şimdi (yayından önce, form kapalı).** Düğme ve kapanış bandı yok (taslak 2.2, "Form kapalıyken"). Üst alanda düğmenin yerinde "Ücretsiz, hesap gerektirmez." satırı durur; bu satır taslakta meta açıklamada ve yayından sonraki üst alanda geçer.
2. **Form açık (S13-07'den sonra).** Düğme formu yeni sekmede açar, form siteye gömülmez (taslak 1.11).
3. **Yayından sonra.** Rozetler gelir. Resmi, Türkçe ve değiştirilmemiş rozetler yayın günü Apple'ın ve Google'ın rozet sayfalarından indirilip `public/rozetler/app-store.svg` ve `public/rozetler/google-play.png` adıyla konur; Google'ın atıf satırı da o gün eklenir (taslak 1.9). Dosyalar yoksa build hata verir.

## Denetimler (`scripts/check-site.mjs`)

Her `npm run generate` sonunda çalışır:

- Bütün sayfalar `lang="tr"`, başlıklı; yalnız izinli betikler var (satır içi `tema` ve `hareket`, `public/vendor/gsap`'teki üç GSAP dosyası, `public/js/hareket.js`), satır içi betikler ağa ya da çereze dokunmuyor ve 900 karakteri geçmiyor, `hareket.js` ağa, çereze ve `localStorage`'a dokunmuyor; başka bir siteden yüklenen dosya yok; büyük harf dönüşümü yok (ı/İ).
- Landing metninde taslak bölüm 4'ün yasakladığı ifadeler yok ("güvenli", "en iyi", "yakında", "Seans Pro", koşulsuz "Google Takvim'e yansır", uyarı dışında "şifreli", "reklamsız", "reklam yok", "veri paylaşılmaz", "anonim" vb.), düz kesme işareti yok (’ kullanılır), köşeli parantezli yer tutucu yok.
- Üretilen hiçbir dosyada reklam, çerez ya da analiz izi yok (`adsbygoogle`, `doubleclick`, `googletagmanager`, `document.cookie`, `<iframe>` vb.): site reklamsız kalır.
- `app-ads.txt` kökte ve içinde yalnız tek bir AdMob satırı var.
- K-7: `appShowsAds` `false` iken SSS 2 reklamsız aşama halinde ve reklam maddesi yok; `true` iken ikisi de reklamlı halinde. `phase: 'launched'` iken `appShowsAds` `true`.
- K-5: `deviceTestPassed` `false` iken hatırlatma cümlesi ve takvim sorusu yok.
- Bekleme listesi düğmesi yasal metinler onaylanmadan görünmez.
- `phase: 'launched'` iken iki mağaza bağlantısı ve iki rozet dosyası var.
- Yasal sayfalar: onaydan önce "Bu metin hazırlanıyor" ve `noindex`; onaydan sonra `app/legal/` altında dört dosya, içinde yer tutucu ya da karar işareti yok.

## `app-ads.txt` (S12-26)

AdMob, mağaza kaydındaki geliştirici sitesinin kökünde `app-ads.txt` arar ve yayıncıyı onunla doğrular; doğrulanmayan uygulamaya reklam tam sunulmaz (reklam karar notu RK-6). Dosya `public/app-ads.txt`, build'de sitenin köküne kopyalanır ve `https://seansplanlama.github.io/app-ads.txt` adresinden düz metin olarak açılır.

```
google.com, pub-9902700337568115, DIRECT, f08c47fec0942fa0
```

- Yayıncı kimliği ürün sahibinin AdMob hesabınınkidir; uygulamanın AdMob uygulama kimlikleri (`ca-app-pub-9902700337568115~…`, uygulama deposunda `.env` ve [docs/release.md](https://github.com/MrKacmaz/ozel-ders-mobil/blob/master/docs/release.md) "Reklam") aynı kimlikle başlar. Son alan Google'ın sertifika kimliğidir, AdMob'un verdiği satırla aynı.
- AdMob tarayıcısı geliştirici sitesinin adresindeki ana makine adını kullanır, önce `https://<ad>/app-ads.txt`'e bakar ve bir alt alan düzeyi yukarı çıkabilir ([AdMob: Set up an app-ads.txt file](https://support.google.com/admob/answer/9363762), 3 Kasım 2026'da okundu). Yol önemsizdir, ana makine adı sayılır; bu yüzden iki mağaza kaydındaki geliştirici sitesi adresi (Google Play'de Website, App Store'da Marketing URL ve Support URL) `seansplanlama.github.io` alan adında olur (S12-09). Adres değişirse dosya yeni adresin kökünde de durmalı.
- Doğrulama yayından sonra AdMob'da uygulama mağaza kaydına bağlanınca başlar (S13-13); o zamana kadar AdMob'da "app-ads.txt bulunamadı" görünmesi beklenir. Satır bir reklam ağı daha eklenmedikçe değişmez.

## Ekran görüntüleri

`public/gorseller/` altındaki dosyalar S12-05'in ham ekran görüntülerinden (`builds/magaza/ham/`, uydurma veri; depoya girmez) ImageMagick ile WebP'ye çevrildi. Görüntü yeniden çizilmedi, yalnız ölçeklendi ve kırpıldı. `ogretmen-07-karsilama` kullanılmaz: 28 Ekim'deki görüntü karşılama metninin #136'da düzeltilmeden önceki halini gösterir.

```bash
H=<uygulama deposu>/builds/magaza/ham
# üst alan
magick $H/ios/ogretmen-01-bugun-acik.png -resize 860x -quality 82 public/gorseller/bugun-iphone.webp
# fayda karoları
magick $H/ios/ogretmen-02-takvim-acik.png -crop 1320x1700+0+520 +repage -resize 760x -quality 82 public/gorseller/ozellik-program.webp
magick $H/ios/ogretmen-05-paket-program-acik.png -crop 1320x1260+0+330 +repage -resize 660x -quality 82 public/gorseller/ozellik-odeme.webp
magick $H/android/ogretmen-01-bugun-acik.png -crop 1080x1260+0+120 +repage -resize 600x -quality 82 public/gorseller/ozellik-gun.webp
magick $H/android/ogretmen-08-ogrenciler-koyu.png -crop 1080x1720+0+120 +repage -resize 600x -quality 82 public/gorseller/ozellik-iki-platform.webp
# meslekler: ogretmen, antrenor, danisan, musteri -> egitim, spor, danismanlik, evcil-ev
magick $H/ios/antrenor-01-bugun-acik.png -crop 1320x1440+0+345 +repage -resize 840x -quality 82 public/gorseller/meslek-spor.webp
# nasıl çalışır: ogretmen-06-meslek, ogretmen-04b-ders-formu-ust, ogretmen-03-alacaklar
magick $H/ios/ogretmen-06-meslek-acik.png -resize 480x -quality 82 public/gorseller/adim-meslek.webp
# bilgilerin telefonunda
magick $H/android/ogretmen-02-takvim-acik.png -resize 560x -quality 82 public/gorseller/takvim-android.webp
```

Uygulamanın ekranı değişirse görüntüler aynı komutlarla yenilenir.

## Yayın

- 5 Kasım 2026'dan beri yayında: `seansplanlama` organizasyonu ürün sahibinin GitHub hesabına bağlı ücretsiz organizasyon; Settings > Pages > Source **GitHub Actions**.
- `main`'e her push `Yayın` iş akışını çalıştırır; `scripts/check-site.mjs` ya da biçim veya tip kontrolü düşerse yayın olmaz ve eski site kalır. Elle yeniden yayın: Actions > Yayın > Run workflow.
- Uygulamadaki `LANDING_URL` (uygulama deposunda `src/services/support/index.ts`) 31 Ekim 2026'dan beri bu adres; gizlilik politikası taslağı 0.5, mağaza konsolları ve sosyal medya profilleri de bu adresi kullanır. Sayfa yolları (`/gizlilik`, `/kvkk`, `/kullanim-sartlari`) uygulamada sabit, değişmez. GitHub Pages yolu sonuna `/` ekleyerek yönlendirir (`/gizlilik` → `/gizlilik/`).

Site yayına girdikten sonra da duyurulmaz: duyuru, form ve yasal metinler S13-07 onayıyla aynı gün açılır (taslak 5.1, adım 7).

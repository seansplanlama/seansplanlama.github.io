<script setup lang="ts">
import type { IconName } from '~/icons';
import { meta, site } from '~/site';

// Copy comes from docs/marketing/s13-02-landing-taslagi.md (section numbers in comments).
// Lines that depend on a decision or a device test follow the switches in app/site.ts.

const launched = site.phase === 'launched';
const waitlistUrl = launched ? null : site.waitlistUrl;

useSeoMeta({
  title: meta.title,
  description: meta.description,
  ogTitle: meta.title,
  ogDescription: meta.description,
  ogType: 'website',
  ogLocale: 'tr_TR',
  ogUrl: site.url,
  ogImage: `${site.url}${meta.image}`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Seans: Hesabını tutar, hesap açtırmaz',
  twitterCard: 'summary_large_image',
});
useHead({ link: [{ rel: 'canonical', href: `${site.url}/` }] });

// 1.3. The reminder sentence waits for the device test (K-5). Each benefit sits on a calendar
// block fill with a crop of the screen it describes; two of the four tiles are wide.
type Benefit = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  tone: 'blue' | 'teal' | 'purple';
  wide?: boolean;
};

const benefits: Benefit[] = [
  {
    wide: true,
    tone: 'blue',
    image: '/gorseller/ozellik-program.webp',
    imageAlt:
      'iPhone’da haftalık takvim: her kişinin dersi kendi renginde bir blok, bloğun üstünde adı.',
    width: 760,
    height: 979,
    title: 'Programını bir kez kur',
    body: 'Hangi gün, saat kaçta, kaç dakika, kaç lira: bir kez yazarsın, dersler ve seanslar haftalara kendiliğinden dizilir. Program her hafta ya da iki, üç haftada bir tekrar edebilir. Aynı kişinin pazartesi dersi 90, cuma dersi 60 dakika olabilir. Saatler çakışırsa Seans uyarır.',
  },
  {
    tone: 'teal',
    image: '/gorseller/ozellik-odeme.webp',
    imageAlt:
      'Öğrencinin sayfası: borç 6.300 ₺, 5 ders kaldı, Ödeme al düğmesi ve 8 derslik paket.',
    width: 660,
    height: 630,
    title: 'Kim ne kadar ödedi, Seans hesaplar',
    body: 'Yapılan dersi işaretle, gelen ödemeyi kaydet. Kimin ne kadar borcu olduğunu Seans hesaplar, toplam alacağın Bugün ekranında durur. İptal edilen ve ertelenen dersler borca yazılmaz, zam yaptığında geçmiş hesaplar değişmez. Ön ödemeli pakette kaç ders kaldığını görürsün.',
  },
  {
    tone: 'purple',
    image: '/gorseller/ozellik-gun.webp',
    imageAlt:
      'Android’de Bugün ekranı: toplam alacak 12.700 ₺, işaretlenmeyi bekleyen bir ders ve günün iki dersi.',
    width: 600,
    height: 700,
    title: 'Günün elinin altında',
    body:
      'Bugün ekranı o günün derslerini, haftalık ve aylık takvim bütün programı gösterir. İşaretlemeyi unuttuğun dersler Bugün’de bekler. Bayram haftasında dersleri tek seferde iptal edersin, yanlış dokunursan Geri al. Kayıtlı numarayı tek dokunuşla arar ya da mesaj yazarsın.' +
      (site.deviceTestPassed ? ' Dersten önce hatırlatma bildirimi gelir.' : ''),
  },
  {
    wide: true,
    tone: 'blue',
    image: '/gorseller/ozellik-iki-platform.webp',
    imageAlt:
      'Android’de koyu temada Öğrenciler listesi: her öğrencinin renk noktası, adı ve ders günleri.',
    width: 600,
    height: 956,
    title: 'İki platformda, Türkçe, sade',
    body: 'iPhone’da da Android’de de aynı uygulama. Ekranlar Türkçe, tutarlar Türk lirası, hafta pazartesi başlar. İndirdiğin gün, hesap açmadan kullanmaya başlarsın. Ücretsiz.',
  },
];

// 1.4. Groups and words match src/profiles/registry.ts and src/strings/tr.ts.
// The switch in the Meslekler section shows one group at a time and paints the field in
// that group's block colour; without :has() every group is shown (main.css has no script).
const professionGroups: {
  key: 'egitim' | 'spor' | 'danismanlik' | 'evcil-ev';
  icon: IconName;
  title: string;
  professions: string;
  words: string;
  example: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    key: 'egitim',
    icon: 'schoolOutline',
    title: 'Eğitim',
    professions:
      'Özel ders öğretmeni, müzik öğretmeni, dil öğretmeni, sanat ve hobi eğitmeni, öğrenci koçu, direksiyon eğitmeni.',
    words: 'Öğrenci, ders ve veli.',
    example:
      'Her salı 17:00’de 90 dakika. Velinin adı ve telefonu öğrencinin sayfasında; müzik öğretmeniysen enstrüman ve seviye de.',
    image: '/gorseller/meslek-egitim.webp',
    imageAlt: 'Öğretmen için Bugün ekranı: toplam alacak 12.700 ₺, 3 öğrenci, günün dersleri.',
  },
  {
    key: 'spor',
    icon: 'trophyOutline',
    title: 'Spor',
    professions: 'Antrenör, personal trainer, pilates ve yoga eğitmeni, fizyoterapist.',
    words:
      'Antrenörde sporcu ve antrenman, personal trainer’da ve fizyoterapistte danışan ve seans, pilates ve yogada öğrenci ve ders.',
    example:
      '12 seanslık paketi bir kez gir, yapılan her seans paketten düşer. Yağmur yağdıysa o günün antrenmanlarını tek seferde iptal et.',
    image: '/gorseller/meslek-spor.webp',
    imageAlt: 'Antrenör için Bugün ekranı: toplam alacak 12.700 ₺, 3 sporcu, günün antrenmanları.',
  },
  {
    key: 'danismanlik',
    icon: 'chatbubblesOutline',
    title: 'Danışmanlık ve koçluk',
    professions: 'Psikolog, aile danışmanı, koç.',
    words: 'Danışan ve seans.',
    example:
      'Haftada bir, aynı gün, aynı saatte 50 dakika. Uygulama program ve ödeme içindir; seans notu tutmaz.',
    image: '/gorseller/meslek-danismanlik.webp',
    imageAlt: 'Danışman için Bugün ekranı: toplam alacak 12.700 ₺, 3 danışan, günün seansları.',
  },
  {
    key: 'evcil-ev',
    icon: 'pawOutline',
    title: 'Evcil hayvan ve ev',
    professions: 'Köpek eğitmeni ve gezdirici, evde temizlikçi.',
    words: 'Müşteri ve ziyaret.',
    example:
      'Köpeğin adı müşterinin sayfasında. Aynı eve iki haftada bir giden temizlik programı da kurulur.',
    image: '/gorseller/meslek-evcil-ev.webp',
    imageAlt:
      'Müşteriyle çalışan için Bugün ekranı: toplam alacak 12.700 ₺, 3 müşteri, günün ziyaretleri.',
  },
];

// 1.5
const steps = [
  {
    title: 'Mesleğini seç',
    body: 'Seans açılışta ne iş yaptığını sorar, kelimelerini ona göre ayarlar. Üyelik formu yok.',
    image: '/gorseller/adim-meslek.webp',
    imageAlt: 'Meslek seçimi ekranı: Ne iş yapıyorsun?',
  },
  {
    title: 'Kişilerini ve programını ekle',
    body: 'İlk kişin için adı ve ücreti yeter. Hangi gün ve saatte çalıştığını seç, dersler ve seanslar takvime dizilir.',
    image: '/gorseller/adim-program.webp',
    imageAlt: 'Yeni ders formu: günler, sıklık, başlangıç saati, süre ve ders ücreti.',
  },
  {
    title: 'İşaretle, kaydet',
    body: 'Ders bitince yapıldı, iptal ya da ertele. Ödeme gelince kaydet. Kimin ne kadar borcu olduğu kendiliğinden güncellenir.',
    image: '/gorseller/adim-alacaklar.webp',
    imageAlt: 'Alacaklar ekranı: toplam alacak 13.500 ₺, 3 öğrencinin borcu ve Ödeme al düğmeleri.',
  },
];

// 1.6. Same facts as the privacy policy draft; aligned again after S13-07.
// The ad fact comes with the ad build (K-7) and follows the policy's "Kısaca" ad item.
const adFact =
  'Uygulamada Google’ın sunduğu kişiselleştirilmemiş reklamlar gösterilir. Öğrenci ve veli adları, telefonlar, notlar ve ücretler reklam isteğine girmez. Reklam gösterebilmek için uygulamadaki Google reklam bileşeni telefonun IP adresini, uygulamaya ya da geliştiriciye özgü bir cihaz kimliğini, reklamlarla etkileşimleri ve teknik bilgileri Google’a gönderir. Uygulama reklam kimliğini okumaz.';

const dataFacts = [
  'Telefon değiştirirken yedeğini tek bir dosya olarak alırsın. Dosyayı nereye kaydedeceğini (Google Drive, iCloud Drive, WhatsApp) sen seçersin, yeni telefonda bu dosyayla geri yüklersin. Yedek dosyası şifreli değildir; onu yalnız sana ait bir yere kaydet.',
  'Uygulamayı silersen bilgilerin de silinir. Bizde bir kopyası olmadığı için geri getiremeyiz. Silmeden önce yedek al.',
  'Dersleri telefon takvimine yazmayı açarsan ve seçtiğin takvim Google ya da iCloud hesabındaysa, ders adları ve saatleri o hesaba da gider. Takvim etkinliğine ücret ve borç yazılmaz.',
  'Uygulama çökerse hatayı düzeltebilmek için teknik bir hata raporu gönderilir. Bu rapora öğrenci, veli ve ödeme bilgisi girmemesi için önlem alındı.',
  ...(site.appShowsAds ? [adFact] : []),
  'İstersen Seans’ı Face ID, parmak izi ya da telefon şifrenle kilitleyebilirsin.',
];

// 1.7. Question 3 and 7 change on launch day; question 6 waits for S13-08 (K-5).
// Question 2 has an ad-free closed test version until the ad build is out (K-7).
type Faq = { question: string; answer: string; link?: { href: string; label: string } };

const adsFaq: Faq = {
  question: 'Reklam var mı?',
  answer: site.appShowsAds
    ? 'Evet. Seans ücretsiz ve uygulamada reklam gösterilir: Bugün ekranında ve kişi listesinde birer reklam kartı, Aylık özet’in ve Ayarlar’ın en altında birer reklam alanı. Reklamlar kişiselleştirilmez, yani geçmişteki davranışına göre seçilmez; kayıtlarındaki ad, telefon, not ve ücret bilgileri reklam için kullanılmaz. 5 kişiden ya da 5 ders programından sonra yenisini eklemek için kısa bir reklam izlemen istenebilir, reklamdan sonra 5 dakika boyunca istediğin kadar eklersin. Ders işaretlemek, ödeme kaydetmek ya da yedek almak için reklam izlemen gerekmez.'
    : 'Mağazaya çıkacak sürümde var. Seans ücretsiz ve kişiselleştirilmemiş reklam gösterecek; kayıtlarındaki ad, telefon, not ve ücret bilgileri reklam için kullanılmayacak. Kapalı testin ilk sürümünde reklam gösterilmiyor, reklamlar test sürerken gelecek.',
};

const platformFaq: Faq = launched
  ? {
      question: 'iPhone’da da Android’de de çalışır mı?',
      answer:
        'Evet. App Store’dan ve Google Play’den indirebilirsin. Kayıtlar telefonlar arasında eşitlenmez; her telefondaki Seans kendi kayıtlarını tutar.',
    }
  : {
      question: 'iPhone’da da Android’de de çalışır mı?',
      answer:
        'Seans iPhone ve Android için hazırlanıyor. Kapalı test önce Android’de başlıyor, çünkü Google Play yeni geliştiricilerden mağazaya çıkmadan önce en az 12 kişinin uygulamayı 14 gün denemesini istiyor. ' +
        (site.testFlightUrl
          ? 'iPhone’da TestFlight ile deneyebilirsin:'
          : 'iPhone için deneme bağlantısı hazır olunca Instagram’da paylaşılacak.'),
      link: site.testFlightUrl ? { href: site.testFlightUrl, label: 'TestFlight' } : undefined,
    };

const calendarFaq: Faq = {
  question: 'Derslerim telefonumun takviminde görünür mü?',
  answer:
    'İstersen. Ayarlar > Telefon takvimi’nden açarsan dersler ve seanslar seçtiğin telefon takvimine yazılır. Takvim iCloud ya da Google hesabındaysa o hesabın takviminde de görünür. Seans takvimde yalnız kendi yazdığı etkinliklere dokunur, etkinliğe ücret ve borç yazmaz.',
};

const channels = [
  site.instagramUrl ? 'Instagram’da' : null,
  site.tiktokUrl ? 'TikTok’ta' : null,
].filter(Boolean);

const lastFaq: Faq = launched
  ? {
      question: 'Seans notu ya da danışan dosyası tutar mı?',
      answer:
        'Hayır. Uygulama program ve ödeme içindir. Kişinin sayfasına kısa bir not yazabilirsin, ama seans notu ya da danışan dosyası için tasarlanmadı.',
    }
  : {
      question: 'Ne zaman çıkıyor?',
      answer:
        'Önce kapalı test yapılıyor, mağazalara çıkış tarihi test bitince kesinleşir. ' +
        (channels.length > 0 ? `Çıkış ${channels.join(' ve ')} duyurulur. ` : '') +
        'Bekleme listesi kapalı test ve görüşme davetleri içindir; çıkışta e-posta gönderilmez.',
    };

const faqs: Faq[] = [
  {
    question: 'Seans ücretli mi?',
    answer:
      'Hayır. Seans’ı indirmek ve kullanmak ücretsiz. Üye olman ya da kart bilgisi girmen gerekmez.',
  },
  adsFaq,
  platformFaq,
  {
    question: 'Uygulamayı silersem ne olur?',
    answer:
      'Kayıtların da silinir. Seans’ın bilgilerini tuttuğu bir sunucu olmadığı için biz geri getiremeyiz. Silmeden ya da telefonu sıfırlamadan önce Ayarlar > Yedekleme’den yedek al.',
  },
  {
    question: 'Telefonumu değiştirirsem kayıtlarım ne olur?',
    answer:
      'Eski telefonda Ayarlar > Yedekleme > Yedek al’a dokun, dosyayı Google Drive, iCloud Drive ya da WhatsApp gibi sana ait bir yere kaydet. Yeni telefonda Seans’ı açınca “Yedeğim var, geri yükle”ye dokun ve dosyayı seç. Yedek dosyası şifreli değildir, başkalarıyla paylaşma.',
  },
  ...(site.deviceTestPassed ? [calendarFaq] : []),
  lastFaq,
];
</script>

<template>
  <main>
    <!-- 1.2 Üst alan. The mark's three blocks at poster size, the Bugün screen in its core. -->
    <section class="hero" aria-labelledby="baslik">
      <div class="wrap hero-copy">
        <h1 id="baslik" class="t-display">Hesabını tutar,<br />hesap açtırmaz.</h1>
        <p class="hero-lead">
          Öğrencilerin, danışanların, sporcuların ya da müşterilerin; haftalık programın ve kimin ne
          kadar ödediği tek yerde. iPhone’da ve Android’de, üye olmadan.
        </p>
        <div v-if="waitlistUrl" class="mt-8">
          <WaitlistButton :href="waitlistUrl" />
          <p class="mt-3">Kapalı test ve kullanıcı görüşmeleri için.</p>
        </div>
        <div v-else-if="launched" class="mt-8">
          <StoreBadges />
          <p class="mt-3">Ücretsiz, hesap gerektirmez.</p>
        </div>
        <p v-else class="hero-note">
          <span class="blip" style="--c: var(--mint)" aria-hidden="true" />
          Ücretsiz, hesap gerektirmez.
        </p>
      </div>

      <div class="hero-stage anim-drift">
        <span class="hb hb-blue anim-block" style="--d: 0ms" aria-hidden="true" />
        <span class="hb hb-teal anim-block" style="--d: 90ms" aria-hidden="true" />
        <span class="hb hb-purple anim-block" style="--d: 180ms" aria-hidden="true" />
        <span class="hb hb-core anim-block" style="--d: 240ms" aria-hidden="true" />
        <div class="hero-shot anim-shutter">
          <img
            src="/gorseller/bugun-iphone.webp"
            alt="iPhone’da Seans’ın Bugün ekranı: toplam alacak 12.700 ₺, işaretlenmeyi bekleyen bir ders ve günün iki dersi."
            width="860"
            height="1869"
            fetchpriority="high"
          />
        </div>
        <span class="hb-dot anim-block" style="--d: 420ms" aria-hidden="true" />
      </div>
    </section>

    <!-- 1.3 Fayda blokları -->
    <section class="wrap features" aria-labelledby="neler-yapar">
      <div class="features-head">
        <h2 id="neler-yapar" class="t-h2 rise">Seans neler yapar</h2>
        <p class="rise-2 mt-6">
          Seans ödeme tahsil etmez, fatura kesmez. Veli, öğrenci ya da danışan için ayrı bir
          uygulaması yoktur. Birebir çalışma içindir; grup dersi ve grup seansı yoktur.
        </p>
      </div>
      <ul class="tiles">
        <li
          v-for="benefit in benefits"
          :key="benefit.title"
          class="tile"
          :class="{ 'tile-wide': benefit.wide }"
        >
          <div class="tile-stage rise" :data-tone="benefit.tone">
            <img
              :src="benefit.image"
              :alt="benefit.imageAlt"
              :width="benefit.width"
              :height="benefit.height"
              loading="lazy"
            />
          </div>
          <h3 class="t-h3 rise-2 mt-5">{{ benefit.title }}</h3>
          <p class="rise-3 mt-2">{{ benefit.body }}</p>
        </li>
      </ul>
    </section>

    <!-- 1.4 Mesleğine göre konuşur. The one live thing: pick a group, the field and words change. -->
    <section class="showcase" aria-labelledby="meslekler">
      <div class="wrap showcase-inner">
        <div class="showcase-head">
          <h2 id="meslekler" class="t-h2 rise">Mesleğine göre konuşur</h2>
          <p class="t-lead rise-2 mt-5 max-w-[34ch]">
            Açılışta ne iş yaptığını seçersin, Seans o andan itibaren senin kelimelerini kullanır.
          </p>
        </div>

        <fieldset class="meslek-switch rise-2" data-ui>
          <legend class="sr-only">Meslek grubu</legend>
          <label v-for="(group, index) in professionGroups" :key="group.key">
            <input
              :id="`meslek-${group.key}`"
              type="radio"
              name="meslek"
              :value="group.key"
              :checked="index === 0"
              class="sr-only"
            />
            <IonIcon :name="group.icon" class="size-[1.1em]" />
            <span>{{ group.title }}</span>
          </label>
        </fieldset>

        <div class="meslek-panels">
          <article
            v-for="group in professionGroups"
            :key="group.key"
            class="meslek-panel"
            :data-meslek="group.key"
          >
            <div class="meslek-text">
              <h3 class="sr-only">{{ group.title }}</h3>
              <p class="meslek-words">{{ group.words }}</p>
              <p class="t-lead mt-6 font-bold">{{ group.professions }}</p>
              <p class="mt-3 max-w-[46ch]">{{ group.example }}</p>
            </div>
            <div class="meslek-shot">
              <img
                :src="group.image"
                :alt="group.imageAlt"
                width="840"
                height="916"
                loading="lazy"
              />
            </div>
          </article>
        </div>

        <p class="showcase-foot">
          Mesleğin listede yoksa en yakın olanı seç. Seçimini sonra Ayarlar’dan değiştirebilirsin,
          kayıtların aynı kalır.
        </p>
      </div>
    </section>

    <!-- 1.5 Nasıl çalışır. Order is carried by tone: dark to light. -->
    <section class="wrap how" aria-labelledby="nasil-calisir">
      <h2 id="nasil-calisir" class="t-h2 rise">Nasıl çalışır</h2>
      <ol class="steps">
        <li v-for="(step, index) in steps" :key="step.title" class="step" :data-step="index">
          <h3 class="t-h3 rise">{{ step.title }}</h3>
          <p class="rise-2 mt-3 max-w-[36ch]">{{ step.body }}</p>
          <div class="step-shot rise-3">
            <img :src="step.image" :alt="step.imageAlt" width="480" height="1043" loading="lazy" />
          </div>
        </li>
      </ol>
    </section>

    <!-- 1.6 Bilgilerin telefonunda -->
    <section class="about" aria-labelledby="bilgilerin">
      <div class="about-panel">
        <div class="about-left">
          <h2 id="bilgilerin" class="t-h2 rise">Bilgilerin telefonunda</h2>
          <p class="about-statement rise-2">
            Seans’ta hesap, üyelik ya da şifre yok. Öğrencilerin, programın ve ödemelerin
            telefonundaki uygulamada saklanır. Seans’ın bu bilgileri tuttuğu bir sunucu yok;
            bilgilerin bize gelmez, biz göremeyiz.
          </p>
          <div class="about-shot rise-3">
            <img
              src="/gorseller/takvim-android.webp"
              alt="Android’de Seans’ın haftalık takvimi: her kişinin dersleri kendi renginde ve adıyla."
              width="560"
              height="1244"
              loading="lazy"
            />
          </div>
        </div>
        <div class="about-right">
          <ul class="facts">
            <li v-for="(fact, index) in dataFacts" :key="fact" class="rise">
              <span
                class="blip mt-[0.3em]"
                :style="{ '--c': ['var(--mint)', '#6ea8ff', '#c99bff'][index % 3] }"
                aria-hidden="true"
              />
              <span>{{ fact }}</span>
            </li>
          </ul>
          <p class="mt-10">
            Ayrıntılar:
            <NuxtLink to="/gizlilik" class="about-link">Gizlilik politikası</NuxtLink>
          </p>
        </div>
      </div>
    </section>

    <!-- 1.7 Sık sorulan sorular -->
    <section class="wrap faq" aria-labelledby="sss">
      <h2 id="sss" class="t-h2 faq-head">Sık sorulan sorular</h2>
      <div class="faq-list">
        <details v-for="faq in faqs" :key="faq.question" name="sss" class="faq-tile rise">
          <summary>
            <span>{{ faq.question }}</span>
            <span class="plus" aria-hidden="true"><i /><i /></span>
          </summary>
          <p class="faq-answer">
            {{ faq.answer }}
            <a v-if="faq.link" :href="faq.link.href" class="font-bold underline">
              {{ faq.link.label }}
            </a>
          </p>
        </details>
      </div>
    </section>

    <!-- 1.8 Kapanış çağrısı: hidden while the form is closed (S13-02 2.2) -->
    <section v-if="waitlistUrl || launched" class="wrap pt-28">
      <div class="closing">
        <template v-if="launched">
          <h2 class="t-h2">Hesabını tutar, hesap açtırmaz.</h2>
          <p class="t-lead mt-4">Ücretsiz, hesap gerektirmez.</p>
          <div class="mt-8">
            <StoreBadges />
          </div>
        </template>
        <template v-else-if="waitlistUrl">
          <h2 class="t-h2">Seans’ı mağazaya çıkmadan dene</h2>
          <p class="t-lead mt-4 max-w-2xl">
            Google Play’in istediği iki haftalık kapalı test için Android kullanan gönüllüler, kısa
            görüşmeler için de her meslekten kişiler aranıyor.
          </p>
          <a :href="waitlistUrl" target="_blank" rel="noopener" class="closing-btn mt-8">
            Bekleme listesine yazıl
          </a>
        </template>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ---------- 1.2 Hero: the mark at poster size, cropped by the viewport ---------- */
.hero {
  position: relative;
  overflow: hidden;
  padding-bottom: 0;
}

.hero-copy {
  position: relative;
  z-index: 1;
  padding-top: clamp(32px, 7svh, 72px);
}

.hero-lead {
  margin-top: 28px;
  max-width: 34ch;
  font-size: var(--t-lead);
  line-height: 1.55;
}

.hero-note {
  display: inline-flex;
  margin-top: 28px;
  align-items: center;
  gap: 0.6em;
  font-weight: 750;
}

/*
 * The stage holds the logo's geometry in a 720-unit box (isaret.svg, x/y 152–872):
 * blue 0,80 300×520 · teal 220,0 300×380 · purple 420,248 300×472 · core 140,140 440×440.
 * The Bugün screen sits in the core where the S is in the mark.
 */
.hero-stage {
  --S: min(132vw, 760px);
  --u: calc(var(--S) / 720);
  position: relative;
  width: var(--S);
  height: var(--S);
  margin: 40px 0 calc(var(--S) * -0.3) calc(50% - var(--S) / 2);
}

.hb,
.hero-shot,
.hb-dot {
  position: absolute;
}

.hb {
  border-radius: calc(var(--u) * 44);
}

.hb-blue {
  left: 0;
  top: calc(var(--u) * 80);
  width: calc(var(--u) * 300);
  height: calc(var(--u) * 520);
  background: var(--blue);
}

.hb-teal {
  left: calc(var(--u) * 220);
  top: 0;
  width: calc(var(--u) * 300);
  height: calc(var(--u) * 380);
  background: var(--teal);
}

.hb-purple {
  left: calc(var(--u) * 420);
  top: calc(var(--u) * 248);
  width: calc(var(--u) * 300);
  height: calc(var(--u) * 472);
  background: var(--purple);
}

.hb-core {
  left: calc(var(--u) * 140);
  top: calc(var(--u) * 140);
  width: calc(var(--u) * 440);
  height: calc(var(--u) * 440);
  border-radius: calc(var(--u) * 24);
  background: #1c1a18;
}

.hero-shot {
  left: calc(var(--u) * 236);
  top: calc(var(--u) * 92);
  width: calc(var(--u) * 248);
  overflow: hidden;
  border-radius: calc(var(--u) * 30);
}

.hero-shot img {
  display: block;
  width: 100%;
  height: auto;
}

.hb-dot {
  left: calc(var(--u) * 186);
  top: calc(var(--u) * 458);
  width: calc(var(--u) * 80);
  height: calc(var(--u) * 80);
  border-radius: 50%;
  background: var(--mint);
}

@media (min-width: 1024px) {
  .hero {
    display: flex;
    min-height: calc(100svh - 84px);
    align-items: center;
  }

  .hero-copy {
    padding-top: 0;
    padding-bottom: 6svh;
  }

  .hero-copy > * {
    max-width: min(46vw, 640px);
  }

  .hero-lead {
    max-width: 34ch;
  }

  .hero-stage {
    --S: min(112svh, 60vw);
    position: absolute;
    top: calc(50% - var(--S) * 0.47);
    right: calc(var(--S) * -0.2);
    margin: 0;
  }
}

/* ---------- 1.3 Features: screen crops on calendar block fills ---------- */
.features {
  padding-top: clamp(96px, 14vw, 200px);
}

.tiles {
  display: grid;
  margin-top: 48px;
  gap: 48px 10px;
}

.tile-stage {
  position: relative;
  overflow: hidden;
  aspect-ratio: 5 / 4;
  border-radius: var(--r);
  background: var(--blue-fill);
}

@media (min-width: 640px) {
  .tiles {
    grid-template-columns: 1fr 1fr;
  }

  .tile-wide {
    grid-column: span 2;
  }

  .tile-stage {
    aspect-ratio: 4 / 5;
  }

  .tile-wide .tile-stage {
    aspect-ratio: 8 / 5;
  }
}

.tile-stage[data-tone='teal'] {
  background: var(--teal-fill);
}

.tile-stage[data-tone='purple'] {
  background: var(--purple-fill);
}

.tile-stage img {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 84%;
  height: auto;
  max-height: 90%;
  object-fit: cover;
  object-position: top;
  transform: translateX(-50%);
  border-radius: calc(var(--r) * 0.8) calc(var(--r) * 0.8) 0 0;
}

.tile-wide .tile-stage img {
  width: auto;
  height: 90%;
  max-height: none;
}

@media (max-width: 639px) {
  .tile-stage img {
    width: auto;
    height: 88%;
    max-height: none;
  }
}

@media (min-width: 1024px) {
  .features {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 24px;
  }

  .features-head {
    grid-column: 1 / 4;
  }

  .features-head p {
    max-width: 30ch;
  }

  .tiles {
    grid-column: 4 / 13;
    margin-top: 0;
    grid-template-columns: repeat(3, 1fr);
  }

  .tile-stage,
  .tile-wide .tile-stage {
    aspect-ratio: auto;
    height: clamp(320px, 29vw, 440px);
  }
}

/* ---------- 1.4 Showcase: one control, blown up ---------- */
/* Light: the logo's marks. Dark: the calendar block fills, so the field does not glare. */
.showcase {
  --field: light-dark(#1d5fe0, #273b59);
  --on-field: light-dark(#ffffff, #f2f0ed);
  margin-top: clamp(96px, 14vw, 200px);
  overflow: hidden;
  background: var(--field);
  color: var(--on-field);
  transition:
    background-color 450ms var(--ease),
    color 450ms var(--ease);
}

.showcase:has(#meslek-spor:checked) {
  --field: light-dark(#0b8577, #164e46);
}

.showcase:has(#meslek-danismanlik:checked) {
  --field: light-dark(#8b3fe0, #463659);
}

.showcase:has(#meslek-evcil-ev:checked) {
  --field: light-dark(#1c1a18, #262422);
  --on-field: #f2f0ed;
}

@supports not (color: light-dark(#000, #fff)) {
  .showcase {
    --field: #1d5fe0;
    --on-field: #ffffff;
  }

  .showcase:has(#meslek-spor:checked) {
    --field: #0b8577;
  }

  .showcase:has(#meslek-danismanlik:checked) {
    --field: #8b3fe0;
  }

  .showcase:has(#meslek-evcil-ev:checked) {
    --field: #1c1a18;
    --on-field: #f2f0ed;
  }
}

.showcase-inner {
  display: grid;
  min-height: 92svh;
  padding-top: clamp(64px, 9vw, 120px);
  grid-template-columns: 1fr;
  align-content: start;
}

.meslek-switch {
  display: grid;
  margin-top: 40px;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.meslek-switch label {
  display: flex;
  min-height: 64px;
  cursor: pointer;
  align-items: center;
  gap: 0.5em;
  border-radius: var(--r);
  background: color-mix(in srgb, var(--on-field) 14%, transparent);
  padding: 0.6em 0.85em;
  font-size: var(--t-body);
  font-weight: 800;
  line-height: 1.15;
  transition:
    background-color 200ms var(--ease),
    color 200ms var(--ease),
    transform 160ms var(--ease);
}

.meslek-switch label:hover {
  background: color-mix(in srgb, var(--on-field) 24%, transparent);
}

.meslek-switch label:active {
  transform: scale(0.97);
}

.meslek-switch label:has(input:checked) {
  background: var(--on-field);
  color: var(--field);
}

.meslek-switch label:has(input:focus-visible) {
  outline: 3px solid var(--on-field);
  outline-offset: 3px;
}

.meslek-text,
.meslek-shot {
  display: none;
}

.showcase:has(#meslek-egitim:checked) [data-meslek='egitim'] > *,
.showcase:has(#meslek-spor:checked) [data-meslek='spor'] > *,
.showcase:has(#meslek-danismanlik:checked) [data-meslek='danismanlik'] > *,
.showcase:has(#meslek-evcil-ev:checked) [data-meslek='evcil-ev'] > * {
  display: block;
}

.meslek-panels,
.meslek-panel {
  display: contents;
}

.meslek-text {
  margin-top: 40px;
}

.meslek-words {
  max-width: 28ch;
  font-size: var(--t-h3);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.meslek-shot {
  margin-top: 48px;
  align-self: end;
  justify-self: center;
  width: min(88%, 520px);
  overflow: hidden;
  border-radius: var(--r);
}

.meslek-shot img {
  width: 100%;
  height: auto;
}

.showcase-foot {
  margin-top: 32px;
  max-width: 52ch;
}

@media (prefers-reduced-motion: no-preference) {
  .meslek-text,
  .meslek-shot {
    animation: swap 520ms var(--ease) both;
  }
}

@media (min-width: 1024px) {
  .showcase-inner {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto 1fr auto;
    column-gap: 24px;
  }

  .showcase-head {
    grid-column: 1 / 8;
    grid-row: 1;
  }

  .meslek-switch {
    display: flex;
    grid-column: 1 / 13;
    grid-row: 2;
    margin-top: 48px;
  }

  .meslek-switch label {
    min-height: 0;
    padding: 0.5em 0.8em;
    font-size: var(--t-h3);
  }

  .meslek-text {
    grid-column: 1 / 7;
    grid-row: 3;
    margin-top: 64px;
  }

  .meslek-shot {
    grid-column: 7 / 13;
    grid-row: 3 / 5;
    height: clamp(300px, 52svh, 560px);
    margin-top: 64px;
    border-radius: var(--r) var(--r) 0 0;
  }

  .showcase-foot {
    grid-column: 1 / 7;
    grid-row: 4;
    margin: 32px 0 72px;
  }
}

/* Without :has() every group is shown and the switch is left out. */
@supports not selector(:has(a)) {
  .meslek-switch {
    display: none;
  }

  .meslek-panels {
    display: grid;
    gap: 64px;
  }

  .meslek-panel {
    display: grid;
  }

  .meslek-text,
  .meslek-shot {
    display: block;
  }
}

/* ---------- 1.5 How it works: one hue, dark to light ---------- */
.how {
  padding-top: clamp(96px, 14vw, 200px);
}

.steps {
  display: grid;
  margin-top: 48px;
  gap: 10px;
}

.step {
  display: flex;
  min-height: 520px;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--r);
  background: var(--step-a);
  padding: clamp(24px, 3vw, 40px) clamp(24px, 3vw, 40px) 0;
  color: var(--on-step-a);
}

.step[data-step='1'] {
  background: var(--step-b);
  color: var(--on-step-b);
}

.step[data-step='2'] {
  background: var(--step-c);
  color: var(--on-step-c);
}

.step-shot {
  margin-top: auto;
  padding-top: 40px;
  align-self: center;
  width: min(72%, 300px);
}

.step-shot img {
  display: block;
  width: 100%;
  height: 360px;
  object-fit: cover;
  object-position: top;
  border-radius: calc(var(--r) * 0.9) calc(var(--r) * 0.9) 0 0;
}

@media (min-width: 900px) {
  .steps {
    grid-template-columns: repeat(3, 1fr);
  }

  .step {
    min-height: 640px;
  }

  .step-shot img {
    height: 400px;
  }
}

/* ---------- 1.6 About: inset ink panel ---------- */
.about {
  padding: clamp(96px, 14vw, 200px) clamp(10px, 1.4vw, 20px) 0;
}

.about-panel {
  display: grid;
  overflow: hidden;
  border-radius: var(--r);
  background: var(--panel);
  padding: clamp(32px, 4vw, 56px) clamp(20px, 4vw, 56px) 0;
  color: var(--on-panel);
  gap: 48px;
}

.about-statement {
  margin-top: 24px;
  max-width: 40ch;
  font-size: var(--t-lead);
  line-height: 1.55;
}

.about-shot {
  margin-top: 48px;
  width: min(78%, 360px);
  height: clamp(280px, 42svh, 460px);
  overflow: hidden;
  border-radius: var(--r) var(--r) 0 0;
  background: var(--blue);
  padding: 18px 18px 0;
}

.about-shot img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: calc(var(--r) * 0.7) calc(var(--r) * 0.7) 0 0;
}

.facts {
  display: grid;
  gap: 28px;
}

.facts li {
  display: flex;
  gap: 14px;
}

.about-link {
  font-weight: 800;
  color: var(--on-panel);
  text-decoration: underline;
  text-decoration-color: var(--mint);
  text-decoration-thickness: 2px;
  transition: text-decoration-thickness 140ms var(--ease);
}

.about-link:hover,
.about-link:focus-visible {
  text-decoration-thickness: 4px;
}

.about-right {
  order: -1;
}

@media (max-width: 1023px) {
  .about-left {
    display: contents;
  }

  .about-left h2 {
    order: -3;
  }

  .about-statement {
    order: -2;
    margin-top: -24px;
  }

  .about-shot {
    justify-self: center;
  }
}

@media (min-width: 1024px) {
  .about-panel {
    min-height: 100svh;
    grid-template-columns: 1.15fr 1fr;
    column-gap: clamp(48px, 6vw, 120px);
  }

  .about-left {
    display: flex;
    flex-direction: column;
  }

  .about-shot {
    margin-top: auto;
  }

  .about-right {
    order: 0;
    padding-top: 12px;
    padding-bottom: 56px;
  }
}

/* ---------- 1.7 FAQ: filled tiles, sticky heading ---------- */
.faq {
  padding-top: clamp(96px, 14vw, 200px);
}

.faq-list {
  display: grid;
  margin-top: 32px;
  gap: 8px;
}

.faq-tile {
  border-radius: var(--r);
  background: var(--surface);
  transition:
    background-color 220ms var(--ease),
    color 220ms var(--ease);
}

.faq-tile summary {
  display: flex;
  min-height: 72px;
  cursor: pointer;
  list-style: none;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  font-size: var(--t-lead);
  font-weight: 750;
  line-height: 1.3;
}

.faq-tile summary::-webkit-details-marker {
  display: none;
}

.faq-tile:not([open]):hover {
  background: var(--raised);
}

.faq-tile[open] {
  background: var(--core);
  color: var(--on-core);
}

.plus {
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.plus i {
  position: absolute;
  top: 7.5px;
  left: 0;
  width: 18px;
  height: 3px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 220ms var(--ease);
}

.plus i + i {
  transform: rotate(90deg);
}

.faq-tile[open] .plus i + i {
  transform: rotate(0deg);
}

.faq-answer {
  max-width: 60ch;
  padding: 0 24px 26px;
}

@media (min-width: 1024px) {
  .faq {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 24px;
    align-items: start;
  }

  .faq-head {
    grid-column: 1 / 5;
  }

  .faq-list {
    grid-column: 5 / 13;
    margin-top: 0;
  }
}

/* ---------- 1.8 Closing band ---------- */
.closing {
  border-radius: var(--r);
  background: var(--blue);
  padding: clamp(40px, 6vw, 88px) clamp(24px, 5vw, 72px);
  color: var(--on-mark);
}

.closing-btn {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  border-radius: var(--r);
  background: var(--on-mark);
  padding: 0.75rem 1.5rem;
  font-weight: 800;
  color: var(--blue);
  text-decoration: none;
  transition: transform 160ms var(--ease);
}

.closing-btn:active {
  transform: scale(0.97);
}
</style>

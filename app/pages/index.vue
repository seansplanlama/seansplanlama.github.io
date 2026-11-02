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

// 1.3. The reminder sentence waits for the device test (K-5).
const benefits: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'repeatOutline',
    title: 'Programını bir kez kur',
    body: 'Hangi gün, saat kaçta, kaç dakika, kaç lira: bir kez yazarsın, dersler ve seanslar haftalara kendiliğinden dizilir. Program her hafta ya da iki, üç haftada bir tekrar edebilir. Aynı kişinin pazartesi dersi 90, cuma dersi 60 dakika olabilir. Saatler çakışırsa Seans uyarır.',
  },
  {
    icon: 'walletOutline',
    title: 'Kim ne kadar ödedi, Seans hesaplar',
    body: 'Yapılan dersi işaretle, gelen ödemeyi kaydet. Kimin ne kadar borcu olduğunu Seans hesaplar, toplam alacağın Bugün ekranında durur. İptal edilen ve ertelenen dersler borca yazılmaz, zam yaptığında geçmiş hesaplar değişmez. Ön ödemeli pakette kaç ders kaldığını görürsün.',
  },
  {
    icon: 'todayOutline',
    title: 'Günün elinin altında',
    body:
      'Bugün ekranı o günün derslerini, haftalık ve aylık takvim bütün programı gösterir. İşaretlemeyi unuttuğun dersler Bugün’de bekler. Bayram haftasında dersleri tek seferde iptal edersin, yanlış dokunursan Geri al. Kayıtlı numarayı tek dokunuşla arar ya da mesaj yazarsın.' +
      (site.deviceTestPassed ? ' Dersten önce hatırlatma bildirimi gelir.' : ''),
  },
  {
    icon: 'phonePortraitOutline',
    title: 'İki platformda, Türkçe, sade',
    body: 'iPhone’da da Android’de de aynı uygulama. Ekranlar Türkçe, tutarlar Türk lirası, hafta pazartesi başlar. İndirdiğin gün, hesap açmadan kullanmaya başlarsın. Ücretsiz ve reklamsız.',
  },
];

// 1.4. Groups and words match src/profiles/registry.ts and src/strings/tr.ts.
const professionGroups: {
  icon: IconName;
  title: string;
  professions: string;
  words: string;
  example: string;
  image: string;
  imageAlt: string;
}[] = [
  {
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
const dataFacts = [
  'Telefon değiştirirken yedeğini tek bir dosya olarak alırsın. Dosyayı nereye kaydedeceğini (Google Drive, iCloud Drive, WhatsApp) sen seçersin, yeni telefonda bu dosyayla geri yüklersin. Yedek dosyası şifreli değildir; onu yalnız sana ait bir yere kaydet.',
  'Uygulamayı silersen bilgilerin de silinir. Bizde bir kopyası olmadığı için geri getiremeyiz. Silmeden önce yedek al.',
  'Dersleri telefon takvimine yazmayı açarsan ve seçtiğin takvim Google ya da iCloud hesabındaysa, ders adları ve saatleri o hesaba da gider. Takvim etkinliğine ücret ve borç yazılmaz.',
  'Uygulama çökerse hatayı düzeltebilmek için teknik bir hata raporu gönderilir. Bu rapora öğrenci, veli ve ödeme bilgisi girmemesi için önlem alındı.',
  'İstersen Seans’ı Face ID, parmak izi ya da telefon şifrenle kilitleyebilirsin.',
];

// 1.7. Question 3 and 7 change on launch day; question 6 waits for S13-08 (K-5).
type Faq = { question: string; answer: string; link?: { href: string; label: string } };

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
  {
    question: 'Reklam var mı?',
    answer: 'Hayır. Seans reklam göstermez, ileride de göstermeyecek.',
  },
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
    <!-- 1.2 Üst alan -->
    <section
      class="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-6 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-12 lg:pb-24"
    >
      <div>
        <h1 class="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
          Hesabını tutar, hesap açtırmaz.
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-muted sm:text-xl">
          Öğrencilerin, danışanların, sporcuların ya da müşterilerin; haftalık programın ve kimin ne
          kadar ödediği tek yerde. iPhone’da ve Android’de, üye olmadan.
        </p>
        <div v-if="waitlistUrl" class="mt-8">
          <WaitlistButton :href="waitlistUrl" />
          <p class="mt-3 text-sm text-muted">Kapalı test ve kullanıcı görüşmeleri için.</p>
        </div>
        <div v-else-if="launched" class="mt-8">
          <StoreBadges />
          <p class="mt-3 text-sm text-muted">Ücretsiz, reklamsız, hesap gerektirmez.</p>
        </div>
        <p
          v-else
          class="mt-8 inline-flex rounded-full bg-accent-soft px-4 py-2 font-semibold text-ink"
        >
          Ücretsiz, reklamsız, hesap gerektirmez.
        </p>
      </div>
      <div class="relative mx-auto flex w-full max-w-md justify-center lg:max-w-none">
        <div
          class="absolute inset-x-6 top-10 bottom-0 rounded-[3rem] bg-accent-soft"
          aria-hidden="true"
        />
        <img
          src="/gorseller/takvim-android.webp"
          alt="Android’de Seans’ın haftalık takvimi: her kişinin dersleri kendi renginde ve adıyla."
          width="560"
          height="1244"
          class="relative mt-16 -mr-10 w-[44%] max-w-[230px] rounded-[1.75rem] border border-line shadow-lg"
        />
        <img
          src="/gorseller/bugun-iphone.webp"
          alt="iPhone’da Seans’ın Bugün ekranı: toplam alacak 12.700 ₺, işaretlenmeyi bekleyen bir ders ve günün iki dersi."
          width="640"
          height="1391"
          fetchpriority="high"
          class="relative w-[50%] max-w-[270px] rounded-[2rem] border border-line shadow-xl"
        />
      </div>
    </section>

    <!-- 1.3 Fayda blokları -->
    <section class="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="neler-yapar">
      <h2 id="neler-yapar" class="sr-only">Seans neler yapar</h2>
      <ul class="grid gap-4 sm:grid-cols-2">
        <li v-for="benefit in benefits" :key="benefit.title" class="rounded-2xl bg-cell p-6 sm:p-8">
          <span
            class="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent"
          >
            <IonIcon :name="benefit.icon" class="size-6" />
          </span>
          <h3 class="mt-5 text-xl font-bold">{{ benefit.title }}</h3>
          <p class="mt-3 leading-7 text-muted">{{ benefit.body }}</p>
        </li>
      </ul>
      <p class="mt-6 text-sm leading-6 text-muted">
        Seans ödeme tahsil etmez, fatura kesmez. Veli, öğrenci ya da danışan için ayrı bir
        uygulaması yoktur. Birebir çalışma içindir; grup dersi ve grup seansı yoktur.
      </p>
    </section>

    <!-- 1.4 Mesleğine göre konuşur -->
    <section class="bg-cell py-20" aria-labelledby="meslekler">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="meslekler" class="text-3xl font-bold sm:text-4xl">Mesleğine göre konuşur</h2>
        <p class="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Açılışta ne iş yaptığını seçersin, Seans o andan itibaren senin kelimelerini kullanır.
        </p>
        <ul class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <li
            v-for="group in professionGroups"
            :key="group.title"
            class="flex flex-col overflow-hidden rounded-2xl border border-line bg-screen"
          >
            <img
              :src="group.image"
              :alt="group.imageAlt"
              width="560"
              height="611"
              loading="lazy"
              class="w-full border-b border-line"
            />
            <div class="flex flex-1 flex-col p-5">
              <h3 class="flex items-center gap-2 text-xl font-bold">
                <IonIcon :name="group.icon" class="size-6 text-accent" />
                {{ group.title }}
              </h3>
              <p class="mt-3 leading-6">{{ group.professions }}</p>
              <p class="mt-3 text-sm leading-6 font-semibold text-accent">{{ group.words }}</p>
              <p class="mt-3 text-sm leading-6 text-muted">{{ group.example }}</p>
            </div>
          </li>
        </ul>
        <p class="mt-8 max-w-3xl leading-7 text-muted">
          Mesleğin listede yoksa en yakın olanı seç. Seçimini sonra Ayarlar’dan değiştirebilirsin,
          kayıtların aynı kalır.
        </p>
      </div>
    </section>

    <!-- 1.5 Nasıl çalışır -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="nasil-calisir">
      <h2 id="nasil-calisir" class="text-3xl font-bold sm:text-4xl">Nasıl çalışır</h2>
      <ol class="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
        <li v-for="(step, index) in steps" :key="step.title" class="flex flex-col">
          <span
            class="flex size-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-on-accent"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <h3 class="mt-4 text-xl font-bold">{{ step.title }}</h3>
          <p class="mt-3 leading-7 text-muted md:flex-1">{{ step.body }}</p>
          <img
            :src="step.image"
            :alt="step.imageAlt"
            width="480"
            height="1043"
            loading="lazy"
            class="mt-6 w-3/5 max-w-[220px] rounded-[1.5rem] border border-line shadow-md md:w-2/3"
          />
        </li>
      </ol>
    </section>

    <!-- 1.6 Bilgilerin telefonunda -->
    <section class="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="bilgilerin">
      <div class="grid gap-10 rounded-3xl bg-cell p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span
            class="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent"
          >
            <IonIcon name="lockClosedOutline" class="size-6" />
          </span>
          <h2 id="bilgilerin" class="mt-5 text-3xl font-bold sm:text-4xl">
            Bilgilerin telefonunda
          </h2>
          <p class="mt-4 text-lg leading-8 text-muted">
            Seans’ta hesap, üyelik ya da şifre yok. Öğrencilerin, programın ve ödemelerin
            telefonundaki uygulamada saklanır. Seans’ın bu bilgileri tuttuğu bir sunucu yok;
            bilgilerin bize gelmez, biz göremeyiz.
          </p>
          <p class="mt-6">
            Ayrıntılar:
            <NuxtLink to="/gizlilik" class="font-semibold text-accent underline">
              Gizlilik politikası
            </NuxtLink>
          </p>
        </div>
        <ul class="space-y-4">
          <li v-for="fact in dataFacts" :key="fact" class="flex gap-3 leading-7">
            <span class="mt-3 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{{ fact }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 1.7 Sık sorulan sorular -->
    <section class="mx-auto max-w-3xl px-4 pb-20 sm:px-6" aria-labelledby="sss">
      <h2 id="sss" class="text-3xl font-bold sm:text-4xl">Sık sorulan sorular</h2>
      <div class="mt-8 space-y-3">
        <details v-for="faq in faqs" :key="faq.question" class="group rounded-2xl bg-cell">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold [&::-webkit-details-marker]:hidden"
          >
            {{ faq.question }}
            <span
              class="text-2xl leading-none text-accent transition group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p class="px-5 pb-5 leading-7 text-muted">
            {{ faq.answer }}
            <a v-if="faq.link" :href="faq.link.href" class="font-semibold text-accent underline">
              {{ faq.link.label }}
            </a>
          </p>
        </details>
      </div>
    </section>

    <!-- 1.8 Kapanış çağrısı: hidden while the form is closed (S13-02 2.2) -->
    <section v-if="waitlistUrl || launched" class="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div class="rounded-3xl bg-accent px-6 py-12 text-center text-on-accent sm:px-12">
        <template v-if="launched">
          <h2 class="text-3xl font-bold sm:text-4xl">Hesabını tutar, hesap açtırmaz.</h2>
          <p class="mt-4 text-lg">Ücretsiz, reklamsız, hesap gerektirmez.</p>
          <div class="mt-8 flex justify-center">
            <StoreBadges />
          </div>
        </template>
        <template v-else-if="waitlistUrl">
          <h2 class="text-3xl font-bold sm:text-4xl">Seans’ı mağazaya çıkmadan dene</h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg leading-8">
            Google Play’in istediği iki haftalık kapalı test için Android kullanan gönüllüler, kısa
            görüşmeler için de her meslekten kişiler aranıyor.
          </p>
          <a
            :href="waitlistUrl"
            target="_blank"
            rel="noopener"
            class="mt-8 inline-flex min-h-12 items-center rounded-full bg-on-accent px-6 py-3 font-semibold text-accent no-underline transition hover:opacity-90"
          >
            Bekleme listesine yazıl
          </a>
        </template>
      </div>
    </section>
  </main>
</template>

/**
 * Every value that changes before the site goes public lives here (S13-02 5.2).
 * null means "not there yet": the page leaves out the part that needs it, so a
 * placeholder never reaches a visitor. landing/README.md lists who fills what and when.
 */
export type Phase = 'prelaunch' | 'launched';

export interface SiteConfig {
  url: string;
  /** 'launched' once both stores are open (S13-02 1.10, launch plan open point 8). */
  phase: Phase;
  /** Tally form link (K-2). Stays null until the lawyer approves the waitlist text (S13-07). */
  waitlistUrl: string | null;
  /** Store links with campaign parameters (launch plan 4.2), filled on launch day (S12-09). */
  appStoreUrl: string | null;
  googlePlayUrl: string | null;
  /** TestFlight public link (K-4 b), after the Apple account and the first review. */
  testFlightUrl: string | null;
  /** S13-08 passed on a real iPhone: adds the calendar question and the reminder sentence (K-5). */
  deviceTestPassed: boolean;
  /** The lawyer approved the legal texts (S13-07); app/legal/*.md hold the approved text. */
  legalApproved: boolean;
  /** Support and KVKK address, opened in S13-01. */
  supportEmail: string | null;
  /** Seller name shown in the stores (privacy policy N2). */
  developerName: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
}

export const site: SiteConfig = {
  url: 'https://seansplanlama.github.io',
  phase: 'prelaunch',
  waitlistUrl: null,
  appStoreUrl: null,
  googlePlayUrl: null,
  testFlightUrl: null,
  deviceTestPassed: false,
  legalApproved: false,
  supportEmail: null,
  developerName: null,
  instagramUrl: null,
  tiktokUrl: null,
};

export const meta = {
  title: 'Seans: Ders ve Danışan Takibi',
  description:
    'Öğrenci, danışan, sporcu ve müşteri takibi: haftalık program, ödeme ve alacak tek yerde. Ücretsiz, reklamsız, hesap gerektirmez.',
  image: '/paylasim.png',
};

/**
 * Legal pages. The paths are fixed: the app opens /gizlilik, /kvkk and /kullanim-sartlari
 * (src/services/support/index.ts), the Tally form links /bekleme-listesi-bilgilendirme.
 */
export const legalPages = [
  { slug: 'gizlilik', path: '/gizlilik', title: 'Gizlilik politikası' },
  { slug: 'kullanim-sartlari', path: '/kullanim-sartlari', title: 'Kullanım şartları' },
  { slug: 'kvkk', path: '/kvkk', title: 'KVKK aydınlatma metni' },
  {
    slug: 'bekleme-listesi-bilgilendirme',
    path: '/bekleme-listesi-bilgilendirme',
    title: 'Bekleme listesi: kişisel verileriniz hakkında bilgilendirme',
  },
] as const;

export type LegalSlug = (typeof legalPages)[number]['slug'];

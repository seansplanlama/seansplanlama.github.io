// Checks the generated site (.output/public) against the decisions it must keep.
// Runs after "nuxt generate"; a failed check stops the deploy.
// Sources: docs/marketing/s13-02-landing-taslagi.md (1.10, 1.11, 4, 6) and app/site.ts.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { legalPages, site } from '../app/site.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, '.output/public');
const errors = [];
const fail = (message) => errors.push(message);

const read = (path) => readFileSync(join(out, path), 'utf8');

// Scripts a page may load: GSAP from public/vendor/gsap (scripts/vendor.mjs) and the motion.
const allowedScripts = new Set([
  '/vendor/gsap/gsap.min.js',
  '/vendor/gsap/ScrollTrigger.min.js',
  '/vendor/gsap/SplitText.min.js',
  '/js/hareket.js',
]);
const pageFile = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}/index.html`);

const htmlFiles = (dir = out) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path.slice(out.length + 1)] : [];
  });

// Visible text only: drop head, tags and decode the few entities Vue writes.
const visibleText = (html) =>
  html
    .replace(/<head>[\s\S]*?<\/head>/, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

if (!existsSync(out)) {
  console.error('No .output/public. Run "npm run generate" first.');
  process.exit(1);
}

// Files GitHub Pages and the stores need, and the scripts the pages load.
for (const file of [
  '.nojekyll',
  'favicon.svg',
  'paylasim.png',
  'app-ads.txt',
  ...[...allowedScripts].map((src) => src.slice(1)),
]) {
  if (!existsSync(join(out, file))) fail(`Missing ${file}`);
}
for (const path of ['/', ...legalPages.map((page) => page.path)]) {
  if (!existsSync(join(out, pageFile(path)))) fail(`Missing page ${path}`);
}

// app-ads.txt (S12-26): AdMob verifies the publisher with it at the root of the developer
// website in the store listings. One Google line and nothing else: Seans sells its ad space
// only through its own AdMob account. The publisher ID is the one in the app's AdMob app IDs.
if (existsSync(join(out, 'app-ads.txt'))) {
  const records = read('app-ads.txt')
    .split('\n')
    .map((line) => line.replace(/#.*/, '').trim())
    .filter(Boolean);
  const google = /^google\.com, pub-\d{16}, DIRECT, f08c47fec0942fa0$/;
  if (records.length !== 1 || !google.test(records[0])) {
    fail(`app-ads.txt: expected one AdMob line, got ${JSON.stringify(records)}`);
  }
}

// The site itself has no ads, cookies or visitor analytics (privacy policy bölüm 6), even
// though the app shows ads. Every generated text file is searched, not only the pages.
const textFiles = (dir = out) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return textFiles(path);
    return /\.(html|css|js|mjs|json|txt|xml|svg)$/.test(name) ? [path.slice(out.length + 1)] : [];
  });
const tracking = [
  /adsbygoogle/i,
  /googlesyndication/i,
  /doubleclick/i,
  /googletagmanager/i,
  /google-analytics/i,
  /\bgtag\(/,
  /document\.cookie/,
  /<iframe\b/i,
];
for (const file of textFiles()) {
  const content = read(file);
  for (const pattern of tracking) {
    if (pattern.test(content)) fail(`${file}: ad, cookie or analytics marker ${pattern}`);
  }
}

// The page's own motion script works on the page only.
if (existsSync(join(out, 'js/hareket.js'))) {
  const motion = read('js/hareket.js');
  if (/fetch\(|XMLHttpRequest|sendBeacon|WebSocket|localStorage|cookie|https?:\/\//.test(motion)) {
    fail('js/hareket.js: the motion script reaches beyond the page');
  }
}

// S13-02 bölüm 4 and S12-06: claims the landing copy must not make. Legal pages are
// excluded: their approved text may need these words ("güvenlik", "şifreli aktarım").
const legalFiles = new Set(legalPages.map((page) => pageFile(page.path)));
const forbidden = [
  /güvenli/i,
  /en iyi/i,
  /1 numara/i,
  /yakında/i,
  /hep ücretsiz/i,
  /seans pro/i,
  /google takvim[’']e yansır/i,
  /şifreli(?! değildir)/i,
  /haber ver/i,
  /yalnız telefonunda/i,
  // S12-25: the app shows ads, so neither "ad-free" nor a data claim the ad SDK breaks.
  /reklamsız/i,
  /reklam yok/i,
  /rahatsız etmeyen/i,
  /paylaşılmaz/i,
  /hiçbir (?:şey|bilgi) gitmez/i,
  /anonim/i,
  /izlemeyiz/i,
];

for (const file of htmlFiles()) {
  const html = read(file);
  const text = visibleText(html);

  if (!/<html\s+lang="tr"/.test(html)) fail(`${file}: html lang is not "tr"`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${file}: no <title>`);

  // Scripts: the two small inline ones (theme memory, motion switch) and the motion files
  // served from this site (GSAP and public/js/hareket.js), nothing else and nothing from
  // another host (privacy policy bölüm 6). Speculation rules are a same-site prefetch hint.
  // The inline scripts may not reach the network or a cookie and stay small.
  for (const [whole, tag, body] of html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)) {
    if (tag.includes('type="speculationrules"')) continue;
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (src) {
      if (!allowedScripts.has(src)) fail(`${file}: loads script ${src}`);
      continue;
    }
    if (tag !== '<script id="tema">' && tag !== '<script id="hareket">') {
      fail(`${file}: contains ${tag}`);
      continue;
    }
    if (/fetch|XMLHttpRequest|sendBeacon|WebSocket|cookie|https?:|\/\//i.test(body)) {
      fail(`${file}: the inline script ${tag} reaches beyond the page`);
    }
    if (whole.length > 900) fail(`${file}: the inline script ${tag} grew (${whole.length} chars)`);
  }
  for (const [, url] of html.matchAll(
    /<(?:link|img|source|iframe)\b[^>]*?(?:href|src)="([^"]+)"/g,
  )) {
    if (/^(https?:)?\/\//.test(url) && !url.startsWith(site.url)) {
      fail(`${file}: loads ${url} from another host`);
    }
  }
  if (/text-transform:\s*uppercase/.test(html)) fail(`${file}: uses uppercase transform (ı/İ)`);

  if (!legalFiles.has(file)) {
    for (const pattern of forbidden) {
      if (pattern.test(text)) fail(`${file}: forbidden phrase ${pattern}`);
    }
    if (/\p{L}'\p{L}/u.test(text)) fail(`${file}: straight apostrophe in text, use ’`);
  }
  if (/\[[A-ZÇĞİÖŞÜ][^\]]*\]/.test(text)) fail(`${file}: unfilled placeholder in text`);
}

const index = visibleText(read('index.html'));

// K-5: no reminder sentence and no calendar question before the device test (S13-08).
if (!site.deviceTestPassed) {
  if (/hatırlatma bildirimi/i.test(index)) fail('index: reminder sentence before S13-08');
  if (/takviminde görünür mü/i.test(index)) fail('index: calendar question before S13-08');
}

// K-7: FAQ 2 and the ad fact in the data section follow the app build in the closed test.
if (site.appShowsAds) {
  if (!index.includes('Evet. Seans ücretsiz ve uygulamada reklam gösterilir')) {
    fail('index: the ad build is out but FAQ 2 is not the ad version');
  }
  if (!index.includes('reklam isteğine girmez')) fail('index: ad fact missing in 1.6');
} else {
  if (!index.includes('Mağazaya çıkacak sürümde var')) {
    fail('index: FAQ 2 is not the ad-free closed test version');
  }
  if (index.includes('reklam isteğine girmez')) fail('index: ad fact before the ad build');
}
if (site.phase === 'launched' && !site.appShowsAds) {
  fail('site.ts: launched but appShowsAds is false (the store build shows ads)');
}

// The waitlist form opens only after the lawyer's approval (S13-07).
const waitlistLive = index.includes('Bekleme listesine yazıl');
if (waitlistLive && (!site.waitlistUrl || !site.legalApproved)) {
  fail('index: waitlist button is visible before the legal texts are approved');
}
if (site.waitlistUrl && !site.legalApproved) {
  fail('site.ts: waitlistUrl is set but legalApproved is false');
}

// Launch day: both store links and the official badge files.
if (site.phase === 'launched') {
  if (!site.appStoreUrl || !site.googlePlayUrl) fail('site.ts: launched without both store links');
  for (const badge of ['rozetler/app-store.svg', 'rozetler/google-play.png']) {
    if (!existsSync(join(out, badge))) fail(`Missing official badge ${badge}`);
  }
}

// Legal pages: the approved text, or the "on its way" notice and noindex.
for (const page of legalPages) {
  const html = read(pageFile(page.path));
  const source = join(root, 'app/legal', `${page.slug}.md`);
  if (site.legalApproved) {
    if (!existsSync(source)) fail(`app/legal/${page.slug}.md is missing`);
    else if (/\[[A-ZÇĞİÖŞÜ][^\]]*\]|\[Karar|\[HS-\d/.test(readFileSync(source, 'utf8'))) {
      fail(`app/legal/${page.slug}.md still has placeholders or decision marks`);
    }
    if (html.includes('Bu metin hazırlanıyor')) fail(`${page.path}: shows the draft notice`);
  } else {
    if (!html.includes('Bu metin hazırlanıyor')) fail(`${page.path}: draft notice missing`);
    if (!html.includes('content="noindex"')) fail(`${page.path}: draft page is indexable`);
  }
}

if (errors.length > 0) {
  console.error(`Site check failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Site check passed: ${htmlFiles().length} pages, phase "${site.phase}".`);

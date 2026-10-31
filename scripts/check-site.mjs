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

// Files GitHub Pages and the stores need.
for (const file of ['.nojekyll', 'favicon.svg', 'paylasim.png']) {
  if (!existsSync(join(out, file))) fail(`Missing ${file}`);
}
for (const path of ['/', ...legalPages.map((page) => page.path)]) {
  if (!existsSync(join(out, pageFile(path)))) fail(`Missing page ${path}`);
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
];

for (const file of htmlFiles()) {
  const html = read(file);
  const text = visibleText(html);

  if (!/<html\s+lang="tr"/.test(html)) fail(`${file}: html lang is not "tr"`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${file}: no <title>`);

  // No JavaScript and nothing loaded from another host (privacy policy bölüm 6).
  // Speculation rules are allowed: a same-site prefetch hint, not a script.
  for (const [tag] of html.matchAll(/<script\b[^>]*>/gi)) {
    if (!tag.includes('type="speculationrules"')) fail(`${file}: contains ${tag}`);
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

// Copies the GSAP files the page loads from node_modules into public/vendor/gsap, so the
// site serves them itself (no CDN, nothing from another host; privacy policy bölüm 6).
// The version is the one pinned in package.json; public/vendor is not committed.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const from = join(root, 'node_modules/gsap/dist');
const to = join(root, 'public/vendor/gsap');

mkdirSync(to, { recursive: true });
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js', 'SplitText.min.js']) {
  copyFileSync(join(from, file), join(to, file));
}
console.log('GSAP copied to public/vendor/gsap');

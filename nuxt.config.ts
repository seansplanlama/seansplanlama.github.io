import tailwindcss from '@tailwindcss/vite';

import { legalPages } from './app/site';

// Static site for GitHub Pages: every page is prerendered and ships without Nuxt's
// JavaScript, so the site loads no script, cookie or font from a third party (S13-02 1.11).
// The one script is the inline theme memory below; scripts/check-site.mjs allows only it.

// Remembers the theme choice (ThemeSwitch.vue) in localStorage for the next page. Without
// it the switch still works on the current page: CSS reads the checked radio.
const themeScript = `(function(){var d=document.documentElement,k='seans-tema';try{var t=localStorage.getItem(k);if(t==='acik'||t==='koyu')d.dataset.tema=t}catch(e){}document.addEventListener('DOMContentLoaded',function(){var c=d.dataset.tema||'sistem';document.querySelectorAll('input[name=tema]').forEach(function(i){i.checked=i.value===c;i.addEventListener('change',function(){var v=i.value;if(v==='sistem')delete d.dataset.tema;else d.dataset.tema=v;try{v==='sistem'?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}})})})})();`;
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  telemetry: false,
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  features: {
    noScripts: true,
  },
  experimental: {
    // 404.html is a real page (app/error.vue): GitHub Pages serves it for unknown paths.
    prerenderErrorPages: true,
    // Without client JavaScript the _payload.json files would never be read.
    payloadExtraction: false,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'tr' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#F4F2EF', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0F0E0D', media: '(prefers-color-scheme: dark)' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      script: [{ id: 'tema', innerHTML: themeScript, tagPosition: 'head' }],
    },
  },
  nitro: {
    prerender: {
      routes: ['/', ...legalPages.map((page) => page.path)],
      crawlLinks: true,
      failOnError: true,
    },
    hooks: {
      // The 200.html SPA fallback needs JavaScript to show anything; GitHub Pages never serves it.
      'prerender:generate'(route) {
        if (route.route === '/200.html') route.skip = true;
      },
    },
  },
});

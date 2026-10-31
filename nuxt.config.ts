import tailwindcss from '@tailwindcss/vite';

import { legalPages } from './app/site';

// Static site for GitHub Pages: every page is prerendered and ships without JavaScript,
// so the site loads no script, cookie or font from a third party (S13-02 1.11).
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
        { name: 'theme-color', content: '#1F5E6B' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
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

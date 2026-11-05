<script setup lang="ts">
import { marked } from 'marked';

import { legalPages, site, type LegalSlug } from '~/site';

const props = defineProps<{ slug: LegalSlug }>();

// Approved texts are copied into app/legal/<slug>.md on the day of the lawyer's approval
// (S13-07). Until then each page keeps its address and says the text is on its way.
const sources = import.meta.glob<string>('../legal/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const page = legalPages.find((item) => item.slug === props.slug)!;
const source = sources[`../legal/${props.slug}.md`];
const html = site.legalApproved && source ? marked.parse(source, { async: false }) : null;

useSeoMeta({
  title: `${page.title} · Seans`,
  robots: html ? undefined : 'noindex',
});
useHead({ link: [{ rel: 'canonical', href: `${site.url}${page.path}` }] });
</script>

<template>
  <main class="wrap pt-[8svh]">
    <article v-if="html" class="legal-text max-w-[72ch]" v-html="html" />
    <template v-else>
      <h1 class="t-h2 max-w-[20ch]">{{ page.title }}</h1>
      <p class="t-lead mt-8 max-w-[60ch] rounded-[var(--r)] bg-note p-6">
        Bu metin hazırlanıyor. Hukuki incelemeden geçtikten sonra bu adreste yayınlanacak.
      </p>
      <p class="mt-10">
        <NuxtLink to="/" class="btn">Ana sayfaya dön</NuxtLink>
      </p>
    </template>
  </main>
</template>

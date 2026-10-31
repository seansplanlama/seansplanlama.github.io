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
  <main class="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 sm:px-6">
    <article v-if="html" class="legal-text" v-html="html" />
    <template v-else>
      <h1 class="text-3xl font-bold sm:text-4xl">{{ page.title }}</h1>
      <p class="mt-6 rounded-2xl bg-note p-5 leading-7">
        Bu metin hazırlanıyor. Hukuki incelemeden geçtikten sonra bu adreste yayınlanacak.
      </p>
      <p class="mt-6">
        <NuxtLink to="/" class="font-semibold text-accent underline">Ana sayfaya dön</NuxtLink>
      </p>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const notFound = props.error.statusCode === 404;

useSeoMeta({
  title: notFound ? 'Sayfa bulunamadı · Seans' : 'Bir sorun oluştu · Seans',
  robots: 'noindex',
});
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteHeader />
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-16 sm:px-6">
      <h1 class="text-3xl font-bold sm:text-4xl">
        {{ notFound ? 'Sayfa bulunamadı' : 'Bir sorun oluştu' }}
      </h1>
      <p class="mt-6 text-lg leading-8 text-muted">
        {{
          notFound
            ? 'Aradığın sayfa burada yok. Adres yanlış yazılmış ya da sayfa taşınmış olabilir.'
            : 'Sayfa şu an açılamadı. Biraz sonra tekrar dene.'
        }}
      </p>
      <p class="mt-6">
        <NuxtLink to="/" class="font-semibold text-accent underline">Ana sayfaya dön</NuxtLink>
      </p>
    </main>
    <SiteFooter />
  </div>
</template>

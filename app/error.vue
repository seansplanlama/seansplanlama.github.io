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
    <a href="#icerik" class="skip-link">İçeriğe geç</a>
    <SiteHeader />
    <main id="icerik" class="wrap flex-1 pt-[12svh]">
      <h1 class="t-display max-w-[14ch]">
        {{ notFound ? 'Sayfa bulunamadı' : 'Bir sorun oluştu' }}
      </h1>
      <p class="t-lead mt-8 max-w-[40ch]">
        {{
          notFound
            ? 'Aradığın sayfa burada yok. Adres yanlış yazılmış ya da sayfa taşınmış olabilir.'
            : 'Sayfa şu an açılamadı. Biraz sonra tekrar dene.'
        }}
      </p>
      <p class="mt-10">
        <NuxtLink to="/" class="btn">Ana sayfaya dön</NuxtLink>
      </p>
    </main>
    <SiteFooter />
  </div>
</template>

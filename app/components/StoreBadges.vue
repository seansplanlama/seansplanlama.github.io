<script setup lang="ts">
import { site } from '~/site';

// Official, localized badges only, unchanged (Apple and Google badge rules, S13-02 1.11).
// The files are added to public/rozetler/ on launch day; scripts/check-site.mjs fails the
// build if the site is launched without them.
const badges = [
  { href: site.appStoreUrl, src: '/rozetler/app-store.svg', label: 'App Store', width: 135 },
  { href: site.googlePlayUrl, src: '/rozetler/google-play.png', label: 'Google Play', width: 155 },
].filter((badge): badge is typeof badge & { href: string } => badge.href !== null);
</script>

<template>
  <ul class="flex flex-wrap items-center gap-3">
    <li v-for="badge in badges" :key="badge.label">
      <a :href="badge.href" :aria-label="badge.label">
        <img :src="badge.src" alt="" :width="badge.width" height="40" class="h-10 w-auto" />
      </a>
    </li>
  </ul>
</template>

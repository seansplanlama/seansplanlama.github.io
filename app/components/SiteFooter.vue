<script setup lang="ts">
import { site } from '~/site';

const footerLinks = [
  { to: '/gizlilik', label: 'Gizlilik politikası' },
  { to: '/kullanim-sartlari', label: 'Kullanım şartları' },
  { to: '/kvkk', label: 'KVKK aydınlatma metni' },
];

const socialLinks = [
  { href: site.instagramUrl, label: 'Instagram' },
  { href: site.tiktokUrl, label: 'TikTok' },
].filter((link): link is { href: string; label: string } => link.href !== null);
</script>

<template>
  <footer class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:px-6">
      <p class="flex items-center gap-2">
        <img src="/favicon.svg" alt="" width="24" height="24" class="size-6" />
        <span>
          <span class="font-semibold text-ink">Seans</span>
          <template v-if="site.developerName"> · {{ site.developerName }}</template>
        </span>
      </p>
      <nav aria-label="Yasal metinler">
        <ul class="flex flex-wrap gap-x-5 gap-y-2">
          <li v-for="link in footerLinks" :key="link.to">
            <NuxtLink :to="link.to" class="text-muted underline hover:text-ink">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <p v-if="site.supportEmail">
        Destek:
        <a :href="`mailto:${site.supportEmail}`" class="text-muted underline hover:text-ink">
          {{ site.supportEmail }}
        </a>
      </p>
      <ul v-if="socialLinks.length > 0" class="flex flex-wrap gap-x-5 gap-y-2">
        <li v-for="link in socialLinks" :key="link.label">
          <a :href="link.href" class="text-muted underline hover:text-ink">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

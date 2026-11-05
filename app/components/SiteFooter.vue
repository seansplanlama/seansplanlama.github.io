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

// The name built from calendar blocks of different heights, bottoms on one line, like
// the blocks behind the mark; drawn as one SVG. The first block is the mark's ink core.
const blockWidth = 193.6;
const letters = [
  { letter: 'S', height: 300, bg: 'var(--core)', fg: 'var(--on-core)' },
  { letter: 'e', height: 222, bg: 'var(--blue)', fg: 'var(--on-mark)' },
  { letter: 'a', height: 264, bg: 'var(--teal)', fg: 'var(--on-mark)' },
  { letter: 'n', height: 186, bg: 'var(--purple)', fg: 'var(--on-mark)' },
  { letter: 's', height: 240, bg: 'var(--mint)', fg: '#0f0e0d' },
].map((item, index) => ({ ...item, x: index * (blockWidth + 8), y: 300 - item.height }));
</script>

<template>
  <footer class="mt-auto pt-24 sm:pt-36">
    <div class="wrap">
      <p class="sr-only">Seans</p>
      <svg class="name-blocks" viewBox="0 0 1000 300" aria-hidden="true" focusable="false">
        <g v-for="item in letters" :key="item.letter + item.x">
          <rect
            :x="item.x"
            :y="item.y"
            :width="blockWidth"
            :height="item.height"
            rx="22"
            :style="{ fill: item.bg }"
          />
          <text :x="item.x + 22" :y="item.y + 128" :style="{ fill: item.fg }">
            {{ item.letter }}
          </text>
        </g>
      </svg>

      <div class="grid gap-8 pt-12 pb-10 sm:grid-cols-2 lg:grid-cols-12">
        <nav aria-label="Yasal metinler" class="lg:col-span-5">
          <ul class="flex flex-col gap-2 font-bold">
            <li v-for="link in footerLinks" :key="link.to">
              <NuxtLink :to="link.to" class="link text-ink">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="flex flex-col gap-2 lg:col-span-7 lg:items-end lg:text-right">
          <p>Öğrenci, danışan, sporcu ve müşteri takibi. iPhone ve Android.</p>
          <p v-if="site.supportEmail">
            Destek:
            <a :href="`mailto:${site.supportEmail}`" class="link">{{ site.supportEmail }}</a>
          </p>
          <ul v-if="socialLinks.length > 0" class="flex flex-wrap gap-x-5 gap-y-2">
            <li v-for="link in socialLinks" :key="link.label">
              <a :href="link.href" class="link">{{ link.label }}</a>
            </li>
          </ul>
          <p v-if="site.developerName">Seans · {{ site.developerName }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.name-blocks {
  display: block;
  width: 100%;
  height: auto;
}

.name-blocks text {
  font-family: 'Nunito Variable', ui-rounded, system-ui, sans-serif;
  font-size: 150px;
  font-weight: 800;
  letter-spacing: -4px;
}
</style>

<script setup lang="ts">
// Section links point at the landing page, so the same header works on the legal pages.
const links = [
  { to: '/#neler-yapar', label: 'Neler yapar' },
  { to: '/#meslekler', label: 'Meslekler' },
  { to: '/#bilgilerin', label: 'Gizlilik' },
  { to: '/#sss', label: 'SSS' },
];
</script>

<template>
  <header class="wrap relative z-10 flex items-center gap-6 py-4 sm:py-5">
    <NuxtLink to="/" class="wordmark mr-auto flex items-center gap-2.5 text-ink no-underline">
      <LogoMark class="size-9" />
      <span class="t-h3 leading-none font-extrabold" translate="no">Seans</span>
    </NuxtLink>
    <nav aria-label="Bölümler" class="hidden md:block">
      <ul class="flex gap-7 font-bold">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" class="nav-link">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <ThemeSwitch />
  </header>
</template>

<style scoped>
.nav-link {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 3px;
  text-underline-offset: 8px;
  transition: text-decoration-color 160ms var(--ease);
}

.nav-link:hover,
.nav-link:focus-visible {
  text-decoration-color: var(--blue);
}

.wordmark svg {
  transition: transform 260ms var(--ease);
}

.wordmark:hover svg {
  transform: rotate(-6deg) scale(1.06);
}
</style>

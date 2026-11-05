<script setup lang="ts">
import type { IconName } from '~/icons';

// Three radios; CSS reads the checked one (main.css, :root:has(#tema-…:checked)), so the
// switch works without script. The inline script in nuxt.config.ts only remembers the
// choice in localStorage ("seans-tema") for the next page; it is not a cookie.
const options: { value: 'sistem' | 'acik' | 'koyu'; label: string; icon: IconName }[] = [
  { value: 'sistem', label: 'Cihazın ayarı', icon: 'contrastOutline' },
  { value: 'acik', label: 'Açık', icon: 'sunnyOutline' },
  { value: 'koyu', label: 'Koyu', icon: 'moonOutline' },
];
</script>

<template>
  <fieldset class="tema">
    <legend class="sr-only">Görünüm</legend>
    <label v-for="option in options" :key="option.value" :title="option.label">
      <input
        :id="`tema-${option.value}`"
        type="radio"
        name="tema"
        :value="option.value"
        :checked="option.value === 'sistem'"
        class="sr-only"
      />
      <IonIcon :name="option.icon" class="size-5" />
      <span class="sr-only">{{ option.label }}</span>
    </label>
  </fieldset>
</template>

<style scoped>
.tema {
  display: inline-flex;
  gap: 2px;
  border-radius: calc(var(--r) - 6px);
  background: var(--raised);
  padding: 3px;
}

label {
  display: grid;
  width: 40px;
  height: 40px;
  cursor: pointer;
  place-items: center;
  border-radius: calc(var(--r) - 9px);
  color: var(--ink-soft);
  transition:
    background-color 160ms var(--ease),
    color 160ms var(--ease),
    transform 160ms var(--ease);
}

label:hover {
  color: var(--ink);
}

label:active {
  transform: scale(0.92);
}

label:has(input:checked) {
  background: var(--core);
  color: var(--on-core);
}

label:has(input:focus-visible) {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
</style>

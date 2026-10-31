<script setup lang="ts">
import { icons, type IconName } from '~/icons';

const props = defineProps<{ name: IconName }>();

// Icons are decorative: the text next to them always carries the meaning (S2-02 bölüm 4).
const svg = computed(() =>
  icons[props.name]
    .replace('data:image/svg+xml;utf8,', '')
    .replace('<svg ', '<svg aria-hidden="true" focusable="false" width="100%" height="100%" '),
);
</script>

<template>
  <span class="inline-block shrink-0" v-html="svg" />
</template>

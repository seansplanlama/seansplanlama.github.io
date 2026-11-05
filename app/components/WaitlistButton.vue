<script setup lang="ts">
// The form is not embedded: the button opens Tally in a new tab, so the site itself
// loads no third-party script or cookie (S13-02 1.11, waitlist consents bölüm 0).
defineProps<{ href: string }>();
</script>

<template>
  <a :href="href" target="_blank" rel="noopener" class="btn">
    Bekleme listesine yazıl
    <IonIcon name="arrowForward" class="size-5" />
  </a>
</template>

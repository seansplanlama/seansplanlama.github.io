<script setup lang="ts">
// The form is not embedded: the button opens Tally in a new tab, so the site itself
// loads no third-party script or cookie (S13-02 1.11, waitlist consents bölüm 0).
defineProps<{ href: string }>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-on-accent no-underline transition hover:opacity-90"
  >
    Bekleme listesine yazıl
    <IonIcon name="arrowForward" class="size-5" />
  </a>
</template>

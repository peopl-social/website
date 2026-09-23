<script setup lang="ts">
import type { Friend } from "~/utils/demo";

withDefaults(defineProps<{ friend: Friend; size?: "sm" | "md" | "lg"; ring?: boolean }>(), {
  size: "md",
  ring: false,
});
</script>

<template>
  <span
    class="inline-grid shrink-0 place-items-center rounded-full font-display font-semibold select-none"
    :class="[
      friend.tone,
      size === 'sm' && 'size-7 text-xs',
      size === 'md' && 'size-9 text-sm',
      size === 'lg' && 'size-11 text-base',
      ring && 'ring-2 ring-surface',
    ]"
    aria-hidden="true"
    >{{ friend.initial }}</span
  >
</template>

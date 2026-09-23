<script setup lang="ts">
defineProps<{
  image: string;
  alt: string;
  label: string;
  title: string;
  body: string;
  position?: string;
  chip?: "top" | "bottom";
}>();
</script>

<template>
  <article
    class="group flex flex-col rounded-xl border border-line bg-surface p-2.5 transition-[transform,box-shadow] duration-300 ease-(--ease-out) hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_oklch(22.5%_0.02_45/0.35)]"
  >
    <div class="relative aspect-[4/3] overflow-hidden rounded-lg bg-sunk">
      <img
        :src="image"
        :alt="alt"
        loading="lazy"
        decoding="async"
        class="size-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
        :style="{ objectPosition: position ?? '50% 50%' }"
      />
      <div
        class="absolute inset-x-3 sm:inset-x-4"
        :class="chip === 'top' ? 'top-3 sm:top-4' : 'bottom-3 sm:bottom-4'"
      >
        <slot />
      </div>
    </div>
    <div class="px-4 pt-5 pb-5 sm:px-5">
      <span
        class="inline-flex rounded-full bg-violet-50 px-3 py-1 text-[0.8125rem] font-semibold text-violet-700"
        >{{ label }}</span
      >
      <h3 class="mt-3 text-[1.625rem] leading-tight tracking-[-0.02em]">{{ title }}</h3>
      <p class="mt-2 max-w-[44ch] text-[1.0625rem] text-ink-soft">{{ body }}</p>
    </div>
  </article>
</template>

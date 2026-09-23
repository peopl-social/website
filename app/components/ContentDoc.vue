<script setup lang="ts">
import type { ContentFile } from "comark-content";

type ContentPageData = {
  title?: string;
  description?: string;
};

const props = defineProps<{
  slug: string;
  fallbackTitle?: string;
}>();

const { data: page, error } = await useFetch<ContentFile<ContentPageData>>(
  `/api/content/${props.slug}`,
  { key: `content-${props.slug}` },
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? "Unable to load content page",
  });
}

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Content page not found" });
}

const contentPage = computed(() => page.value as ContentFile<ContentPageData>);

useSeoMeta({
  title: () => `${contentPage.value.data.title ?? props.fallbackTitle ?? "peopl."} · peopl.`,
  description: () =>
    contentPage.value.data.description ?? "peopl. is a private social app for your actual friends.",
});
</script>

<template>
  <div class="min-h-svh">
    <header class="shell sticky top-0 z-40 pt-3">
      <div
        class="flex h-14 items-center justify-between rounded-full border border-line/70 bg-surface/85 pr-2 pl-6 backdrop-blur-md"
      >
        <NuxtLink to="/" class="rounded-full text-[1.5rem] leading-none" aria-label="peopl. home">
          <Wordmark />
        </NuxtLink>
        <NuxtLink to="/#join" class="btn btn-primary min-h-10 px-5 text-[0.9375rem]"
          >Join the list</NuxtLink
        >
      </div>
    </header>

    <main class="shell pt-16 pb-24 sm:pt-24">
      <h1 class="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.035em]">
        {{ contentPage.data.title }}
      </h1>
      <p v-if="contentPage.data.description" class="mt-4 max-w-[44ch] text-[1.25rem] text-ink-soft">
        {{ contentPage.data.description }}
      </p>

      <article class="prose mt-12 rounded-xl border border-line bg-surface p-7 sm:p-12">
        <MarkdownDocument :value="{ nodes: contentPage.nodes }" />
      </article>

      <NuxtLink to="/" class="link mt-16 inline-block">Back to peopl.</NuxtLink>
    </main>

    <SiteFooter />
  </div>
</template>

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
  {
    key: `content-${props.slug}`,
  },
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? "Unable to load content page",
  });
}

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Content page not found",
  });
}

const contentPage = computed(() => page.value as ContentFile<ContentPageData>);

useSeoMeta({
  title: () => contentPage.value.data.title ?? props.fallbackTitle ?? "peopl.",
  description: () =>
    contentPage.value.data.description ?? "peopl. — a private social app for your actual friends.",
});
</script>

<template>
  <div class="site-shell content-page-shell">
    <section class="section-shell content-page">
      <NuxtLink class="content-page-brand wordmark" to="/" aria-label="peopl. home"
        >peopl.</NuxtLink
      >

      <header class="content-page-header">
        <p class="section-kicker">peopl.</p>
        <h1>{{ contentPage.data.title }}</h1>
        <p v-if="contentPage.data.description">{{ contentPage.data.description }}</p>
      </header>

      <article class="content-prose" aria-label="Page content">
        <MarkdownDocument :value="{ nodes: contentPage.nodes }" />
      </article>

      <footer class="content-footer">
        <NuxtLink class="content-back" to="/">&larr; back to peopl.</NuxtLink>
      </footer>
    </section>
  </div>
</template>

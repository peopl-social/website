<script setup lang="ts">
import type { ContentFile } from "comark-content";

type ContentPageData = {
  title?: string;
  description?: string;
};

const { data: page, error } = await useFetch<ContentFile<ContentPageData>>("/api/content/terms", {
  key: "content-terms",
});

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 500,
    statusMessage: error.value.statusMessage ?? "Unable to load terms of service",
  });
}

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Terms of service not found",
  });
}

const contentPage = computed(() => page.value as ContentFile<ContentPageData>);

useSeoMeta({
  title: () => contentPage.value.data.title ?? "Terms of Service",
  description: () =>
    contentPage.value.data.description ?? "Terms of service for peopl. and the website experience.",
});
</script>

<template>
  <main class="site-shell content-page-shell persona-theme-2">
    <section class="section-shell content-page">
      <a class="content-page-brand wordmark" href="/" aria-label="peopl. home">peopl.</a>

      <header class="content-page-header">
        <p class="section-kicker">Legal</p>
        <h1>{{ contentPage.data.title }}</h1>
        <p>{{ contentPage.data.description }}</p>
      </header>

      <article class="content-prose" aria-label="Terms of Service content">
        <MarkdownDocument :value="{ nodes: contentPage.nodes }" />
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/aura-logo.png",
    },
  ],
  meta: [
    {
      name: "theme-color",
      content: "#8930F6",
    },
  ],
});

useSeoMeta({
  title: "Aura — Make your mood visible",
  description:
    "Aura is a social space for collecting inspiration, making living moodboards, and finding people on your wavelength.",
  ogTitle: "Aura — Make your mood visible",
  ogDescription: "Collect what you love, build the mood, and share it with your people.",
  ogType: "website",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div id="top" class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <SiteHeader />

    <main id="main-content">
      <HeroSection />

      <div class="motion-ribbon" aria-label="Aura values">
        <div class="motion-ribbon__track">
          <span>COLLECT</span><i>✦</i> <span>CURATE</span><i>✦</i> <span>REMIX</span><i>✦</i>
          <span>CONNECT</span><i>✦</i> <span>COLLECT</span><i>✦</i> <span>CURATE</span><i>✦</i>
          <span>REMIX</span><i>✦</i> <span>CONNECT</span><i>✦</i>
        </div>
      </div>

      <LazyFeaturesSection hydrate-on-visible />
      <LazyDeclarationSection hydrate-on-visible />
      <LazyProcessSection hydrate-on-visible />
      <LazyAboutSection hydrate-on-visible />
      <LazyClosingSection hydrate-on-visible />
    </main>

    <SiteFooter />
  </div>
</template>

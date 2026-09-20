export default defineNuxtConfig({
  compatibilityDate: "2026-09-03",
  devtools: { enabled: false },
  modules: ["nuxt-i18n-micro", "@comark/nuxt"],
  i18n: {
    locales: [
      { code: "en", iso: "en-US", dir: "ltr", displayName: "English" },
      { code: "fr", iso: "fr-FR", dir: "ltr", displayName: "Français" },
    ],
    defaultLocale: "en",
    translationDir: "locales",
    localeCookie: "user-locale",
    meta: true,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "peopl. — a private social app for your actual friends",
      meta: [
        {
          name: "description",
          content:
            "peopl. is a private social app for your actual friends — not followers. Share moodboards, plan real gatherings, and message each other without another endless feed. Join the early list.",
        },
        { name: "theme-color", content: "#fff2ec" },
        { name: "color-scheme", content: "light" },
        { property: "og:site_name", content: "peopl." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://peopl.social" },
        { property: "og:title", content: "peopl. — make room for your people" },
        {
          property: "og:description",
          content:
            "A private social app for your actual friends — not followers. Moodboards, gatherings, and messages that stay between you. Join the early list.",
        },
        { property: "og:image", content: "https://peopl.social/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "peopl. — make room for your people. A private social app for your actual friends.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "peopl. — make room for your people" },
        {
          name: "twitter:description",
          content:
            "A private social app for your actual friends — not followers. Moodboards, gatherings, and messages that stay between you.",
        },
        { name: "twitter:image", content: "https://peopl.social/og.png" },
      ],
      link: [
        { rel: "canonical", href: "https://peopl.social" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Afacad+Flux:slnt,wght@0,100..1000;1,100..1000&family=Geologica:wght@100..900&display=swap",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/", "/about", "/privacy", "/terms"],
    },
  },
});

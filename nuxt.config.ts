import tailwindcss from "@tailwindcss/vite";

const description =
  "peopl. is a private space for the friends you actually have. Share the small stuff, make plans, and talk without an audience. Join the early list.";

export default defineNuxtConfig({
  compatibilityDate: "2026-09-03",
  devtools: { enabled: false },
  modules: ["@comark/nuxt", "@nuxt/fonts", "reka-ui/nuxt", "motion-v/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    defaults: {
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
    families: [
      { name: "Geologica", provider: "google", weights: ["500 700"] },
      { name: "Afacad Flux", provider: "google", weights: ["400 600"] },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "peopl. · make room for your people",
      meta: [
        { name: "description", content: description },
        { name: "theme-color", content: "#faf6f1" },
        { name: "color-scheme", content: "light" },
        { property: "og:site_name", content: "peopl." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://peopl.social" },
        { property: "og:title", content: "peopl. · make room for your people" },
        { property: "og:description", content: description },
        { property: "og:image", content: "https://peopl.social/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "peopl. Make room for your people. A private social app for your actual friends.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "peopl. · make room for your people" },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://peopl.social/og.png" },
      ],
      link: [
        { rel: "canonical", href: "https://peopl.social" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/", "/people", "/about", "/privacy", "/terms"],
    },
    storage: {
      waitlist: { driver: "fs", base: "./.data/waitlist" },
    },
  },
});

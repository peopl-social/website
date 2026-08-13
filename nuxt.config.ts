// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/seo"],
  // @ts-expect-error Nuxt SEO adds the site config key during Nuxt type generation.
  site: {
    name: "Aura",
  },
});

export default defineNuxtConfig({
  compatibilityDate: '2026-09-03',
  devtools: { enabled: false },
  modules: ['motion-v/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'peopl. — make room for your people',
      meta: [
        {
          name: 'description',
          content: 'peopl. is a softer way to stay close to the people who make your days feel like yours.',
        },
        { name: 'theme-color', content: '#fff2ec' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Afacad+Flux:slnt,wght@0,100..1000;1,100..1000&family=Geologica:wght@100..900&display=swap',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})

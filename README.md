# peopl. / marketing site

The landing page for peopl., a private social app for your actual friends.

## Stack

- Nuxt `4.5.2` + Vue `3.5.42`, on the Vite+ toolchain (`vp`)
- Tailwind CSS v4. The design tokens live in the `@theme` block in `app/assets/css/main.css`, and the stock Tailwind palette is turned off.
- Reka UI for accessible primitives (tabs, accordion, dialog, toggle group)
- Motion for Vue (`motion-v`) for springy interactions on the feature overlays
- Lenis for smooth scrolling (off when reduced motion is on)
- `@lucide/vue` icons
- `@nuxt/fonts` self-hosts the two fonts: Geologica (headings) and Afacad Flux (body)

## Structure

- `app/pages/index.vue`: the photo hero and the "What's in the app" tabs. Each tab shows a photo from `public/people/` (free Unsplash photos, no credit required) with a small interactive overlay from `FeatureOverlay.vue`.
- `app/composables/useWaitlist.ts`: shared state for the waitlist forms. It posts to `server/api/waitlist.post.ts`.
- `content/*.md`: the About, Privacy and Terms pages

## Run locally

```bash
vp install
vp dev
```

Run `vp check` and `vp run build` before committing.

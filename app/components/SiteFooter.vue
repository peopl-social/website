<template>
  <footer
    class="shell flex flex-col gap-6 py-10 text-[0.9375rem] text-muted sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex items-center gap-4">
      <NuxtLink
        to="/"
        class="rounded-xs text-[1.375rem] leading-none text-ink"
        aria-label="peopl. home"
      >
        <Wordmark />
      </NuxtLink>
      <span>© 2026</span>
    </div>
    <ul class="flex flex-wrap gap-x-6 gap-y-2">
      <li><NuxtLink to="/about" class="transition-colors hover:text-ink">About</NuxtLink></li>
      <li><NuxtLink to="/privacy" class="transition-colors hover:text-ink">Privacy</NuxtLink></li>
      <li><NuxtLink to="/terms" class="transition-colors hover:text-ink">Terms</NuxtLink></li>
      <li>
        <a href="mailto:support@peopl.social" class="transition-colors hover:text-ink"
          >support@peopl.social</a
        >
      </li>
    </ul>
  </footer>
</template>

<template>
  <section id="join" class="scroll-mt-20 pb-6 sm:pb-10" aria-labelledby="join-title">
    <div class="shell">
      <div
        class="grid gap-10 rounded-xl bg-ink px-6 py-14 text-paper sm:px-12 sm:py-16 lg:grid-cols-2 lg:items-end lg:gap-16 lg:px-16 lg:py-20"
      >
        <div>
          <h2
            id="join-title"
            class="text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.035em]"
          >
            Save your spot<span class="text-orange-500">.</span>
          </h2>
          <p class="mt-5 max-w-[34ch] text-[1.1875rem] text-paper/75">
            We'll send one email when there's an invite for your city. That's it.
          </p>
        </div>

        <div>
          <WaitlistForm id="join" tone="dark" />
          <p class="mt-4 max-w-md text-[0.9375rem] text-paper/60">
            peopl. is still being built, and the waitlist is the only part that exists today. Read
            the
            <NuxtLink
              to="/privacy"
              class="underline decoration-paper/30 underline-offset-[0.2em] transition-colors hover:text-paper hover:decoration-paper"
              >privacy policy</NuxtLink
            >
            and
            <NuxtLink
              to="/terms"
              class="underline decoration-paper/30 underline-offset-[0.2em] transition-colors hover:text-paper hover:decoration-paper"
              >terms</NuxtLink
            >.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

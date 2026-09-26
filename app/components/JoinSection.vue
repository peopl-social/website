<template>
  <section id="join" class="section-screen" aria-labelledby="join-title">
    <div class="shell-wide">
      <div class="rounded-xl bg-ink py-16 text-paper sm:py-20 lg:py-28">
        <div class="shell grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <h2
              id="join-title"
              class="text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.035em]"
            >
              Stop swiping<span class="text-orange-500">.</span> Start showing up<span
                class="text-orange-500"
                >.</span
              >
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
    </div>
  </section>
</template>

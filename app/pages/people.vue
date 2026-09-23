<script setup lang="ts">
import { Check, Heart, Lock } from "@lucide/vue";
import { MotionConfig, motion } from "motion-v";
import PhoneAvatar from "~/components/phone/PhoneAvatar.vue";
import { friends, plan, springs } from "~/utils/demo";

// Design experiment: real people as the main element, features as cards.
useSeoMeta({
  title: "peopl. · make room for your people",
  robots: "noindex",
});

const { joined } = useDemoState();
const picnicCrew = [friends.mara, friends.jules, friends.rae, friends.theo];
</script>

<template>
  <MotionConfig reduced-motion="user">
    <SiteNav />

    <main id="main">
      <!-- Hero: the photo is the main element -->
      <section id="top" class="shell pt-4" aria-labelledby="hero-title">
        <div class="relative sm:min-h-[min(88svh,880px)]">
          <div
            class="relative h-[56svh] min-h-80 overflow-hidden rounded-xl bg-sunk sm:absolute sm:inset-0 sm:h-auto"
          >
            <img
              src="/people/picnic.jpg"
              alt="A group of friends sharing food on picnic blankets in a sunny park"
              class="size-full object-cover object-[50%_78%]"
              fetchpriority="high"
              decoding="async"
            />

            <motion.div
              class="absolute top-4 right-4 flex items-center gap-3 rounded-full bg-surface/95 py-1.5 pr-5 pl-1.5 shadow-[0_12px_30px_-14px_oklch(22.5%_0.02_45/0.45)] sm:top-8 sm:right-8"
              :initial="{ opacity: 0, y: -8, scale: 0.96 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :transition="{ ...springs.soft, delay: 0.35 }"
            >
              <span class="flex">
                <PhoneAvatar
                  v-for="(friend, index) in picnicCrew"
                  :key="friend.id"
                  :friend="friend"
                  size="sm"
                  ring
                  :class="index > 0 && '-ml-2'"
                />
              </span>
              <span class="text-[0.9375rem] leading-tight">
                <span class="block font-semibold text-ink">Picnic, Saturday</span>
                <span class="block text-[0.8125rem] text-muted">8 of your people went</span>
              </span>
            </motion.div>
          </div>

          <div
            class="relative -mt-24 px-2 sm:mt-0 sm:flex sm:min-h-[min(88svh,880px)] sm:items-end sm:p-6 lg:p-8"
          >
            <div class="max-w-[38rem] rounded-lg bg-paper p-6 sm:p-9">
              <h1
                id="hero-title"
                class="text-[clamp(2.75rem,4.9vw,4.375rem)] leading-[0.95] font-bold tracking-[-0.035em]"
              >
                Make room for
                <span class="hero-underline block whitespace-nowrap text-orange-600"
                  >your people.</span
                >
              </h1>
              <p class="mt-5 max-w-[36ch] text-[1.1875rem] leading-[1.45] text-ink-soft">
                peopl. is a private social app for the friends you actually have. Share the small
                stuff, make plans, and get together more.
              </p>
              <div class="mt-7">
                <WaitlistForm id="hero" />
                <p class="mt-3 text-[0.9375rem] text-muted">
                  Free during early access. Invites go out city by city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature cards -->
      <section id="how" class="shell scroll-mt-24 pt-24 pb-10 sm:pt-32" aria-labelledby="how-title">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="how-title"
            class="max-w-[14ch] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1] font-bold tracking-[-0.03em]"
          >
            Less scrolling. More of this.
          </h2>
          <p class="max-w-[42ch] text-[1.125rem] text-ink-soft">
            Four small tools for a handful of people. They're built to get you off your phone and
            into the same room.
          </p>
        </div>

        <div class="mt-12 grid gap-4 md:grid-cols-2">
          <FeatureCard
            image="/people/boards.jpg"
            alt="Three friends laughing together, close up"
            label="Boards"
            title="One board each, not a feed."
            body="Everyone keeps a single board for notes and voice memos. Friends check in when they want to. Nothing ranks it."
            position="50% 40%"
          >
            <div
              class="max-w-[17rem] rounded-md bg-surface/95 p-3.5 shadow-[0_12px_30px_-14px_oklch(22.5%_0.02_45/0.45)]"
            >
              <div class="flex items-center gap-2">
                <PhoneAvatar :friend="friends.mara" size="sm" />
                <span class="text-[0.8125rem] font-semibold text-ink">Mara's board</span>
                <span class="ml-auto flex items-center gap-1 text-[0.8125rem] text-orange-700">
                  <Heart :size="13" :stroke-width="2.5" fill="currentColor" aria-hidden="true" /> 4
                </span>
              </div>
              <p class="mt-2 font-display text-[0.9375rem] leading-snug font-medium text-ink">
                finished the demo. feel weird about it. proud?
              </p>
            </div>
          </FeatureCard>

          <FeatureCard
            image="/people/doors.jpg"
            alt="Friends standing close with their arms around each other"
            label="Doors"
            title="You decide who gets in."
            body="Every board has a door: just you, close friends, or anyone with the link. Change it whenever you like."
            position="50% 45%"
          >
            <div
              class="inline-flex items-center gap-1 rounded-full bg-surface/95 p-1 text-[0.8125rem] font-semibold shadow-[0_12px_30px_-14px_oklch(22.5%_0.02_45/0.45)]"
              aria-hidden="true"
            >
              <span class="rounded-full px-3 py-1.5 text-muted">Just me</span>
              <span
                class="flex items-center gap-1 rounded-full bg-violet-500 px-3 py-1.5 text-white"
              >
                <Check :size="13" :stroke-width="3" /> Close friends
              </span>
              <span class="rounded-full px-3 py-1.5 text-muted">Link</span>
            </div>
          </FeatureCard>

          <FeatureCard
            image="/people/plans.jpg"
            alt="Friends eating and talking around a long table on a patio"
            label="Plans"
            title="Turn a maybe into a plan."
            body="Post a time and a place. Friends tap in, and everyone can see who's coming."
            position="50% 55%"
          >
            <div
              class="flex items-center gap-3 rounded-full bg-surface/95 py-1.5 pr-1.5 pl-1.5 shadow-[0_12px_30px_-14px_oklch(22.5%_0.02_45/0.45)] sm:max-w-[22rem]"
            >
              <span
                class="grid size-11 shrink-0 place-items-center rounded-full bg-orange-500 font-display text-[1.0625rem] font-bold text-ink"
                >{{ plan.day }}</span
              >
              <span class="min-w-0 flex-1 leading-tight">
                <span class="block truncate text-[0.9375rem] font-semibold text-ink"
                  >Sunset walk</span
                >
                <span class="block text-[0.8125rem] text-muted"
                  >{{ plan.weekday }} {{ plan.time }} · {{ joined ? 5 : 4 }} going</span
                >
              </span>
              <motion.button
                type="button"
                class="flex h-9 shrink-0 items-center gap-1 rounded-full px-4 font-display text-[0.875rem] font-semibold whitespace-nowrap transition-colors"
                :class="
                  joined ? 'bg-sunk text-ink hover:bg-line' : 'bg-ink text-paper hover:bg-ink-soft'
                "
                :aria-pressed="joined"
                :while-press="{ scale: 0.94 }"
                :transition="springs.snappy"
                @click="joined = !joined"
              >
                <Check v-if="joined" :size="14" :stroke-width="3" aria-hidden="true" />
                {{ joined ? "You're in" : "I'm in" }}
              </motion.button>
            </div>
          </FeatureCard>

          <FeatureCard
            image="/people/messages.jpg"
            alt="Three friends laughing together on a city street"
            label="Messages"
            title="Talk without an audience."
            body="Messages are end-to-end encrypted. Our servers pass them along without being able to read them."
            position="50% 35%"
            chip="top"
          >
            <div class="flex max-w-[17rem] flex-col gap-1.5" aria-hidden="true">
              <p
                class="self-start rounded-md rounded-bl-xs bg-surface/95 px-3.5 py-2 text-[0.9375rem] text-ink shadow-[0_12px_30px_-14px_oklch(22.5%_0.02_45/0.45)]"
              >
                you're coming thursday right?
              </p>
              <p
                class="self-end rounded-md rounded-br-xs bg-violet-700 px-3.5 py-2 text-[0.9375rem] text-white"
              >
                obviously. bringing snacks
              </p>
              <span
                class="flex items-center gap-1 self-start rounded-full bg-surface/95 px-2.5 py-1 text-[0.75rem] font-semibold text-success"
              >
                <Lock :size="11" :stroke-width="2.75" /> End-to-end encrypted
              </span>
            </div>
          </FeatureCard>
        </div>
      </section>

      <SafetySection />
      <FaqSection />
      <JoinSection />
    </main>

    <SiteFooter />
  </MotionConfig>
</template>

<style scoped>
.hero-underline {
  text-decoration-line: underline;
  text-decoration-color: var(--color-violet-500);
  text-decoration-thickness: 0.075em;
  text-underline-offset: 0.12em;
  text-decoration-skip-ink: none;
}
</style>

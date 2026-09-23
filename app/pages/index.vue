<script setup lang="ts">
import type { Component } from "vue";
import { MotionConfig, motion } from "motion-v";
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import FeatureOverlay from "~/components/FeatureOverlay.vue";
import DevicePhone from "~/components/phone/DevicePhone.vue";
import ScreenBoards from "~/components/phone/ScreenBoards.vue";
import ScreenDoors from "~/components/phone/ScreenDoors.vue";
import ScreenMessages from "~/components/phone/ScreenMessages.vue";
import ScreenPlans from "~/components/phone/ScreenPlans.vue";
import { springs, type ScreenId } from "~/utils/demo";

const { screen } = useDemoState();

// The hero phone follows the tab picked in "What's in the app".
const phoneScreens: Record<ScreenId, Component> = {
  boards: ScreenBoards,
  doors: ScreenDoors,
  plans: ScreenPlans,
  messages: ScreenMessages,
};

const screens = [
  {
    id: "boards",
    label: "Boards",
    title: "One board each, not a feed.",
    body: "Everyone keeps a single board for notes and voice memos. Friends check in when they want to. Nothing ranks it and nothing refreshes it.",
    image: "/people/boards.jpg",
    alt: "Three friends laughing together, close up",
    position: "50% 40%",
    overlay: "bottom",
  },
  {
    id: "doors",
    label: "Doors",
    title: "You decide who gets in.",
    body: "Every board has a door: just you, close friends, or anyone with the link. Change it whenever you like.",
    image: "/people/doors.jpg",
    alt: "Friends standing close with their arms around each other",
    position: "50% 45%",
    overlay: "bottom",
  },
  {
    id: "plans",
    label: "Plans",
    title: "Turn a maybe into a plan.",
    body: "Post a time and a place. Friends tap in, and everyone can see who's coming.",
    image: "/people/plans.jpg",
    alt: "Friends eating and talking around a long table on a patio",
    position: "50% 55%",
    overlay: "bottom",
  },
  {
    id: "messages",
    label: "Messages",
    title: "Talk without an audience.",
    body: "Messages are end-to-end encrypted. Our servers pass them along without being able to read them.",
    image: "/people/messages.jpg",
    alt: "Three friends laughing together on a city street",
    position: "50% 35%",
    overlay: "top",
  },
] as const;

const activeScreen = computed(() => screens.find((item) => item.id === screen.value) ?? screens[0]);

// Only animate overlays after the first switch, so the first one is visible without JS.
const switched = ref(false);
function onScreenChange(value: string | number) {
  switched.value = true;
  screen.value = value as ScreenId;
}

const orientation = ref<"horizontal" | "vertical">("vertical");
let wide: MediaQueryList | undefined;
function syncOrientation() {
  orientation.value = wide?.matches ? "vertical" : "horizontal";
}
onMounted(() => {
  wide = window.matchMedia("(min-width: 1024px)");
  syncOrientation();
  wide.addEventListener("change", syncOrientation);
});
onBeforeUnmount(() => wide?.removeEventListener("change", syncOrientation));
</script>

<template>
  <MotionConfig reduced-motion="user">
    <a
      href="#main"
      class="fixed top-3 left-3 z-50 -translate-y-20 rounded-full bg-ink px-5 py-2 text-paper focus:translate-y-0"
      >Skip to content</a
    >
    <SiteNav />

    <main id="main">
      <!-- Hero: full-width photo behind the floating nav -->
      <section
        id="top"
        class="mx-auto -mt-[4.25rem] max-w-[84rem] px-3 pt-2 sm:px-5 sm:pt-3"
        aria-labelledby="hero-title"
      >
        <div class="relative isolate overflow-hidden rounded-xl bg-ink">
          <img
            src="/people/picnic.jpg"
            alt=""
            class="absolute inset-0 -z-10 size-full object-cover object-[50%_72%]"
            fetchpriority="high"
            decoding="async"
          />
          <!-- Flat tint so the text stays readable over the photo -->
          <div class="absolute inset-0 -z-10 bg-ink/55" aria-hidden="true" />

          <div
            class="shell grid min-h-[min(100svh,62rem)] items-center gap-12 pt-32 pb-14 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16 lg:pt-28 lg:pb-16 xl:gap-x-24"
          >
            <div class="lg:self-center">
              <h1
                id="hero-title"
                class="text-[clamp(3rem,6.4vw,6rem)] leading-[0.95] font-bold tracking-[-0.035em] text-paper"
              >
                Make room for
                <span class="hero-underline block whitespace-nowrap text-orange-500"
                  >your people.</span
                >
              </h1>
              <p
                class="mt-7 max-w-[34ch] text-[1.25rem] leading-[1.45] text-paper/85 sm:text-[1.375rem]"
              >
                peopl. is a private social app for the friends you actually have. Share the small
                stuff, make plans, and talk without an audience.
              </p>
              <div class="mt-9">
                <WaitlistForm id="hero" tone="dark" />
                <p class="mt-3 text-[0.9375rem] text-paper/65">
                  Free during early access. Invites go out city by city.
                </p>
              </div>
            </div>

            <!-- The phone: the same app preview as before, now over the photo -->
            <div class="flex justify-center" role="region" aria-label="App preview">
              <DevicePhone :screen="screen">
                <motion.div
                  :key="screen"
                  class="h-full"
                  :initial="switched ? { opacity: 0, y: 14 } : false"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="springs.soft"
                >
                  <component :is="phoneScreens[screen]" />
                </motion.div>
              </DevicePhone>
            </div>
          </div>
        </div>
      </section>

      <!-- What's in the app: tabs on the left, the photo for the active tab on the right -->
      <TabsRoot
        id="how"
        as="section"
        :model-value="screen"
        :orientation="orientation"
        activation-mode="automatic"
        class="shell grid scroll-mt-24 gap-10 py-24 sm:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16"
        aria-labelledby="how-title"
        @update:model-value="onScreenChange"
      >
        <div>
          <h2
            id="how-title"
            class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]"
          >
            What's in the app
          </h2>
          <p class="mt-4 max-w-[40ch] text-[1.125rem] text-ink-soft">
            Four things, made for a handful of people instead of an audience. They're built to get
            you into the same room.
          </p>

          <TabsList
            class="relative mt-8 flex gap-1 overflow-x-auto rounded-full bg-sunk p-1 lg:mt-12 lg:flex-col lg:gap-2 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0"
            aria-label="App features"
          >
            <TabsIndicator
              class="absolute top-1 left-0 h-[calc(100%-0.5rem)] w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-full bg-surface shadow-[0_1px_3px_oklch(22.5%_0.02_45/0.14)] transition-[width,transform] duration-300 ease-(--ease-out) lg:hidden"
            />
            <TabsTrigger
              v-for="item in screens"
              :key="item.id"
              :value="item.id"
              class="group relative z-10 flex-1 rounded-full px-3 py-2 text-center font-display text-[0.9375rem] font-semibold whitespace-nowrap text-muted transition-colors data-[state=active]:text-ink lg:rounded-lg lg:px-7 lg:py-6 lg:text-left lg:whitespace-normal lg:hover:bg-sunk/60"
            >
              <motion.span
                v-if="screen === item.id"
                layout-id="tour-card"
                class="absolute inset-0 -z-10 hidden rounded-lg border border-line bg-surface shadow-[0_12px_30px_-18px_oklch(22.5%_0.02_45/0.3)] lg:block"
                :transition="springs.snappy"
                aria-hidden="true"
              />
              <span class="lg:hidden">{{ item.label }}</span>
              <span class="hidden lg:block">
                <span
                  class="inline-flex rounded-full bg-sunk px-3 py-1 text-[0.8125rem] font-semibold text-muted transition-colors group-data-[state=active]:bg-violet-50 group-data-[state=active]:text-violet-700"
                  >{{ item.label }}</span
                >
                <span
                  class="mt-3 block text-[1.625rem] leading-tight tracking-[-0.02em] text-ink/45 transition-colors group-hover:text-ink/75 group-data-[state=active]:text-ink"
                  >{{ item.title }}</span
                >
                <span
                  class="mt-2 block max-w-[46ch] font-sans text-[1.0625rem] leading-normal font-normal text-muted transition-colors group-data-[state=active]:text-ink-soft"
                  >{{ item.body }}</span
                >
              </span>
            </TabsTrigger>
          </TabsList>

          <div class="mt-6 lg:hidden" aria-live="polite">
            <p class="font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">
              {{ activeScreen.title }}
            </p>
            <p class="mt-2 text-[1.0625rem] text-ink-soft">{{ activeScreen.body }}</p>
          </div>
        </div>

        <div class="lg:sticky lg:top-24 lg:self-start">
          <div
            class="relative aspect-[4/5] overflow-hidden rounded-xl bg-sunk sm:aspect-[4/3] lg:aspect-auto lg:h-[min(44rem,calc(100svh-8rem))]"
          >
            <img
              v-for="item in screens"
              :key="item.id"
              :src="item.image"
              :alt="item.id === screen ? item.alt : ''"
              :aria-hidden="item.id !== screen"
              decoding="async"
              class="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-(--ease-out)"
              :class="item.id === screen ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'"
              :style="{ objectPosition: item.position }"
            />

            <TabsContent
              v-for="item in screens"
              :key="item.id"
              :value="item.id"
              class="absolute inset-x-4 sm:inset-x-6"
              :class="item.overlay === 'top' ? 'top-4 sm:top-6' : 'bottom-4 sm:bottom-6'"
              :aria-label="`${item.label} example`"
            >
              <motion.div
                :initial="switched ? { opacity: 0, y: item.overlay === 'top' ? -12 : 12 } : false"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ ...springs.soft, delay: 0.12 }"
              >
                <FeatureOverlay :screen="item.id" />
              </motion.div>
            </TabsContent>
          </div>
        </div>
      </TabsRoot>

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

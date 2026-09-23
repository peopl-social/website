<script setup lang="ts">
import { MotionConfig, motion } from "motion-v";
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import DevicePhone from "~/components/phone/DevicePhone.vue";
import ScreenBoards from "~/components/phone/ScreenBoards.vue";
import ScreenDoors from "~/components/phone/ScreenDoors.vue";
import ScreenMessages from "~/components/phone/ScreenMessages.vue";
import ScreenPlans from "~/components/phone/ScreenPlans.vue";
import { springs, type ScreenId } from "~/utils/demo";

const { screen } = useDemoState();

const screens = [
  {
    id: "boards",
    label: "Boards",
    title: "One board each, not a feed.",
    body: "Everyone keeps a single board for notes and voice memos. Friends check in when they want to. Nothing ranks it and nothing refreshes it.",
    component: ScreenBoards,
  },
  {
    id: "doors",
    label: "Doors",
    title: "You decide who gets in.",
    body: "Every board has a door: just you, close friends, or anyone with the link. Change it whenever you like.",
    component: ScreenDoors,
  },
  {
    id: "plans",
    label: "Plans",
    title: "Turn a maybe into a plan.",
    body: "Post a time and a place. Friends tap in, and everyone can see who's coming.",
    component: ScreenPlans,
  },
  {
    id: "messages",
    label: "Messages",
    title: "Talk without an audience.",
    body: "Messages are end-to-end encrypted. Our servers pass them along without being able to read them.",
    component: ScreenMessages,
  },
] as const;

const activeScreen = computed(() => screens.find((item) => item.id === screen.value) ?? screens[0]);

// Only animate screens after the first switch, so the hero phone is visible without JS.
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
      <TabsRoot
        :model-value="screen"
        :orientation="orientation"
        activation-mode="automatic"
        class="shell grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16 xl:gap-x-24"
        @update:model-value="onScreenChange"
      >
        <!-- Hero -->
        <section
          id="top"
          class="flex flex-col justify-center pt-12 pb-20 sm:pt-20 lg:col-start-1 lg:row-start-1 lg:min-h-[calc(100svh-4.75rem)] lg:py-16"
          aria-labelledby="hero-title"
        >
          <h1
            id="hero-title"
            class="text-[clamp(3rem,6.4vw,6rem)] leading-[0.95] font-bold tracking-[-0.035em]"
          >
            Make room for
            <span class="hero-underline block whitespace-nowrap text-orange-600">your people.</span>
          </h1>
          <p
            class="mt-7 max-w-[34ch] text-[1.25rem] leading-[1.45] text-ink-soft sm:text-[1.375rem]"
          >
            peopl. is a private social app for the friends you actually have. Share the small stuff,
            make plans, and talk without an audience.
          </p>
          <div class="mt-9">
            <WaitlistForm id="hero" />
            <p class="mt-3 text-[0.9375rem] text-muted">
              Free during early access. Invites go out city by city.
            </p>
          </div>
        </section>

        <!-- How it works -->
        <section
          id="how"
          class="scroll-mt-20 pb-10 lg:col-start-1 lg:row-start-2 lg:pt-8 lg:pb-32"
          aria-labelledby="how-title"
        >
          <h2
            id="how-title"
            class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]"
          >
            What's in the app
          </h2>
          <p class="mt-4 max-w-[40ch] text-[1.125rem] text-ink-soft">
            Four things, made for a handful of people instead of an audience. Everything on the
            phone works, so go ahead and tap it.
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
        </section>

        <!-- The phone: sits beside the hero and the tour on wide screens -->
        <div class="flex justify-center pb-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pb-0">
          <div class="self-start lg:sticky lg:top-[max(5.5rem,calc(50svh-24.5rem))] lg:py-10">
            <DevicePhone :screen="screen">
              <TabsContent
                v-for="item in screens"
                :key="item.id"
                :value="item.id"
                class="h-full rounded-[inherit] focus-visible:outline-offset-[-2px]"
                :aria-label="`${item.label} preview`"
              >
                <motion.div
                  class="h-full"
                  :initial="switched ? { opacity: 0, y: 14 } : false"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="springs.soft"
                >
                  <component :is="item.component" />
                </motion.div>
              </TabsContent>
            </DevicePhone>
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

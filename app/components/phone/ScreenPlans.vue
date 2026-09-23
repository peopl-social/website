<script setup lang="ts">
import { Check, MapPin } from "@lucide/vue";
import { AnimatePresence, motion } from "motion-v";
import PhoneAvatar from "./PhoneAvatar.vue";
import { friends, plan, springs } from "~/utils/demo";

const { joined } = useDemoState();

const upcoming = [
  { weekday: "Sat", day: "20", title: "Film night at Rae's", meta: "8:00 PM · 3 going" },
  { weekday: "Sun", day: "21", title: "Market run", meta: "9:30 AM · 2 going" },
];

const going = computed(() => {
  const list = [friends.mara, friends.jules, friends.rae, friends.theo];
  return joined.value ? [...list, friends.you] : list;
});
</script>

<template>
  <div class="flex h-full flex-col px-4 pt-2">
    <header class="px-1">
      <p class="font-display text-[22px] leading-tight font-semibold">Plans</p>
      <p class="mt-1 text-[14px] text-muted">This week, with your people</p>
    </header>

    <article class="mt-5 overflow-hidden rounded-md border border-line bg-surface">
      <div class="flex gap-3 p-4">
        <div
          class="flex w-14 shrink-0 flex-col items-center justify-center rounded-sm bg-orange-500 py-2 text-ink"
        >
          <span class="text-[12px] font-semibold">{{ plan.weekday }}</span>
          <span class="font-display text-[26px] leading-none font-bold">{{ plan.day }}</span>
        </div>
        <div class="min-w-0">
          <p class="font-display text-[18px] leading-snug font-semibold">{{ plan.title }}</p>
          <p class="mt-1 flex items-center gap-1 text-[13px] text-muted">
            <MapPin :size="13" :stroke-width="2.25" aria-hidden="true" />
            {{ plan.time }} · {{ plan.place }}
          </p>
          <p class="mt-2 text-[13px] text-ink-soft">Started by Jules</p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
        <div class="flex items-center">
          <div class="relative flex h-7 items-center">
            <AnimatePresence mode="popLayout" :initial="false">
              <motion.span
                v-for="(friend, index) in going"
                :key="friend.id"
                layout
                class="relative"
                :style="{ marginLeft: index === 0 ? '0px' : '-6px', zIndex: 10 - index }"
                :initial="{ opacity: 0, scale: 0.4, y: 6 }"
                :animate="{ opacity: 1, scale: 1, y: 0 }"
                :exit="{ opacity: 0, scale: 0.4 }"
                :transition="springs.soft"
              >
                <PhoneAvatar :friend="friend" size="sm" ring />
              </motion.span>
            </AnimatePresence>
          </div>
          <span
            class="ml-2 text-[13px] whitespace-nowrap text-muted tabular-nums"
            aria-live="polite"
          >
            {{ going.length }} going
          </span>
        </div>

        <motion.button
          type="button"
          class="flex h-9 shrink-0 items-center gap-1.5 rounded-sm px-3.5 font-display text-[14px] font-semibold whitespace-nowrap transition-colors"
          :class="
            joined
              ? 'border border-line-strong bg-surface text-ink hover:bg-sunk'
              : 'bg-orange-500 text-ink hover:bg-orange-600'
          "
          :aria-pressed="joined"
          :while-press="{ scale: 0.94 }"
          :transition="springs.snappy"
          @click="joined = !joined"
        >
          <Check v-if="joined" :size="15" :stroke-width="2.75" aria-hidden="true" />
          {{ joined ? "You're in" : "I'm in" }}
        </motion.button>
      </div>
    </article>

    <article
      v-for="later in upcoming"
      :key="later.title"
      class="mt-3 flex items-center gap-3 rounded-md border border-line bg-surface p-3"
    >
      <div class="flex w-11 shrink-0 flex-col items-center rounded-xs bg-sunk py-1.5 text-ink-soft">
        <span class="text-[10px] font-semibold">{{ later.weekday }}</span>
        <span class="font-display text-[17px] leading-none font-bold">{{ later.day }}</span>
      </div>
      <div class="min-w-0">
        <p class="text-[15px] font-semibold text-ink">{{ later.title }}</p>
        <p class="text-[13px] text-muted">{{ later.meta }}</p>
      </div>
    </article>

    <p class="mt-auto mb-5 text-center text-[12px] text-muted">
      Plans stay in Plans. They don't get lost in a chat.
    </p>
  </div>
</template>

<script setup lang="ts">
import { Heart, Lock, Pause, Play } from "@lucide/vue";
import { motion } from "motion-v";
import PhoneAvatar from "./PhoneAvatar.vue";
import { friends, springs } from "~/utils/demo";

const { hearted } = useDemoState();

const bars = [
  5, 9, 14, 8, 18, 22, 12, 7, 15, 24, 19, 10, 6, 13, 20, 26, 17, 9, 12, 21, 16, 8, 5, 11, 18, 14, 7,
  10, 6, 4,
];
const DURATION = 12;

const playing = ref(false);
const progress = ref(0);
let frame = 0;
let startedAt = 0;

function tick(now: number) {
  progress.value = Math.min(1, (now - startedAt) / (DURATION * 1000));
  if (progress.value >= 1) {
    playing.value = false;
    return;
  }
  frame = requestAnimationFrame(tick);
}

function togglePlay() {
  if (playing.value) {
    cancelAnimationFrame(frame);
    playing.value = false;
    return;
  }
  if (progress.value >= 1) progress.value = 0;
  startedAt = performance.now() - progress.value * DURATION * 1000;
  playing.value = true;
  frame = requestAnimationFrame(tick);
}

onBeforeUnmount(() => cancelAnimationFrame(frame));

const elapsed = computed(
  () => `0:${String(Math.round(progress.value * DURATION)).padStart(2, "0")}`,
);
const heartCount = computed(() => (hearted.value ? 5 : 4));

const others = [
  { friend: friends.jules, line: "found a rooftop for friday. bring a jacket", when: "20m" },
  { friend: friends.rae, line: "made pasta. it was serious business", when: "1h" },
];
</script>

<template>
  <div class="flex h-full flex-col px-4 pt-2">
    <header class="flex items-center gap-3 px-1">
      <PhoneAvatar :friend="friends.mara" size="lg" />
      <div class="min-w-0">
        <p class="font-display text-[17px] leading-tight font-semibold">Mara's board</p>
        <p class="mt-0.5 flex items-center gap-1 text-[13px] text-muted">
          <Lock :size="12" :stroke-width="2.25" aria-hidden="true" />
          Close friends · updated 2h ago
        </p>
      </div>
    </header>

    <article class="mt-5 rounded-md border border-line bg-surface p-4">
      <p class="font-display text-[19px] leading-snug font-medium text-ink">
        finished the demo. feel weird about it. proud?
      </p>

      <div class="mt-4 flex items-center gap-3 rounded-sm bg-sunk py-2 pr-3 pl-2">
        <motion.button
          type="button"
          class="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-paper"
          :aria-label="playing ? 'Pause voice memo' : 'Play voice memo'"
          :while-press="{ scale: 0.9 }"
          :transition="springs.snappy"
          @click="togglePlay"
        >
          <Pause v-if="playing" :size="16" fill="currentColor" :stroke-width="0" />
          <Play v-else :size="16" fill="currentColor" :stroke-width="0" class="translate-x-px" />
        </motion.button>
        <div class="flex h-7 flex-1 items-center gap-[3px]" aria-hidden="true">
          <span
            v-for="(height, index) in bars"
            :key="index"
            class="w-[3px] rounded-full transition-colors duration-150"
            :class="index / bars.length < progress ? 'bg-ink' : 'bg-line-strong'"
            :style="{ height: `${height}px` }"
          />
        </div>
        <span class="w-9 text-right text-[12px] text-muted tabular-nums">
          {{ progress > 0 ? elapsed : "0:12" }}
        </span>
      </div>

      <div class="mt-4 flex items-center justify-between border-t border-line pt-3">
        <motion.button
          type="button"
          class="flex items-center gap-1.5 rounded-full py-1 pr-3 pl-2 text-[14px] font-medium transition-colors"
          :class="hearted ? 'bg-orange-50 text-orange-700' : 'text-ink-soft hover:bg-sunk'"
          :aria-pressed="hearted"
          :aria-label="`Heart this, ${heartCount} hearts`"
          :while-press="{ scale: 0.92 }"
          :transition="springs.snappy"
          @click="hearted = !hearted"
        >
          <motion.span
            class="grid"
            :animate="{ scale: hearted ? [1, 1.35, 1] : 1 }"
            :transition="{ duration: 0.35 }"
          >
            <Heart
              :size="18"
              :stroke-width="2"
              :fill="hearted ? 'currentColor' : 'none'"
              aria-hidden="true"
            />
          </motion.span>
          <span class="tabular-nums">{{ heartCount }}</span>
        </motion.button>
        <span class="text-[12px] text-muted">Tue, 11:48 PM</span>
      </div>
    </article>

    <article class="mt-3 rounded-md border border-line bg-surface px-4 py-3">
      <p class="text-[15px] text-ink">the rooftop was worth the stairs</p>
      <p class="mt-1 text-[12px] text-muted">Sunday</p>
    </article>

    <section class="mt-6" aria-label="Other boards">
      <p class="px-1 text-[13px] font-medium text-muted">Also updated</p>
      <ul class="mt-2 divide-y divide-line">
        <li
          v-for="item in others"
          :key="item.friend.id"
          class="flex items-center gap-3 px-1 py-2.5"
        >
          <PhoneAvatar :friend="item.friend" />
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold text-ink">{{ item.friend.name }}</p>
            <p class="truncate text-[13px] text-muted">{{ item.line }}</p>
          </div>
          <span class="text-[12px] text-muted">{{ item.when }}</span>
        </li>
      </ul>
    </section>

    <p class="mt-auto mb-5 text-center text-[12px] text-muted">
      No feed. Just your people's boards.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ArrowUp, ChevronLeft, Lock, RotateCcw } from "@lucide/vue";
import { AnimatePresence, motion } from "motion-v";
import PhoneAvatar from "./PhoneAvatar.vue";
import { friends, springs } from "~/utils/demo";

type Phase = "idle" | "sent" | "typing" | "done";

const { replied } = useDemoState();
const phase = ref<Phase>(replied.value ? "done" : "idle");
const draft = "obviously. bringing snacks";
const timers: ReturnType<typeof setTimeout>[] = [];

function send() {
  replied.value = true;
  phase.value = "sent";
  timers.push(setTimeout(() => (phase.value = "typing"), 650));
  timers.push(setTimeout(() => (phase.value = "done"), 2100));
}

function replay() {
  timers.splice(0).forEach(clearTimeout);
  replied.value = false;
  phase.value = "idle";
}

onBeforeUnmount(() => timers.forEach(clearTimeout));

const bubble = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: springs.soft,
};
</script>

<template>
  <div class="flex h-full flex-col">
    <header class="flex items-center gap-2 border-b border-line px-3 pt-1 pb-3">
      <ChevronLeft :size="22" class="text-muted" aria-hidden="true" />
      <PhoneAvatar :friend="friends.jules" />
      <div>
        <p class="font-display text-[16px] leading-tight font-semibold">Jules</p>
        <p class="flex items-center gap-1 text-[12px] text-success">
          <Lock :size="11" :stroke-width="2.5" aria-hidden="true" /> End-to-end encrypted
        </p>
      </div>
    </header>

    <div
      class="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-4 pb-3"
      aria-live="polite"
    >
      <p class="mb-1 text-center text-[12px] text-muted">Today</p>
      <p class="bubble-in">did you get home ok?</p>
      <p class="bubble-out">yes! full story tomorrow</p>
      <p class="bubble-in">you're coming thursday right?</p>

      <AnimatePresence>
        <motion.p v-if="phase !== 'idle'" key="sent" class="bubble-out" v-bind="bubble">
          {{ draft }}
        </motion.p>
        <motion.p
          v-if="phase === 'typing'"
          key="typing"
          class="bubble-in flex w-fit items-center gap-1 py-3"
          aria-label="Jules is typing"
          v-bind="bubble"
        >
          <span
            v-for="dot in 3"
            :key="dot"
            class="typing-dot"
            :style="{ animationDelay: `${dot * 140}ms` }"
          />
        </motion.p>
        <motion.p v-if="phase === 'done'" key="reply" class="bubble-in" v-bind="bubble">
          perfect. see you at river gate
        </motion.p>
      </AnimatePresence>
    </div>

    <div class="flex items-center gap-2 border-t border-line bg-surface px-3 py-2.5">
      <p
        class="flex h-10 flex-1 items-center truncate rounded-full border border-line bg-paper px-4 text-[14px]"
        :class="phase === 'idle' ? 'text-ink' : 'text-muted'"
      >
        {{ phase === "idle" ? draft : "Message Jules" }}
      </p>
      <motion.button
        v-if="phase === 'idle'"
        type="button"
        class="grid size-10 shrink-0 place-items-center rounded-full bg-orange-500 text-ink transition-colors hover:bg-orange-600"
        aria-label="Send reply"
        :while-press="{ scale: 0.88 }"
        :transition="springs.snappy"
        @click="send"
      >
        <ArrowUp :size="19" :stroke-width="2.5" aria-hidden="true" />
      </motion.button>
      <motion.button
        v-else
        type="button"
        class="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-sunk hover:text-ink disabled:opacity-40"
        aria-label="Replay conversation"
        :disabled="phase !== 'done'"
        :while-press="{ scale: 0.88 }"
        :transition="springs.snappy"
        @click="replay"
      >
        <RotateCcw :size="17" :stroke-width="2.25" aria-hidden="true" />
      </motion.button>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/css/main.css";

.bubble-in,
.bubble-out {
  @apply max-w-[78%] px-3.5 py-2 text-[15px] leading-snug;
}

.bubble-in {
  @apply self-start rounded-md rounded-bl-xs border border-line bg-surface text-ink;
}

.bubble-out {
  @apply self-end rounded-md rounded-br-xs bg-violet-700 text-white;
}

.typing-dot {
  @apply size-1.5 rounded-full bg-muted;
  animation: typing 1s var(--ease-in-out) infinite;
}

@keyframes typing {
  0%,
  100% {
    opacity: 0.35;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-2px);
  }
}
</style>

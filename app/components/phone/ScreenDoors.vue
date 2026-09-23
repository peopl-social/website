<script setup lang="ts">
import { Check, Link2, Lock, Users } from "@lucide/vue";
import { AnimatePresence, motion } from "motion-v";
import { ToggleGroupItem, ToggleGroupRoot } from "reka-ui";
import PhoneAvatar from "./PhoneAvatar.vue";
import { friends, springs, type DoorId, type Friend } from "~/utils/demo";

const { door } = useDemoState();

const doors = [
  { id: "private", label: "Just me", hint: "A private notebook.", icon: Lock },
  { id: "friends", label: "Close friends", hint: "The four people you added.", icon: Users },
  { id: "link", label: "Anyone with the link", hint: "Share it when you want to.", icon: Link2 },
] as const;

const circle = [friends.mara, friends.jules, friends.rae, friends.theo];

const viewers = computed<Friend[]>(() =>
  door.value === "private" ? [friends.you] : [friends.you, ...circle],
);

const caption = computed(
  () =>
    ({
      private: "Only you. Nobody gets a notification.",
      friends: "You and your four close friends.",
      link: "Your friends, plus anyone you send the link to.",
    })[door.value],
);

function select(value: unknown) {
  if (typeof value === "string" && value) door.value = value as DoorId;
}
</script>

<template>
  <div class="flex h-full flex-col px-4 pt-2">
    <header class="px-1">
      <p class="font-display text-[22px] leading-tight font-semibold">Your board</p>
      <p class="mt-1 text-[14px] text-muted">Who's allowed in? Change it any time.</p>
    </header>

    <ToggleGroupRoot
      type="single"
      orientation="vertical"
      :model-value="door"
      class="mt-5 flex flex-col gap-2"
      aria-label="Who can see your board"
      @update:model-value="select"
    >
      <ToggleGroupItem
        v-for="option in doors"
        :key="option.id"
        :value="option.id"
        class="group relative flex items-center gap-3 rounded-md border border-line bg-surface p-3 text-left transition-colors hover:border-line-strong data-[state=on]:border-transparent"
      >
        <motion.span
          v-if="door === option.id"
          layout-id="door-indicator"
          class="absolute inset-0 -z-0 rounded-md border-2 border-violet-500 bg-violet-50"
          :transition="springs.snappy"
          aria-hidden="true"
        />
        <span
          class="relative grid size-9 shrink-0 place-items-center rounded-full bg-sunk text-ink-soft transition-colors group-data-[state=on]:bg-violet-500 group-data-[state=on]:text-white"
        >
          <component :is="option.icon" :size="18" :stroke-width="2" aria-hidden="true" />
        </span>
        <span class="relative min-w-0 flex-1">
          <span class="block text-[15px] font-semibold text-ink">{{ option.label }}</span>
          <span class="block text-[13px] text-muted">{{ option.hint }}</span>
        </span>
        <Check
          class="relative text-violet-700 opacity-0 transition-opacity group-data-[state=on]:opacity-100"
          :size="18"
          :stroke-width="2.5"
          aria-hidden="true"
        />
      </ToggleGroupItem>
    </ToggleGroupRoot>

    <section class="mt-6 rounded-md bg-sunk p-4" aria-live="polite">
      <p class="text-[13px] font-medium text-muted">Who can see it</p>
      <div class="relative mt-3 flex h-9 items-center">
        <AnimatePresence mode="popLayout" :initial="false">
          <motion.span
            v-for="(friend, index) in viewers"
            :key="friend.id"
            layout
            class="relative"
            :style="{ marginLeft: index === 0 ? '0px' : '-6px', zIndex: 10 - index }"
            :initial="{ opacity: 0, scale: 0.6 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.6 }"
            :transition="springs.soft"
          >
            <PhoneAvatar :friend="friend" ring />
          </motion.span>
          <motion.span
            v-if="door === 'link'"
            key="link-chip"
            layout
            class="ml-2 flex h-7 items-center gap-1 rounded-full bg-surface px-2.5 text-[12px] font-medium text-violet-700"
            :initial="{ opacity: 0, x: -8 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -8 }"
            :transition="springs.soft"
          >
            <Link2 :size="13" :stroke-width="2.25" aria-hidden="true" /> + link
          </motion.span>
        </AnimatePresence>
      </div>
      <p class="mt-3 text-[14px] text-ink">{{ caption }}</p>
    </section>
  </div>
</template>

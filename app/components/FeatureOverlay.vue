<script setup lang="ts">
import { Check, Heart, Lock } from "@lucide/vue";
import { motion } from "motion-v";
import { ToggleGroupItem, ToggleGroupRoot } from "reka-ui";
import FriendAvatar from "./FriendAvatar.vue";
import { friends, plan, springs, type DoorId, type ScreenId } from "~/utils/demo";

defineProps<{ screen: ScreenId }>();

const { hearted, door, joined } = useDemoState();

const doors = [
  { id: "private", label: "Just me" },
  { id: "friends", label: "Close friends" },
  { id: "link", label: "Link" },
] as const;

const doorCaption = computed(
  () =>
    ({
      private: "Only you can see it.",
      friends: "Mara, Jules, Rae and Theo can see it.",
      link: "Your friends, plus anyone with the link.",
    })[door.value],
);

function selectDoor(value: unknown) {
  if (typeof value === "string" && value) door.value = value as DoorId;
}

const shadow = "shadow-[0_14px_34px_-14px_oklch(22.5%_0.02_45/0.5)]";
</script>

<template>
  <!-- Boards -->
  <div v-if="screen === 'boards'" class="max-w-[19rem] rounded-md bg-surface p-4" :class="shadow">
    <div class="flex items-center gap-2">
      <FriendAvatar :friend="friends.mara" size="sm" />
      <span class="text-[0.875rem] font-semibold text-ink">Mara's board</span>
      <span class="ml-auto text-[0.75rem] text-muted">2h ago</span>
    </div>
    <p class="mt-2.5 font-display text-[1.0625rem] leading-snug font-medium text-ink">
      finished the demo. feel weird about it. proud?
    </p>
    <motion.button
      type="button"
      class="mt-3 flex items-center gap-1.5 rounded-full py-1 pr-3 pl-2 text-[0.875rem] font-medium transition-colors"
      :class="hearted ? 'bg-orange-50 text-orange-700' : 'bg-sunk text-ink-soft hover:bg-line'"
      :aria-pressed="hearted"
      :aria-label="`Heart Mara's note, ${hearted ? 5 : 4} hearts`"
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
          :size="16"
          :stroke-width="2.25"
          :fill="hearted ? 'currentColor' : 'none'"
          aria-hidden="true"
        />
      </motion.span>
      <span class="tabular-nums">{{ hearted ? 5 : 4 }}</span>
    </motion.button>
  </div>

  <!-- Doors -->
  <div v-else-if="screen === 'doors'" class="flex flex-col items-start gap-2">
    <ToggleGroupRoot
      type="single"
      :model-value="door"
      class="flex items-center gap-1 rounded-full bg-surface p-1 text-[0.875rem] font-semibold"
      :class="shadow"
      aria-label="Who can see your board"
      @update:model-value="selectDoor"
    >
      <ToggleGroupItem
        v-for="option in doors"
        :key="option.id"
        :value="option.id"
        class="relative rounded-full px-3.5 py-2 text-muted transition-colors hover:text-ink data-[state=on]:text-white"
      >
        <motion.span
          v-if="door === option.id"
          layout-id="door-pill"
          class="absolute inset-0 rounded-full bg-violet-500"
          :transition="springs.snappy"
          aria-hidden="true"
        />
        <span class="relative flex items-center gap-1">
          <Check v-if="door === option.id" :size="14" :stroke-width="3" aria-hidden="true" />
          {{ option.label }}
        </span>
      </ToggleGroupItem>
    </ToggleGroupRoot>
    <p
      class="rounded-full bg-surface px-3.5 py-1.5 text-[0.8125rem] text-ink-soft"
      :class="shadow"
      aria-live="polite"
    >
      {{ doorCaption }}
    </p>
  </div>

  <!-- Plans -->
  <div
    v-else-if="screen === 'plans'"
    class="flex items-center gap-3 rounded-full bg-surface p-1.5 sm:max-w-[24rem]"
    :class="shadow"
  >
    <span
      class="flex size-12 shrink-0 flex-col items-center justify-center rounded-full bg-orange-500 leading-none text-ink"
    >
      <span class="text-[0.625rem] font-semibold">{{ plan.weekday }}</span>
      <span class="font-display text-[1.0625rem] font-bold">{{ plan.day }}</span>
    </span>
    <span class="min-w-0 flex-1 leading-tight">
      <span class="block truncate text-[0.9375rem] font-semibold text-ink">Sunset walk</span>
      <span class="block truncate text-[0.8125rem] text-muted" aria-live="polite"
        >{{ plan.time }} · {{ plan.place }} · {{ joined ? 5 : 4 }} going</span
      >
    </span>
    <motion.button
      type="button"
      class="flex h-10 shrink-0 items-center gap-1 rounded-full px-4 font-display text-[0.875rem] font-semibold whitespace-nowrap transition-colors"
      :class="joined ? 'bg-sunk text-ink hover:bg-line' : 'bg-ink text-paper hover:bg-ink-soft'"
      :aria-pressed="joined"
      :while-press="{ scale: 0.94 }"
      :transition="springs.snappy"
      @click="joined = !joined"
    >
      <Check v-if="joined" :size="14" :stroke-width="3" aria-hidden="true" />
      {{ joined ? "You're in" : "I'm in" }}
    </motion.button>
  </div>

  <!-- Messages -->
  <div v-else class="flex max-w-[19rem] flex-col gap-1.5">
    <p
      class="self-start rounded-md rounded-bl-xs bg-surface px-3.5 py-2 text-[0.9375rem] text-ink"
      :class="shadow"
    >
      you're coming thursday right?
    </p>
    <p
      class="self-end rounded-md rounded-br-xs bg-violet-700 px-3.5 py-2 text-[0.9375rem] text-white"
    >
      obviously. bringing snacks
    </p>
    <span
      class="flex items-center gap-1 self-start rounded-full bg-surface px-2.5 py-1 text-[0.75rem] font-semibold text-success"
    >
      <Lock :size="11" :stroke-width="2.75" aria-hidden="true" /> End-to-end encrypted
    </span>
  </div>
</template>

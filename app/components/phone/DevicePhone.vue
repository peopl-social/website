<script setup lang="ts">
import {
  BatteryFull,
  CalendarDays,
  CircleUser,
  House,
  MessageCircle,
  Signal,
  Wifi,
} from "@lucide/vue";
import { motion } from "motion-v";
import { springs, type ScreenId } from "~/utils/demo";

const props = defineProps<{ screen: ScreenId }>();

const tabs = [
  { id: "home", label: "Home", icon: House, screens: ["boards"] },
  { id: "plans", label: "Plans", icon: CalendarDays, screens: ["plans"] },
  { id: "messages", label: "Messages", icon: MessageCircle, screens: ["messages"] },
  { id: "you", label: "You", icon: CircleUser, screens: ["doors"] },
] as const;

const activeTab = computed(
  () => tabs.find((tab) => (tab.screens as readonly ScreenId[]).includes(props.screen))?.id,
);
</script>

<template>
  <div class="phone-scale w-[360px]">
    <div class="rounded-[52px] bg-ink p-[10px] shadow-float ring-1 ring-paper/20">
      <div
        class="relative flex h-[760px] flex-col overflow-hidden rounded-[42px] bg-paper text-ink isolate"
      >
        <!-- status bar -->
        <div
          class="relative flex h-12 shrink-0 items-center justify-between px-8 pt-1"
          aria-hidden="true"
        >
          <span class="font-display text-[15px] font-semibold">9:41</span>
          <span
            class="absolute top-2.5 left-1/2 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-ink"
          />
          <span class="flex items-center gap-1.5">
            <Signal :size="16" :stroke-width="2.25" />
            <Wifi :size="16" :stroke-width="2.25" />
            <BatteryFull :size="20" :stroke-width="1.75" />
          </span>
        </div>

        <!-- app content -->
        <div class="relative min-h-0 flex-1">
          <slot />
        </div>

        <!-- tab bar -->
        <div
          class="relative grid h-[78px] shrink-0 grid-cols-4 border-t border-line bg-surface pb-5"
          aria-hidden="true"
        >
          <span
            v-for="tab in tabs"
            :key="tab.id"
            class="relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors"
            :class="tab.id === activeTab ? 'text-ink' : 'text-muted'"
          >
            <motion.span
              v-if="tab.id === activeTab"
              layout-id="phone-tab-indicator"
              class="absolute top-0 h-[3px] w-8 rounded-b-full bg-orange-500"
              :transition="springs.snappy"
            />
            <component
              :is="tab.icon"
              :size="21"
              :stroke-width="tab.id === activeTab ? 2.25 : 1.75"
            />
            {{ tab.label }}
          </span>
          <span
            class="absolute bottom-2 left-1/2 h-[5px] w-32 -translate-x-1/2 rounded-full bg-ink"
          />
        </div>
      </div>
    </div>
  </div>
</template>

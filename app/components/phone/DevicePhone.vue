<script setup lang="ts">
import type { Component } from "vue";
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
const emit = defineEmits<{ select: [screen: ScreenId] }>();

// Each tab opens one screen of the demo.
const tabs: readonly { id: string; label: string; icon: Component; screen: ScreenId }[] = [
  { id: "home", label: "Home", icon: House, screen: "boards" },
  { id: "plans", label: "Plans", icon: CalendarDays, screen: "plans" },
  { id: "messages", label: "Messages", icon: MessageCircle, screen: "messages" },
  { id: "you", label: "You", icon: CircleUser, screen: "doors" },
];

const activeTab = computed(() => tabs.find((tab) => tab.screen === props.screen)?.id);
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
        <nav
          class="relative grid h-[78px] shrink-0 grid-cols-4 border-t border-line bg-surface pb-5"
          aria-label="App preview screens"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors focus-visible:outline-offset-[-2px]"
            :class="tab.id === activeTab ? 'text-ink' : 'text-muted hover:text-ink-soft'"
            :aria-current="tab.id === activeTab ? 'page' : undefined"
            @click="emit('select', tab.screen)"
          >
            <motion.span
              v-if="tab.id === activeTab"
              layout-id="phone-tab-indicator"
              class="absolute top-0 h-[3px] w-8 rounded-b-full bg-orange-500"
              :transition="springs.snappy"
              aria-hidden="true"
            />
            <component
              :is="tab.icon"
              :size="21"
              :stroke-width="tab.id === activeTab ? 2.25 : 1.75"
              aria-hidden="true"
            />
            {{ tab.label }}
          </button>
          <span
            class="pointer-events-none absolute bottom-2 left-1/2 h-[5px] w-32 -translate-x-1/2 rounded-full bg-ink"
            aria-hidden="true"
          />
        </nav>
      </div>
    </div>
  </div>
</template>

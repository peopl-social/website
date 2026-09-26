<script setup lang="ts">
import { Globe } from "@lucide/vue";

const steps = ["First cities", "Next wave", "Everywhere"];
</script>

<template>
  <section id="launch" class="section-space" aria-labelledby="launch-title">
    <div class="shell">
      <div
        class="grid gap-8 rounded-xl bg-violet-50 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:px-14"
      >
        <div class="flex flex-col gap-5 sm:flex-row">
          <span
            class="grid size-12 shrink-0 place-items-center rounded-full bg-violet-700 text-white"
            aria-hidden="true"
          >
            <Globe :size="22" :stroke-width="2" />
          </span>
          <div>
            <h2
              id="launch-title"
              class="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-[-0.025em]"
            >
              Launching carefully
            </h2>
            <p class="mt-3 max-w-[48ch] text-[1.125rem] text-ink-soft">
              We're rolling out globally, one city at a time. A city opens when enough people there
              have joined to make plans worth showing up to.
            </p>
          </div>
        </div>

        <ol class="flex flex-wrap items-center gap-2" aria-label="Rollout order">
          <li v-for="(step, index) in steps" :key="step" class="flex items-center gap-2">
            <span
              class="rounded-full px-4 py-2 font-display text-[0.9375rem] font-semibold"
              :class="index === 0 ? 'bg-violet-700 text-white' : 'bg-surface text-ink-soft'"
              >{{ step }}</span
            >
            <span
              v-if="index < steps.length - 1"
              class="hidden h-0 w-6 border-t-2 border-dotted border-violet-500/40 sm:block"
              aria-hidden="true"
            />
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

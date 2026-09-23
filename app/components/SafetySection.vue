<script setup lang="ts">
import { EyeOff, Lock, MapPin, MessageCircleOff } from "@lucide/vue";

const rules = [
  {
    icon: EyeOff,
    title: "Closed until you open it.",
    body: "New boards start private. Nothing you post is public unless you choose that door.",
  },
  {
    icon: MessageCircleOff,
    title: "No messages from strangers.",
    body: "Only people you've added can message you. There's no way for someone to slide in.",
  },
  {
    icon: MapPin,
    title: "First meets happen in public.",
    body: "When peopl. starts introducing new people, first meetings happen at events and public places, not in DMs.",
  },
  {
    icon: Lock,
    title: "Encrypted end to end.",
    body: "Messages are locked on your phone and unlocked on theirs. We pass them along and can't read them.",
  },
];
</script>

<template>
  <section id="safety" class="scroll-mt-24 py-10 sm:py-16" aria-labelledby="safety-title">
    <div class="shell">
      <div
        class="grid gap-12 rounded-xl border border-line bg-surface px-4 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-14 lg:py-16"
      >
        <div class="px-2 sm:px-0">
          <h2
            id="safety-title"
            class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]"
          >
            Safe by default
          </h2>
          <p class="mt-4 max-w-[36ch] text-[1.125rem] text-ink-soft">
            These are built into how the app works. They aren't settings you have to go and find.
          </p>

          <figure class="mt-10 max-w-sm" aria-labelledby="relay-caption">
            <div class="flex items-center text-[0.9375rem] font-semibold">
              <span class="rounded-full bg-violet-700 px-4 py-2 text-white">You</span>
              <span
                class="h-0 flex-1 border-t-2 border-dotted border-line-strong"
                aria-hidden="true"
              />
              <span
                class="rounded-full border border-dashed border-line-strong px-4 py-2 text-muted"
                >peopl.</span
              >
              <span
                class="h-0 flex-1 border-t-2 border-dotted border-line-strong"
                aria-hidden="true"
              />
              <span class="rounded-full bg-orange-100 px-4 py-2 text-orange-700">Jules</span>
            </div>
            <figcaption id="relay-caption" class="mt-3 text-[0.9375rem] text-muted">
              Your message travels through our relay as scrambled data. Only Jules's phone can read
              it.
            </figcaption>
          </figure>
        </div>

        <ul class="grid gap-3 sm:grid-cols-2">
          <li v-for="rule in rules" :key="rule.title" class="rounded-lg bg-paper p-5 sm:p-6">
            <span
              class="grid size-11 place-items-center rounded-full bg-orange-100 text-orange-700"
              aria-hidden="true"
            >
              <component :is="rule.icon" :size="21" :stroke-width="2" />
            </span>
            <h3 class="mt-5 text-[1.25rem] tracking-[-0.015em]">{{ rule.title }}</h3>
            <p class="mt-2 text-[1.0625rem] text-ink-soft">{{ rule.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

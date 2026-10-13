<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue";

type Member = {
  name: string;
  role?: string;
  linkedin: string;
  /** Optional photo in /public/team/. Without one, the card shows initials. */
  photo?: string;
};

const team: Member[] = [
  { name: "Jakub Sova", linkedin: "https://www.linkedin.com/in/jakubsova" },
  { name: "Laurent Maxhuni", linkedin: "https://www.linkedin.com/in/laurent-maxhuni/" },
  {
    name: "Fatlum Gërxhaliu",
    linkedin: "https://www.linkedin.com/in/fatlum-g%C3%ABrxhaliu-053bba302/",
  },
  { name: "Bruna Dragulin", linkedin: "https://www.linkedin.com/in/bruna-dragulin" },
];

const tones = [
  "bg-orange-100 text-orange-700",
  "bg-violet-100 text-violet-700",
  "bg-sunk text-ink",
  "bg-orange-50 text-orange-700",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
</script>

<template>
  <section id="team" class="section-space" aria-labelledby="team-title">
    <div class="shell">
      <h2 id="team-title" class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]">
        The people behind peopl.
      </h2>
      <p class="mt-4 max-w-[40ch] text-[1.125rem] text-ink-soft">
        A small team building the app we wanted for ourselves.
      </p>

      <ul class="mt-10 grid gap-3 sm:grid-cols-2">
        <li
          v-for="(member, index) in team"
          :key="member.name"
          class="flex items-center gap-4 rounded-lg border border-line bg-surface p-5 sm:p-6"
        >
          <img
            v-if="member.photo"
            :src="member.photo"
            alt=""
            class="size-16 shrink-0 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span
            v-else
            class="grid size-16 shrink-0 place-items-center rounded-full font-display text-[1.25rem] font-semibold"
            :class="tones[index % tones.length]"
            aria-hidden="true"
            >{{ initials(member.name) }}</span
          >
          <div class="min-w-0">
            <h3 class="text-[1.25rem] tracking-[-0.015em]">{{ member.name }}</h3>
            <p v-if="member.role" class="mt-1 text-ink-soft">{{ member.role }}</p>
            <a
              :href="member.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="link mt-2 inline-flex items-center gap-1 text-[0.9375rem]"
              >LinkedIn<span class="sr-only">
                profile of {{ member.name }} (opens in a new tab)</span
              ><ArrowUpRight :size="15" :stroke-width="2" aria-hidden="true"
            /></a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue";

const team = [
  { name: "Jakub Sova", role: "Founder", linkedin: "https://www.linkedin.com/in/jakubsova" },
  {
    name: "Laurent Maxhuni",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/laurent-maxhuni/",
  },
  {
    name: "Fatlum Gërxhaliu",
    role: "Backend Engineer",
    linkedin: "https://www.linkedin.com/in/fatlum-g%C3%ABrxhaliu-053bba302/",
  },
  {
    name: "Bruna Dragulin",
    role: "Frontend Engineer & Designer",
    linkedin: "https://www.linkedin.com/in/bruna-dragulin",
  },
];
</script>

<template>
  <section id="team" class="section-space" aria-labelledby="team-title">
    <div class="shell">
      <h2 id="team-title" class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]">
        The people behind peopl.
      </h2>
      <p class="mt-4 max-w-[40ch] text-[1.125rem] text-ink-soft">
        A small international team. Building the app we wanted for ourselves.
      </p>

      <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="member in team"
          :key="member.name"
          class="rounded-lg border border-line bg-surface p-5 sm:p-6"
        >
          <h3 class="text-[1.25rem] tracking-[-0.015em]">{{ member.name }}</h3>
          <p class="mt-1 text-ink-soft">{{ member.role }}</p>
          <a
            :href="member.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="link mt-3 inline-flex items-center gap-1 text-[0.9375rem]"
            >LinkedIn<span class="sr-only"> profile of {{ member.name }} (opens in a new tab)</span
            ><ArrowUpRight :size="15" :stroke-width="2" aria-hidden="true"
          /></a>
        </li>
      </ul>
    </div>
  </section>
</template>

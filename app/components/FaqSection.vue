<script setup lang="ts">
import { Plus } from "@lucide/vue";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "reka-ui";

const questions = [
  {
    q: "Does any of this work yet?",
    a: "Only the waitlist. Everything else on this page is what we're building. Nothing is available to download yet, and we'd rather tell you that up front.",
  },
  {
    q: "Is this a dating app?",
    a: "No. It starts as a place for the friends you already have. Ways to meet new people will come later, and you can ignore them if you want.",
  },
  {
    q: "What's coming later?",
    a: "Three things. Slow dating, where you get a small set of profiles each week instead of endless swiping. Meeting people through events you're both going to. And a local marketplace for things like bread from a neighbour, picked up in person. None of it exists yet.",
  },
  {
    q: "Which phones, and what does it cost?",
    a: "iOS and Android are both planned. Early access is free.",
  },
  {
    q: "What do you do with my data?",
    a: "Today we store one thing: the email you give us for the waitlist. We use it to send your invite and nothing else. Email support@peopl.social and we'll delete it.",
  },
];
</script>

<template>
  <!-- Top-aligned so opening an answer grows the list downward instead of shifting the heading -->
  <section id="faq" class="section-screen content-start" aria-labelledby="faq-title">
    <div class="shell-narrow">
      <div class="text-center">
        <h2 id="faq-title" class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]">
          Questions
        </h2>
        <p class="mx-auto mt-4 max-w-[40ch] text-[1.125rem] text-ink-soft">
          Something else on your mind? Email
          <a class="link" href="mailto:support@peopl.social">support@peopl.social</a> and a person
          will answer.
        </p>
      </div>

      <AccordionRoot type="single" collapsible class="mt-10 flex flex-col gap-2 lg:mt-12">
        <AccordionItem
          v-for="(item, index) in questions"
          :key="item.q"
          :value="`q${index}`"
          class="rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-200 data-[state=open]:border-line-strong data-[state=open]:shadow-[0_14px_30px_-20px_oklch(22.5%_0.02_45/0.3)]"
        >
          <AccordionHeader as="h3">
            <AccordionTrigger
              class="group flex w-full items-center justify-between gap-6 rounded-lg py-5 pr-4 pl-7 text-left font-display text-[1.1875rem] font-semibold tracking-[-0.015em] transition-colors hover:text-orange-700"
            >
              {{ item.q }}
              <span
                class="grid size-9 shrink-0 place-items-center rounded-full bg-sunk text-muted transition-colors group-hover:text-ink group-data-[state=open]:bg-orange-500 group-data-[state=open]:text-ink"
                aria-hidden="true"
              >
                <Plus
                  :size="18"
                  :stroke-width="2.5"
                  class="transition-transform duration-300 ease-(--ease-out) group-data-[state=open]:rotate-45"
                />
              </span>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent
            class="overflow-hidden data-[state=closed]:animate-[accordion-up_220ms_var(--ease-out)] data-[state=open]:animate-[accordion-down_260ms_var(--ease-out)]"
          >
            <p class="max-w-[60ch] px-7 pb-6 text-[1.0625rem] text-ink-soft">{{ item.a }}</p>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  </section>
</template>

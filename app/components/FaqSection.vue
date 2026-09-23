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
    q: "When and where does it launch?",
    a: "We're opening one city at a time. Join the list and we'll email you when there's an invite for your city.",
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
  <section id="faq" class="scroll-mt-20" aria-labelledby="faq-title">
    <div
      class="shell grid gap-10 py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-28"
    >
      <div>
        <h2 id="faq-title" class="text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]">
          Questions
        </h2>
        <p class="mt-4 max-w-[34ch] text-[1.125rem] text-ink-soft">
          Something else on your mind? Email
          <a class="link" href="mailto:support@peopl.social">support@peopl.social</a> and a person
          will answer.
        </p>
      </div>

      <AccordionRoot type="single" collapsible class="border-t border-ink">
        <AccordionItem
          v-for="(item, index) in questions"
          :key="item.q"
          :value="`q${index}`"
          class="border-b border-line"
        >
          <AccordionHeader as="h3">
            <AccordionTrigger
              class="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.25rem] font-semibold tracking-[-0.015em] transition-colors hover:text-orange-700"
            >
              {{ item.q }}
              <Plus
                :size="20"
                :stroke-width="2.25"
                class="shrink-0 text-muted transition-transform duration-300 ease-(--ease-out) group-data-[state=open]:rotate-45 group-data-[state=open]:text-ink"
                aria-hidden="true"
              />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent
            class="overflow-hidden data-[state=closed]:animate-[accordion-up_220ms_var(--ease-out)] data-[state=open]:animate-[accordion-down_260ms_var(--ease-out)]"
          >
            <p class="max-w-[60ch] pb-6 text-[1.0625rem] text-ink-soft">{{ item.a }}</p>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  </section>
</template>

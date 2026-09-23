<script setup lang="ts">
import { Menu, X } from "@lucide/vue";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import Wordmark from "./Wordmark.vue";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#faq", label: "FAQ" },
];

const scrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 8;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -72 });
  else target.scrollIntoView({ block: "start" });
}

function goFromMenu(hash: string) {
  menuOpen.value = false;
  // Wait for the sheet to close and release the scroll lock.
  setTimeout(() => scrollToHash(hash), 220);
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-paper transition-colors duration-200"
    :class="scrolled ? 'border-line' : 'border-transparent'"
  >
    <nav class="shell flex h-16 items-center justify-between gap-6" aria-label="Main">
      <a
        href="#top"
        class="rounded-xs text-[1.625rem] leading-none text-ink"
        aria-label="peopl. home"
      >
        <Wordmark />
      </a>

      <div class="hidden items-center gap-8 md:flex">
        <ul class="flex items-center gap-7">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="rounded-xs text-[1rem] text-ink-soft transition-colors hover:text-ink"
              >{{ link.label }}</a
            >
          </li>
        </ul>
        <a href="#join" class="btn btn-primary min-h-10 px-4 text-[0.9375rem]">Join the list</a>
      </div>

      <DialogRoot v-model:open="menuOpen">
        <DialogTrigger
          class="grid size-10 place-items-center rounded-sm text-ink transition-colors hover:bg-sunk md:hidden"
          aria-label="Open menu"
        >
          <Menu :size="22" aria-hidden="true" />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay
            class="fixed inset-0 z-50 bg-ink/30 data-[state=closed]:animate-[fade-out_180ms_var(--ease-out)] data-[state=open]:animate-[fade-in_200ms_var(--ease-out)]"
          />
          <DialogContent
            class="fixed inset-x-0 top-0 z-50 rounded-b-lg bg-paper pb-6 data-[state=closed]:animate-[sheet-out_180ms_var(--ease-out)] data-[state=open]:animate-[sheet-in_260ms_var(--ease-out)]"
          >
            <DialogTitle class="sr-only">Menu</DialogTitle>
            <DialogDescription class="sr-only">Jump to a section of the page.</DialogDescription>
            <div class="shell flex h-16 items-center justify-between">
              <span class="text-[1.625rem] leading-none"><Wordmark /></span>
              <DialogClose
                class="grid size-10 place-items-center rounded-sm text-ink transition-colors hover:bg-sunk"
                aria-label="Close menu"
              >
                <X :size="22" aria-hidden="true" />
              </DialogClose>
            </div>
            <ul class="shell mt-2 flex flex-col">
              <li v-for="link in links" :key="link.href" class="border-b border-line">
                <a
                  :href="link.href"
                  class="block py-4 font-display text-[1.5rem] font-semibold"
                  @click.prevent="goFromMenu(link.href)"
                  >{{ link.label }}</a
                >
              </li>
            </ul>
            <div class="shell mt-6">
              <a href="#join" class="btn btn-primary w-full" @click.prevent="goFromMenu('#join')"
                >Join the list</a
              >
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </nav>
  </header>
</template>

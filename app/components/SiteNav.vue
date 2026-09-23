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
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -88 });
  else target.scrollIntoView({ block: "start" });
}

function goFromMenu(hash: string) {
  menuOpen.value = false;
  // Wait for the sheet to close and release the scroll lock.
  setTimeout(() => scrollToHash(hash), 220);
}
</script>

<template>
  <header class="pointer-events-none sticky top-0 z-40 pt-3">
    <div class="shell">
      <nav
        class="pointer-events-auto flex h-14 items-center justify-between gap-4 rounded-full border bg-surface/85 pr-2 pl-6 backdrop-blur-md transition-[border-color,box-shadow] duration-200"
        :class="
          scrolled
            ? 'border-line shadow-[0_10px_30px_-12px_oklch(22.5%_0.02_45/0.22)]'
            : 'border-line/70 shadow-none'
        "
        aria-label="Main"
      >
        <a
          href="#top"
          class="rounded-full text-[1.5rem] leading-none text-ink"
          aria-label="peopl. home"
        >
          <Wordmark />
        </a>

        <div class="hidden items-center gap-2 md:flex">
          <ul class="flex items-center gap-1">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="block rounded-full px-4 py-2 text-[1rem] text-ink-soft transition-colors hover:bg-sunk hover:text-ink"
                >{{ link.label }}</a
              >
            </li>
          </ul>
          <a href="#join" class="btn btn-primary min-h-10 px-5 text-[0.9375rem]">Join the list</a>
        </div>

        <DialogRoot v-model:open="menuOpen">
          <DialogTrigger
            class="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-sunk md:hidden"
            aria-label="Open menu"
          >
            <Menu :size="22" aria-hidden="true" />
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay
              class="fixed inset-0 z-50 bg-ink/30 data-[state=closed]:animate-[fade-out_180ms_var(--ease-out)] data-[state=open]:animate-[fade-in_200ms_var(--ease-out)]"
            />
            <DialogContent
              class="fixed inset-x-3 top-3 z-50 rounded-lg border border-line bg-surface p-2 pb-3 shadow-phone data-[state=closed]:animate-[sheet-out_180ms_var(--ease-out)] data-[state=open]:animate-[sheet-in_260ms_var(--ease-out)]"
            >
              <DialogTitle class="sr-only">Menu</DialogTitle>
              <DialogDescription class="sr-only">Jump to a section of the page.</DialogDescription>
              <div class="flex h-12 items-center justify-between pl-4">
                <span class="text-[1.5rem] leading-none"><Wordmark /></span>
                <DialogClose
                  class="grid size-10 place-items-center rounded-full bg-sunk text-ink transition-colors hover:bg-line"
                  aria-label="Close menu"
                >
                  <X :size="20" aria-hidden="true" />
                </DialogClose>
              </div>
              <ul class="mt-2 flex flex-col gap-1">
                <li v-for="link in links" :key="link.href">
                  <a
                    :href="link.href"
                    class="block rounded-full px-4 py-3 font-display text-[1.375rem] font-semibold transition-colors hover:bg-sunk"
                    @click.prevent="goFromMenu(link.href)"
                    >{{ link.label }}</a
                  >
                </li>
              </ul>
              <div class="mt-3 px-1">
                <a href="#join" class="btn btn-primary w-full" @click.prevent="goFromMenu('#join')"
                  >Join the list</a
                >
              </div>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </nav>
    </div>
  </header>
</template>

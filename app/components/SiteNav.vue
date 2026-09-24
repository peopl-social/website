<script setup lang="ts">
import Wordmark from "./Wordmark.vue";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#faq", label: "FAQ" },
];

const scrolled = ref(false);
const menuOpen = ref(false);
// Links slide in one frame after the drawer mounts, so the stagger plays.
const menuReady = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);
const firstLink = ref<HTMLAnchorElement[]>([]);

function onScroll() {
  scrolled.value = window.scrollY > 8;
}

function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) window.__lenis?.stop();
  else window.__lenis?.start();
}

function openMenu() {
  menuOpen.value = true;
  lockScroll(true);
  requestAnimationFrame(() => {
    menuReady.value = true;
    firstLink.value[0]?.focus({ preventScroll: true });
  });
}

function closeMenu(returnFocus = true) {
  menuReady.value = false;
  menuOpen.value = false;
  lockScroll(false);
  if (returnFocus) menuButton.value?.focus({ preventScroll: true });
}

function toggleMenu() {
  if (menuOpen.value) closeMenu();
  else openMenu();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && menuOpen.value) closeMenu();
}

// Close the drawer if the screen grows past the mobile breakpoint.
let desktop: MediaQueryList | undefined;
function onBreakpoint() {
  if (desktop?.matches && menuOpen.value) closeMenu(false);
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKeydown);
  desktop = window.matchMedia("(min-width: 768px)");
  desktop.addEventListener("change", onBreakpoint);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKeydown);
  desktop?.removeEventListener("change", onBreakpoint);
  lockScroll(false);
});

function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (window.__lenis) window.__lenis.scrollTo(target);
  else target.scrollIntoView({ block: "start" });
}

function goFromMenu(hash: string) {
  closeMenu(false);
  // Lenis needs a frame to restart before it can scroll.
  requestAnimationFrame(() => scrollToHash(hash));
}
</script>

<template>
  <header class="pointer-events-none sticky top-0 z-40 pt-3 sm:pt-4">
    <Transition name="nav-drawer">
      <div
        v-if="menuOpen"
        class="pointer-events-auto fixed inset-0 bg-ink/15 backdrop-blur-lg md:hidden"
        aria-hidden="true"
        @click="closeMenu()"
      />
    </Transition>

    <div class="shell">
      <nav
        class="pointer-events-auto flex h-[3.8rem] items-center justify-between gap-5 rounded-full border bg-surface/80 pr-2 pl-5 backdrop-blur-xl backdrop-saturate-[1.08] transition-[border-color,box-shadow] duration-300 sm:pl-6 md:h-[4.25rem] md:pr-2.5 md:pl-7"
        :class="
          scrolled || menuOpen
            ? 'border-line shadow-[0_24px_64px_-24px_oklch(22.5%_0.02_45/0.28)]'
            : 'border-line/70 shadow-[0_24px_64px_-28px_oklch(22.5%_0.02_45/0.14)]'
        "
        aria-label="Main"
      >
        <a
          href="#top"
          class="rounded-full text-[1.625rem] leading-none text-ink md:text-[1.75rem]"
          aria-label="peopl. home"
          @click="menuOpen && closeMenu(false)"
        >
          <Wordmark />
        </a>

        <div class="hidden items-center gap-3 md:flex lg:gap-6">
          <ul class="flex items-center gap-5 lg:gap-9">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="nav-link relative block py-2 text-[1.0625rem] font-medium text-ink-soft transition-colors duration-500 hover:text-ink"
                >{{ link.label }}</a
              >
            </li>
          </ul>
          <a href="#join" class="btn btn-primary min-h-12 px-6 text-[1.0625rem]">Join the list</a>
        </div>

        <button
          ref="menuButton"
          type="button"
          class="grid size-[2.85rem] place-items-center rounded-full bg-ink text-paper transition-transform duration-300 active:scale-95 md:hidden"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <span class="menu-lines" aria-hidden="true" />
        </button>
      </nav>

      <Transition name="nav-drawer">
        <div
          v-if="menuOpen"
          id="mobile-menu"
          class="pointer-events-auto fixed inset-x-3 bottom-3 max-h-[calc(100svh-6.5rem)] overflow-y-auto rounded-[2rem] border border-line bg-surface p-3 shadow-float md:hidden"
          :class="{ 'is-ready': menuReady }"
        >
          <ul class="flex flex-col">
            <li v-for="link in links" :key="link.href" class="menu-item border-b border-line">
              <a
                ref="firstLink"
                :href="link.href"
                class="block rounded-lg px-4 py-4 font-display text-[clamp(1.75rem,7vw,2.4rem)] leading-none font-semibold tracking-[-0.045em] transition-colors hover:text-orange-700"
                @click.prevent="goFromMenu(link.href)"
                >{{ link.label }}</a
              >
            </li>
          </ul>
          <div class="menu-item mt-3">
            <a
              href="#join"
              class="btn btn-primary min-h-14 w-full text-[1.125rem]"
              @click.prevent="goFromMenu('#join')"
              >Join the list</a
            >
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/* Orange underline that draws in from the left on hover. */
.nav-link::after {
  position: absolute;
  right: 0;
  bottom: 0.1rem;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: var(--color-orange-500);
  content: "";
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 650ms var(--ease-out);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}

/* Three lines that fold into an X. */
.menu-lines,
.menu-lines::before,
.menu-lines::after {
  display: block;
  width: 1.05rem;
  height: 1.5px;
  border-radius: 999px;
  background: currentColor;
  content: "";
  transition:
    transform 500ms var(--ease-out),
    background-color 300ms var(--ease-out);
}

.menu-lines {
  position: relative;
}

.menu-lines::before,
.menu-lines::after {
  position: absolute;
  left: 0;
}

.menu-lines::before {
  transform: translateY(-0.32rem);
}

.menu-lines::after {
  transform: translateY(0.32rem);
}

.is-open .menu-lines {
  background: transparent;
}

.is-open .menu-lines::before {
  transform: rotate(45deg);
}

.is-open .menu-lines::after {
  transform: rotate(-45deg);
}

/* Drawer links rise in one after another. */
.menu-item {
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 600ms var(--ease-out),
    transform 600ms var(--ease-out);
}

.menu-item:nth-child(2) {
  transition-delay: 60ms;
}

.menu-item:nth-child(3) {
  transition-delay: 120ms;
}

.is-ready > div.menu-item {
  transition-delay: 180ms;
}

.is-ready .menu-item {
  opacity: 1;
  transform: none;
}

.nav-drawer-enter-active,
.nav-drawer-leave-active {
  transition:
    opacity 350ms var(--ease-out),
    transform 350ms var(--ease-out);
}

.nav-drawer-enter-from,
.nav-drawer-leave-to {
  opacity: 0;
}

#mobile-menu.nav-drawer-enter-from,
#mobile-menu.nav-drawer-leave-to {
  transform: translateY(1.5rem);
}
</style>

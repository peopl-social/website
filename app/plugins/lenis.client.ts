import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default defineNuxtPlugin(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
  window.__lenis = lenis;

  // Smooth-scroll same-page anchor links. Lenis's own `anchors` option doesn't cancel the
  // browser's jump, and the two fight, so the scroll lands in the wrong place.
  // The offset under the sticky nav comes from scroll-padding-top in main.css.
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
    const hash = link?.getAttribute("href");
    if (!link || !hash || hash === "#" || link.hasAttribute("data-native-anchor")) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, "", hash);
    lenis.scrollTo(target);
  });
});

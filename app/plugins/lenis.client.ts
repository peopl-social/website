import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default defineNuxtPlugin(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  window.__lenis = new Lenis({
    autoRaf: true,
    lerp: 0.12,
    anchors: { offset: -88 },
  });
});

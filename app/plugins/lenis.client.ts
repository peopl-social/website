interface LenisScrollToOptions {
  offset?: number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
}

interface LenisInstance {
  destroy: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: LenisScrollToOptions) => void;
  on: (event: "scroll", callback: () => void) => void;
}

interface LenisConstructor {
  new (options?: {
    autoRaf?: boolean;
    anchors?: boolean;
    lerp?: number;
    wheelMultiplier?: number;
  }): LenisInstance;
}

declare global {
  interface Window {
    Lenis?: LenisConstructor;
    __lenis?: LenisInstance;
  }
}

export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof window.Lenis !== "function") return;

  const lenis = new window.Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
  window.__lenis = lenis;
});

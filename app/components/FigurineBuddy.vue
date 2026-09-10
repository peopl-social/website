<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    color?: "orange" | "violet" | "green" | "pink" | "sky";
    size?: "sm" | "md" | "lg";
    greeting?: string;
    duration?: number;
    autoPoke?: boolean;
  }>(),
  {
    color: "orange",
    size: "md",
    greeting: "hi!",
    duration: 6,
    autoPoke: false,
  },
);

const root = ref<HTMLElement | null>(null);
const pupilX = ref(0);
const pupilY = ref(0);
const jumping = ref(false);
const bursting = ref(false);
const colorSeed = props.color
  .split("")
  .reduce((total, character) => total + character.charCodeAt(0), 0);
const blinkDelay = `${((colorSeed % 400) / 100).toFixed(2)}s`;
const bobDelay = `${((colorSeed % 200) / 100).toFixed(2)}s`;

let frame = 0;
let autoPokeTimer: number | undefined;
const finePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

const trackPointer = (event: PointerEvent) => {
  if (!root.value) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const bounds = root.value!.getBoundingClientRect();
    const cx = bounds.left + bounds.width / 2;
    const cy = bounds.top + bounds.height / 3;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const distance = Math.hypot(dx, dy) || 1;
    const reach = Math.min(distance / 40, 1) * 2.4;
    pupilX.value = (dx / distance) * reach;
    pupilY.value = (dy / distance) * reach;
  });
};

const poke = () => {
  jumping.value = true;
  bursting.value = true;
  window.setTimeout(() => {
    jumping.value = false;
  }, 520);
  window.setTimeout(() => {
    bursting.value = false;
  }, 760);
};

const scheduleAutoPoke = () => {
  if (!props.autoPoke) return;

  autoPokeTimer = window.setTimeout(
    () => {
      poke();
      scheduleAutoPoke();
    },
    4200 + Math.random() * 4200,
  );
};

onMounted(() => {
  if (finePointer) window.addEventListener("pointermove", trackPointer, { passive: true });
  scheduleAutoPoke();
});

onBeforeUnmount(() => {
  if (finePointer) window.removeEventListener("pointermove", trackPointer);
  cancelAnimationFrame(frame);
  if (autoPokeTimer) window.clearTimeout(autoPokeTimer);
});

const pupilStyle = computed(() => ({
  transform: `translate(${pupilX.value}px, ${pupilY.value}px)`,
}));
const sparkAngles = [0, 60, 120, 180, 240, 300];
</script>

<template>
  <button
    ref="root"
    type="button"
    class="figurine"
    :class="[
      `is-${props.color}`,
      `is-${props.size}`,
      { 'is-jumping': jumping, 'is-auto': props.autoPoke },
    ]"
    :style="{
      '--bob-delay': bobDelay,
      '--blink-delay': blinkDelay,
      '--bob-duration': `${props.duration}s`,
    }"
    aria-label="a peopl. buddy — tap to say hi"
    @click="poke"
  >
    <span class="figurine-shadow" aria-hidden="true" />

    <span class="figurine-blob" aria-hidden="true">
      <span class="figurine-cheek left" />
      <span class="figurine-cheek right" />
      <span class="figurine-eye left"><span class="figurine-pupil" :style="pupilStyle" /></span>
      <span class="figurine-eye right"><span class="figurine-pupil" :style="pupilStyle" /></span>
      <span class="figurine-mouth" />
    </span>

    <span class="figurine-wave" aria-hidden="true">👋</span>

    <span v-if="bursting" class="figurine-burst" aria-hidden="true">
      <span
        v-for="(angle, index) in sparkAngles"
        :key="index"
        class="burst-spark"
        :style="{ '--angle': `${angle}deg` }"
      />
    </span>

    <span class="figurine-bubble" aria-hidden="true">{{ props.greeting }}</span>
  </button>
</template>

<style scoped>
.figurine {
  position: relative;
  display: inline-grid;
  width: 6.2rem;
  aspect-ratio: 1;
  place-items: center;
  background: none;
  cursor: pointer;
  touch-action: manipulation;
}

.figurine.is-sm {
  width: 4.25rem;
}

.figurine.is-lg {
  width: 9rem;
}

.figurine-shadow {
  position: absolute;
  bottom: -0.35rem;
  width: 70%;
  height: 18%;
  border-radius: 50%;
  background: rgb(0 0 0 / 0.14);
  filter: blur(0.2rem);
  animation: figurine-shadow-pulse var(--bob-duration, 6s) ease-in-out infinite;
  animation-delay: var(--bob-delay, 0s);
}

.figurine-blob {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: var(--figurine-color, var(--orange));
  border-radius: 62% 38% 55% 45% / 48% 42% 58% 52%;
  box-shadow:
    inset 0 -0.5rem 0.9rem rgb(0 0 0 / 0.09),
    0 0.6rem 1.1rem rgb(var(--mauve-rgb) / 0.2);
  animation: figurine-morph var(--bob-duration, 6s) ease-in-out infinite;
  animation-delay: var(--bob-delay, 0s);
  transition: filter 400ms var(--ease-out);
}

.figurine:hover .figurine-blob,
.figurine:focus-visible .figurine-blob {
  filter: brightness(1.05);
}

.figurine.is-orange {
  --figurine-color: var(--orange);
}
.figurine.is-violet {
  --figurine-color: var(--violet);
}
.figurine.is-green {
  --figurine-color: var(--green);
}
.figurine.is-pink {
  --figurine-color: var(--pink, #ff5fa2);
}
.figurine.is-sky {
  --figurine-color: var(--sky, #3ec6ff);
}

.figurine-cheek {
  position: absolute;
  top: 52%;
  width: 16%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgb(0 0 0 / 0.08);
}

.figurine-cheek.left {
  left: 12%;
}
.figurine-cheek.right {
  right: 12%;
}

.figurine-eye {
  position: absolute;
  top: 40%;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--paper);
  animation: figurine-blink 5.4s infinite;
  animation-delay: var(--blink-delay, 0s);
}

.figurine-eye.left {
  left: 27%;
}
.figurine-eye.right {
  right: 27%;
}

.figurine-pupil {
  position: absolute;
  inset: 30%;
  border-radius: 50%;
  background: var(--ink);
  transition: transform 90ms linear;
}

.figurine-mouth {
  position: absolute;
  bottom: 30%;
  left: 50%;
  width: 18%;
  height: 9%;
  border-radius: 0 0 999px 999px;
  background: rgb(0 0 0 / 0.55);
  transform: translateX(-50%);
}

.figurine-wave {
  position: absolute;
  top: -6%;
  right: -14%;
  z-index: 2;
  font-size: 1.15rem;
  opacity: 0;
  transform: rotate(-15deg) scale(0.8);
  transform-origin: 70% 90%;
  transition: opacity 300ms var(--ease-out);
}

.figurine:hover .figurine-wave,
.figurine:focus-visible .figurine-wave {
  opacity: 1;
  animation: figurine-wave-hand 650ms ease-in-out 2;
}

.figurine-bubble {
  position: absolute;
  top: -1.9rem;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-family: "Geologica", sans-serif;
  font-size: 0.68rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(4px) scale(0.9);
  transition:
    opacity 220ms var(--ease-out),
    transform 220ms var(--ease-out);
  pointer-events: none;
}

.figurine:hover .figurine-bubble,
.figurine:focus-visible .figurine-bubble,
.figurine.is-jumping .figurine-bubble {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.figurine.is-jumping .figurine-blob {
  animation: figurine-pop 520ms var(--ease-spring);
}

.figurine-burst {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.burst-spark {
  position: absolute;
  top: 46%;
  left: 46%;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--figurine-color, var(--orange));
  transform: rotate(var(--angle)) translateY(0);
  animation: burst-fly 640ms var(--ease-out) forwards;
}

@keyframes figurine-morph {
  0%,
  100% {
    border-radius: 62% 38% 55% 45% / 48% 42% 58% 52%;
    transform: translateY(0) rotate(-3deg);
  }
  33% {
    border-radius: 45% 55% 48% 52% / 55% 48% 52% 45%;
    transform: translateY(-8%) rotate(2deg);
  }
  66% {
    border-radius: 55% 45% 62% 38% / 42% 58% 45% 55%;
    transform: translateY(3%) rotate(-1deg);
  }
}

@keyframes figurine-shadow-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  33% {
    transform: scale(0.82);
    opacity: 0.6;
  }
  66% {
    transform: scale(1.04);
    opacity: 0.85;
  }
}

@keyframes figurine-blink {
  0%,
  92%,
  100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.12);
  }
}

@keyframes figurine-wave-hand {
  0%,
  100% {
    transform: rotate(-15deg) scale(0.9);
  }
  50% {
    transform: rotate(18deg) scale(1);
  }
}

@keyframes figurine-pop {
  0% {
    transform: scale(1) translateY(0);
  }
  30% {
    transform: scale(1.12, 0.86) translateY(-14%);
  }
  60% {
    transform: scale(0.92, 1.1) translateY(4%);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

@keyframes burst-fly {
  0% {
    transform: rotate(var(--angle)) translateY(-0.3rem) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(var(--angle)) translateY(-1.9rem) scale(0.3);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .figurine-blob,
  .figurine-shadow,
  .figurine-eye,
  .burst-spark {
    animation: none !important;
  }
}
</style>

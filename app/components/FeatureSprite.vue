<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    color?: "orange" | "violet" | "green" | "sky" | "pink";
    mood?: "board" | "event" | "message";
    label?: string;
    size?: "sm" | "md" | "lg";
    holdingPhone?: boolean;
    decorative?: boolean;
    expression?: "happy" | "sad" | "excited" | "soft" | "chill";
    showBadge?: boolean;
  }>(),
  {
    color: "orange",
    mood: "board",
    label: "feature friend",
    size: "md",
    holdingPhone: false,
    decorative: false,
    expression: "happy",
    showBadge: true,
  },
);

const isWaving = ref(false);
const speech = ref("");
const root = ref<HTMLElement | null>(null);
let waveTimer: number | undefined;
let speechTimer: number | undefined;
let ambientTimer: number | undefined;
let lastDistance = Number.POSITIVE_INFINITY;
let wasNearby = false;

const lines = {
  board: [
    "stickers count as a plan",
    "this board has good energy",
    "add a tiny voice note",
    "make the feeling visible",
  ],
  event: [
    "I found something happening",
    "this one leaves the house",
    "bring the people, skip the thread",
    "the plan is getting real",
  ],
  message: [
    "plaintext stays out of sight",
    "this one is just between you",
    "quiet relay, loud feelings",
    "send it without the audience",
  ],
} as const;

const saySomething = () => {
  const options = lines[props.mood];
  speech.value = options[Math.floor(Math.random() * options.length)] ?? options[0];
  if (speechTimer) window.clearTimeout(speechTimer);
  speechTimer = window.setTimeout(() => {
    speech.value = "";
  }, 2600);
};

const wave = () => {
  if (props.decorative) return;
  isWaving.value = true;
  saySomething();
  if (waveTimer) window.clearTimeout(waveTimer);
  waveTimer = window.setTimeout(() => {
    isWaving.value = false;
  }, 650);
};

const handlePointerMove = (event: PointerEvent) => {
  const bounds = root.value?.getBoundingClientRect();
  if (!bounds) return;

  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
  const nearby = distance < 170;

  if (nearby && (!wasNearby || distance < lastDistance - 12)) saySomething();
  wasNearby = nearby;
  lastDistance = distance;
};

const scheduleAmbientLine = () => {
  ambientTimer = window.setTimeout(
    () => {
      saySomething();
      scheduleAmbientLine();
    },
    7000 + Math.random() * 7000,
  );
};

onMounted(() => {
  if (props.decorative) return;
  waveTimer = window.setTimeout(wave, 2600 + Math.random() * 3600);
  ambientTimer = window.setTimeout(scheduleAmbientLine, 4000 + Math.random() * 3000);
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
});

onBeforeUnmount(() => {
  if (waveTimer) window.clearTimeout(waveTimer);
  if (speechTimer) window.clearTimeout(speechTimer);
  if (ambientTimer) window.clearTimeout(ambientTimer);
  window.removeEventListener("pointermove", handlePointerMove);
});
</script>

<template>
  <component
    :is="props.decorative ? 'span' : 'button'"
    ref="root"
    class="feature-sprite"
    :class="[
      `is-${props.color}`,
      `is-${props.mood}`,
      `is-${props.size}`,
      `expression-${props.expression}`,
      {
        'is-waving': isWaving,
        'is-using-phone': props.holdingPhone,
        'is-decorative': props.decorative,
      },
    ]"
    :type="props.decorative ? undefined : 'button'"
    :aria-hidden="props.decorative ? true : undefined"
    :aria-label="props.decorative ? undefined : `${props.label}. Tap to wave`"
    @click="wave"
  >
    <span class="sprite-shadow" aria-hidden="true" />
    <span class="sprite-leg leg-left" aria-hidden="true" />
    <span class="sprite-leg leg-right" aria-hidden="true" />
    <span class="sprite-body" aria-hidden="true">
      <span class="sprite-face">
        <i class="sprite-eye eye-left" />
        <i class="sprite-eye eye-right" />
        <i class="sprite-smile" />
      </span>
      <span v-if="!props.holdingPhone && props.showBadge" class="sprite-badge" aria-hidden="true">
        <span v-if="props.mood === 'board'">✦</span>
        <span v-else-if="props.mood === 'event'">+</span>
        <span v-else>· ·</span>
      </span>
      <span v-if="props.holdingPhone" class="sprite-phone-grip" aria-hidden="true">
        <span class="sprite-phone"><span /></span>
        <span class="sprite-holding-hand" />
        <span class="sprite-tapping-hand" />
      </span>
    </span>
    <span class="sprite-arm arm-left" aria-hidden="true" />
    <span class="sprite-arm arm-right" aria-hidden="true" />
    <span v-if="!props.decorative" class="sprite-wave" aria-hidden="true">hi</span>
    <span v-if="speech" class="sprite-speech" aria-live="polite">{{ speech }}</span>
  </component>
</template>

<style scoped>
.feature-sprite {
  position: relative;
  display: inline-block;
  width: 7.4rem;
  height: 9.2rem;
  padding: 0;
  background: transparent;
  cursor: pointer;
  isolation: isolate;
}

.feature-sprite.is-sm {
  transform: scale(0.74);
}
.feature-sprite.is-lg {
  transform: scale(1.24);
}

.feature-sprite.is-decorative {
  cursor: inherit;
  pointer-events: none;
}

.feature-sprite.is-decorative:hover .sprite-body {
  filter: none;
  transform: translateX(-50%) rotate(-4deg);
}

.expression-sad .sprite-smile {
  transform: translateX(-50%) rotate(180deg);
}

.expression-sad .sprite-eye {
  height: 0.6rem;
  transform: rotate(-12deg);
}

.expression-excited .sprite-smile {
  height: 0.75rem;
  background: var(--ink);
}

.expression-soft .sprite-face::before,
.expression-soft .sprite-face::after {
  position: absolute;
  top: 1.1rem;
  width: 0.6rem;
  height: 0.3rem;
  border-radius: 50%;
  background: #e86985;
  content: "";
}
.expression-soft .sprite-face::before {
  left: 0;
}
.expression-soft .sprite-face::after {
  right: 0;
}
.expression-chill .sprite-eye {
  height: 0.25rem;
  top: 0.4rem;
}

.sprite-shadow {
  position: absolute;
  right: 12%;
  bottom: 0.3rem;
  left: 12%;
  height: 0.8rem;
  border-radius: 50%;
  background: rgb(0 0 0 / 0.16);
  filter: blur(0.3rem);
  transition:
    transform 400ms ease,
    opacity 400ms ease;
}

.sprite-body {
  position: absolute;
  top: 1.3rem;
  left: 50%;
  width: 5.1rem;
  height: 6.2rem;
  border: 0.28rem solid var(--ink);
  border-radius: 2.2rem 2.2rem 1.5rem 1.5rem;
  background: var(--sprite-color);
  box-shadow: 0 0.7rem 0 rgb(0 0 0 / 0.11);
  transform: translateX(-50%) rotate(-4deg);
  transition:
    transform 450ms var(--ease-spring),
    filter 350ms ease;
}

.feature-sprite:hover .sprite-body,
.feature-sprite:focus-visible .sprite-body {
  filter: saturate(1.12) brightness(1.04);
  transform: translateX(-50%) rotate(3deg) translateY(-0.3rem);
}

.feature-sprite.is-orange {
  --sprite-color: var(--orange);
}
.feature-sprite.is-violet {
  --sprite-color: var(--violet);
}
.feature-sprite.is-green {
  --sprite-color: var(--green);
}
.feature-sprite.is-sky {
  --sprite-color: var(--sky);
}

.feature-sprite.is-pink {
  --sprite-color: var(--pink);
}

.is-using-phone .sprite-face {
  transform: translate(0.24rem, 0.22rem) rotate(7deg);
}

.is-using-phone .sprite-body {
  animation: phone-reader-breathe 4.5s ease-in-out infinite;
}

.is-using-phone .sprite-arm {
  top: 4.8rem;
  height: 1.15rem;
}

.is-using-phone .arm-left {
  left: 1rem;
  transform: rotate(-48deg);
}

.is-using-phone .arm-right {
  right: 1rem;
  transform: rotate(48deg);
  animation: none;
}

.sprite-phone-grip {
  position: absolute;
  z-index: 2;
  right: 0.35rem;
  bottom: 0.55rem;
  width: 2.2rem;
  height: 2.05rem;
  transform: rotate(-9deg);
}

.sprite-phone {
  position: absolute;
  left: 0.5rem;
  width: 1.05rem;
  height: 1.7rem;
  padding: 0.13rem;
  border: 0.12rem solid var(--ink);
  border-radius: 0.25rem;
  background: var(--paper);
  box-shadow: 0.08rem 0.1rem 0 rgb(0 0 0 / 0.16);
}

.sprite-phone span {
  display: block;
  height: 100%;
  background:
    linear-gradient(var(--orange), var(--orange)) 50% 22% / 65% 0.12rem no-repeat,
    linear-gradient(var(--green), var(--green)) 50% 50% / 80% 0.12rem no-repeat,
    linear-gradient(var(--pink), var(--pink)) 50% 75% / 55% 0.12rem no-repeat;
}

.sprite-holding-hand,
.sprite-tapping-hand {
  position: absolute;
  z-index: 1;
  top: 0.85rem;
  width: 0.65rem;
  height: 0.45rem;
  border: 0.1rem solid var(--ink);
  border-radius: 50%;
  background: var(--sprite-color);
}

.sprite-holding-hand {
  right: 0.25rem;
  transform: rotate(-25deg);
}

.sprite-tapping-hand {
  left: 0.03rem;
  animation: phone-reader-tap 2.8s ease-in-out infinite;
}

@keyframes phone-reader-breathe {
  0%,
  100% {
    transform: translateX(-50%) rotate(-4deg);
  }
  50% {
    transform: translateX(-50%) translateY(-0.12rem) rotate(-1deg);
  }
}

@keyframes phone-reader-tap {
  0%,
  30%,
  60%,
  100% {
    transform: translate(0, 0) rotate(-12deg);
  }
  40%,
  50% {
    transform: translate(0.35rem, -0.28rem) rotate(-28deg);
  }
}

.sprite-face {
  position: absolute;
  top: 1.7rem;
  right: 0.75rem;
  left: 0.75rem;
  height: 2rem;
}

.sprite-eye {
  position: absolute;
  top: 0.1rem;
  width: 0.55rem;
  height: 0.78rem;
  border-radius: 50%;
  background: var(--ink);
}

.eye-left {
  left: 0.5rem;
}
.eye-right {
  right: 0.5rem;
}

.sprite-smile {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 1rem;
  height: 0.48rem;
  border-bottom: 0.2rem solid var(--ink);
  border-radius: 0 0 999px 999px;
  transform: translateX(-50%);
}

.sprite-badge {
  position: absolute;
  right: -0.8rem;
  bottom: 0.8rem;
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 0.2rem solid var(--ink);
  border-radius: 0.7rem;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8rem;
  font-weight: 800;
  transform: rotate(9deg);
}

.is-message .sprite-badge {
  letter-spacing: -0.2em;
}

.sprite-leg,
.sprite-arm {
  position: absolute;
  z-index: -1;
  display: block;
  background: var(--ink);
}

.sprite-leg {
  bottom: 0.9rem;
  width: 0.42rem;
  height: 1.2rem;
  border-radius: 999px;
}

.leg-left {
  left: 2.6rem;
  transform: rotate(8deg);
}
.leg-right {
  right: 2.6rem;
  transform: rotate(-8deg);
}

.sprite-arm {
  top: 3.4rem;
  width: 0.38rem;
  height: 1.8rem;
  border-radius: 999px;
  transform-origin: top center;
}

.arm-left {
  left: 0.5rem;
  transform: rotate(27deg);
}
.arm-right {
  right: 0.5rem;
  transform: rotate(-27deg);
}

.is-waving .arm-right {
  animation: sprite-wave 650ms ease-in-out;
}

.sprite-wave {
  position: absolute;
  top: 0.15rem;
  right: -0.7rem;
  padding: 0.24rem 0.45rem;
  border: 0.15rem solid var(--ink);
  border-radius: 0.65rem 0.65rem 0.65rem 0.15rem;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.62rem;
  font-weight: 800;
  opacity: 0;
  transform: translateY(0.3rem) rotate(8deg);
  transition:
    opacity 200ms ease,
    transform 300ms var(--ease-spring);
}

.sprite-speech {
  position: absolute;
  z-index: 4;
  top: -1.7rem;
  left: 50%;
  width: max-content;
  max-width: 12rem;
  padding: 0.38rem 0.6rem;
  border: 0.15rem solid var(--ink);
  border-radius: 0.75rem 0.75rem 0.75rem 0.2rem;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.68rem;
  font-weight: 720;
  line-height: 1.1;
  transform: translateX(-35%) rotate(-3deg);
  animation: speech-pop 350ms var(--ease-spring);
}

.feature-sprite:hover .sprite-wave,
.feature-sprite:focus-visible .sprite-wave,
.feature-sprite.is-waving .sprite-wave {
  opacity: 1;
  transform: translateY(0) rotate(8deg);
}

@keyframes sprite-wave {
  0%,
  100% {
    transform: rotate(-27deg);
  }
  50% {
    transform: rotate(-58deg);
  }
}

@keyframes speech-pop {
  from {
    opacity: 0;
    transform: translateX(-35%) translateY(0.35rem) rotate(-3deg) scale(0.88);
  }
  to {
    opacity: 1;
    transform: translateX(-35%) rotate(-3deg) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-sprite,
  .sprite-arm,
  .sprite-wave,
  .sprite-speech {
    animation: none !important;
    transition: none !important;
  }

  .is-using-phone .sprite-body,
  .sprite-tapping-hand {
    animation: none !important;
  }
}
</style>

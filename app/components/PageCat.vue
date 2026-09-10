<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const messages = [
  "psst, moodboards",
  "events are outside",
  "encrypted little thoughts",
  "I like it here",
];
const message = ref(messages[0]);
const isHiding = ref(false);
const isAngry = ref(false);
let messageTimer: number | undefined;
let hideTimer: number | undefined;

const changeMessage = () => {
  message.value = messages[Math.floor(Math.random() * messages.length)] ?? messages[0];
  messageTimer = window.setTimeout(changeMessage, 6500 + Math.random() * 5000);
};

const dodge = () => {
  if (isHiding.value) return;

  isAngry.value = true;
  isHiding.value = true;
  message.value = "hey! personal space";
  if (hideTimer) window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    isHiding.value = false;
    message.value = "okay... hi again";
    hideTimer = window.setTimeout(changeMessage, 3200);
  }, 900);
};

onMounted(() => {
  messageTimer = window.setTimeout(changeMessage, 4200);
});

onBeforeUnmount(() => {
  if (messageTimer) window.clearTimeout(messageTimer);
  if (hideTimer) window.clearTimeout(hideTimer);
});
</script>

<template>
  <div
    class="page-cat"
    :class="{ 'is-hiding': isHiding, 'is-angry': isAngry }"
    aria-hidden="true"
    @pointerenter="dodge"
  >
    <span class="cat-speech">{{ message }}</span>
    <span class="cat-tail" />
    <span class="cat-body">
      <span class="cat-ear ear-left" />
      <span class="cat-ear ear-right" />
      <span class="cat-face">
        <i class="cat-eye eye-left" />
        <i class="cat-eye eye-right" />
        <i class="cat-nose" />
        <i class="cat-mouth" />
      </span>
      <span class="cat-chest" />
    </span>
    <span class="cat-paw paw-left" />
    <span class="cat-paw paw-right" />
  </div>
</template>

<style scoped>
.page-cat {
  position: fixed;
  z-index: 24;
  right: 6vw;
  bottom: 1.1rem;
  width: 4.6rem;
  height: 4.8rem;
  pointer-events: auto;
  cursor: crosshair;
  animation: cat-roam 24s ease-in-out infinite;
}

.page-cat.is-hiding {
  pointer-events: none;
  animation: cat-hide 900ms var(--ease-out) forwards;
}

.page-cat.is-angry .cat-body {
  background: var(--orange);
  transform: rotate(-5deg) translateY(-0.15rem);
}

.page-cat.is-angry .cat-eye {
  transform: rotate(18deg) scaleY(0.7);
}

.cat-body {
  position: absolute;
  right: 0.55rem;
  bottom: 0.55rem;
  width: 3.15rem;
  height: 3.4rem;
  border: 0.18rem solid var(--ink);
  border-radius: 48% 48% 42% 42%;
  background: var(--yellow);
  box-shadow: 0 0.35rem 0 rgb(0 0 0 / 0.12);
}

.cat-ear {
  position: absolute;
  top: -0.65rem;
  width: 1rem;
  height: 1.1rem;
  border: 0.18rem solid var(--ink);
  background: var(--yellow);
  transform: rotate(45deg);
}

.ear-left {
  left: 0.1rem;
  border-radius: 0.25rem 0.45rem 0.15rem 0.25rem;
}
.ear-right {
  right: 0.1rem;
  border-radius: 0.45rem 0.25rem 0.25rem 0.15rem;
  transform: rotate(45deg);
}

.cat-face {
  position: absolute;
  top: 1.05rem;
  right: 0.55rem;
  left: 0.55rem;
  height: 1.2rem;
}

.cat-eye {
  position: absolute;
  top: 0.1rem;
  width: 0.32rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--ink);
}

.eye-left {
  left: 0.25rem;
}
.eye-right {
  right: 0.25rem;
}

.cat-nose {
  position: absolute;
  top: 0.55rem;
  left: 50%;
  width: 0.35rem;
  height: 0.25rem;
  border-radius: 50%;
  background: var(--pink);
  transform: translateX(-50%);
}

.cat-mouth {
  position: absolute;
  top: 0.72rem;
  left: 50%;
  width: 0.48rem;
  height: 0.3rem;
  border-bottom: 0.11rem solid var(--ink);
  border-radius: 0 0 999px 999px;
  transform: translateX(-50%);
}

.cat-chest {
  position: absolute;
  right: 0.72rem;
  bottom: -0.02rem;
  left: 0.72rem;
  height: 0.85rem;
  border-radius: 50% 50% 0 0;
  background: var(--paper);
}

.cat-tail {
  position: absolute;
  right: 0.05rem;
  bottom: 1.6rem;
  width: 1.8rem;
  height: 2rem;
  border: 0.22rem solid var(--ink);
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  transform: rotate(35deg);
  transform-origin: bottom left;
  animation: cat-tail 1.8s ease-in-out infinite alternate;
}

.cat-paw {
  position: absolute;
  bottom: 0.15rem;
  width: 0.58rem;
  height: 0.95rem;
  border: 0.15rem solid var(--ink);
  border-radius: 999px;
  background: var(--yellow);
}

.paw-left {
  left: 1rem;
}
.paw-right {
  right: 1.1rem;
}

.cat-speech {
  position: absolute;
  right: 2.7rem;
  bottom: 3.7rem;
  width: max-content;
  padding: 0.3rem 0.5rem;
  border: 0.14rem solid var(--ink);
  border-radius: 0.55rem 0.55rem 0.15rem 0.55rem;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.62rem;
  font-weight: 750;
  white-space: nowrap;
  transform: rotate(-5deg);
}

@keyframes cat-roam {
  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }
  18% {
    transform: translateX(-12vw) translateY(-0.4rem) rotate(-3deg);
  }
  42% {
    transform: translateX(-28vw) translateY(0.2rem) rotate(3deg);
  }
  68% {
    transform: translateX(-52vw) translateY(-0.5rem) rotate(-2deg);
  }
  86% {
    transform: translateX(-68vw) translateY(0.1rem) rotate(2deg);
  }
}

@keyframes cat-tail {
  from {
    transform: rotate(28deg);
  }
  to {
    transform: rotate(48deg);
  }
}

@keyframes cat-hide {
  0% {
    opacity: 1;
    transform: translateX(0) rotate(0deg) scale(1);
  }
  45% {
    opacity: 1;
    transform: translateX(1.4rem) rotate(14deg) scale(0.9);
  }
  100% {
    opacity: 0;
    transform: translateX(3.2rem) rotate(24deg) scale(0.45);
  }
}

@media (max-width: 600px) {
  .page-cat {
    right: 0.8rem;
    bottom: 0.7rem;
    transform: scale(0.78);
    transform-origin: bottom right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-cat,
  .cat-tail {
    animation: none !important;
  }
}
</style>

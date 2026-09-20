<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "A phone showing why peopl. exists: too many notifications, not enough real life",
  },
);
</script>

<template>
  <div class="phone-mockup" role="img" :aria-label="props.label">
    <div class="phone-body" aria-hidden="true">
      <span class="phone-notch" />
      <span class="phone-button" />

      <div class="phone-screen">
        <div class="status-row">
          <span>9:41</span>
          <span class="status-icons"><i /><i /><i /></span>
        </div>

        <div class="screen-heading">
          <div>
            <span class="screen-eyebrow">the problem</span>
            <strong>too much social.</strong>
          </div>
          <span class="screen-symbol">!</span>
        </div>

        <div class="problem-screen-message">
          <span>too many tabs</span>
          <strong>not enough<br />actual life.</strong>
        </div>

        <div class="problem-notification-stack">
          <div class="problem-notification">
            <span>group chat</span><strong>47 new messages</strong>
          </div>
          <div class="problem-notification alt">
            <span>your feed</span><strong>nothing you meant to save</strong>
          </div>
          <div class="problem-notification muted">
            <span>real life</span><strong>still waiting</strong>
          </div>
        </div>
      </div>
    </div>

    <span class="phone-shadow" aria-hidden="true" />
  </div>
</template>

<style scoped>
.phone-mockup {
  position: relative;
  width: 100%;
  max-width: 16.5rem;
  aspect-ratio: 393 / 800;
  isolation: isolate;
}

.phone-body {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  border: 0.32rem solid var(--ink);
  border-radius: 15% / 7.4%;
  background: var(--ink);
  box-shadow: 0 1.6rem 3.4rem rgb(var(--mauve-rgb) / 0.24);
}

.phone-notch {
  position: absolute;
  z-index: 3;
  top: 2.6%;
  left: 50%;
  width: 34%;
  height: 3.4%;
  border-radius: 999px;
  background: var(--ink);
  transform: translateX(-50%);
}

.phone-button {
  position: absolute;
  top: 26%;
  right: -0.55rem;
  width: 0.18rem;
  height: 9%;
  border-radius: 999px;
  background: var(--ink);
}

.phone-screen {
  position: absolute;
  inset: 3.2% 4.6%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12.5% / 6.2%;
  background: var(--paper);
  color: var(--ink);
  padding: 9% 8.4% 8%;
  font-size: clamp(0.5rem, 1.25vw, 0.72rem);
}

.phone-shadow {
  position: absolute;
  right: 8%;
  bottom: -1.4rem;
  left: 8%;
  z-index: -1;
  height: 1.6rem;
  border-radius: 50%;
  background: rgb(var(--mauve-rgb) / 0.32);
  filter: blur(1.1rem);
}

.status-row {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 3%;
  color: rgb(var(--violet-deep-rgb, 91 63 217) / 0.9);
  font-family: "Geologica", sans-serif;
  font-size: 0.76em;
  font-weight: 650;
}

.status-icons {
  display: flex;
  align-items: end;
  gap: 0.18rem;
  height: 0.8em;
}

.status-icons i {
  display: block;
  width: 0.23rem;
  border-radius: 999px;
  background: currentColor;
}

.status-icons i:nth-child(1) {
  height: 35%;
}

.status-icons i:nth-child(2) {
  height: 65%;
}

.status-icons i:nth-child(3) {
  height: 100%;
}

.screen-heading {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 11%;
}

.screen-heading > div {
  display: grid;
  gap: 0.34rem;
}

.screen-eyebrow {
  color: var(--ink-soft);
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.screen-heading strong {
  max-width: 10rem;
  font-family: "Geologica", sans-serif;
  font-size: 1.36em;
  font-weight: 590;
  letter-spacing: -0.09em;
  line-height: 0.95;
}

.screen-symbol {
  display: grid;
  flex: 0 0 auto;
  width: 2.15em;
  height: 2.15em;
  place-items: center;
  border-radius: 50%;
  background: var(--orange);
  color: var(--ink);
  font-family: "Geologica", sans-serif;
  font-size: 1.2em;
  font-weight: 800;
}

.problem-screen-message {
  display: grid;
  gap: 0.35rem;
  margin-top: 14%;
  font-family: "Geologica", sans-serif;
  font-size: 1.55em;
  letter-spacing: -0.1em;
  line-height: 0.92;
}

.problem-screen-message span {
  color: var(--orange-display);
}

.problem-screen-message strong {
  font: inherit;
}

.problem-notification-stack {
  display: grid;
  gap: 0.65rem;
  margin-top: auto;
}

.problem-notification {
  display: grid;
  gap: 0.2rem;
  padding: 0.7rem 0.75rem;
  border-radius: 0.9rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.16);
  background: var(--card);
  color: var(--ink);
  transform: rotate(-1.6deg);
}

.problem-notification:nth-child(2) {
  transform: rotate(1.6deg);
}

.problem-notification.alt {
  background: rgb(var(--orange-rgb) / 0.14);
}

.problem-notification.muted {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
  transform: rotate(-1deg);
}

.problem-notification span {
  color: var(--ink-soft);
  font-size: 0.66em;
  font-weight: 720;
  text-transform: uppercase;
}

.problem-notification.muted span {
  color: rgb(var(--paper-rgb) / 0.66);
}

.problem-notification strong {
  font-family: "Geologica", sans-serif;
  font-size: 0.9em;
  font-weight: 590;
  letter-spacing: -0.06em;
  line-height: 1;
}

@media (max-width: 600px) {
  .phone-screen {
    font-size: clamp(0.58rem, 2.6vw, 0.75rem);
  }
}
</style>

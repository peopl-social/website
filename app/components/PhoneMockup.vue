<script setup lang="ts">
type PhoneVariant = 'home' | 'circle' | 'plan' | 'recap'

const props = withDefaults(
  defineProps<{
    variant?: PhoneVariant
    label?: string
    compact?: boolean
  }>(),
  {
    variant: 'home',
    label: 'peopl. app preview',
    compact: false,
  },
)

const mockupSource = 'https://www.webmobilefirst.com/img/mockups/mockup-apple-iphone-16-2024-transparent.png'
</script>

<template>
  <div
    class="phone-mockup"
    :class="{ 'is-compact': props.compact }"
    role="img"
    :aria-label="props.label"
  >
    <div class="phone-shadow" aria-hidden="true" />

    <div class="phone-screen" aria-hidden="true">
      <Transition name="screen-swap" mode="out-in">
        <div :key="props.variant" class="phone-screen-content">
      <div class="status-row">
        <span>9:41</span>
        <span class="status-icons"><i /><i /><i /></span>
      </div>

      <template v-if="props.variant === 'home'">
        <div class="screen-heading">
          <div>
            <span class="screen-eyebrow">Saturday, 09:41</span>
            <strong>Good morning, Mia</strong>
          </div>
          <span class="screen-avatar">m</span>
        </div>

        <div class="home-message">
          <span>make a little room</span>
          <strong>for the good stuff.</strong>
        </div>

        <div class="home-pulse" aria-hidden="true">
          <span class="pulse-ring" />
          <span class="pulse-ring pulse-ring-two" />
        </div>

        <div class="home-card">
          <div class="card-overline"><span>your people</span><span>07 close</span></div>
          <div class="card-row">
            <div class="avatar-stack">
              <span class="mini-avatar avatar-a">A</span>
              <span class="mini-avatar avatar-b">J</span>
              <span class="mini-avatar avatar-c">R</span>
              <span class="mini-avatar avatar-d">+</span>
            </div>
          </div>
        </div>

        <div class="home-list">
          <div class="list-item"><span>thursday dinner?</span><small>3</small></div>
          <div class="list-item"><span>new voice note</span><small>now</small></div>
        </div>
      </template>

      <template v-else-if="props.variant === 'circle'">
        <div class="screen-heading">
          <div>
            <span class="screen-eyebrow">the circle</span>
            <strong>who’s around?</strong>
          </div>
          <span class="screen-symbol">⌁</span>
        </div>

        <div class="circle-map">
          <span class="map-line map-line-one" />
          <span class="map-line map-line-two" />
          <span class="map-orb orb-one">A</span>
          <span class="map-orb orb-two">J</span>
          <span class="map-orb orb-three">R</span>
          <span class="map-orb orb-four">S</span>
          <span class="map-me">you</span>
        </div>

        <div class="circle-status">
          <div class="card-overline"><span>nearby now</span></div>
          <div class="circle-status-copy"><strong>4 people</strong><span>within your little orbit</span></div>
          <div class="status-avatars"><span class="status-avatar avatar-a">A</span><span class="status-avatar avatar-b">J</span><span class="status-avatar avatar-c">R</span><span class="status-avatar avatar-d">S</span></div>
        </div>
      </template>

      <template v-else-if="props.variant === 'plan'">
        <div class="screen-heading light-heading">
          <div>
            <span class="screen-eyebrow">small plans</span>
            <strong>make it happen</strong>
          </div>
          <span class="screen-symbol">＋</span>
        </div>

        <div class="plan-date">
          <span>THU</span>
          <strong>18</strong>
          <span>SEP</span>
        </div>

        <div class="plan-card plan-card-primary">
          <div class="plan-card-head"><span>6:30 PM</span><span class="plan-tag">open</span></div>
          <strong>sunset walk + something cold</strong>
          <div class="plan-card-foot"><span class="plan-face face-one">M</span><span class="plan-face face-two">J</span><span>+ 2 maybes</span></div>
        </div>

        <div class="plan-card plan-card-secondary">
          <div class="plan-card-head"><span>tomorrow</span></div>
          <strong>send the voice note</strong>
        </div>
      </template>

      <template v-else>
        <div class="screen-heading">
          <div>
            <span class="screen-eyebrow">a little recap</span>
            <strong>last weekend</strong>
          </div>
          <span class="screen-symbol">✦</span>
        </div>

        <div class="recap-intro"><strong>the ones worth<br />remembering.</strong><span>12 moments · 3 people</span></div>

        <div class="recap-grid">
          <div class="recap-photo recap-photo-one" />
          <div class="recap-photo recap-photo-two" />
          <div class="recap-photo recap-photo-three" />
          <div class="recap-photo recap-photo-four" />
        </div>

        <div class="recap-footer"><span>made with your people</span><span>♡</span></div>
      </template>
        </div>
      </Transition>
    </div>

    <!-- Transparent frame sourced from Mobile FIRST: https://www.webmobilefirst.com/en/mockups/apple-iphone-16-2024/ -->
    <img class="phone-frame" :src="mockupSource" alt="" aria-hidden="true" />
  </div>
</template>

<style scoped>
.phone-mockup {
  position: relative;
  width: 100%;
  aspect-ratio: 393 / 800;
  isolation: isolate;
}

.phone-shadow {
  position: absolute;
  right: 9%;
  bottom: 2%;
  left: 9%;
  z-index: -1;
  height: 8%;
  border-radius: 50%;
  background: rgb(var(--mauve-rgb) / 0.3);
  filter: blur(1.3rem);
  transform: translateY(1.4rem) scaleX(0.88);
}

.phone-screen {
  position: absolute;
  z-index: 1;
  top: 2.8%;
  right: 6.7%;
  bottom: 2.8%;
  left: 6.7%;
  overflow: hidden;
  border-radius: 11.5% / 5.7%;
  background: var(--paper);
  color: var(--ink);
}

.phone-screen-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 8.5% 8.4% 7.5%;
  font-size: clamp(0.52rem, 1.3vw, 0.74rem);
}

.screen-swap-enter-active,
.screen-swap-leave-active {
  transition: opacity 420ms var(--ease-out), transform 520ms var(--ease-out);
}

.screen-swap-enter-from {
  opacity: 0;
  transform: translateY(0.45rem);
}

.screen-swap-leave-to {
  opacity: 0;
  transform: translateY(-0.45rem);
}

.phone-frame {
  position: absolute;
  z-index: 3;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.status-row {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1%;
  color: rgb(var(--violet-rgb) / 0.72);
  font-family: 'Geologica', sans-serif;
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
  margin-top: 13%;
}

.screen-heading > div {
  display: grid;
  gap: 0.34rem;
}

.screen-eyebrow {
  color: rgb(var(--violet-rgb) / 0.48);
  font-size: 0.82em;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.screen-heading strong {
  max-width: 10rem;
  font-family: 'Geologica', sans-serif;
  font-size: 1.36em;
  font-weight: 590;
  letter-spacing: -0.09em;
  line-height: 0.95;
}

.screen-avatar,
.screen-symbol {
  display: grid;
  width: 2.15em;
  height: 2.15em;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: var(--green);
  color: var(--ink);
  font-family: 'Geologica', sans-serif;
  font-size: 1.1em;
  font-weight: 700;
}

.screen-symbol {
  background: var(--violet);
  color: var(--paper);
  font-size: 1.3em;
}

.home-message {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 0.15rem;
  margin-top: 20%;
  font-family: 'Geologica', sans-serif;
  font-size: 2.08em;
  font-weight: 580;
  letter-spacing: -0.11em;
  line-height: 0.9;
}

.home-message span {
  color: var(--violet);
}

.home-message strong {
  max-width: 8ch;
  font: inherit;
}

.home-pulse {
  position: absolute;
  top: 36%;
  right: -13%;
  width: 72%;
  aspect-ratio: 1;
  border: 1px solid rgb(var(--violet-rgb) / 0.3);
  border-radius: 50%;
  transform: rotate(-18deg);
}

.pulse-ring {
  position: absolute;
  inset: 12%;
  border: 1px solid rgb(var(--orange-rgb) / 0.55);
  border-radius: 50%;
}

.pulse-ring-two {
  inset: 26%;
  border-color: rgb(var(--green-rgb) / 0.65);
}

.home-card,
.circle-status {
  position: relative;
  z-index: 2;
  padding: 1em;
  margin-top: auto;
  border-radius: 1.15em;
  background: rgb(var(--paper-rgb) / 0.82);
  box-shadow: 0 0.9rem 2rem rgb(var(--mauve-rgb) / 0.12);
}

.card-overline,
.plan-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  color: rgb(var(--violet-rgb) / 0.48);
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1.1em;
}

.avatar-stack,
.status-avatars {
  display: flex;
  align-items: center;
  padding-left: 0.5em;
}

.mini-avatar,
.status-avatar,
.plan-face {
  display: grid;
  width: 2.55em;
  height: 2.55em;
  margin-left: -0.5em;
  place-items: center;
  border: 2px solid rgb(var(--paper-rgb) / 0.92);
  border-radius: 50%;
  color: var(--ink);
  font-size: 0.7em;
  font-weight: 750;
}

.avatar-a,
.face-one {
  background: rgb(var(--orange-rgb) / 0.34);
}

.avatar-b,
.face-two {
  background: rgb(var(--violet-rgb) / 0.34);
}

.avatar-c {
  background: rgb(var(--green-rgb) / 0.34);
}

.avatar-d {
  background: rgb(var(--green-rgb) / 0.52);
}

.home-list {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 0.65em;
  margin-top: 1em;
}

.list-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.55em;
  align-items: center;
  color: rgb(var(--violet-rgb) / 0.76);
  font-size: 0.78em;
}

.list-item small {
  color: rgb(var(--violet-rgb) / 0.42);
  font-size: 0.8em;
}

.circle-map {
  position: relative;
  flex: 1;
  min-height: 12rem;
  margin-top: 14%;
  overflow: hidden;
  border-radius: 1.25em;
  background: rgb(var(--mauve-rgb) / 0.18);
}

.map-line {
  position: absolute;
  display: block;
  height: 1px;
  background: rgb(var(--mauve-rgb) / 0.15);
  transform: rotate(37deg);
}

.map-line-one {
  top: 34%;
  right: -10%;
  left: -10%;
}

.map-line-two {
  top: 61%;
  right: -15%;
  left: 6%;
  transform: rotate(-21deg);
}

.map-orb,
.map-me {
  position: absolute;
  display: grid;
  width: 2.25em;
  height: 2.25em;
  place-items: center;
  border: 2px solid var(--paper);
  border-radius: 50%;
  color: var(--ink);
  font-size: 0.7em;
  font-weight: 750;
  box-shadow: 0 0.4rem 0.9rem rgb(var(--mauve-rgb) / 0.1);
}

.orb-one {
  top: 18%;
  left: 24%;
  background: rgb(var(--orange-rgb) / 0.34);
}

.orb-two {
  top: 26%;
  right: 19%;
  background: rgb(var(--violet-rgb) / 0.34);
}

.orb-three {
  bottom: 21%;
  left: 35%;
  background: rgb(var(--green-rgb) / 0.34);
}

.orb-four {
  right: 28%;
  bottom: 14%;
  background: rgb(var(--green-rgb) / 0.52);
}

.map-me {
  top: 49%;
  left: 49%;
  width: 3.1em;
  height: 3.1em;
  border: 0.4em solid rgb(var(--violet-rgb) / 0.24);
  background: var(--violet);
  color: var(--paper);
  transform: translate(-50%, -50%);
}

.circle-status {
  margin-top: 1.15em;
  background: var(--paper);
}

.circle-status-copy {
  display: grid;
  gap: 0.16em;
  margin-top: 0.9em;
}

.circle-status-copy strong {
  font-family: 'Geologica', sans-serif;
  font-size: 1.35em;
  letter-spacing: -0.09em;
}

.circle-status-copy span {
  color: rgb(var(--violet-rgb) / 0.55);
  font-size: 0.78em;
}

.status-avatars {
  margin-top: 1em;
}

.plan-date {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.8em;
  align-items: center;
  margin-top: 18%;
  color: rgb(var(--paper-rgb) / 0.65);
  font-size: 0.75em;
  font-weight: 650;
  letter-spacing: 0.12em;
}

.plan-date strong {
  justify-self: center;
  color: var(--green);
  font-family: 'Geologica', sans-serif;
  font-size: 4em;
  font-weight: 570;
  letter-spacing: -0.12em;
  line-height: 0.8;
}

.plan-card {
  display: grid;
  gap: 0.85em;
  padding: 1.05em;
  margin-top: 1.25em;
  border-radius: 1.15em;
  background: var(--paper);
  color: var(--ink);
}

.plan-card strong {
  max-width: 11ch;
  font-family: 'Geologica', sans-serif;
  font-size: 1.36em;
  font-weight: 580;
  letter-spacing: -0.09em;
  line-height: 0.95;
}

.plan-tag {
  color: var(--violet);
}

.plan-card-foot {
  display: flex;
  align-items: center;
  gap: 0.25em;
  color: rgb(var(--violet-rgb) / 0.54);
  font-size: 0.73em;
}

.plan-face {
  width: 1.7em;
  height: 1.7em;
  margin-left: -0.35em;
  font-size: 0.75em;
}

.plan-card-secondary {
  margin-top: 0.65em;
  background: rgb(var(--paper-rgb) / 0.16);
  color: var(--paper);
}

.plan-card-secondary .plan-card-head {
  color: rgb(var(--paper-rgb) / 0.62);
}

.plan-card-secondary strong {
  font-size: 1.05em;
}

.recap-intro {
  display: grid;
  gap: 0.7em;
  margin-top: 18%;
  color: var(--ink);
}

.recap-intro strong {
  font-family: 'Geologica', sans-serif;
  font-size: 2em;
  font-weight: 580;
  letter-spacing: -0.11em;
  line-height: 0.9;
}

.recap-intro span {
  color: rgb(var(--violet-rgb) / 0.55);
  font-size: 0.78em;
}

.recap-grid {
  display: grid;
  grid-template-columns: 1.18fr 0.82fr;
  gap: 0.55em;
  margin-top: 1.25em;
}

.recap-photo {
  min-height: 6.2rem;
  border-radius: 0.9em;
  background-color: rgb(var(--violet-rgb) / 0.34);
  background-size: cover;
  background-position: center;
}

.recap-photo-one {
  grid-row: span 2;
  background-image: url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80');
}

.recap-photo-two {
  background-image: url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80');
}

.recap-photo-three {
  background-image: url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400&q=80');
}

.recap-photo-four {
  display: none;
}

.recap-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  color: rgb(var(--violet-rgb) / 0.56);
  font-size: 0.72em;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .phone-screen-content {
    font-size: clamp(0.58rem, 2.6vw, 0.75rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .phone-mockup * {
    transition-duration: 0.001ms !important;
  }
}
</style>

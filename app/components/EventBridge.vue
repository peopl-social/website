<script setup lang="ts">
import { ref } from "vue";

const joined = ref(false);
</script>

<template>
  <div class="bridge" aria-label="Co-attendee demo">
    <div class="bridge-event">
      <div class="bridge-date" aria-hidden="true">
        <span>SAT</span>
        <strong>14</strong>
      </div>
      <div class="bridge-info">
        <p class="bridge-kicker">pottery workshop · 11 AM · kiln house</p>
        <h4>hand-build + glaze, all levels</h4>
        <p class="bridge-pair">
          <span class="pair-avatars" aria-hidden="true"><i>A</i><i>T</i></span>
          Ana + Theo · both going → <strong>co-attendees</strong>
        </p>
      </div>
      <button
        class="bridge-join"
        :class="{ 'is-joined': joined }"
        type="button"
        :aria-pressed="joined"
        @click="joined = !joined"
      >
        {{ joined ? "Paired ✓" : "Join together" }}
      </button>
    </div>

    <div class="bridge-thread" aria-label="Temporary event thread">
      <p class="bridge-thread-title">temporary thread · only about this event</p>
      <p class="message-bubble is-incoming">in for 11? i can bring aprons</p>
      <p class="message-bubble is-outgoing">yes — meeting at north gate, tram 4?</p>
      <p class="bridge-expiry">disappears 24h after the workshop · tickets: 2/2 ✓</p>
    </div>
  </div>
</template>

<style scoped>
.bridge {
  display: grid;
  gap: 0.9rem;
  width: min(100%, 27rem);
  justify-self: center;
}
.bridge-event {
  display: grid;
  gap: 0.8rem;
  padding: 1.1rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.2);
  border-radius: 1.7rem;
  background: var(--card);
  box-shadow: 0 1.1rem 2.6rem rgb(var(--mauve-rgb) / 0.13);
  color: var(--ink);
}
.bridge-date {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-family: "Geologica", sans-serif;
}
.bridge-date span {
  font-size: 0.68rem;
  font-weight: 740;
  letter-spacing: 0.12em;
  color: var(--orange-deep);
}
.bridge-date strong {
  font-size: 1.6rem;
  letter-spacing: -0.06em;
}
.bridge-kicker {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.7rem;
  font-weight: 720;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.bridge-info h4 {
  margin: 0.3rem 0 0;
  font-family: "Geologica", sans-serif;
  font-size: 1.25rem;
  letter-spacing: -0.05em;
}
.bridge-pair {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0.7rem 0 0;
  font-size: 0.85rem;
}
.pair-avatars {
  display: inline-flex;
}
.pair-avatars i {
  display: grid;
  width: 1.6rem;
  height: 1.6rem;
  place-items: center;
  margin-left: -0.4rem;
  border: 0.12rem solid var(--card);
  border-radius: 50%;
  font-style: normal;
  font-size: 0.65rem;
  font-weight: 800;
}
.pair-avatars i:first-child {
  margin-left: 0;
  background: var(--orange);
}
.pair-avatars i:last-child {
  background: var(--violet);
  color: var(--paper);
}
.bridge-join {
  min-height: 2.5rem;
  border: 0.13rem solid var(--ink);
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}
.bridge-join.is-joined {
  background: var(--green);
  color: var(--ink);
  border-color: var(--ink);
}
.bridge-thread {
  padding: 1rem 1.1rem;
  border-radius: 1.4rem;
  border: 1px dashed rgb(var(--mauve-rgb) / 0.3);
  background: rgb(var(--violet-rgb) / 0.08);
}
.bridge-thread-title {
  margin: 0 0 0.6rem;
  font-size: 0.66rem;
  font-weight: 740;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--violet-ink);
}
.message-bubble {
  width: fit-content;
  max-width: 94%;
  margin: 0;
  padding: 0.55rem 0.8rem;
  border-radius: 1.05rem;
  font-size: 0.85rem;
  font-weight: 620;
}
.message-bubble.is-incoming {
  border: 1px solid rgb(var(--mauve-rgb) / 0.22);
  border-bottom-left-radius: 0.3rem;
  background: var(--card);
}
.message-bubble.is-outgoing {
  margin-top: 0.45rem;
  margin-left: auto;
  border-bottom-right-radius: 0.3rem;
  background: rgb(var(--violet-rgb) / 0.2);
  border: 1px solid rgb(var(--violet-rgb) / 0.4);
}
.bridge-expiry {
  margin: 0.7rem 0 0;
  color: var(--ink-soft);
  font-size: 0.75rem;
  font-style: italic;
  text-align: center;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import LIcon from "./LIcon.vue";

const profiles = [
  { name: "Ana", initial: "A", color: "orange", detail: "life drawing · sourdough · slow Sundays" },
  { name: "Theo", initial: "T", color: "violet", detail: "pottery · film screenings · bike rides" },
  { name: "June", initial: "J", color: "green", detail: "kombucha brewing · gallery openings" },
];

const reviewed = ref(3);
const total = 10;

const remaining = computed(() => total - reviewed.value);
const progress = computed(() => `${reviewed.value} of ${total} reviewed`);

const markReviewed = () => {
  if (reviewed.value < total) reviewed.value += 1;
};

const resetDemo = () => {
  reviewed.value = 3;
};
</script>

<template>
  <div class="deck" aria-label="Weekly deck demo">
    <div class="deck-top">
      <span class="deck-kicker">weekly deck · 10 profiles</span>
      <span class="deck-lock">locks Sunday</span>
    </div>

    <ul class="deck-grid">
      <li
        v-for="(profile, index) in profiles"
        :key="profile.name"
        class="deck-card"
        :class="[`is-${profile.color}`, { 'is-done': index < reviewed }]"
      >
        <span class="deck-avatar" aria-hidden="true">{{ profile.initial }}</span>
        <span class="deck-meta">
          <strong>{{ profile.name }}</strong>
          <small>{{ profile.detail }}</small>
        </span>
        <span class="deck-state"
          ><LIcon v-if="index < reviewed" name="check" />{{
            index < reviewed ? "read" : "to read"
          }}</span
        >
      </li>
      <li v-for="n in 7" :key="`locked-${n}`" class="deck-card is-locked" aria-hidden="true">
        <span class="deck-avatar">·</span>
        <span class="deck-meta">
          <strong>profile {{ n + 3 }}</strong>
          <small>unlocks as you read</small>
        </span>
      </li>
    </ul>

    <div class="deck-foot">
      <div
        class="deck-progress"
        role="progressbar"
        :aria-valuenow="reviewed"
        aria-valuemin="0"
        :aria-valuemax="total"
        :aria-label="progress"
      >
        <span class="deck-progress-fill" :style="{ width: `${(reviewed / total) * 100}%` }" />
      </div>
      <p class="deck-caption">{{ progress }} · {{ remaining }} left before the deck locks</p>
      <div class="deck-actions">
        <button class="deck-btn" type="button" @click="markReviewed" :disabled="reviewed >= total">
          {{ reviewed >= total ? "Deck complete — see you next week" : "Mark one as read" }}
        </button>
        <button v-if="reviewed > 3" class="deck-reset" type="button" @click="resetDemo">
          reset demo
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deck {
  width: min(100%, 27rem);
  justify-self: center;
  padding: 1.1rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.2);
  border-radius: 1.7rem;
  background: var(--card);
  box-shadow: 0 1.1rem 2.6rem rgb(var(--mauve-rgb) / 0.13);
  color: var(--ink);
}
.deck-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
}
.deck-kicker {
  font-size: 0.64rem;
  font-weight: 740;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.deck-lock {
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.68rem;
  font-weight: 700;
}
.deck-grid {
  display: grid;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}
.deck-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.2);
  border-radius: 1.1rem;
  background: var(--paper);
}
.deck-card.is-locked {
  opacity: 0.55;
  border-style: dashed;
}
.deck-avatar {
  display: grid;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 50%;
  font-family: "Geologica", sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  background: rgb(var(--mauve-rgb) / 0.14);
}
.is-orange .deck-avatar {
  background: var(--orange);
}
.is-violet .deck-avatar {
  background: var(--violet);
  color: var(--paper);
}
.is-green .deck-avatar {
  background: var(--green);
}
.deck-meta {
  display: grid;
  min-width: 0;
  flex: 1;
}
.deck-meta strong {
  font-size: 0.86rem;
  font-weight: 700;
}
.deck-meta small {
  overflow: hidden;
  color: var(--ink-soft);
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.deck-state {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  flex: 0 0 auto;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--green-deep);
}
.is-locked .deck-state {
  display: none;
}
.deck-foot {
  margin-top: 1rem;
}
.deck-progress {
  height: 0.55rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(var(--mauve-rgb) / 0.16);
}
.deck-progress-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--orange);
  transition: width 500ms var(--ease-out);
}
.deck-caption {
  margin: 0.6rem 0 0;
  color: var(--ink-soft);
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}
.deck-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 0.8rem;
}
.deck-btn {
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border: 0.13rem solid var(--ink);
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}
.deck-btn:disabled {
  opacity: 0.7;
  cursor: default;
}
.deck-reset {
  background: transparent;
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
</style>

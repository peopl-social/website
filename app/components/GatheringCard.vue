<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "sm" | "lg";
  }>(),
  {
    size: "sm",
  },
);

const isJoined = ref(false);
const goingCount = computed(() => (isJoined.value ? 5 : 4));

const attendants = ["M", "J", "R"];
</script>

<template>
  <article class="gathering-card" :class="`is-${props.size}`">
    <div class="gathering-date" aria-hidden="true">
      <span class="gathering-month">SEP</span>
      <strong class="gathering-day">18</strong>
      <span class="gathering-weekday">THU</span>
    </div>

    <div class="gathering-body">
      <div class="gathering-topline">
        <span class="gathering-when">6:30 PM</span>
        <span class="gathering-place">river gate</span>
      </div>
      <h4 class="gathering-title">sunset walk + something cold</h4>

      <div class="gathering-foot">
        <span class="gathering-people" aria-label="Who is going">
          <span
            v-for="person in attendants"
            :key="person"
            class="gathering-avatar"
            aria-hidden="true"
            >{{ person }}</span
          >
          <span class="gathering-avatar is-more" aria-hidden="true">+{{ goingCount - 3 }}</span>
          <span class="gathering-count"
            >{{ goingCount }} going{{ isJoined ? " — you too" : "" }}</span
          >
        </span>

        <button
          class="gathering-join"
          :class="{ 'is-joined': isJoined }"
          type="button"
          :aria-pressed="isJoined"
          @click="isJoined = !isJoined"
        >
          {{ isJoined ? "You’re in" : "Join" }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.gathering-card {
  display: flex;
  gap: 0.9rem;
  padding: 1rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.18);
  border-radius: 1.35rem;
  background: var(--card);
  box-shadow: 0 1.1rem 2.6rem rgb(var(--mauve-rgb) / 0.13);
  color: var(--ink);
}

.gathering-date {
  display: grid;
  flex: 0 0 auto;
  width: 3.1rem;
  align-content: center;
  justify-items: center;
  gap: 0.05rem;
  padding: 0.55rem 0.3rem;
  border-radius: 1rem;
  background: var(--orange);
  color: var(--ink);
  font-family: "Geologica", sans-serif;
}

.gathering-month,
.gathering-weekday {
  font-size: 0.6rem;
  font-weight: 720;
  letter-spacing: 0.1em;
}

.gathering-day {
  font-size: 1.45rem;
  font-weight: 640;
  letter-spacing: -0.06em;
  line-height: 0.9;
}

.gathering-body {
  display: grid;
  min-width: 0;
  flex: 1;
  align-content: space-between;
  gap: 0.55rem;
}

.gathering-topline {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  color: var(--ink-soft);
  font-size: 0.72rem;
  font-weight: 680;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.gathering-when {
  color: var(--ink);
}

.gathering-title {
  margin: 0;
  font-family: "Geologica", sans-serif;
  font-size: 1.14rem;
  font-weight: 580;
  letter-spacing: -0.06em;
  line-height: 1.05;
  text-wrap: balance;
}

.gathering-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.gathering-people {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.gathering-avatar {
  display: grid;
  width: 1.55rem;
  height: 1.55rem;
  place-items: center;
  margin-left: -0.4rem;
  border: 0.13rem solid var(--card);
  border-radius: 50%;
  background: rgb(var(--violet-rgb) / 0.28);
  box-shadow: 0 0 0 1px rgb(var(--mauve-rgb) / 0.18);
  font-family: "Geologica", sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
}

.gathering-avatar:first-child {
  margin-left: 0;
  background: rgb(var(--orange-rgb) / 0.4);
}

.gathering-avatar:nth-child(2) {
  background: rgb(var(--green-rgb) / 0.42);
}

.gathering-avatar.is-more {
  background: var(--ink);
  color: var(--paper);
}

.gathering-count {
  color: var(--ink-soft);
  font-size: 0.72rem;
  font-weight: 620;
  white-space: nowrap;
}

.gathering-join {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.35rem;
  padding: 0.4rem 0.95rem;
  border: 0.13rem solid var(--ink);
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    background-color 400ms var(--ease-out),
    color 400ms var(--ease-out),
    transform 400ms var(--ease-spring);
}

.gathering-join:hover {
  background: var(--orange);
  color: var(--ink);
  transform: translateY(-0.12rem);
}

.gathering-join:active {
  transform: translateY(0.05rem) scale(0.97);
}

.gathering-join.is-joined {
  background: var(--card);
  color: var(--ink);
}

.gathering-card.is-lg {
  gap: 1.1rem;
  padding: clamp(1.15rem, 2.4vw, 1.6rem);
  border-radius: 1.7rem;
}

.gathering-card.is-lg .gathering-date {
  width: 3.8rem;
  padding: 0.8rem 0.4rem;
  border-radius: 1.2rem;
}

.gathering-card.is-lg .gathering-day {
  font-size: 1.85rem;
}

.gathering-card.is-lg .gathering-title {
  font-size: clamp(1.35rem, 2.6vw, 1.75rem);
}

.gathering-card.is-lg .gathering-avatar {
  width: 1.85rem;
  height: 1.85rem;
  font-size: 0.66rem;
}
</style>

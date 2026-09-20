<script lang="ts">
export type BoardFriend = {
  name: string;
  initial: string;
  color: "orange" | "violet" | "green";
  status: string;
  note: string;
  voice: string;
  voiceNote: string;
  stickers: string[];
  updated: string;
  visibility: string;
};
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    friend: BoardFriend;
    size?: "sm" | "lg";
  }>(),
  {
    size: "sm",
  },
);
</script>

<template>
  <article class="board-card" :class="`is-${props.size}`">
    <header class="board-top">
      <span class="board-owner">
        <span class="board-avatar" :class="`is-${props.friend.color}`" aria-hidden="true">{{
          props.friend.initial
        }}</span>
        <span class="board-owner-name">{{ props.friend.name }}&rsquo;s board</span>
      </span>
      <span class="board-visibility">{{ props.friend.visibility }}</span>
    </header>

    <p class="board-note">{{ props.friend.note }}</p>

    <p class="board-voice">
      <span class="voice-play" aria-hidden="true" />
      <span class="voice-label">{{ props.friend.voiceNote }}</span>
      <span class="voice-time">{{ props.friend.voice }}</span>
    </p>

    <div class="board-stickers" aria-hidden="true">
      <span v-for="sticker in props.friend.stickers" :key="sticker" class="board-sticker">{{
        sticker
      }}</span>
    </div>

    <footer class="board-foot">
      <span>no feed &middot; boards only</span>
      <span>{{ props.friend.updated }}</span>
    </footer>
  </article>
</template>

<style scoped>
.board-card {
  display: grid;
  gap: 0.85rem;
  padding: 1.05rem 1.1rem 0.95rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.18);
  border-radius: 1.35rem;
  background: var(--card);
  box-shadow: 0 1.1rem 2.6rem rgb(var(--mauve-rgb) / 0.13);
  color: var(--ink);
}

.board-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.board-owner {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
}

.board-avatar {
  display: grid;
  flex: 0 0 auto;
  width: 1.9rem;
  height: 1.9rem;
  place-items: center;
  border: 0.14rem solid var(--card);
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgb(var(--mauve-rgb) / 0.2);
  font-family: "Geologica", sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
}

.board-avatar.is-orange {
  background: var(--orange);
}

.board-avatar.is-violet {
  background: var(--violet);
  color: var(--paper);
}

.board-avatar.is-green {
  background: var(--green);
}

.board-owner-name {
  overflow: hidden;
  font-size: 0.82rem;
  font-weight: 680;
  letter-spacing: -0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.board-visibility {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.55rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.24);
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.64rem;
  font-weight: 680;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.board-visibility::before {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--violet);
  content: "";
}

.board-note {
  margin: 0;
  font-family: "Geologica", sans-serif;
  font-size: 1.12rem;
  font-weight: 560;
  letter-spacing: -0.05em;
  line-height: 1.16;
  text-wrap: balance;
}

.board-voice {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: fit-content;
  max-width: 100%;
  margin: 0;
  padding: 0.45rem 0.7rem 0.45rem 0.55rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.18);
  border-radius: 999px;
  background: rgb(var(--mauve-rgb) / 0.07);
  font-size: 0.74rem;
}

.voice-play {
  width: 0;
  height: 0;
  flex: 0 0 auto;
  border-top: 0.32rem solid transparent;
  border-bottom: 0.32rem solid transparent;
  border-left: 0.5rem solid var(--ink);
}

.voice-label {
  overflow: hidden;
  color: var(--ink);
  font-weight: 620;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.voice-time {
  flex: 0 0 auto;
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
}

.board-stickers {
  display: flex;
  gap: 0.55rem;
}

.board-sticker {
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border: 0.13rem solid var(--ink);
  border-radius: 0.72rem;
  background: var(--paper);
  font-size: 1.05rem;
  font-weight: 800;
  box-shadow: 0.18rem 0.22rem 0 rgb(var(--mauve-rgb) / 0.24);
  transition: transform 450ms var(--ease-spring);
}

.board-card:hover .board-sticker:nth-child(1) {
  transform: rotate(-9deg);
}

.board-card:hover .board-sticker:nth-child(2) {
  transform: rotate(7deg) translateY(-0.16rem);
}

.board-card:hover .board-sticker:nth-child(3) {
  transform: rotate(11deg);
}

.board-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.7rem;
  border-top: 1px dashed rgb(var(--mauve-rgb) / 0.24);
  color: var(--ink-soft);
  font-size: 0.66rem;
  font-weight: 640;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.board-card.is-lg {
  gap: 1.05rem;
  padding: clamp(1.3rem, 3vw, 1.9rem);
  border-radius: 1.7rem;
}

.board-card.is-lg .board-note {
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
}

.board-card.is-lg .board-sticker {
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 0.9rem;
  font-size: 1.3rem;
}

.board-card.is-lg .board-voice {
  font-size: 0.84rem;
}

.board-card.is-lg .board-owner-name,
.board-card.is-lg .board-visibility {
  font-size: 0.72rem;
}

@media (prefers-reduced-motion: reduce) {
  .board-sticker {
    transition: none;
  }
}
</style>

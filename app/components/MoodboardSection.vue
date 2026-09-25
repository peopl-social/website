<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import BuddyScene from "./BuddyScene.vue";
import { pickReloadVariant } from "../utils/reloadVariant";

type StickerMood = "happy" | "sad" | "hype" | "soft" | "sport" | "chill";
type MoodSticker = {
  icon: string;
  label: string;
  mood: StickerMood;
  profileLine: string;
  comment: string;
  color: string;
};

const stickers: MoodSticker[] = [
  {
    icon: "💔",
    label: "heartbreak",
    mood: "sad",
    profileLine: "protecting the tender parts",
    comment: "Oh no. We are bringing soup energy.",
    color: "#ff6b83",
  },
  {
    icon: "⚽",
    label: "soccer",
    mood: "sport",
    profileLine: "free for a kickabout",
    comment: "Boots on. The board just got grass stains.",
    color: "#b8df7c",
  },
  {
    icon: "💖",
    label: "soft crush",
    mood: "soft",
    profileLine: "quietly glowing",
    comment: "Tiny sparkle detected. We are being normal about it.",
    color: "#f29aa8",
  },
  {
    icon: "🔥",
    label: "big energy",
    mood: "hype",
    profileLine: "outside mode unlocked",
    comment: "Okay, main-character weather just arrived.",
    color: "#ff6048",
  },
  {
    icon: "🎧",
    label: "headphones",
    mood: "chill",
    profileLine: "in a private playlist",
    comment: "Volume low, feelings high. Respect.",
    color: "#72c8d1",
  },
  {
    icon: "⭐",
    label: "good day",
    mood: "happy",
    profileLine: "collecting small wins",
    comment: "Look at that. The profile is smiling back.",
    color: "#ffd23f",
  },
  {
    icon: "🍕",
    label: "pizza plan",
    mood: "happy",
    profileLine: "accepting dinner theories",
    comment: "This is not a sticker, this is a strategy.",
    color: "#e7a83b",
  },
  {
    icon: "🌧️",
    label: "rainy",
    mood: "sad",
    profileLine: "under a small weather system",
    comment: "We saw the cloud. Soft blanket protocol.",
    color: "#9ebbd0",
  },
];

const activeSticker = ref(stickers[0]!);

const profileTags = computed(() => {
  const selected = activeSticker.value;
  const tags: Record<StickerMood, string[]> = {
    happy: ["open plans", "soft yes", "tiny win"],
    sad: ["close friends", "low light", "check in"],
    hype: ["tonight", "loud room", "say yes"],
    soft: ["crush coded", "gentle", "blushing"],
    sport: ["soccer", "park plan", "team up"],
    chill: ["playlist", "do not rush", "quiet"],
  };

  return tags[selected.mood];
});

onMounted(() => {
  activeSticker.value = stickers[pickReloadVariant("peopl-mood", stickers.length)]!;
});
</script>

<template>
  <section id="moodboard" class="moodboard-section section-shell" aria-labelledby="moodboard-title">
    <div class="moodboard-heading">
      <div>
        <p class="section-kicker">Your mood, your people</p>
        <h2 id="moodboard-title" class="moodboard-title">A profile that reacts back.</h2>
      </div>
      <p class="moodboard-intro">
        Your moodboard is a little snapshot of you, right now. Bring together stickers, voice notes,
        and words so your people can catch the feeling, not just the update.
      </p>
    </div>

    <div
      class="moodboard-lab"
      :class="`is-${activeSticker.mood}`"
      :style="{ '--active-color': activeSticker.color }"
    >
      <div class="profile-preview" aria-live="polite">
        <div class="profile-card">
          <div class="profile-card-topline">
            <span>Mika's moodboard</span>
            <span>right now</span>
          </div>
          <div class="profile-avatar-large">
            <span>{{ activeSticker.icon }}</span>
          </div>
          <h3>Mika</h3>
          <p>{{ activeSticker.profileLine }}</p>
          <div class="board-note" aria-label="Example voice note, 12 seconds">
            <span class="note-wave" aria-hidden="true"><i v-for="bar in 12" :key="bar" /></span>
            <span>a little life update</span><span>0:12</span>
          </div>
          <div class="profile-tags" aria-label="Profile tags">
            <span v-for="tag in profileTags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <BuddyScene
        :mood="activeSticker.mood"
        :icon="activeSticker.icon"
        :comment="activeSticker.comment"
      />
    </div>
    <div class="moodboard-details">
      <article>
        <h3>A little of everything.</h3>
        <p>
          A sticker for the mood. A voice note for the story. A few words when that's all you need.
        </p>
      </article>
      <article>
        <h3>One board. This moment.</h3>
        <p>
          One active moodboard per person keeps the focus on what's happening in your life right
          now.
        </p>
      </article>
      <article>
        <h3>You choose the company.</h3>
        <p>
          Keep it private, share an unlisted board, or go public. Let people in at your own pace.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.moodboard-section {
  position: relative;
  padding-block: 7rem;
}
.moodboard-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.65fr);
  gap: 3rem;
  align-items: end;
  margin-bottom: 3rem;
}
.moodboard-title {
  max-width: 12ch;
  margin: 1.3rem 0 0;
  color: var(--ink);
  font-size: 5.25rem;
  font-weight: 590;
  letter-spacing: 0;
  line-height: 0.98;
}
.moodboard-intro {
  max-width: 25rem;
  margin: 0 0 0.25rem;
  color: var(--ink-soft);
  font-size: 1.22rem;
  line-height: 1.45;
}
.moodboard-lab {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: 2rem;
  align-items: stretch;
  padding-block: 2rem;
  border-block: 1px solid rgb(var(--mauve-rgb) / 0.16);
}
.profile-preview {
  display: grid;
  align-items: center;
  min-width: 0;
}
.profile-card {
  position: relative;
  display: grid;
  min-height: 27rem;
  align-content: center;
  justify-items: start;
  padding: 2rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.16);
  border-radius: 8px;
  background: color-mix(in srgb, var(--active-color), var(--paper) 89%);
}
.profile-card-topline {
  position: absolute;
  inset: 1.25rem 1.5rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--ink-soft);
  font-size: 0.72rem;
  font-weight: 740;
  letter-spacing: 0;
  text-transform: uppercase;
}
.profile-avatar-large {
  display: grid;
  width: 9rem;
  max-width: 100%;
  aspect-ratio: 1;
  place-items: center;
  margin: 1.8rem 0 1.5rem;
  border: 2px solid var(--ink);
  border-radius: 43% 57% 51% 49%;
  background: color-mix(in srgb, var(--active-color), var(--paper) 42%);
  font-size: 4rem;
}
.profile-card h3 {
  margin: 0;
  font-family: "Geologica", sans-serif;
  font-size: 2.75rem;
  font-weight: 610;
  letter-spacing: 0;
  line-height: 1;
}
.profile-card p {
  margin: 0.85rem 0 0;
  color: var(--ink-soft);
  font-size: 1.06rem;
  line-height: 1.3;
}
.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-top: 1.25rem;
}
.profile-tags span {
  padding-bottom: 0.2rem;
  border-bottom: 1px solid rgb(var(--mauve-rgb) / 0.3);
  font-size: 0.76rem;
  font-weight: 620;
}

.moodboard-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  padding-top: 2.5rem;
}
.moodboard-details article {
  min-width: 0;
}
.moodboard-details h3 {
  margin: 0 0 0.6rem;
  font-size: 1.2rem;
  font-weight: 650;
  letter-spacing: 0;
}
.moodboard-details p {
  max-width: 26rem;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.5;
  color: var(--ink-soft);
}
.board-note {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 1.2rem;
  color: var(--ink-soft);
  font-size: 0.8rem;
}
.note-wave {
  display: flex;
  height: 1.25rem;
  align-items: center;
  gap: 3px;
}
.note-wave i {
  display: block;
  width: 3px;
  height: 40%;
  border-radius: 2px;
  background: var(--ink-soft);
}
.note-wave i:nth-child(2n) {
  height: 85%;
}
.note-wave i:nth-child(3n) {
  height: 65%;
}
@media (max-width: 980px) {
  .moodboard-title {
    font-size: 4rem;
  }
  .moodboard-lab {
    gap: 1rem;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  }
  .profile-card {
    padding: 1.5rem;
  }
}
@media (max-width: 720px) {
  .moodboard-section {
    padding-block: 5rem;
  }
  .moodboard-heading {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .moodboard-title {
    font-size: 3rem;
  }
  .moodboard-intro {
    font-size: 1.1rem;
  }
  .moodboard-lab {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .profile-card {
    min-height: 24rem;
  }
  .moodboard-details {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}
</style>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type StickerMood = "happy" | "sad" | "hype" | "soft" | "sport" | "chill";

type MoodSticker = {
  icon: string;
  label: string;
  mood: StickerMood;
  profileLine: string;
  comment: string;
  color: string;
};

type ThreeModule = any;

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

const canvas = ref<HTMLCanvasElement | null>(null);
const activeSticker = ref(stickers[0]!);
const isReacting = ref(false);
const sceneReady = ref(false);
const renderFailed = ref(false);

let cleanupScene: (() => void) | undefined;
let reactionTimer: number | undefined;

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

const triggerReaction = () => {
  isReacting.value = true;

  if (reactionTimer) window.clearTimeout(reactionTimer);
  reactionTimer = window.setTimeout(() => {
    isReacting.value = false;
  }, 1200);
};

const selectSticker = (sticker: MoodSticker) => {
  activeSticker.value = sticker;
  triggerReaction();
};

const randomizeSticker = () => {
  const nextSticker = stickers[Math.floor(Math.random() * stickers.length)] ?? stickers[0]!;
  selectSticker(nextSticker);
};

const setupScene = async () => {
  const target = canvas.value;
  if (!target || typeof window === "undefined") return;

  try {
    const loadThree = new Function(
      "return import('https://esm.sh/three@0.181.2')",
    ) as () => Promise<ThreeModule>;
    const THREE = await loadThree();
    const bounds = target.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({ canvas: target, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(bounds.width, bounds.height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, bounds.width / bounds.height, 0.1, 100);
    camera.position.set(0, 1.35, 7.2);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(2.4, 4.2, 4.2);
    scene.add(keyLight);
    scene.add(new THREE.HemisphereLight(0xfff2ec, 0x8d7f89, 1.8));

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3.1, 48),
      new THREE.MeshBasicMaterial({ color: 0x2c1716, transparent: true, opacity: 0.07 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.48;
    scene.add(floor);

    const createBuddy = (color: number, scale: number, x: number, z: number) => {
      const group = new THREE.Group();
      group.position.set(x, -0.78, z);
      group.scale.setScalar(scale);

      const body = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.72, 0.95, 12, 26),
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.58,
          metalness: 0.02,
        }),
      );
      body.rotation.z = -0.03;
      group.add(body);

      const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x211a2b, roughness: 0.4 });
      const eyeGeometry = new THREE.SphereGeometry(0.07, 16, 16);
      const leftEye = new THREE.Mesh(eyeGeometry, faceMaterial);
      const rightEye = new THREE.Mesh(eyeGeometry, faceMaterial);
      leftEye.position.set(-0.22, 0.24, 0.7);
      rightEye.position.set(0.22, 0.24, 0.7);
      group.add(leftEye, rightEye);

      const mouth = new THREE.Mesh(
        new THREE.TorusGeometry(0.15, 0.018, 8, 20, Math.PI),
        faceMaterial,
      );
      mouth.position.set(0, -0.03, 0.72);
      mouth.rotation.set(0, 0, Math.PI);
      group.add(mouth);

      const badge = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.34, 0.1),
        new THREE.MeshStandardMaterial({ color: 0xfff2ec, roughness: 0.46 }),
      );
      badge.position.set(0.62, -0.14, 0.48);
      badge.rotation.z = 0.16;
      group.add(badge);

      const armGeometry = new THREE.CapsuleGeometry(0.055, 0.72, 8, 12);
      const leftArm = new THREE.Mesh(armGeometry, faceMaterial);
      const rightArm = new THREE.Mesh(armGeometry, faceMaterial);
      leftArm.position.set(-0.68, -0.18, 0.1);
      rightArm.position.set(0.68, -0.18, 0.1);
      leftArm.rotation.z = -0.45;
      rightArm.rotation.z = 0.45;
      group.add(leftArm, rightArm);

      scene.add(group);
      return { group, leftEye, rightEye, mouth, leftArm, rightArm, badge, baseScale: scale };
    };

    const buddies = [
      createBuddy(0xff6048, 1.15, 0, 0),
      createBuddy(0xf29aa8, 0.82, -1.55, 0.32),
      createBuddy(0xb8df7c, 0.82, 1.55, 0.36),
    ];

    let frame = 0;
    let time = 0;
    let disposed = false;

    const resize = () => {
      const nextBounds = target.getBoundingClientRect();
      if (!nextBounds.width || !nextBounds.height) return;
      camera.aspect = nextBounds.width / nextBounds.height;
      camera.updateProjectionMatrix();
      renderer.setSize(nextBounds.width, nextBounds.height, false);
    };

    const render = () => {
      if (disposed) return;
      time += 0.016;
      const mood = activeSticker.value.mood;
      const sad = mood === "sad";
      const hype = mood === "hype" || mood === "sport";
      const soft = mood === "soft" || mood === "happy";
      const chill = mood === "chill";
      const reactionBurst = isReacting.value ? Math.sin(time * 15) * 0.08 : 0;

      buddies.forEach((buddy, index) => {
        const offset = index * 0.72;
        const bounce = Math.sin(time * (hype ? 5.2 : 1.8) + offset);
        const lift = hype ? Math.abs(bounce) * 0.3 : soft ? Math.max(0, bounce) * 0.1 : 0;
        const sway = chill
          ? Math.sin(time * 0.55 + offset) * 0.2
          : Math.sin(time * 1.1 + offset) * 0.13;
        const scalePulse =
          1 + (isReacting.value ? Math.abs(Math.sin(time * 9 + offset)) * 0.08 : 0);

        buddy.group.position.y =
          -0.78 + Math.sin(time * 1.4 + offset) * 0.055 + lift + reactionBurst;
        buddy.group.rotation.y = sway;
        buddy.group.rotation.x = sad ? -0.28 : hype ? -0.04 : -0.16;
        buddy.group.rotation.z = hype
          ? Math.sin(time * 5.5 + offset) * 0.08
          : soft
            ? Math.sin(time * 2 + offset) * 0.045
            : 0;
        buddy.group.scale.setScalar(buddy.baseScale * scalePulse);
        buddy.leftEye.position.y = sad ? 0.12 : hype ? 0.34 : 0.29;
        buddy.rightEye.position.y = sad ? 0.12 : hype ? 0.34 : 0.29;
        buddy.leftEye.position.x = -0.22 + (soft ? 0.045 : hype ? -0.015 : 0);
        buddy.rightEye.position.x = 0.22 - (soft ? 0.045 : hype ? -0.015 : 0);
        buddy.leftEye.scale.setScalar(sad ? 0.78 : hype ? 1.14 : 1);
        buddy.rightEye.scale.setScalar(sad ? 0.78 : hype ? 1.14 : 1);
        buddy.mouth.rotation.z = sad ? 0 : Math.PI;
        buddy.mouth.scale.set(soft ? 1.24 : hype ? 1.36 : 1, sad ? 0.55 : chill ? 0.82 : 1, 1);
        buddy.leftArm.rotation.z = sad
          ? -0.9 + Math.sin(time * 2 + offset) * 0.08
          : hype
            ? -1.02 + Math.sin(time * 8 + offset) * 0.28
            : soft
              ? -0.62 + Math.sin(time * 3 + offset) * 0.16
              : -0.45;
        buddy.rightArm.rotation.z = sad
          ? 0.9 + Math.sin(time * 2 + offset) * 0.08
          : hype
            ? 1.02 + Math.sin(time * 8 + offset) * 0.28
            : soft
              ? 0.62 + Math.sin(time * 3 + offset) * 0.16
              : 0.45;
        buddy.badge.rotation.z =
          0.16 + Math.sin(time * 4 + offset) * (isReacting.value ? 0.26 : 0.06);
      });

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    sceneReady.value = true;
    render();

    cleanupScene = () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  } catch {
    renderFailed.value = true;
  }
};

watch(activeSticker, async () => {
  await nextTick();
});

onMounted(() => {
  randomizeSticker();
  void setupScene();
});

onBeforeUnmount(() => {
  cleanupScene?.();
  if (reactionTimer) window.clearTimeout(reactionTimer);
});
</script>

<template>
  <section id="moodboard" class="moodboard-section section-shell" aria-labelledby="moodboard-title">
    <div class="moodboard-heading">
      <div>
        <p class="section-kicker">Interactive moodboard</p>
        <h2 id="moodboard-title" class="moodboard-title">A profile that reacts back.</h2>
      </div>
      <p class="moodboard-intro">
        A new mood loads with the page. The profile shifts instantly, and the little 3D friends look
        up, read the room, and react.
      </p>
    </div>

    <div class="moodboard-lab" :class="[`is-${activeSticker.mood}`, { 'is-reacting': isReacting }]">
      <div class="profile-preview" aria-live="polite">
        <div class="profile-card">
          <div class="profile-card-topline">
            <span>random profile</span>
            <span>live board</span>
          </div>
          <div class="profile-avatar-large">
            <span>{{ activeSticker.icon }}</span>
          </div>
          <h3>Mika</h3>
          <p>{{ activeSticker.profileLine }}</p>
          <div class="profile-tags" aria-label="Profile tags">
            <span v-for="tag in profileTags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="moodboard-stage">
        <canvas
          ref="canvas"
          class="buddy-canvas"
          :class="{ 'is-ready': sceneReady && !renderFailed }"
          aria-label="Three-dimensional peopl. buddies reacting to the selected sticker"
        />
        <div
          class="buddy-fallback"
          :class="{ 'is-hidden': sceneReady && !renderFailed }"
          aria-hidden="true"
        >
          <span class="fallback-buddy buddy-main" />
          <span class="fallback-buddy buddy-left" />
          <span class="fallback-buddy buddy-right" />
        </div>
        <div class="buddy-comment" aria-live="polite">
          <span>{{ activeSticker.comment }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.moodboard-section {
  position: relative;
  padding-top: clamp(6rem, 11vw, 10rem);
  padding-bottom: clamp(6rem, 11vw, 10rem);
}

.moodboard-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(18rem, 0.68fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: end;
  margin-bottom: clamp(2.5rem, 6vw, 5rem);
}

.moodboard-title {
  max-width: 10ch;
  margin: 1.3rem 0 0;
  color: var(--ink);
  font-size: clamp(3.25rem, 7vw, 7rem);
  font-weight: 590;
  letter-spacing: -0.11em;
  line-height: 0.9;
}

.moodboard-intro {
  max-width: 27rem;
  margin: 0 0 0.25rem;
  color: var(--ink-soft);
  font-size: clamp(1.08rem, 1.5vw, 1.32rem);
  line-height: 1.32;
}

.moodboard-lab {
  position: relative;
  display: grid;
  grid-template-columns: minmax(15rem, 0.64fr) minmax(17rem, 0.62fr) minmax(18rem, 0.74fr);
  gap: 1rem;
  min-height: 35rem;
  padding: 1rem;
  overflow: hidden;
  border: 1px solid rgb(var(--mauve-rgb) / 0.13);
  border-radius: 2.8rem;
  background:
    radial-gradient(circle at 72% 22%, rgb(var(--green-rgb) / 0.16), transparent 32%),
    radial-gradient(circle at 18% 78%, rgb(var(--orange-rgb) / 0.18), transparent 36%),
    rgb(var(--paper-rgb) / 0.58);
  box-shadow: 0 1.2rem 4rem rgb(var(--mauve-rgb) / 0.1);
}

.sticker-board,
.profile-preview,
.moodboard-stage {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.sticker-board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  align-content: start;
  padding: clamp(0.7rem, 1.8vw, 1.1rem);
  border-radius: 2rem;
  background: rgb(var(--paper-rgb) / 0.55);
}

.mood-sticker {
  display: grid;
  min-height: 7.8rem;
  align-content: space-between;
  justify-items: start;
  padding: 0.8rem;
  border: 2px solid rgb(var(--ink-rgb, 0 0 0) / 0.08);
  border-radius: 1.15rem;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  transition:
    transform 500ms var(--ease-spring),
    border-color 500ms var(--ease-out),
    box-shadow 500ms var(--ease-out),
    background-color 500ms var(--ease-out);
}

.mood-sticker:hover,
.mood-sticker:focus-visible,
.mood-sticker.is-selected {
  border-color: var(--ink);
  background: color-mix(in srgb, var(--sticker-color), var(--paper) 48%);
  box-shadow: 0.38rem 0.45rem 0 rgb(0 0 0 / 0.12);
  transform: translateY(-0.22rem) rotate(-1deg);
}

.mood-sticker-icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 2px solid var(--ink);
  border-radius: 0.85rem;
  background: var(--paper);
  font-size: 1.55rem;
  line-height: 1;
}

.mood-sticker-label {
  max-width: 7rem;
  font-size: 0.82rem;
  font-weight: 760;
  line-height: 1;
}

.profile-preview {
  display: grid;
  align-items: center;
}

.profile-card {
  position: relative;
  display: grid;
  min-height: 29rem;
  align-content: end;
  justify-items: start;
  padding: clamp(1.15rem, 2.8vw, 1.7rem);
  overflow: hidden;
  border: 1px solid rgb(var(--mauve-rgb) / 0.14);
  border-radius: 2.2rem;
  background: var(--paper);
  box-shadow: 0 1.2rem 2.6rem rgb(var(--mauve-rgb) / 0.12);
  transition:
    transform 600ms var(--ease-spring),
    background-color 500ms var(--ease-out);
}

.is-reacting .profile-card {
  transform: translateY(-0.35rem) rotate(1deg);
}

.profile-card::before {
  position: absolute;
  inset: -25% -18% auto auto;
  width: 18rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--active-color, var(--orange));
  content: "";
  opacity: 0.22;
}

.is-happy .profile-card,
.is-soft .profile-card {
  --active-color: var(--pink);
}

.is-sad .profile-card {
  --active-color: var(--sky);
}

.is-hype .profile-card {
  --active-color: var(--orange);
}

.is-sport .profile-card {
  --active-color: var(--green);
}

.is-chill .profile-card {
  --active-color: var(--sky);
}

.profile-card-topline {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  left: 1.1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--ink-soft);
  font-size: 0.68rem;
  font-weight: 740;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.profile-avatar-large {
  position: relative;
  display: grid;
  width: min(100%, 13rem);
  aspect-ratio: 1;
  place-items: center;
  margin-bottom: 1.4rem;
  border: 3px solid var(--ink);
  border-radius: 38% 62% 52% 48% / 54% 42% 58% 46%;
  background: color-mix(in srgb, var(--active-color, var(--orange)), var(--paper) 38%);
  box-shadow: 0.55rem 0.65rem 0 rgb(0 0 0 / 0.13);
  font-size: clamp(3.2rem, 8vw, 5.2rem);
  transition:
    border-radius 700ms var(--ease-out),
    transform 700ms var(--ease-spring);
}

.is-reacting .profile-avatar-large {
  border-radius: 56% 44% 45% 55% / 44% 58% 42% 56%;
  transform: rotate(-4deg) scale(1.04);
}

.profile-card h3 {
  position: relative;
  margin: 0;
  font-family: "Geologica", sans-serif;
  font-size: clamp(2.5rem, 4vw, 4.2rem);
  font-weight: 610;
  letter-spacing: -0.1em;
  line-height: 0.88;
}

.profile-card p {
  position: relative;
  max-width: 16rem;
  margin: 0.85rem 0 0;
  color: var(--ink-soft);
  font-size: 1.02rem;
  line-height: 1.25;
}

.profile-tags {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.15rem;
}

.profile-tags span {
  padding: 0.35rem 0.55rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.22);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 720;
}

.moodboard-stage {
  display: grid;
  min-height: 31rem;
  align-items: end;
  justify-items: center;
  overflow: hidden;
  border-radius: 2.2rem;
  background:
    linear-gradient(rgb(var(--paper-rgb) / 0.48), rgb(var(--paper-rgb) / 0.72)),
    radial-gradient(circle at 50% 22%, rgb(var(--violet-rgb) / 0.16), transparent 42%);
}

.buddy-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 500ms var(--ease-out);
}

.buddy-canvas.is-ready {
  opacity: 1;
}

.buddy-fallback {
  position: absolute;
  inset: 16% 8% 17%;
  transition: opacity 400ms var(--ease-out);
}

.buddy-fallback.is-hidden {
  opacity: 0;
}

.fallback-buddy {
  position: absolute;
  display: block;
  border: 0.26rem solid var(--ink);
  border-radius: 2rem 2rem 1.4rem 1.4rem;
  background: var(--orange);
  box-shadow: 0 0.8rem 0 rgb(0 0 0 / 0.12);
  animation: fallback-look 2.8s ease-in-out infinite alternate;
}

.fallback-buddy::before,
.fallback-buddy::after {
  position: absolute;
  top: 37%;
  width: 0.45rem;
  height: 0.7rem;
  border-radius: 50%;
  background: var(--ink);
  content: "";
}

.fallback-buddy::before {
  left: 32%;
}

.fallback-buddy::after {
  right: 32%;
}

.buddy-main {
  top: 0;
  left: 35%;
  width: 7.2rem;
  height: 9.3rem;
}

.buddy-left {
  bottom: 4%;
  left: 10%;
  width: 5.2rem;
  height: 6.3rem;
  background: var(--pink);
  animation-delay: -0.8s;
}

.buddy-right {
  right: 9%;
  bottom: 10%;
  width: 5.5rem;
  height: 6.8rem;
  background: var(--green);
  animation-delay: -1.4s;
}

.buddy-comment {
  position: relative;
  z-index: 2;
  width: min(100% - 2rem, 18rem);
  margin-bottom: 1.15rem;
  padding: 0.72rem 0.85rem;
  border: 2px solid var(--ink);
  border-radius: 1rem 1rem 1rem 0.2rem;
  background: var(--paper);
  box-shadow: 0.38rem 0.42rem 0 rgb(0 0 0 / 0.12);
  color: var(--ink);
  font-size: 0.86rem;
  font-weight: 740;
  line-height: 1.12;
  transform: rotate(-1deg);
}

.is-reacting .buddy-comment {
  animation: comment-pop 520ms var(--ease-spring);
}

@keyframes fallback-look {
  from {
    transform: translateY(0) rotate(-2deg);
  }
  to {
    transform: translateY(-0.55rem) rotate(3deg);
  }
}

@keyframes comment-pop {
  from {
    transform: translateY(0.45rem) rotate(-1deg) scale(0.92);
  }
  to {
    transform: translateY(0) rotate(-1deg) scale(1);
  }
}

@media (max-width: 980px) {
  .moodboard-lab {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .moodboard-stage {
    grid-column: 1 / -1;
    min-height: 24rem;
  }
}

@media (max-width: 820px) {
  .moodboard-heading {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .moodboard-section {
    padding-top: 6.5rem;
    padding-bottom: 6.5rem;
  }

  .moodboard-title {
    font-size: clamp(3.15rem, 16vw, 5rem);
  }

  .moodboard-lab {
    grid-template-columns: 1fr;
    padding: 0.7rem;
    border-radius: 2rem;
  }

  .sticker-board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-radius: 1.5rem;
  }

  .mood-sticker {
    min-height: 6.7rem;
    border-radius: 1rem;
  }

  .profile-card {
    min-height: 25rem;
    border-radius: 1.65rem;
  }

  .moodboard-stage {
    min-height: 23rem;
    border-radius: 1.65rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fallback-buddy,
  .is-reacting .buddy-comment {
    animation: none !important;
  }
}
</style>

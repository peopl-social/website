<script setup lang="ts">
import { gsap } from "gsap";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import FeatureSprite from "./FeatureSprite.vue";

const props = withDefaults(
  defineProps<{
    mode?: "mood" | "verify";
    mood?: "happy" | "sad" | "hype" | "soft" | "sport" | "chill";
    icon?: string;
    comment?: string;
  }>(),
  { mode: "mood", mood: "happy", icon: "\u2764", comment: "Good company, whatever the mood." },
);

const root = ref<HTMLButtonElement | null>(null);
const expression = computed(() =>
  props.mood === "hype" ? "excited" : props.mood === "sport" ? "happy" : props.mood,
);
let context: gsap.Context | undefined;
let timeline: gsap.core.Timeline | undefined;
let observer: IntersectionObserver | undefined;
let resizeObserver: ResizeObserver | undefined;
let reducedMotion: MediaQueryList | undefined;
let visible = false;
let mounted = false;

const syncPlayback = () => {
  if (!timeline) return;
  if (visible && !document.hidden && !reducedMotion?.matches) timeline.play();
  else timeline.pause();
};

const buildScene = () => {
  if (!mounted || !root.value) return;
  context?.revert();
  context = gsap.context(() => {
    const select = gsap.utils.selector(root.value);
    const actors = select(".scene-actor");
    const faces = select(".sprite-face");
    const leftArms = select(".arm-left");
    const rightArms = select(".arm-right");
    const token = select(".shared-sticker");
    const tl = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 1.3,
      defaults: { duration: 0.85, ease: "sine.inOut" },
    });
    timeline = tl;
    gsap.set(actors, { transformOrigin: "50% 85%" });
    gsap.set(faces, { transformOrigin: "50% 50%" });

    if (props.mode === "verify") {
      gsap.set(".verification-success", { opacity: 0, scale: 0.85 });
      gsap.set(".scan-line", { opacity: 0 });
      gsap.set(".verification-card", { x: 0, y: 0, rotation: -9 });
      if (reducedMotion?.matches) {
        gsap.set(".verification-card", { x: 64, rotation: 0 });
        gsap.set(".verification-success", { opacity: 1, scale: 1 });
        gsap.set(".verification-pending", { opacity: 0 });
        return;
      }
      tl.to(actors[0]!, { x: 20, rotation: 4 }, 0.2)
        .to(rightArms[0]!, { rotation: -90 }, 0.2)
        .to(".verification-card", { x: 64, y: -14, rotation: 0 }, 0.45)
        .to(faces[1]!, { x: -5, y: 3, rotation: -5 }, 0.6)
        .to(leftArms[1]!, { rotation: 80 }, 0.85)
        .to(".scan-line", { opacity: 0.85, duration: 0.3 }, 1.3)
        .fromTo(
          ".scan-line",
          { y: 0 },
          { y: 67, duration: 1.45, ease: "sine.inOut", repeat: 1, yoyo: true },
          1.5,
        )
        .to(".scan-line", { opacity: 0, duration: 0.3 }, 4.2)
        .to(".verification-pending", { opacity: 0, duration: 0.3 }, 4.25)
        .to(
          ".verification-success",
          { opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.5)" },
          4.5,
        )
        .to(rightArms[1]!, { rotation: -145 }, 4.5)
        .to(actors[1]!, { y: -9, rotation: -4, duration: 0.5, repeat: 1, yoyo: true }, 4.6)
        .to(actors[0]!, { y: -14, rotation: -3, duration: 0.55, repeat: 1, yoyo: true }, 4.85)
        .to(".verification-card", { x: 0, y: 0, rotation: -9 }, 6.5)
        .to(actors[0]!, { x: 0, rotation: 0 }, 6.5)
        .to(rightArms[0]!, { rotation: -27 }, 6.5)
        .to(leftArms[1]!, { rotation: 27 }, 6.5)
        .to(rightArms[1]!, { rotation: -27 }, 6.5)
        .to(faces[1]!, { x: 0, y: 0, rotation: 0 }, 6.5)
        .to(".verification-success", { opacity: 0, scale: 0.85, duration: 0.5 }, 7.7)
        .to(".verification-pending", { opacity: 1, duration: 0.5 }, 8);
    } else {
      gsap.set(token, { x: 0, y: 0, rotation: -12 });
      if (reducedMotion?.matches) return;
      const comforting = props.mood === "sad" || props.mood === "soft";
      const sporty = props.mood === "sport";
      // One shared timeline makes a gesture happen before the next friend responds.
      tl.to(faces[0]!, { x: 5, rotation: 4 }, 0.2)
        .to(faces[1]!, { x: -5, rotation: -4 }, 0.55)
        .to(actors[0]!, { x: 28, rotation: 6 }, 0.6)
        .to(rightArms[0]!, { rotation: -100 }, 0.65)
        .to(leftArms[1]!, { rotation: 90 }, 1)
        .to(
          token,
          { x: sporty ? 110 : 32, y: sporty ? 70 : 0, rotation: sporty ? 180 : 8, duration: 1.2 },
          1,
        )
        .to(
          actors[1]!,
          { y: comforting ? 3 : -12, rotation: comforting ? -7 : -4, duration: 0.65 },
          1.7,
        )
        .to(actors[0]!, { x: comforting ? 43 : 12, rotation: comforting ? 9 : 0 }, 2.2)
        .to(faces[2]!, { x: -5, rotation: -6 }, 2.3)
        .to(actors[2]!, { x: -30, rotation: -7 }, 2.65)
        .to(leftArms[2]!, { rotation: 100 }, 2.7)
        .to(rightArms[1]!, { rotation: -100 }, 2.7)
        .to(
          token,
          {
            x: sporty ? 215 : 153,
            y: sporty ? 90 : 0,
            rotation: sporty ? 380 : 15,
            duration: 1.1,
          },
          2.9,
        )
        .to(faces[1]!, { x: 5, rotation: 4 }, 3)
        .to(actors[1]!, { y: 0, rotation: 5 }, 3.15);

      if (comforting) {
        tl.to(actors[2]!, { x: -43, rotation: -10 }, 3.6)
          .to(actors[1]!, { y: -3, rotation: 0 }, 3.8)
          .to(token, { x: 215, y: -75, scale: 1.15, duration: 0.9 }, 3.8)
          .to(faces, { y: 2, duration: 0.8, repeat: 1, yoyo: true }, 4.1);
      } else if (props.mood === "chill") {
        tl.to(
          actors,
          { rotation: 7, duration: 0.65, stagger: 0.14, repeat: 2, yoyo: true },
          3.7,
        ).to(token, { y: -28, rotation: -8, duration: 0.8, repeat: 1, yoyo: true }, 3.8);
      } else {
        tl.to([rightArms[0]!, rightArms[1]!], { rotation: -145 }, 3.7)
          .to([leftArms[1]!, leftArms[2]!], { rotation: 145 }, 3.7)
          .to(
            actors,
            {
              y: props.mood === "hype" ? -24 : -15,
              duration: 0.5,
              stagger: 0.17,
              repeat: 1,
              yoyo: true,
            },
            4,
          )
          .to(token, { x: 110, y: sporty ? 70 : -75, rotation: sporty ? 540 : -5, duration: 1 }, 4);
      }
      tl.to(actors, { x: 0, y: 0, rotation: 0, duration: 1.1 }, 6)
        .to(faces, { x: 0, y: 0, rotation: 0 }, 6)
        .to(leftArms, { rotation: 27 }, 6)
        .to(rightArms, { rotation: -27 }, 6)
        .to(token, { x: 0, y: 0, rotation: -12, scale: 1, duration: 1.4 }, 6.1);
    }
  }, root.value);
  syncPlayback();
};

const replay = () => {
  if (!reducedMotion?.matches) timeline?.restart();
};

onMounted(() => {
  mounted = true;
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion.addEventListener("change", buildScene);
  document.addEventListener("visibilitychange", syncPlayback);
  resizeObserver = new ResizeObserver(([entry]) => {
    if (entry && root.value)
      root.value.style.setProperty(
        "--scene-scale",
        String(Math.min(entry.contentRect.width / 560, 1.2)),
      );
  });
  resizeObserver.observe(root.value!);
  observer = new IntersectionObserver(
    ([entry]) => {
      visible = !!entry?.isIntersecting;
      syncPlayback();
    },
    { threshold: 0.15 },
  );
  observer.observe(root.value!);
  buildScene();
});

watch(
  () => [props.mood, props.mode],
  async () => {
    await nextTick();
    buildScene();
  },
);
onBeforeUnmount(() => {
  mounted = false;
  context?.revert();
  observer?.disconnect();
  resizeObserver?.disconnect();
  reducedMotion?.removeEventListener("change", buildScene);
  document.removeEventListener("visibilitychange", syncPlayback);
});
</script>

<template>
  <button
    ref="root"
    type="button"
    class="buddy-scene"
    :class="[`scene-${props.mode}`, `mood-${props.mood}`]"
    :aria-label="
      props.mode === 'verify'
        ? 'Replay the friends checking a profile ID'
        : 'Replay the friends sharing this mood'
    "
    title="Replay"
    @click="replay"
  >
    <span class="scene-viewport" aria-hidden="true">
      <span class="scene-world">
        <span class="scene-ground" />
        <span class="scene-actor actor-one"
          ><FeatureSprite
            color="pink"
            decorative
            :show-badge="false"
            :expression="props.mode === 'verify' ? 'happy' : 'soft'"
        /></span>
        <span class="scene-actor actor-two"
          ><FeatureSprite
            :color="props.mode === 'verify' ? 'green' : 'orange'"
            decorative
            :show-badge="false"
            :expression="props.mode === 'verify' ? 'happy' : expression"
        /></span>
        <span v-if="props.mode === 'mood'" class="scene-actor actor-three"
          ><FeatureSprite
            color="green"
            decorative
            :show-badge="false"
            :expression="props.mood === 'hype' ? 'excited' : 'happy'"
        /></span>
        <span
          v-if="props.mode === 'mood'"
          class="shared-sticker"
          :class="{ 'is-ball': props.mood === 'sport' }"
          >{{ props.icon }}</span
        >
        <template v-else>
          <span class="verification-reader"
            ><span class="reader-corner" /><span class="scan-line"
          /></span>
          <span class="verification-card"
            ><span class="id-portrait"><i /><i /></span
            ><span class="id-details"><b>peopl.</b><i /><i /></span
            ><span class="id-label">HELLO, IT'S ME</span></span
          >
          <span class="verification-success"
            ><span class="verified-mark" /><span>You're verified!</span></span
          >
          <span class="verification-pending">A few checks. A warmer hello.</span>
        </template>
      </span>
    </span>
    <span v-if="props.mode === 'mood'" class="scene-comment">{{ props.comment }}</span>
  </button>
</template>

<style scoped>
.buddy-scene {
  --scene-scale: 1;
  display: grid;
  width: 100%;
  min-width: 0;
  padding: 0;
  align-content: center;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  text-align: center;
}
.buddy-scene:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 6px;
  border-radius: 8px;
}
.scene-viewport {
  position: relative;
  display: block;
  height: 23rem;
  overflow: hidden;
}
.scene-world {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 560px;
  height: 330px;
  transform: translateX(-50%) scale(var(--scene-scale));
  transform-origin: center bottom;
}
.scene-ground {
  position: absolute;
  left: 65px;
  right: 55px;
  bottom: 25px;
  border-bottom: 2px solid rgb(var(--mauve-rgb) / 0.22);
}
.scene-actor {
  position: absolute;
  top: 135px;
  width: 7.4rem;
  height: 9.2rem;
  will-change: transform;
}
.actor-one {
  left: 65px;
}
.actor-two {
  left: 220px;
}
.actor-three {
  left: 375px;
}
.shared-sticker {
  position: absolute;
  z-index: 2;
  left: 161px;
  top: 174px;
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 2px solid var(--ink);
  border-radius: 8px;
  background: var(--paper);
  box-shadow: 3px 4px 0 rgb(0 0 0 / 0.12);
  font-size: 1.55rem;
  will-change: transform;
}
.shared-sticker.is-ball {
  top: 143px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  box-shadow: none;
  font-size: 2rem;
}
.scene-comment {
  justify-self: center;
  max-width: 27rem;
  min-height: 4rem;
  padding: 1rem 1.25rem;
  font-size: 1.02rem;
  line-height: 1.35;
  font-weight: 620;
}
.scene-verify .actor-one {
  left: 65px;
}
.scene-verify .actor-two {
  left: 365px;
}
.verification-card {
  position: absolute;
  z-index: 3;
  left: 171px;
  top: 183px;
  width: 104px;
  height: 69px;
  padding: 8px;
  display: flex;
  gap: 9px;
  border: 2px solid var(--ink);
  border-radius: 7px;
  background: var(--paper);
  box-shadow: 3px 4px 0 rgb(0 0 0 / 0.12);
}
.id-portrait {
  position: relative;
  width: 25px;
  height: 31px;
  border: 2px solid var(--ink);
  border-radius: 10px 10px 6px 6px;
  background: var(--pink);
}
.id-portrait i {
  position: absolute;
  top: 10px;
  width: 3px;
  height: 5px;
  border-radius: 50%;
  background: var(--ink);
}
.id-portrait i:first-child {
  left: 5px;
}
.id-portrait i:last-child {
  right: 5px;
}
.id-details {
  display: grid;
  flex: 1;
  align-content: start;
  gap: 4px;
  text-align: left;
}
.id-details b {
  font-size: 0.65rem;
  line-height: 1;
}
.id-details i {
  width: 90%;
  height: 3px;
  background: rgb(var(--mauve-rgb) / 0.4);
}
.id-details i:last-child {
  width: 65%;
}
.id-label {
  position: absolute;
  bottom: 6px;
  left: 8px;
  font-size: 0.42rem;
  font-weight: 750;
  letter-spacing: 0;
}
.verification-reader {
  position: absolute;
  left: 224px;
  top: 157px;
  width: 126px;
  height: 96px;
  border: 2px dashed rgb(var(--mauve-rgb) / 0.6);
  border-radius: 8px;
}
.scan-line {
  opacity: 0;
  position: absolute;
  z-index: 4;
  left: 5px;
  right: 5px;
  top: 8px;
  height: 3px;
  background: #368b63;
  box-shadow: 0 0 9px #63cd78;
}
.verification-success {
  opacity: 0;
  position: absolute;
  top: 80px;
  left: 173px;
  width: 225px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 1.15rem;
  font-weight: 700;
}
.verified-mark {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--green);
}
.verified-mark::after {
  position: absolute;
  left: 7px;
  top: 5px;
  width: 7px;
  height: 12px;
  border: solid var(--ink);
  border-width: 0 2px 2px 0;
  content: "";
  transform: rotate(40deg);
}
.verification-pending {
  position: absolute;
  top: 83px;
  left: 110px;
  width: 350px;
  font-size: 1.05rem;
  font-weight: 600;
}
@media (max-width: 720px) {
  .scene-viewport {
    height: 17rem;
  }
  .scene-comment {
    font-size: 0.95rem;
    padding-inline: 0.5rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scene-actor,
  .shared-sticker {
    will-change: auto;
  }
}
</style>

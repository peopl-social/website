<script setup lang="ts">
import { animate as animeAnimate } from "animejs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Motion } from "motion-v";
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import FeatureSprite from "../components/FeatureSprite.vue";
import PageCat from "../components/PageCat.vue";

const pageRoot = ref<HTMLElement | null>(null);
const menuOpen = ref(false);
const menuPanelReady = ref(false);
const activePersona = ref(1);
const quietMode = ref(false);
const activePerson = ref(0);
const avatarMoods = ref(["happy", "cool", "surprised", "happy"]);
const waitlistEmail = ref("");
const isJoined = ref(false);
let cleanupMotion: (() => void) | undefined;

const orbitPeople = [
  { initial: "A", name: "Ava", status: "nearby", color: "orange" },
  { initial: "J", name: "Jules", status: "planning", color: "violet" },
  { initial: "R", name: "Rae", status: "free tonight", color: "green" },
  { initial: "S", name: "Sam", status: "sent a note", color: "sky" },
];

const personas = [
  {
    key: "slow-melancholic",
    profile: "Mara",
    profileNote: "keeps the lights low",
    avatar: "M",
    shortLabel: "Slow / Melancholic",
    tone: "Keep the quiet parts.",
    copy: "For late-night thinkers, tender archivists, and anyone who wants their people close without needing to perform closeness.",
    color: "violet",
    sticker: "☾",
    detail: "private boards + soft messages",
    tags: ["low light", "voice notes", "small circle"],
    action: "save the feeling",
    stickers: ["☾", "♡", "··", "✦"],
  },
  {
    key: "social-nightlife",
    profile: "Nico",
    profileNote: "always knows a place",
    avatar: "N",
    label: "Variant B · Social / Nightlife",
    shortLabel: "Social / Nightlife",
    tone: "Make tonight spill over.",
    copy: "For the connector who knows a place, knows a person, and can turn “what are you doing?” into a very good story.",
    color: "orange",
    sticker: "✷",
    detail: "event feeds + open invites",
    tags: ["after dark", "open plans", "more people"],
    action: "find the room",
    stickers: ["✷", "♫", "+", "↗"],
  },
  {
    key: "creative-focus",
    profile: "Ira",
    profileNote: "is making something",
    avatar: "I",
    label: "Variant C · Creative / Focus",
    shortLabel: "Creative / Focus",
    tone: "Make space to make.",
    copy: "For the maker with five tabs open, a half-built idea, and the right people who know when to nudge and when to let it breathe.",
    color: "green",
    sticker: "✎",
    detail: "focused boards + quiet relay",
    tags: ["deep work", "idea scraps", "gentle nudges"],
    action: "open the studio",
    stickers: ["✎", "↗", "✦", "□"],
  },
];

const currentPersona = computed(() => personas[activePersona.value] ?? personas[0]!);

const revealTransition = (delay = 0) => ({
  duration: 0.9,
  delay,
  ease: [0.22, 1, 0.36, 1],
});

const closeMenu = () => {
  menuPanelReady.value = false;
  menuOpen.value = false;
};

const toggleMenu = () => {
  if (menuOpen.value) {
    closeMenu();
    return;
  }

  menuOpen.value = true;
  nextTick(() => {
    menuPanelReady.value = true;
  });
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu();
};

const choosePerson = (index: number) => {
  activePerson.value = index;
};

const choosePersona = (index: number) => {
  activePersona.value = index;
};

const toggleQuietMode = () => {
  quietMode.value = !quietMode.value;
};

const cycleAvatarMood = (index: number) => {
  const moods = ["happy", "cool", "surprised", "sleepy"];
  const currentMood = avatarMoods.value[index] ?? "happy";
  const nextMood = moods[(moods.indexOf(currentMood) + 1) % moods.length] ?? "happy";
  avatarMoods.value[index] = nextMood;
};

const handleCardPointerMove = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement | null;
  if (!card) return;

  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
  card.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
};

const submitWaitlist = () => {
  if (!waitlistEmail.value || isJoined.value) return;

  isJoined.value = true;
  nextTick(() => {
    animeAnimate(".waitlist-status", {
      opacity: [0, 1],
      scale: [0.86, 1],
      duration: 720,
      ease: "outExpo",
    });
  });
};

onMounted(() => {
  if (!pageRoot.value) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    cleanupMotion = () => undefined;
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const context = gsap.context(() => {
    gsap.from(".hero-note", {
      opacity: 0,
      y: 18,
      rotate: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.7,
    });

    gsap.to(".hero-aura", {
      y: -26,
      scale: 1.06,
      duration: 4.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".hero-aura", {
      y: -70,
      scale: 1.12,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, pageRoot.value);

  cleanupMotion = () => {
    context.revert();
  };
});

onBeforeUnmount(() => {
  cleanupMotion?.();
});
</script>

<template>
  <div
    ref="pageRoot"
    class="site-shell"
    :class="`persona-theme-${activePersona}`"
    :data-active-persona="currentPersona.key"
  >
    <PageCat />

    <header class="site-header">
      <nav class="site-nav" aria-label="Primary navigation">
        <a class="nav-brand" href="#top" aria-label="peopl. home" @click="closeMenu">
          <span class="wordmark">peopl.</span>
        </a>

        <div class="nav-links">
          <a class="nav-link" href="#why" @click.prevent="scrollToSection('why')">The problem</a>
          <a class="nav-link" href="#features" @click.prevent="scrollToSection('features')"
            >Features</a
          >
        </div>

        <a class="nav-link nav-join-link" href="#join" @click.prevent="scrollToSection('join')"
          >Get updates</a
        >

        <button
          class="nav-menu-button"
          :class="{ 'is-open': menuOpen }"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="menu-lines" aria-hidden="true" />
        </button>
      </nav>
    </header>

    <Transition name="nav-drawer">
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="mobile-menu"
        @click.self="closeMenu"
        @keydown.esc="closeMenu"
      >
        <div class="mobile-menu-panel" :class="{ 'is-ready': menuPanelReady }">
          <a class="mobile-menu-link" href="#why" @click="closeMenu">The problem</a>
          <a class="mobile-menu-link" href="#features" @click="closeMenu">Features</a>
          <a class="mobile-menu-link" href="#join" @click="closeMenu">Join the list</a>
        </div>
      </div>
    </Transition>

    <main>
      <section id="top" class="hero section-shell" aria-labelledby="hero-title">
        <div class="hero-copy">
          <Motion
            as="p"
            class="section-kicker hero-kicker"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="revealTransition(0.05)"
          >
            {{ currentPersona.shortLabel }} / peopl.
          </Motion>

          <Motion
            as="h1"
            id="hero-title"
            class="hero-title"
            :initial="{ opacity: 0, y: 34 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="revealTransition(0.14)"
          >
            Make room for <span class="accent-word">your people.</span>
          </Motion>

          <Motion
            as="p"
            class="hero-lead"
            :initial="{ opacity: 0, y: 28 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="revealTransition(0.27)"
          >
            peopl. is a softer way to stay close to the people who make your days feel like yours.
          </Motion>

          <Motion
            as="div"
            class="hero-actions"
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="revealTransition(0.39)"
          >
            <form class="hero-waitlist-form" @submit.prevent="submitWaitlist">
              <label class="sr-only" for="hero-email">Email address</label>
              <input
                id="hero-email"
                v-model="waitlistEmail"
                class="hero-email-input"
                type="email"
                autocomplete="email"
                placeholder="you@email.com"
                :disabled="isJoined"
                required
              />
              <button class="button-primary" type="submit" :disabled="isJoined">
                {{ isJoined ? "You’re in" : "Join the early list" }}
              </button>
            </form>
          </Motion>

          <Motion
            as="div"
            class="hero-proof"
            :initial="{ opacity: 0, y: 18 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="revealTransition(0.53)"
          >
            <span class="hero-proof-sprites" aria-hidden="true">
              <FeatureSprite
                class="proof-sprite proof-sprite-one"
                color="orange"
                mood="board"
                size="sm"
                label="moodboard friend"
              />
              <FeatureSprite
                class="proof-sprite proof-sprite-two"
                color="green"
                mood="event"
                size="sm"
                label="event friend"
              />
              <FeatureSprite
                class="proof-sprite proof-sprite-three"
                color="violet"
                mood="message"
                size="sm"
                label="message friend"
              />
            </span>
            <span>For the group chat you actually want to open.</span>
          </Motion>
        </div>

        <div class="hero-visual" aria-label="Preview of the peopl. app">
          <div class="hero-aura" aria-hidden="true" />
          <div class="hero-orbit" aria-label="People in your orbit">
            <span class="orbit-label">your people / now</span>
            <button
              v-for="(person, index) in orbitPeople"
              :key="person.initial"
              class="orbit-person"
              :class="[`is-${person.color}`, { 'is-active': activePerson === index }]"
              type="button"
              :aria-label="`${person.name}, ${person.status}`"
              @click="choosePerson(index)"
            >
              <span class="orbit-person-dot">{{ person.initial }}</span>
              <span class="orbit-person-label">{{ person.name }}</span>
            </button>
          </div>

          <div
            class="hero-sprite-stack"
            aria-label="A few of the people and ideas peopl. makes room for"
          >
            <FeatureSprite
              class="hero-sprite sprite-main"
              color="orange"
              mood="board"
              size="lg"
              label="moodboard friend"
            />
            <FeatureSprite
              class="hero-sprite sprite-left"
              color="green"
              mood="event"
              size="sm"
              label="event friend"
            />
            <FeatureSprite
              class="hero-sprite sprite-right"
              color="violet"
              mood="message"
              size="sm"
              label="message friend"
            />
          </div>

          <div class="hero-signal" aria-hidden="true">
            <span class="signal-pulse" />
            <span>{{ currentPersona.profileNote }}</span>
          </div>

          <div class="profile-sticker-cloud" aria-hidden="true">
            <span
              v-for="(sticker, index) in currentPersona.stickers"
              :key="`${currentPersona.key}-${sticker}`"
              :class="`cloud-sticker sticker-${index + 1}`"
              >{{ sticker }}</span
            >
          </div>

          <div class="hero-note hero-note-top">
            <small>right now</small>
            <strong>4 people nearby</strong>
          </div>
          <div class="hero-note hero-note-bottom">
            <small>tiny nudge</small>
            <strong>Thursday dinner?</strong>
          </div>
        </div>
      </section>

      <section id="why" class="manifesto section-shell" aria-labelledby="manifesto-title">
        <div class="manifesto-intro"></div>

        <div class="manifesto-content">
          <Motion
            as="h2"
            id="manifesto-title"
            class="manifesto-title"
            :initial="{ opacity: 0, y: 40 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition()"
          >
            Too much social. <span>Not enough close.</span>
          </Motion>
          <Motion
            as="p"
            class="manifesto-body"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition(0.12)"
          >
            Group chats fragment the plan. Feeds flatten the feeling. Private thoughts deserve
            somewhere warmer than a notification tray.
          </Motion>

          <Motion
            as="div"
            class="manifesto-poster"
            :initial="{ opacity: 0, y: 34, rotate: 1 }"
            :while-in-view="{ opacity: 1, y: 0, rotate: -1.5 }"
            :viewport="{ once: true, amount: 0.2 }"
            :transition="revealTransition(0.18)"
          >
            <span class="poster-label">what we are making room for</span>
            <span class="poster-copy">Less noise.<br />More actual life.</span>
          </Motion>
        </div>
      </section>

      <section id="features" class="details-section section-shell" aria-labelledby="details-title">
        <div class="details-heading">
          <div>
            <p class="section-kicker">The feature grid</p>
            <Motion
              as="h2"
              id="details-title"
              class="details-title"
              :initial="{ opacity: 0, y: 38 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true, amount: 0.3 }"
              :transition="revealTransition()"
            >
              Built around real life.
            </Motion>
          </div>
          <Motion
            as="p"
            class="details-intro"
            :initial="{ opacity: 0, y: 22 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition(0.12)"
          >
            The useful details are small on purpose: clear controls, deliberate boundaries, and
            enough room for personality.
          </Motion>
        </div>

        <div class="feature-grid">
          <div class="feature-marker" aria-hidden="true">
            <span>04</span>
            <small>the details</small>
          </div>

          <Motion
            as="article"
            class="feature-card"
            :initial="{ opacity: 0, y: 28 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.16 }"
            :transition="revealTransition()"
            @pointermove="handleCardPointerMove"
          >
            <div class="feature-card-inner">
              <div class="feature-copy">
                <h3 class="feature-title">Moodboards, not feeds.</h3>
                <p class="feature-description">
                  One active board for each person, filled with stickers, audio, and text instead of
                  endless scroll.
                </p>
              </div>
              <div class="feature-ui" aria-hidden="true">
                <div class="sync-window">
                  <div class="sync-topline"><span>your moodboard</span><span>01 active</span></div>
                  <div class="sync-body">
                    <div class="avatar-row">
                      <button
                        v-for="(initial, index) in ['A', 'J', 'R', 'S']"
                        :key="initial"
                        class="avatar-chip"
                        :class="`is-${avatarMoods[index]}`"
                        type="button"
                        :aria-label="`${initial}'s mood is ${avatarMoods[index]}. Click to change expression`"
                        @click="cycleAvatarMood(index)"
                      >
                        <span class="avatar-eyes" aria-hidden="true"><i /><i /></span>
                        <span class="avatar-mouth" aria-hidden="true" />
                        <small>{{ initial }}</small>
                      </button>
                    </div>
                    <span class="sync-action">open board</span>
                  </div>
                </div>
              </div>
            </div>
          </Motion>

          <Motion
            as="article"
            class="feature-card"
            :initial="{ opacity: 0, y: 28 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.16 }"
            :transition="revealTransition(0.08)"
            @pointermove="handleCardPointerMove"
          >
            <div class="feature-card-inner">
              <div class="feature-copy">
                <h3 class="feature-title">Choose the door.</h3>
                <p class="feature-description">
                  Make a board private, unlisted, or public. Share the feeling at the pace that
                  feels right.
                </p>
              </div>
              <div class="quiet-card-visual" aria-hidden="true">
                <div class="quiet-bubble">private · just yours</div>
                <div class="quiet-bubble">public · come on in</div>
                <button
                  class="quiet-toggle"
                  :class="{ 'is-on': quietMode }"
                  type="button"
                  :aria-pressed="quietMode"
                  @click="toggleQuietMode"
                >
                  <span class="toggle-track" /><span>{{
                    quietMode ? "visibility: public" : "visibility: private"
                  }}</span>
                </button>
              </div>
            </div>
          </Motion>

          <Motion
            as="article"
            class="feature-card"
            :initial="{ opacity: 0, y: 28 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.16 }"
            :transition="revealTransition(0.16)"
            @pointermove="handleCardPointerMove"
          >
            <div class="feature-card-inner">
              <div class="feature-copy">
                <h3 class="feature-title">Make it in-person.</h3>
                <p class="feature-description">
                  Create a gathering, browse what is happening, and join the ones that pull you out
                  into the world.
                </p>
              </div>
              <div class="plan-window" aria-hidden="true">
                <div class="plan-topline"><span>event feed</span><span>open now</span></div>
                <p class="plan-title">sunset walk + something cold</p>
                <div class="plan-row">
                  <span class="plan-day">18<br />SEP</span
                  ><span>Thursday · 6:30 PM<br />4 people are going</span>
                </div>
              </div>
            </div>
          </Motion>

          <Motion
            as="article"
            class="feature-card"
            :initial="{ opacity: 0, y: 28 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.16 }"
            :transition="revealTransition(0.24)"
            @pointermove="handleCardPointerMove"
          >
            <div class="feature-card-inner">
              <div class="feature-copy">
                <h3 class="feature-title">Keep it between you.</h3>
                <p class="feature-description">
                  End-to-end encrypted messaging designed as a plaintext-blind relay. The service
                  carries it, not reads it.
                </p>
              </div>
              <div class="recap-ui" aria-hidden="true">
                <div class="recap-tile" />
                <div class="recap-tile" />
                <div class="recap-tile" />
                <div class="recap-tile" />
              </div>
            </div>
          </Motion>
        </div>
      </section>

      <section id="join" class="waitlist-section section-shell" aria-labelledby="waitlist-title">
        <div class="waitlist-copy">
          <p class="section-kicker is-light">Come a little closer</p>
          <Motion
            as="h2"
            id="waitlist-title"
            class="waitlist-title"
            :initial="{ opacity: 0, y: 38 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition()"
          >
            Your people are <span>waiting.</span>
          </Motion>
          <Motion
            as="p"
            class="waitlist-lead"
            :initial="{ opacity: 0, y: 22 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition(0.12)"
          >
            Leave your email and we’ll send the good kind of update when peopl. is ready.
          </Motion>

          <form class="waitlist-form" @submit.prevent="submitWaitlist">
            <label class="sr-only" for="cta-email">Email address</label>
            <input
              id="cta-email"
              v-model="waitlistEmail"
              class="waitlist-input"
              type="email"
              autocomplete="email"
              placeholder="you@email.com"
              :disabled="isJoined"
              required
            />
            <button class="button-primary" type="submit" :disabled="isJoined">
              {{ isJoined ? "You’re in" : "Join the list" }}
            </button>
          </form>
          <p v-if="isJoined" class="waitlist-status" aria-live="polite">
            You’re on the list. We’ll keep it lovely.
          </p>
        </div>

        <div class="waitlist-sticker" aria-hidden="true">
          <span class="sticker-spark">✳</span>
          <span class="sticker-copy">stay close, softly.</span>
        </div>

        <div class="waitlist-orbit" aria-hidden="true">
          <span class="waitlist-orbit-ring" />
          <span class="waitlist-orbit-dot dot-one">A</span>
          <span class="waitlist-orbit-dot dot-two">J</span>
          <span class="waitlist-orbit-dot dot-three">R</span>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <span class="wordmark">peopl.</span><span>made for the in-between</span>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <a class="footer-link" href="/privacy">Privacy policy</a>
        <a class="footer-link" href="mailto:law@peopl.app">Law enforcement</a>
        <a class="footer-link" href="mailto:support@peopl.app">Support</a>
      </nav>
    </footer>

    <div class="page-grain" aria-hidden="true" />
  </div>
</template>

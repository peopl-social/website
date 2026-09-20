<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "#imports";
import BoardCard from "../components/BoardCard.vue";
import type { BoardFriend } from "../components/BoardCard.vue";
import GatheringCard from "../components/GatheringCard.vue";
import PhoneMockup from "../components/PhoneMockup.vue";

const pageRoot = ref<HTMLElement | null>(null);
const menuOpen = ref(false);
const menuPanelReady = ref(false);
const waitlistEmail = ref("");
const isJoined = ref(false);
const activeFriend = ref(0);
const activeSection = ref("");
const activeVisibility = ref("private");
let sectionObserver: IntersectionObserver | undefined;

const { $getLocale, $switchLocale, $t } = useI18n();
const currentLocale = computed(() => $getLocale());

const friends: BoardFriend[] = [
  {
    name: "Mara",
    initial: "M",
    color: "violet",
    status: "shared a board",
    note: "finished the demo. feel weird about it. proud?",
    voice: "0:12",
    voiceNote: "late-night voice memo",
    stickers: ["☾", "♡", "✦"],
    updated: "2d ago",
    visibility: "just us",
  },
  {
    name: "Jules",
    initial: "J",
    color: "orange",
    status: "planning friday",
    note: "found a rooftop for friday. bring a jacket.",
    voice: "0:31",
    voiceNote: "rooftop playlist draft",
    stickers: ["✷", "♫", "↗"],
    updated: "this morning",
    visibility: "link only",
  },
  {
    name: "Rae",
    initial: "R",
    color: "green",
    status: "free tonight",
    note: "made pasta. it was serious business.",
    voice: "0:07",
    voiceNote: "kitchen experiment №9",
    stickers: ["✎", "✦", "□"],
    updated: "1h ago",
    visibility: "public",
  },
];

const currentFriend = computed(() => friends[activeFriend.value] ?? friends[0]!);

const visibilityOptions = [
  {
    key: "private",
    title: "Private",
    tag: "just yours",
    copy: "Only you, or exactly the people you pick.",
  },
  {
    key: "unlisted",
    title: "Unlisted",
    tag: "link only",
    copy: "Share by link. Off feeds, off search.",
  },
  {
    key: "public",
    title: "Public",
    tag: "come on in",
    copy: "Anyone can wander in and look around.",
  },
];

const visibilityCaption = computed(
  () => visibilityOptions.find((option) => option.key === activeVisibility.value)?.copy ?? "",
);

const journeySteps = [
  "Your people",
  "What they’re sharing",
  "Talking it out",
  "Making plans",
  "Meeting in real life",
];

const nearbyPlans = [
  { name: "film night at Rae’s", when: "friday" },
  { name: "market run", when: "sunday morning" },
  { name: "rooftop, bring a jacket", when: "friday" },
];

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

const chooseFriend = (index: number) => {
  activeFriend.value = index;
};

const chooseVisibility = (key: string) => {
  activeVisibility.value = key;
};

const switchLocale = () => {
  $switchLocale(currentLocale.value === "fr" ? "en" : "fr");
};

const submitWaitlist = () => {
  if (!waitlistEmail.value || isJoined.value) return;
  isJoined.value = true;
};

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  for (const id of ["why", "features", "join"]) {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  }
});

onBeforeUnmount(() => {
  sectionObserver?.disconnect();
});
</script>

<template>
  <div ref="pageRoot" class="site-shell">
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="site-header">
      <nav class="site-nav" aria-label="Primary">
        <a class="nav-brand" href="#top" aria-label="peopl. home" @click="closeMenu">
          <span class="wordmark">peopl.</span>
        </a>

        <div class="nav-links">
          <a
            class="nav-link"
            :class="{ 'is-active': activeSection === 'why' }"
            :aria-current="activeSection === 'why' ? 'true' : undefined"
            href="#why"
            @click="closeMenu"
            >The problem</a
          >
          <a
            class="nav-link"
            :class="{ 'is-active': activeSection === 'features' }"
            :aria-current="activeSection === 'features' ? 'true' : undefined"
            href="#features"
            @click="closeMenu"
            >Features</a
          >
        </div>

        <a
          class="nav-cta"
          :class="{ 'is-active': activeSection === 'join' }"
          href="#join"
          @click="closeMenu"
          >Get updates</a
        >

        <button
          class="locale-switch"
          type="button"
          :aria-label="`Switch to ${currentLocale === 'fr' ? 'English' : 'French'}`"
          @click="switchLocale"
        >
          {{ currentLocale === "fr" ? "FR" : "EN" }}
        </button>

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
          <a class="mobile-menu-link" href="#join" @click="closeMenu">Join the early list</a>
        </div>
      </div>
    </Transition>

    <main id="main">
      <section id="top" class="hero section-shell" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="section-kicker hero-kicker hero-reveal">
            Early access &middot; a private social app
          </p>

          <h1 id="hero-title" class="hero-title hero-reveal">
            Make room for <span class="accent-word">your people.</span>
          </h1>

          <p class="hero-lead hero-reveal">
            {{ $t("hero.lead") }}
          </p>

          <div class="hero-actions hero-reveal">
            <form class="signup-form" @submit.prevent="submitWaitlist">
              <label class="sr-only" for="hero-email">Email address</label>
              <input
                id="hero-email"
                v-model="waitlistEmail"
                class="signup-input"
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                placeholder="you@email.com"
                :disabled="isJoined"
                required
              />
              <button class="button-primary" type="submit" :disabled="isJoined">
                {{ isJoined ? "You’re in" : "Join the early list" }}
              </button>
            </form>
            <p id="hero-reassurance" class="signup-reassurance">
              No spam. Just early-access invites and peopl. updates.
            </p>
            <p v-if="isJoined" class="signup-status" role="status">
              You’re on the list. We’ll keep it lovely.
            </p>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-wash" aria-hidden="true" />

          <article class="fragment fragment-board">
            <Transition name="board-swap" mode="out-in">
              <BoardCard :key="currentFriend.name" :friend="currentFriend" size="sm" />
            </Transition>
          </article>

          <div class="fragment fragment-people">
            <p class="fragment-title">your people &middot; {{ friends.length }} close</p>
            <ul class="people-list">
              <li v-for="(friend, index) in friends" :key="friend.name">
                <button
                  class="people-row"
                  :class="[`is-${friend.color}`, { 'is-active': activeFriend === index }]"
                  type="button"
                  :aria-pressed="activeFriend === index"
                  @click="chooseFriend(index)"
                >
                  <span class="people-avatar" aria-hidden="true">{{ friend.initial }}</span>
                  <span class="people-meta">
                    <strong>{{ friend.name }}</strong>
                    <small>{{ friend.status }}</small>
                  </span>
                </button>
              </li>
            </ul>
            <p class="fragment-hint">tap a friend to see their board</p>
          </div>

          <div class="fragment fragment-message">
            <p class="fragment-title">with Jules &middot; end-to-end encrypted</p>
            <div class="message-bubble is-incoming">are we still on for thursday?</div>
            <div class="message-bubble is-outgoing">yes — bringing the good bread</div>
          </div>

          <div class="fragment fragment-event">
            <GatheringCard size="sm" />
          </div>

          <p class="fragment-note note-board" aria-hidden="true">
            every friend has a board, <em>not a feed</em>
          </p>
          <p class="fragment-note note-event" aria-hidden="true">
            plans live here, <em>not in a 300-message thread</em>
          </p>
        </div>
      </section>

      <section id="why" class="problem section-shell" aria-labelledby="problem-title">
        <div class="problem-content">
          <p class="section-kicker">The problem</p>
          <h2 id="problem-title" class="problem-title reveal">
            Too much social. <span>Not enough close.</span>
          </h2>

          <p class="problem-body reveal">
            Social apps got big. Your circle didn&rsquo;t. Feeds chase attention, group chats bury
            the plan, and the things you&rsquo;d only tell five people end up sitting next to public
            posts.
          </p>

          <ul class="problem-ledger reveal">
            <li class="ledger-row">
              <span class="ledger-old">Feeds optimize for attention</span>
              <span class="ledger-arrow" aria-hidden="true">&rarr;</span>
              <span class="ledger-new">Boards your friends actually fill</span>
            </li>
            <li class="ledger-row">
              <span class="ledger-old">Plans get buried in chat</span>
              <span class="ledger-arrow" aria-hidden="true">&rarr;</span>
              <span class="ledger-new">Gatherings with their own place</span>
            </li>
            <li class="ledger-row">
              <span class="ledger-old">Private moments next to public posts</span>
              <span class="ledger-arrow" aria-hidden="true">&rarr;</span>
              <span class="ledger-new">Visibility you choose, per board</span>
            </li>
            <li class="ledger-row">
              <span class="ledger-old">An audience of strangers</span>
              <span class="ledger-arrow" aria-hidden="true">&rarr;</span>
              <span class="ledger-new">The handful who actually know you</span>
            </li>
          </ul>

          <p class="problem-close reveal">
            peopl. is deliberately built for a much smaller graph — the people you&rsquo;d actually
            call.
          </p>
        </div>

        <div class="problem-intro">
          <PhoneMockup class="problem-phone" />
        </div>
      </section>

      <section id="features" class="features section-shell" aria-labelledby="features-title">
        <header class="features-header">
          <div>
            <p class="section-kicker">What peopl. does</p>
            <h2 id="features-title" class="features-title reveal">Built around real life.</h2>
          </div>
          <p class="features-intro reveal">
            Four ideas, one small product. Together they add up to less scrolling and more seeing
            your people.
          </p>
        </header>

        <ol class="journey reveal" aria-label="How peopl. fits together">
          <li v-for="(step, index) in journeySteps" :key="step" class="journey-step">
            <span class="journey-index" aria-hidden="true">{{ index + 1 }}</span>
            <span class="journey-label">{{ step }}</span>
            <span v-if="index < journeySteps.length - 1" class="journey-arrow" aria-hidden="true"
              >&rarr;</span
            >
          </li>
        </ol>

        <article class="chapter chapter-board" aria-labelledby="chapter-board-title">
          <div class="chapter-copy">
            <h3 id="chapter-board-title">Moodboards, not feeds.</h3>
            <p>
              Each person has one active board — text, voice notes, stickers, the occasional
              half-finished thought. It changes when they change it. No algorithm, no infinite
              scroll, no performing for strangers.
            </p>
            <ul class="chapter-points">
              <li>one active board each</li>
              <li>text &middot; stickers &middot; voice notes</li>
              <li>nothing ranked, nothing endless</li>
            </ul>
          </div>

          <div class="chapter-demo">
            <div class="board-tabs" role="group" aria-label="Choose whose board to view">
              <button
                v-for="(friend, index) in friends"
                :key="friend.name"
                class="board-tab"
                :class="[`is-${friend.color}`, { 'is-active': activeFriend === index }]"
                type="button"
                :aria-pressed="activeFriend === index"
                @click="chooseFriend(index)"
              >
                <span class="board-tab-avatar" aria-hidden="true">{{ friend.initial }}</span>
                {{ friend.name }}
              </button>
            </div>

            <Transition name="board-swap" mode="out-in">
              <BoardCard :key="`lg-${currentFriend.name}`" :friend="currentFriend" size="lg" />
            </Transition>

            <p class="chapter-demo-caption">an active board, exactly as your friend left it</p>
          </div>
        </article>

        <article class="chapter chapter-doors" aria-labelledby="chapter-doors-title">
          <div class="chapter-copy">
            <h3 id="chapter-doors-title">Choose the door.</h3>
            <p>
              Every board gets a visibility setting, and you can change it whenever. Share the
              feeling at whatever pace feels right.
            </p>
            <p class="doors-caption" aria-live="polite">{{ visibilityCaption }}</p>
          </div>

          <div class="door-row" role="group" aria-label="Board visibility options">
            <button
              v-for="option in visibilityOptions"
              :key="option.key"
              class="door"
              :class="{ 'is-active': activeVisibility === option.key }"
              type="button"
              :aria-pressed="activeVisibility === option.key"
              @click="chooseVisibility(option.key)"
            >
              <span class="door-title">{{ option.title }}</span>
              <span class="door-tag">{{ option.tag }}</span>
              <span class="door-copy">{{ option.copy }}</span>
            </button>
          </div>
        </article>

        <article class="chapter chapter-events" aria-labelledby="chapter-events-title">
          <div class="chapter-copy">
            <h3 id="chapter-events-title">Make it in-person.</h3>
            <p>
              Create a gathering, see what your people are up to this week, and join the plans that
              pull you outside. peopl. is supposed to end in real life — more walks, less scrolling.
            </p>
            <div class="nearby-plans">
              <p class="fragment-title">this week nearby</p>
              <ul>
                <li v-for="plan in nearbyPlans" :key="plan.name">
                  <span>{{ plan.name }}</span>
                  <small>{{ plan.when }}</small>
                </li>
              </ul>
            </div>
          </div>

          <div class="chapter-demo">
            <GatheringCard size="lg" />
            <p class="chapter-demo-caption">one tap and the plan is on your calendar-aware radar</p>
          </div>
        </article>

        <article class="chapter chapter-messaging" aria-labelledby="chapter-messaging-title">
          <div class="chapter-copy">
            <h3 id="chapter-messaging-title">Keep it between you.</h3>
            <p class="messaging-lead">Your conversations stay between the people in them.</p>
            <p>
              Messages are end-to-end encrypted and travel through a relay that carries them without
              being able to read them.
            </p>

            <details class="messaging-details">
              <summary>How the relay works</summary>
              <p>
                Messages are encrypted on your device and only decrypted on your friend&rsquo;s. In
                between, they pass through a plaintext-blind relay — our server routes the encrypted
                traffic but never holds a readable copy. We can&rsquo;t read your conversations, and
                neither can anyone else.
              </p>
            </details>
          </div>

          <div class="chapter-demo">
            <div class="messaging-thread" aria-label="Example of a private conversation">
              <div class="message-bubble is-incoming">did you get home ok?</div>
              <div class="message-bubble is-outgoing">
                yes. telling you the whole story tomorrow
              </div>
              <p class="thread-tag">
                <span aria-hidden="true">&#10003;</span> end-to-end encrypted
              </p>
            </div>

            <div class="relay" aria-label="How messages travel">
              <span class="relay-node">you</span>
              <span class="relay-line" aria-hidden="true" />
              <span class="relay-node is-relay"
                >peopl. relay<em>carries, can&rsquo;t read</em></span
              >
              <span class="relay-line" aria-hidden="true" />
              <span class="relay-node">them</span>
            </div>
          </div>
        </article>
      </section>

      <section id="trust" class="trust section-shell" aria-labelledby="trust-title">
        <div class="trust-inner">
          <p class="section-kicker">The fine print</p>
          <h2 id="trust-title">Early, and honest about it.</h2>
          <p class="trust-body">
            peopl. is in early access. Right now the waitlist is all there is — it stores your email
            and uses it for peopl. updates and early-access invites. Nothing else.
          </p>
          <p class="trust-links">
            <NuxtLink class="trust-link" to="/privacy">Read the privacy policy</NuxtLink>
            <span aria-hidden="true">&middot;</span>
            <NuxtLink class="trust-link" to="/terms">Early-access terms</NuxtLink>
          </p>
        </div>
      </section>

      <section id="join" class="waitlist" aria-labelledby="waitlist-title">
        <div class="waitlist-inner section-shell">
          <div class="waitlist-copy">
            <p class="section-kicker is-violet">Come a little closer</p>
            <h2 id="waitlist-title" class="waitlist-title reveal">
              Your people are <span class="waitlist-accent">waiting.</span>
            </h2>
            <p class="waitlist-lead reveal">
              Leave your email and we&rsquo;ll send the good kind of update — early-access invites
              first.
            </p>

            <form
              class="signup-form is-violet"
              aria-label="Join the early list"
              @submit.prevent="submitWaitlist"
            >
              <label class="sr-only" for="cta-email">Email address</label>
              <input
                id="cta-email"
                v-model="waitlistEmail"
                class="signup-input"
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                placeholder="you@email.com"
                :disabled="isJoined"
                required
              />
              <button class="button-primary" type="submit" :disabled="isJoined">
                {{ isJoined ? "You’re in" : "Join the early list" }}
              </button>
            </form>
            <p class="signup-reassurance is-violet">
              No spam. Just early-access invites and peopl. updates.
            </p>
            <p v-if="isJoined" class="signup-status is-violet" role="status">
              You’re on the list. We’ll keep it lovely.
            </p>
          </div>

          <div class="waitlist-sticker" aria-hidden="true">
            <span class="sticker-spark">&#10033;</span>
            <span class="sticker-copy">stay close, softly.</span>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner section-shell">
        <div class="footer-brand">
          <span class="wordmark">peopl.</span>
          <p class="footer-tagline">made for the in-between</p>
          <p class="footer-fineprint">
            &copy; 2026 peopl. &middot; peopl.social &middot; early access
          </p>
        </div>

        <nav class="footer-links" aria-label="Footer">
          <div class="footer-group">
            <p class="footer-heading">Explore</p>
            <a class="footer-link" href="#why">The problem</a>
            <a class="footer-link" href="#features">Features</a>
            <a class="footer-link" href="#join">Get updates</a>
          </div>
          <div class="footer-group">
            <p class="footer-heading">Legal</p>
            <NuxtLink class="footer-link" to="/privacy">Privacy policy</NuxtLink>
            <NuxtLink class="footer-link" to="/terms">Terms</NuxtLink>
          </div>
          <div class="footer-group">
            <p class="footer-heading">Contact</p>
            <a class="footer-link" href="mailto:support@peopl.social">support@peopl.social</a>
          </div>
        </nav>
      </div>
    </footer>

    <div class="page-grain" aria-hidden="true" />
  </div>
</template>

<style>
.board-swap-enter-active,
.board-swap-leave-active {
  transition:
    opacity 320ms var(--ease-out),
    transform 380ms var(--ease-out);
}

.board-swap-enter-from {
  opacity: 0;
  transform: translateY(0.5rem) rotate(-1deg);
}

.board-swap-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem) rotate(1deg);
}
</style>

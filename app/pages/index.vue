<script setup lang="ts">
import { animate as animeAnimate } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Motion } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const pageRoot = ref<HTMLElement | null>(null)
const menuOpen = ref(false)
const menuPanelReady = ref(false)
const activeFeature = ref(0)
const quietMode = ref(false)
const waitlistEmail = ref('')
const isJoined = ref(false)
let cleanupMotion: (() => void) | undefined

const storyChapters = [
  {
    variant: 'circle' as const,
    title: 'Pick your people.',
    copy: 'Make your own little orbit. The people you want closer are always one tap away.',
    caption: 'Your world, with the noise turned down.',
  },
  {
    variant: 'plan' as const,
    title: 'Find the moment.',
    copy: 'Turn “we should” into a real plan without the group-chat archaeology.',
    caption: 'Small plans. Better odds of happening.',
  },
  {
    variant: 'recap' as const,
    title: 'Keep the thread.',
    copy: 'The little details stay close, so the good stuff does not disappear into the scroll.',
    caption: 'A soft place for the in-between.',
  },
]

const defaultChapter = storyChapters[0]!
const currentChapter = computed(() => storyChapters[activeFeature.value] ?? defaultChapter)

const revealTransition = (delay = 0) => ({
  duration: 0.9,
  delay,
  ease: [0.22, 1, 0.36, 1],
})

const closeMenu = () => {
  menuPanelReady.value = false
  menuOpen.value = false
}

const toggleMenu = () => {
  if (menuOpen.value) {
    closeMenu()
    return
  }

  menuOpen.value = true
  nextTick(() => {
    menuPanelReady.value = true
  })
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  closeMenu()
}

const chooseFeature = (index: number) => {
  activeFeature.value = index
}

const toggleQuietMode = () => {
  quietMode.value = !quietMode.value
}

const handleCardPointerMove = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement | null
  if (!card) return

  const bounds = card.getBoundingClientRect()
  card.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
  card.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
}

const submitWaitlist = () => {
  if (!waitlistEmail.value || isJoined.value) return

  isJoined.value = true
  nextTick(() => {
    animeAnimate('.waitlist-status', {
      opacity: [0, 1],
      scale: [0.86, 1],
      duration: 720,
      ease: 'outExpo',
    })
  })
}

onMounted(() => {
  if (!pageRoot.value) return

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number((entry.target as HTMLElement).dataset.index ?? 0)
        activeFeature.value = index
      })
    },
    { threshold: 0.55 },
  )

  pageRoot.value.querySelectorAll<HTMLElement>('.chapter-card').forEach((chapter) => {
    chapterObserver.observe(chapter)
  })

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    cleanupMotion = () => chapterObserver.disconnect()
    return
  }

  gsap.registerPlugin(ScrollTrigger)
  const context = gsap.context(() => {
    gsap.from('.hero-note', {
      opacity: 0,
      y: 18,
      rotate: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.7,
    })

    gsap.to('.hero-aura', {
      y: -26,
      scale: 1.06,
      duration: 4.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.hero-aura', {
      y: -70,
      scale: 1.12,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    gsap.to('.story-phone-shell', {
      y: -18,
      rotate: -1,
      scale: 1.03,
      scrollTrigger: {
        trigger: '.story-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.1,
      },
    })

    gsap.from('.feature-card', {
      opacity: 0,
      y: 34,
      duration: 1.05,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.feature-grid',
        start: 'top 82%',
        once: true,
      },
    })
  }, pageRoot.value)

  cleanupMotion = () => {
    chapterObserver.disconnect()
    context.revert()
  }
})

onBeforeUnmount(() => {
  cleanupMotion?.()
})
</script>

<template>
  <div ref="pageRoot" class="site-shell">
    <header class="site-header">
      <nav class="site-nav" aria-label="Primary navigation">
        <a class="nav-brand" href="#top" aria-label="peopl. home" @click="closeMenu">
          <span class="wordmark">peopl.</span>
        </a>

        <div class="nav-links">
          <a class="nav-link" href="#why" @click.prevent="scrollToSection('why')">Why peopl?</a>
          <a class="nav-link" href="#story" @click.prevent="scrollToSection('story')">The rhythm</a>
          <a class="nav-link" href="#features" @click.prevent="scrollToSection('features')">The details</a>
        </div>

        <a class="nav-cta" href="#join" @click.prevent="scrollToSection('join')">
          Get updates
        </a>

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
      <div v-if="menuOpen" id="mobile-menu" class="mobile-menu" @click.self="closeMenu" @keydown.esc="closeMenu">
        <div class="mobile-menu-panel" :class="{ 'is-ready': menuPanelReady }">
          <a class="mobile-menu-link" href="#why" @click="closeMenu">Why peopl?</a>
          <a class="mobile-menu-link" href="#story" @click="closeMenu">The rhythm</a>
          <a class="mobile-menu-link" href="#features" @click="closeMenu">The details</a>
          <a class="mobile-menu-link" href="#join" @click="closeMenu">Get updates</a>
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
            Social, with a pulse
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
            <a class="button-primary" href="#join" @click.prevent="scrollToSection('join')">
              Join the early list
            </a>
            <a class="button-quiet" href="#story" @click.prevent="scrollToSection('story')">
              See the rhythm
            </a>
          </Motion>

          <Motion
            as="div"
            class="hero-proof"
            :initial="{ opacity: 0, y: 18 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="revealTransition(0.53)"
          >
            <span class="mini-people" aria-hidden="true">
              <span class="mini-person">A</span>
              <span class="mini-person">J</span>
              <span class="mini-person">R</span>
            </span>
            <span>For the group chat you actually want to open.</span>
          </Motion>
        </div>

        <div class="hero-visual" aria-label="Preview of the peopl. app">
          <div class="hero-aura" aria-hidden="true" />
          <div class="hero-orbit" aria-hidden="true">
            <span class="orbit-label">for the in-between</span>
          </div>

          <div class="hero-phone-wrap">
            <PhoneMockup variant="home" label="peopl. home screen preview" />
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

      <section class="ticker-band" aria-label="peopl. principles">
        <div class="ticker-track">
          <span>less friction</span><span class="ticker-star">✳</span><span>more check-ins</span><span class="ticker-star">✳</span><span>small plans</span><span class="ticker-star">✳</span><span>good people</span><span class="ticker-star">✳</span>
          <span>less friction</span><span class="ticker-star">✳</span><span>more check-ins</span><span class="ticker-star">✳</span><span>small plans</span><span class="ticker-star">✳</span><span>good people</span><span class="ticker-star">✳</span>
        </div>
      </section>

      <section id="why" class="manifesto section-shell" aria-labelledby="manifesto-title">
        <div class="manifesto-intro">
          <p class="section-kicker">The point of it</p>
          <p>Designed for the plans that almost happen — and the people worth making time for.</p>
        </div>

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
            Your people, <span>in focus.</span>
          </Motion>
          <Motion
            as="p"
            class="manifesto-body"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition(0.12)"
          >
            The best parts of being social are rarely the loudest ones. peopl. gives those moments a little more room to happen.
          </Motion>

          <Motion
            as="div"
            class="manifesto-poster"
            :initial="{ opacity: 0, y: 34, rotate: 1 }"
            :while-in-view="{ opacity: 1, y: 0, rotate: -1.5 }"
            :viewport="{ once: true, amount: 0.2 }"
            :transition="revealTransition(0.18)"
          >
            <span class="poster-label">a little more human</span>
            <span class="poster-copy">Make room for the in-between.</span>
          </Motion>
        </div>
      </section>

      <section id="story" class="story-section section-shell" aria-labelledby="story-title">
        <div class="story-header">
          <div>
            <p class="section-kicker is-light">The good stuff lives between</p>
            <Motion
              as="h2"
              id="story-title"
              class="story-title"
              :initial="{ opacity: 0, y: 38 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true, amount: 0.3 }"
              :transition="revealTransition()"
            >
              A better rhythm for staying close.
            </Motion>
          </div>
          <Motion
            as="p"
            class="story-intro"
            :initial="{ opacity: 0, y: 22 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="revealTransition(0.13)"
          >
            Three small shifts that make keeping in touch feel less like work and more like life.
          </Motion>
        </div>

        <div class="story-layout">
          <div class="story-stage" aria-live="polite">
            <div class="story-stage-inner">
              <PhoneMockup
                class="story-phone-shell"
                :variant="currentChapter.variant"
                :label="`${currentChapter.title} app preview`"
              />
              <span class="stage-caption">{{ currentChapter.caption }}</span>
            </div>
          </div>

          <div class="story-chapters">
            <button
              v-for="(chapter, index) in storyChapters"
              :key="chapter.variant"
              class="chapter-card"
              :class="{ 'is-active': activeFeature === index }"
              type="button"
              :aria-pressed="activeFeature === index"
              :data-index="index"
              @click="chooseFeature(index)"
            >
              <span>
                <span class="chapter-title">{{ chapter.title }}</span>
                <span class="chapter-copy">{{ chapter.copy }}</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section id="features" class="details-section section-shell" aria-labelledby="details-title">
        <div class="details-heading">
          <div>
            <p class="section-kicker">The details matter</p>
            <Motion
              as="h2"
              id="details-title"
              class="details-title"
              :initial="{ opacity: 0, y: 38 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :viewport="{ once: true, amount: 0.3 }"
              :transition="revealTransition()"
            >
              Little things. Big feeling.
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
            A calm, colorful toolkit for making the everyday social stuff feel a little more intentional.
          </Motion>
        </div>

        <div class="feature-grid">
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
                <h3 class="feature-title">See who’s in.</h3>
                <p class="feature-description">A shared sense of the moment, without another noisy feed to keep up with.</p>
              </div>
              <div class="feature-ui" aria-hidden="true">
                <div class="sync-window">
                  <div class="sync-topline"><span>your circle</span></div>
                  <div class="sync-body">
                    <div class="avatar-row"><span class="avatar-chip">A</span><span class="avatar-chip">J</span><span class="avatar-chip">R</span><span class="avatar-chip">S</span></div>
                    <span class="sync-action">open orbit</span>
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
                <h3 class="feature-title">Keep the noise down.</h3>
                <p class="feature-description">Choose your own pace. Your people are still there when you look back up.</p>
              </div>
              <div class="quiet-card-visual" aria-hidden="true">
                <div class="quiet-bubble">dinner is still on</div>
                <div class="quiet-bubble">no rush, just here</div>
                <button class="quiet-toggle" :class="{ 'is-on': quietMode }" type="button" :aria-pressed="quietMode" @click="toggleQuietMode">
                  <span class="toggle-track" /><span>{{ quietMode ? 'quiet hours on' : 'quiet hours off' }}</span>
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
                <h3 class="feature-title">Give plans a pulse.</h3>
                <p class="feature-description">The nudge, the yes, the tiny details. It all stays in one warm little place.</p>
              </div>
              <div class="plan-window" aria-hidden="true">
                <div class="plan-topline"><span>next up</span><span>3 maybes</span></div>
                <p class="plan-title">sunset walk + something cold</p>
                <div class="plan-row"><span class="plan-day">18<br />SEP</span><span>Thursday · 6:30 PM<br />near your usual spot</span></div>
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
                <h3 class="feature-title">Remember the in-between.</h3>
                <p class="feature-description">The photo after the photo. The laugh nobody planned. The reason you’re glad you went.</p>
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
            <label class="sr-only" for="email">Email address</label>
            <input id="email" v-model="waitlistEmail" class="waitlist-input" type="email" autocomplete="email" placeholder="you@email.com" :disabled="isJoined" required />
            <button class="button-primary" type="submit" :disabled="isJoined">
              {{ isJoined ? 'You’re in' : 'Join the list' }}
            </button>
          </form>
          <p v-if="isJoined" class="waitlist-status" aria-live="polite">You’re on the list. We’ll keep it lovely.</p>
        </div>

        <div class="waitlist-sticker" aria-hidden="true">
          <span class="sticker-spark">✳</span>
          <span class="sticker-copy">stay close, softly.</span>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <span class="wordmark">peopl.</span><span>made for the in-between · 2026</span>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <a class="footer-link" href="#why">Why peopl?</a>
        <a class="footer-link" href="#story">The rhythm</a>
        <a class="footer-link" href="mailto:hello@peopl.app">Say hello</a>
      </nav>
    </footer>

    <div class="page-grain" aria-hidden="true" />
  </div>
</template>

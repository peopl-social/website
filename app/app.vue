<script setup lang="ts">
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/manrope";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
  ],
  meta: [
    {
      name: "theme-color",
      content: "#a991ff",
    },
  ],
});

useSeoMeta({
  title: "Aura — Make your mood visible",
  description:
    "Aura is a social space for collecting inspiration, making living moodboards, and finding people on your wavelength.",
  ogTitle: "Aura — Make your mood visible",
  ogDescription: "Collect what you love, build the mood, and share it with your people.",
  ogType: "website",
  twitterCard: "summary_large_image",
});

const year = new Date().getFullYear();
</script>

<template>
  <div id="top" class="site-shell">
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="header-wrap">
      <div class="site-header">
        <a class="brand" href="#top" aria-label="Aura home">
          <span class="brand-glyph" aria-hidden="true">
            <i></i>
            <b></b>
          </span>
          <span>AURA</span>
        </a>

        <nav class="site-nav" aria-label="Primary navigation">
          <a href="#features">Moodboards</a>
          <a href="#process">How it works</a>
          <a href="#principles">Why Aura</a>
        </nav>

        <a
          class="button button--peach button--header"
          href="https://github.com/isnotauralabs/app"
          target="_blank"
          rel="noreferrer"
        >
          Follow the build
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <path d="M4 9h10m-4-4 4 4-4 4" />
          </svg>
        </a>
      </div>
    </header>

    <main id="main-content">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="hero-sparkle hero-sparkle--left" aria-hidden="true">
          <span></span>
        </div>
        <div class="hero-sparkle" aria-hidden="true">
          <span></span>
        </div>

        <div class="hero__inner">
          <h1 id="hero-title" class="entrance">
            <span class="hero-title__line">Make your</span>
            <span class="hero-title__line hero-title__line--boxed">mood</span>
            <span class="hero-title__line hero-title__line--last">visible.</span>
          </h1>

          <div class="hero__bottom entrance">
            <p>
              Aura is where inspiration becomes connection. Collect what you love, shape it into
              living moodboards, and find people on your wavelength.
            </p>

            <div class="hero__actions">
              <a class="button button--lime button--large" href="#features">
                Explore moodboards
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M4 9h10m-4-4 4 4-4 4" />
                </svg>
              </a>
              <a class="underlink" href="#principles">Why Aura ↘</a>
            </div>
          </div>
        </div>
      </section>

      <div class="motion-ribbon" aria-label="Aura values">
        <div class="motion-ribbon__track">
          <span>COLLECT</span><i>✦</i> <span>CURATE</span><i>✦</i> <span>REMIX</span><i>✦</i>
          <span>CONNECT</span><i>✦</i> <span>COLLECT</span><i>✦</i> <span>CURATE</span><i>✦</i>
          <span>REMIX</span><i>✦</i> <span>CONNECT</span><i>✦</i>
        </div>
      </div>

      <section id="features" class="features section-pad" aria-labelledby="features-title">
        <div class="section-tag">
          <span>01</span>
          <p>Moodboards, made social</p>
        </div>

        <div class="features__intro">
          <h2 id="features-title">
            Collect the spark.
            <span>Build the mood.</span>
          </h2>
          <p>
            Save images, colors, links, places, and sounds in one expressive canvas. Build solo,
            invite friends, or publish a board for the whole community to discover.
          </p>
        </div>

        <div class="feature-grid">
          <article class="feature-panel feature-panel--signal">
            <div class="feature-panel__top">
              <span>A / 01</span>
              <p>Collect</p>
            </div>

            <div class="signal-art" aria-hidden="true">
              <span class="signal-art__ring signal-art__ring--one"></span>
              <span class="signal-art__ring signal-art__ring--two"></span>
              <span class="signal-art__ring signal-art__ring--three"></span>
              <i class="signal-art__beam"></i>
              <b class="signal-art__dot signal-art__dot--one"></b>
              <b class="signal-art__dot signal-art__dot--two"></b>
              <b class="signal-art__dot signal-art__dot--three"></b>
            </div>

            <div class="feature-panel__copy">
              <h3>Save what catches your eye.</h3>
              <p>
                Pull inspiration from anywhere. Every image, track, link, color, or thought stays
                ready for the board it belongs to.
              </p>
            </div>
          </article>

          <article class="feature-panel feature-panel--context">
            <div class="feature-panel__top">
              <span>A / 02</span>
              <p>Moodboards</p>
            </div>

            <div class="context-art" aria-hidden="true">
              <span class="context-art__word context-art__word--one">SAVE</span>
              <span class="context-art__word context-art__word--two">MIX</span>
              <span class="context-art__word context-art__word--three">SHARE</span>
              <i class="context-art__loop"></i>
              <b>✦</b>
            </div>

            <div class="feature-panel__copy">
              <h3>Turn sparks into a world.</h3>
              <p>
                Arrange freely, layer ideas, add notes, and keep changing the composition until the
                feeling in your head finally has a place to live.
              </p>
            </div>
          </article>

          <article class="feature-panel feature-panel--momentum">
            <div class="feature-panel__top">
              <span>A / 03</span>
              <p>Community</p>
            </div>

            <div class="momentum-art" aria-hidden="true">
              <span class="momentum-art__track"></span>
              <i class="momentum-art__node momentum-art__node--one">1</i>
              <i class="momentum-art__node momentum-art__node--two">2</i>
              <i class="momentum-art__node momentum-art__node--three">3</i>
              <b class="momentum-art__arrow">→</b>
            </div>

            <div class="feature-panel__copy">
              <h3>Find your people by vibe.</h3>
              <p>
                Share boards, follow people with magnetic taste, and remix the ideas that send you
                somewhere new.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="declaration" aria-labelledby="declaration-title">
        <div class="declaration__burst" aria-hidden="true">
          <span></span>
          <i>✦</i>
        </div>

        <div class="declaration__copy">
          <p>A feed with a point of view</p>
          <h2 id="declaration-title">
            Not another
            <span>endless scroll.</span>
          </h2>
        </div>

        <div class="declaration__notes">
          <p>Every post belongs to a bigger idea, a real person, and a mood worth remembering.</p>
          <div class="declaration__chips" aria-label="Moodboard ingredients">
            <span>Images</span>
            <span>Sounds</span>
            <span>Places</span>
            <span>People</span>
          </div>
        </div>
      </section>

      <section id="process" class="process section-pad" aria-labelledby="process-title">
        <div class="section-tag">
          <span>02</span>
          <p>How it works</p>
        </div>

        <div class="process__heading">
          <h2 id="process-title">
            Start with a spark.
            <span>Build a whole world.</span>
          </h2>
          <p>
            Moodboarding should feel loose, fast, and personal. Aura gets the controls out of the
            way so you can follow the feeling from first save to shared obsession.
          </p>
        </div>

        <div class="process-list">
          <article>
            <div class="process-number">01</div>
            <div class="process-copy">
              <p>Save</p>
              <h3>Catch what hits.</h3>
              <span>
                Save a post, photo, link, color, sound, or half-formed thought before the spark
                disappears.
              </span>
            </div>
            <div class="process-art process-art--connect" aria-hidden="true">
              <i></i><i></i><i></i><b></b>
            </div>
          </article>

          <article>
            <div class="process-number">02</div>
            <div class="process-copy">
              <p>Shape</p>
              <h3>Make the mood unmistakable.</h3>
              <span>
                Arrange without rigid templates, layer in notes, and invite friends to add their
                perspective.
              </span>
            </div>
            <div class="process-art process-art--understand" aria-hidden="true">
              <span>?</span>
              <i></i>
              <b>!</b>
            </div>
          </article>

          <article>
            <div class="process-number">03</div>
            <div class="process-copy">
              <p>Share</p>
              <h3>Put your vibe in motion.</h3>
              <span>
                Publish the board, send it to your circle, or let the community remix it into
                something you never expected.
              </span>
            </div>
            <div class="process-art process-art--move" aria-hidden="true">
              <span>POST</span>
              <i>→</i>
            </div>
          </article>
        </div>
      </section>

      <section id="principles" class="principles section-pad" aria-labelledby="principles-title">
        <div class="principles__header">
          <div class="section-tag section-tag--dark">
            <span>03</span>
            <p>Why Aura</p>
          </div>

          <h2 id="principles-title">
            Taste is
            <span>social.</span>
          </h2>
        </div>

        <div class="principles-grid">
          <article>
            <span>01</span>
            <h3>Your feed should feel like you.</h3>
            <p>
              Discovery grows from what you save, make, and love—not from whatever keeps everyone
              scrolling longest.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Moodboards are better together.</h3>
            <p>
              Invite friends into the canvas, build on each other’s references, and let a shared
              mood become its own language.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>People matter more than metrics.</h3>
            <p>
              Aura is designed for creative connection, not follower counts, empty engagement, or
              performing for an algorithm.
            </p>
          </article>
        </div>
      </section>

      <section class="closing" aria-labelledby="closing-title">
        <div class="closing__squiggle" aria-hidden="true">
          <svg viewBox="0 0 420 140">
            <path d="M8 74c56-82 99 79 157-1s106 78 160 0 79 13 87 51" />
          </svg>
        </div>

        <p>Your next obsession starts here</p>
        <h2 id="closing-title">
          Ready to make
          <span>your world?</span>
        </h2>
        <p class="closing__body">
          We’re building Aura in the open. Follow the work and help shape a more expressive,
          creative kind of social space.
        </p>
        <a
          class="button button--lime button--large"
          href="https://github.com/isnotauralabs/app"
          target="_blank"
          rel="noreferrer"
        >
          Follow the build
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <path d="M4 9h10m-4-4 4 4-4 4" />
          </svg>
        </a>
      </section>
    </main>

    <footer class="site-footer">
      <a class="brand brand--footer" href="#top" aria-label="Aura home">
        <span class="brand-glyph" aria-hidden="true">
          <i></i>
          <b></b>
        </span>
        <span>AURA</span>
      </a>

      <p>A social space for taste, mood, and people.</p>

      <div>
        <a href="https://github.com/isnotauralabs/app" target="_blank" rel="noreferrer"> GitHub </a>
        <span>© {{ year }} Aura Labs</span>
      </div>
    </footer>
  </div>
</template>

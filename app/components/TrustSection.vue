<script setup lang="ts">
import BuddyScene from "./BuddyScene.vue";
</script>

<template>
  <section id="trust" class="trust-section" aria-labelledby="trust-title">
    <div class="trust-inner section-shell">
      <div class="trust-heading">
        <p class="section-kicker">A little trust goes a long way</p>
        <h2 id="trust-title">Real people.<br />Warmer hellos.</h2>
        <p class="trust-intro">
          Feeling comfortable starts with knowing who's on the other side. People on peopl. are
          verified through multiple checks, so you can connect with more confidence.
        </p>
      </div>

      <div class="trust-illustration">
        <span class="trust-scene-label">Good to meet the real you.</span>
        <BuddyScene mode="verify" />
      </div>

      <div class="trust-details">
        <article>
          <span class="trust-number">01</span>
          <h3>More than one check.</h3>
          <p>
            Verification uses multiple measures to check users. Trust deserves more than a name and
            a profile picture.
          </p>
        </article>
        <article>
          <span class="trust-number">02</span>
          <h3>A more confident hello.</h3>
          <p>
            Verified people are at the heart of peopl., helping make the first conversation feel a
            little more comfortable.
          </p>
        </article>
        <article>
          <span class="trust-number">03</span>
          <h3>Your space. Your pace.</h3>
          <p>
            You still choose what to share. Keep your moodboard private, unlisted, or public, and
            open up when you're ready.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-section {
  background: #e6f0ef;
  border-block: 1px solid rgb(24 63 55 / 0.12);
}
.trust-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 3rem;
  padding-block: 6rem;
}
.trust-heading {
  min-width: 0;
}
.trust-heading h2 {
  margin: 1.25rem 0 1.5rem;
  font-size: 4.5rem;
  line-height: 1.04;
  font-weight: 590;
  letter-spacing: 0;
}
.trust-intro {
  max-width: 31rem;
  margin: 0;
  font-size: 1.22rem;
  line-height: 1.5;
  color: var(--ink-soft);
}
.trust-illustration {
  min-width: 0;
  padding-top: 2rem;
}
.trust-scene-label {
  display: block;
  text-align: center;
  color: var(--ink-soft);
  font-size: 0.85rem;
  font-weight: 600;
}
.trust-details {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgb(24 63 55 / 0.16);
}
.trust-details article {
  min-width: 0;
}
.trust-number {
  font-size: 0.72rem;
  font-weight: 650;
  color: var(--ink-soft);
}
.trust-details h3 {
  margin: 0.65rem 0;
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 650;
  letter-spacing: 0;
}
.trust-details p {
  margin: 0;
  max-width: 26rem;
  color: var(--ink-soft);
  font-size: 1.05rem;
  line-height: 1.5;
}
@media (max-width: 980px) {
  .trust-heading h2 {
    font-size: 3.5rem;
  }
  .trust-inner {
    gap: 2rem;
  }
}
@media (max-width: 720px) {
  .trust-inner {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-block: 4.5rem;
  }
  .trust-heading h2 {
    font-size: 3rem;
  }
  .trust-intro {
    font-size: 1.1rem;
  }
  .trust-illustration {
    padding-top: 1rem;
  }
  .trust-details {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    margin-top: 0;
  }
}
</style>

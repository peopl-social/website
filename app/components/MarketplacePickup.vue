<template>
  <div class="market" aria-label="Marketplace demo">
    <article class="listing">
      <p class="listing-kicker">fresh today · pickup only</p>
      <h4>sourdough ×4 — Mara's bake</h4>
      <p class="listing-meta">€6 / loaf · pickup at Saturday coffee & sketch walk</p>
      <div class="listing-foot">
        <span class="listing-tag">bread · local</span>
        <button class="listing-btn" type="button">Reserve + meet</button>
      </div>
    </article>

    <article class="listing is-service">
      <p class="listing-kicker">service · certified</p>
      <h4>sunrise yoga · 45 min in the park</h4>
      <p class="listing-meta">€12 · Lena, 200h RYT · mats included</p>
      <div class="listing-foot">
        <span class="listing-tag">class · Sat 8 AM</span>
        <button class="listing-btn" type="button">Book spot</button>
      </div>
    </article>

    <p class="market-note">transactions end in real life — no shipping, just neighbours.</p>
  </div>
</template>

<style scoped>
.market {
  display: grid;
  gap: 0.85rem;
  width: min(100%, 27rem);
  justify-self: center;
}
.listing {
  padding: 1.1rem;
  border: 1px solid rgb(var(--mauve-rgb) / 0.2);
  border-radius: 1.5rem;
  background: var(--card);
  box-shadow: 0 1.1rem 2.6rem rgb(var(--mauve-rgb) / 0.12);
  color: var(--ink);
}
.listing.is-service {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.listing-kicker {
  margin: 0;
  font-size: 0.64rem;
  font-weight: 740;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange-deep);
}
.is-service .listing-kicker {
  color: var(--green);
}
.listing h4 {
  margin: 0.35rem 0 0;
  font-family: "Geologica", sans-serif;
  font-size: 1.2rem;
  letter-spacing: -0.04em;
  line-height: 1.1;
}
.listing-meta {
  margin: 0.4rem 0 0;
  font-size: 0.87rem;
  opacity: 0.78;
}
.listing-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  margin-top: 0.9rem;
}
.listing-tag {
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-size: 0.7rem;
  font-weight: 700;
  opacity: 0.85;
}
.listing-btn {
  min-height: 2.4rem;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  border: 0.13rem solid var(--ink);
  background: var(--orange);
  color: var(--ink);
  font-size: 0.8rem;
  font-weight: 750;
  cursor: pointer;
}
.is-service .listing-btn {
  border-color: var(--paper);
}
.market-note {
  margin: 0.2rem 0 0;
  color: var(--ink-soft);
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
}
</style>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <a class="brand brand--footer" href="#top" aria-label="Aura home">
      <img class="brand-logo" src="/aura-logo.png" alt="" width="512" height="453" />
      <span>AURA</span>
    </a>

    <p>A social space for taste, mood, and people.</p>

    <div>
      <a href="https://github.com/isnotauralabs/app" target="_blank" rel="noreferrer">GitHub</a>
      <span>© {{ year }} Aura Labs</span>
    </div>
  </footer>
</template>

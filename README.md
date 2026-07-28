# Aura

A Nuxt landing page for Aura, a social app for creating, sharing, and discovering moodboards.
Powered by [Vite+](https://viteplus.dev).

## Requirements

Install the Vite+ CLI once:

```powershell
irm https://vite.plus/ps1 | iex
```

Open a new terminal after installation.

## Development

```bash
vp install
vp run dev
```

The local site runs at `http://localhost:3000`.

## Quality and production

```bash
vp check
vp run build
vp run preview
```

`vp check` formats, lints, and type-checks the project. Nuxt lifecycle commands
are package scripts, so they run through `vp run`.

## Stack

- Nuxt 4
- Vue 3
- Vite+ 0.2
- pnpm managed by Vite+

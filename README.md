# Kishan R Nair — Portfolio

A luxury editorial portfolio built with React 19, TanStack Start, Tailwind CSS v4, Three.js / React Three Fiber, Motion, and Radix UI.

## Features

- **Obsidian Espresso Design System**: Refined dark luxury palette with bespoke typography (Cormorant Garamond + DM Sans).
- **Interactive 3D Hero Mascot**: Aurum, an interactive 3D procedural mascot with real-time cursor tracking, expressive animated visor, spin/flip physics, and golden sparkle bursts.
- **Dynamic Interactive Components**: Custom glowing cursor tracker, skills conveyor, project case scenes, and smooth scroll reveals.
- **Modern Routing & SSR**: Full-stack TanStack Start router architecture.

## Development

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

### Build & Test

- **Lint**: `npm run lint`
- **Test**: `npm test`
- **Build**: `npm run build`

---

## Where to Edit Your Content

This portfolio is built so you can personalize everything from central data files:

| What | File | Description |
| --- | --- | --- |
| **Identity & Links** | `src/data/site.ts` | Name, wordmark, role, availability, email, and social links. |
| **Projects** | `src/data/projects.ts` | Add, edit, or remove project case studies, live links, and screenshot assets. |
| **Skills** | `src/data/skills.ts` | Infinite conveyor marquee rows and categorized lists on Home & About. |
| **Resume** | `src/data/resume.ts` | Single source of truth powering the `/resume` page, print view, and client-generated PDF. |
| **Hero Headline** | `src/routes/index.tsx` | Hero display title and supporting statement. |
| **About & Bio** | `src/routes/about.tsx` | Biography, portrait frame photo, timeline milestones, and personal philosophy. |
| **Contact** | `src/routes/contact.tsx` | Contact form with honeypot validation and mailto fallback. |

### Adding or Updating Projects
1. Open `src/data/projects.ts`.
2. Add or modify an entry with unique `slug` (this determines the URL: `/projects/<slug>`), title, role, summary, problem, process, outcome, and tools.
3. Configure `visual` or custom `images` (`desktop` and `mobile` screenshots in `public/projects/`).
4. Set `featured: true` to feature it on the home page.

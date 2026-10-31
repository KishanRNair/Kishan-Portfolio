# Architecture & Guidelines

This is a modern portfolio application built with TanStack Start, React 19, Tailwind CSS v4, Three.js / React Three Fiber, and TypeScript.

## Core Decisions & Patterns

- **Centralized Data Model**: All personalized content (name, projects, skills, resume, socials) lives in central files under `src/data/` — pages consume data instead of hardcoding personal content.
- **Client-only 3D Scenes**: Three.js canvases (Aurum mascot in `src/components/mascot/` integrated via `src/components/hero/MascotScene.tsx`, workstation diorama in `src/components/project-scenes/WorkstationScene.tsx`, and mini scenes in `src/components/project-scenes/MiniScene.tsx`) are client-only and lazy-imported inside `useEffect` behind WebGL capability checks with CSS fallbacks for SSR safety and zero hydration mismatches.
- **High-Performance Motion**: Hero pointer and scroll inputs are shared via mutable refs and read directly in `useFrame`, avoiding React re-renders per frame.
- **Single-Source Resume**: The resume page (`src/routes/resume.tsx`) and PDF generator (`src/lib/resume-pdf.ts` using `jspdf`) both source from `src/data/resume.ts`, keeping web layout, print view, and downloaded PDF synchronized.
- **TanStack Start Route Order**: Always define `loader` before `head` when `head` reads `loaderData`, ensuring full TypeScript type inference.

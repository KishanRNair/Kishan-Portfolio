/**
 * Resume data — EDIT THIS FILE.
 * This single file powers:
 *   1. The /resume page layout.
 *   2. The generated PDF download (built client-side from this data).
 *
 * All content below is PLACEHOLDER — replace with your real details.
 * Never invent employers, dates, qualifications, or achievements.
 */

export const resume = {
  name: "Kishan R Nair", // TODO: replace
  title: "Creative Developer & Design Engineer", // TODO: replace
  // TODO: replace contact details
  contacts: [
    { label: "Email", value: "hello@kishanrnair.dev", href: "mailto:hello@kishanrnair.dev" },
    { label: "Location", value: "Bengaluru, India" },
    { label: "GitHub", value: "github.com/your-handle", href: "https://github.com/your-handle" },
    { label: "LinkedIn", value: "linkedin.com/in/your-handle", href: "https://www.linkedin.com/in/your-handle" },
  ],
  summary:
    "Placeholder professional summary. Two or three sentences describing who you are, the kind of work you do, and what you are looking for. Replace this text with your own summary.",
  skills: [
    { group: "Frontend", items: "React, TypeScript, Tailwind CSS, Motion" },
    { group: "Graphics & 3D", items: "Three.js, React Three Fiber, GLSL" },
    { group: "Backend", items: "Node.js, REST APIs, PostgreSQL" },
    { group: "Tools", items: "Figma, Git, Vitest, CI/CD" },
  ],
  experience: [
    {
      role: "Placeholder — Job Title",
      company: "Placeholder — Company or Studio",
      period: "2025 — Present",
      points: [
        "Placeholder responsibility or achievement one. Describe scope and approach — do not invent metrics.",
        "Placeholder responsibility or achievement two.",
      ],
    },
    {
      role: "Placeholder — Job Title",
      company: "Placeholder — Company or Studio",
      period: "2023 — 2025",
      points: [
        "Placeholder responsibility or achievement one.",
        "Placeholder responsibility or achievement two.",
      ],
    },
  ],
  education: [
    {
      degree: "Placeholder — Degree or Program",
      school: "Placeholder — Institution",
      period: "2019 — 2023",
    },
  ],
  projects: [
    {
      name: "Placeholder Project One",
      note: "One-line placeholder describing the project and your part in it.",
    },
    {
      name: "Placeholder Project Two",
      note: "One-line placeholder describing the project and your part in it.",
    },
  ],
  certifications: [
    {
      name: "Placeholder — Certification Name",
      issuer: "Placeholder — Issuer, Year",
    },
  ],
};

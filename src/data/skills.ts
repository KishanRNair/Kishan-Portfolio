/**
 * Skills data — EDIT THIS FILE.
 * `conveyorRows` feed the continuously moving marquee rows.
 * `categories` feed the categorized list beneath them.
 * All entries are placeholders — replace with your real skills.
 */

export const conveyorRows: string[][] = [
  [
    "React",
    "TypeScript",
    "Three.js",
    "WebGL / GLSL",
    "Framer Motion",
    "Node.js",
    "Vite",
    "Tailwind CSS",
    "Design Systems",
    "Accessibility",
  ],
  [
    "UI Engineering",
    "Interaction Design",
    "Creative Coding",
    "Performance",
    "Responsive Design",
    "Git",
    "Testing",
    "CI / CD",
    "Figma",
    "Prototyping",
  ],
];

export const skillCategories: { name: string; items: string[] }[] = [
  {
    name: "Frontend",
    items: ["React", "TypeScript", "Next-style SSR", "Tailwind CSS", "Motion"],
  },
  {
    name: "Graphics & 3D",
    items: ["Three.js", "React Three Fiber", "GLSL shaders", "Canvas 2D"],
  },
  {
    name: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL", "Auth flows"],
  },
  {
    name: "Design & Tools",
    items: ["Figma", "Design systems", "Prototyping", "Git", "Vitest"],
  },
];

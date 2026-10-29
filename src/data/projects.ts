/**
 * Project data — EDIT THIS FILE to add, edit, or remove projects.
 * Each entry automatically gets a detail page at /projects/<slug>.
 *
 * `visual` chooses the preview treatment on list and detail pages:
 *   "orbit-product"  — interactive 3D product scene (WebGL)
 *   "tilt-browser"   — 2.5D browser mockup that tilts with the cursor
 *   "abstract-env"   — interactive 3D abstract environment (WebGL)
 *   "depth-layers"   — layered 2.5D composition with scroll depth
 *
 * All copy below is PLACEHOLDER content — replace it with your real work.
 * Never present fictional projects as real client work.
 */

export type ProjectVisual =
  | "orbit-product"
  | "tilt-browser"
  | "abstract-env"
  | "depth-layers"
  | "workstation-scene";

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  problem: string;
  role: string;
  tools: string[];
  process: string[];
  outcome: string;
  visual: ProjectVisual;
  featured: boolean;
  liveUrl?: string;
  images?: {
    desktop?: string;
    mobile?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "reflow-healthcare",
    title: "Re Flow Healthcare",
    category: "Web Application",
    year: "2024",
    summary:
      "A modern, responsive pharmaceutical platform and therapeutic formulation directory engineered for accessible healthcare.",
    description:
      "Designed and engineered an authoritative web presence for Re Flow Healthcare, an ethical pharmaceutical company founded in Cochin, Kerala. The platform showcases an accessible therapeutic catalog across General Medicines, Antihistamines, and Proton Pump Inhibitors with seamless navigation, responsive layouts, and an inquiry system.",
    problem:
      "The brand required an authoritative, trustworthy digital platform to communicate its quality standards, WHO-GMP aligned manufacturing ethos, and therapeutic portfolio to distributors, clinicians, and patients across India.",
    role: "Frontend Architecture & UI/UX Engineering",
    tools: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Responsive Design",
      "Structured Data (JSON-LD)",
    ],
    process: [
      "Structured an intuitive therapeutic catalog highlighting formulations with rapid search and category browsing.",
      "Crafted an accessible, mobile-first design system utilizing Plus Jakarta Sans and Inter typography with crisp healthcare blue tones.",
      "Implemented Schema.org JSON-LD structured data and modern meta tags for optimized search visibility and discoverability.",
    ],
    outcome:
      "Shipped a fast, polished web platform that strengthens brand credibility and streamlines doctor and distributor inquiries.",
    visual: "tilt-browser",
    featured: true,
    liveUrl: "https://reflowhealthcare.com",
    images: {
      desktop: "/projects/reflow/desktop.png",
      mobile: "/projects/reflow/mobile.png",
    },
  },
  {
    slug: "enterprise-sustainability-saas",
    title: "Enterprise Sustainability Platform",
    category: "Enterprise SaaS · Web Platform",
    year: "2024",
    summary:
      "A comprehensive enterprise sustainability platform enabling organizations to measure, track, and report Scope 1–3 emissions with gamified compliance benchmarks.",
    description:
      "Engineered the frontend architecture and user interface for an enterprise sustainability SaaS application. The platform streamlines environmental impact accounting, automated ESG data collection, carbon footprint auditing, and executive dashboards for multi-national corporate sustainability governance.",
    problem:
      "Modern corporations face complex ESG compliance reporting mandates that are fragmented across spreadsheets and siloed legacy systems. The goal was to build a cohesive, responsive web platform that makes carbon accounting intuitive, auditable, and actionable.",
    role: "Frontend Architecture & UI Engineering",
    tools: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Three.js",
      "Motion",
      "REST APIs",
    ],
    process: [
      "Engineered an enterprise design system supporting high-density carbon analytics, dynamic data grids, and audit workflows.",
      "Designed real-time data visualization components for tracking organizational emissions trends across Scopes 1, 2, and 3.",
      "Built responsive, accessible interfaces with dark/light themes and strict type-safe state management.",
    ],
    outcome:
      "Delivered a production-ready enterprise application empowering corporate teams to centralize sustainability metrics and automate audit-ready reporting.",
    visual: "workstation-scene",
    featured: true,
    images: {
      desktop: "/projects/sustainability/landing-hero.png",
      mobile: "/projects/sustainability/landing.png",
    },
  },
  {
    slug: "placeholder-monolith",
    title: "Monolith — Placeholder Project",
    category: "Creative Coding",
    year: "2025",
    summary:
      "Placeholder summary. One line about the experiment or experience.",
    description:
      "Placeholder overview. Describe the creative idea, the technique, and the result in two to three sentences.",
    problem:
      "Placeholder objective. The design or technical question you explored.",
    role: "Placeholder — e.g. Design, Code & Motion",
    tools: ["Three.js", "GLSL", "Motion", "Placeholder Tool"],
    process: [
      "Placeholder process step one.",
      "Placeholder process step two.",
      "Placeholder process step three.",
    ],
    outcome: "Placeholder outcome or learnings.",
    visual: "abstract-env",
    featured: true,
  },
  {
    slug: "placeholder-meridian",
    title: "Meridian — Placeholder Project",
    category: "Brand & Interface",
    year: "2024",
    summary:
      "Placeholder summary. One line about the identity or interface work.",
    description:
      "Placeholder overview. Two to three sentences about the brand or interface system and your role in it.",
    problem:
      "Placeholder objective. What the brand or product needed.",
    role: "Placeholder — e.g. Design & Development",
    tools: ["Figma", "React", "CSS", "Placeholder Tool"],
    process: [
      "Placeholder process step one.",
      "Placeholder process step two.",
      "Placeholder process step three.",
    ],
    outcome: "Placeholder outcome or learnings.",
    visual: "depth-layers",
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectNeighbors(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}

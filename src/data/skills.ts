/**
 * Skills data — EDIT THIS FILE.
 * `conveyorRows` feed the continuously moving marquee rows.
 * `categories` feed the categorized list beneath them.
 * All entries are placeholders — replace with your real skills.
 */

export const conveyorRows: string[][] = [
  [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Python",
    "NestJS",
    "PostgreSQL",
    "LangChain",
    "Tailwind CSS",
    "WebGL / Shaders",
  ],
  [
    "Full-Stack Architecture",
    "AI/ML & LLMs",
    "Power BI",
    "REST APIs & JWT",
    "Data Analytics",
    "ETL Pipelines",
    "Creative Tech",
    "AWS & GCP",
    "Git",
    "Responsive Design",
  ],
];

export const skillCategories: { name: string; items: string[] }[] = [
  {
    name: "Frontend & Creative Tech",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "GLSL Shaders",
      "Tailwind CSS",
      "Motion",
    ],
  },
  {
    name: "Backend & Systems",
    items: [
      "Node.js",
      "NestJS",
      "REST APIs",
      "JWT Authentication",
      "PostgreSQL",
      "SQL",
      "Database Modeling",
    ],
  },
  {
    name: "AI/ML & Multi-Agent Systems",
    items: [
      "Python",
      "LangChain",
      "Multi-Agent Architecture",
      "NLP",
      "LLM Integration",
      "Machine Learning",
      "Text-to-SQL",
    ],
  },
  {
    name: "Data Analytics, BI & Cloud",
    items: [
      "Power BI",
      "Advanced Excel",
      "ETL Pipelines",
      "EDA & Preprocessing",
      "AWS",
      "GCP",
      "Git",
      "Streamlit",
    ],
  },
];

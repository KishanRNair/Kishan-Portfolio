/**
 * Resume data — Single source of truth.
 * This file powers:
 *   1. The /resume page layout.
 *   2. The generated PDF download (built client-side via jsPDF).
 */

export const resume = {
  name: "Kishan R Nair",
  title: "Full-Stack Developer | AI/ML Engineer | Data Analyst",
  contacts: [
    { label: "Location", value: "Kochi, Kerala, India" },
    { label: "Phone", value: "+91 8848045083", href: "tel:+918848045083" },
    { label: "Email", value: "kishanrnairwork@gmail.com", href: "mailto:kishanrnairwork@gmail.com" },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/kishan-r-nair-76a183268",
      href: "https://www.linkedin.com/in/kishan-r-nair-76a183268",
    },
  ],
  summary:
    "Computer Science (Data Science) professional with hands-on experience across full-stack web development, AI/ML, data analytics, and interactive 3D web technologies (Three.js/WebGL). Experienced in architecting production web applications using React, Next.js, TypeScript, NestJS, Node.js, and PostgreSQL, alongside developing LangChain-powered multi-agent AI systems, automated ETL pipelines, and high-impact Power BI executive dashboards.",
  skills: [
    { group: "Languages", items: "Python, Java, JavaScript, TypeScript, SQL" },
    {
      group: "Frontend & 3D",
      items:
        "React.js, Next.js, Three.js, React Three Fiber, GLSL Shaders, HTML5, CSS3, Tailwind CSS, Motion",
    },
    { group: "Backend", items: "Node.js, NestJS, REST APIs, JWT, PostgreSQL, SQL" },
    {
      group: "AI/ML & Agents",
      items:
        "Machine Learning, LangChain, Multi-Agent Systems, NLP, LLMs, Text-to-SQL, Regression, Classification",
    },
    {
      group: "Data & BI",
      items: "Power BI, Excel, ETL, EDA, Data Cleaning, Data Preprocessing, Statistical Analysis",
    },
    { group: "Cloud & Tools", items: "AWS, GCP, Git, Vite, Streamlit, Vitest" },
  ],
  experience: [
    {
      role: "ESG Associate",
      company: "SAM Corporate · Kochi, Kerala",
      period: "Feb 2026 — Present",
      points: [
        "Developed Green Quest, a full-stack ESG and carbon-tracking platform using React/Next.js, TypeScript, NestJS, PostgreSQL, REST APIs, and JWT authentication.",
        "Built authentication, dashboards, carbon tracking, gamification, challenges, leaderboards, learning modules, quizzes, and admin functionality.",
        "Developed Power BI dashboards, improving ESG reporting efficiency by approximately 60%.",
        "Processed and validated ESG datasets, reducing data inconsistencies by approximately 30%.",
        "Addressed application security findings, authentication issues, dependency risks, and production-readiness requirements.",
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Paleri Business Info Solutions LLP · Kochi, Kerala",
      period: "Jul 2025 — Dec 2025",
      points: [
        "Cleaned, transformed, and analyzed supply-chain datasets, improving data quality by approximately 40%.",
        "Developed dashboards and analytical reports to generate actionable business insights.",
        "Performed data preprocessing, EDA, visualization, and reporting for business decision-making.",
        "Led a cross-functional team of 20 members to deliver analytics solutions within deadlines.",
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Keltron REC · Kochi, Kerala",
      period: "Jun 2025 — Jul 2025",
      points: [
        "Designed interactive Power BI dashboards for large datasets and improved reporting workflows.",
        "Applied advanced Excel techniques for data cleaning, transformation, and analysis.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech — Computer Science and Engineering (Data Science): 7.11 CGPA",
      school: "SCMS School of Engineering and Technology, Kerala",
      period: "2022 — 2026",
    },
    {
      degree: "Higher Secondary (Class XII: 89% | Class X: 88.8%)",
      school: "Chinmaya Vidyalaya, Thripunithura",
      period: "2020 — 2022",
    },
  ],
  projects: [
    {
      name: "Full-Stack ESG & Carbon Platform",
      note: "Production enterprise application built with React/Next.js, NestJS, PostgreSQL, TypeScript, REST APIs, and JWT with carbon tracking and gamification.",
    },
    {
      name: "AVANA — Multi-Agent AI Data Science System",
      note: "Python/LangChain multi-agent system automating data preprocessing, ML workflows, analysis, and dashboard generation with NLP natural-language-to-SQL.",
    },
    {
      name: "Interactive 3D Portfolio & Aurum Mascot",
      note: "Real-time WebGL experience engineered with Three.js, React Three Fiber, GLSL shaders, procedural animation, and responsive 2.5D device showcases.",
    },
    {
      name: "Re Flow Healthcare",
      note: "Accessible ethical pharmaceutical formulation directory with rapid search, structured JSON-LD data, and mobile-first architecture.",
    },
    {
      name: "Vian's Kitch Hub",
      note: "High-converting Shopify e-commerce platform with custom navigation, slide-out cart drawers, and responsive design for Indian culinary products.",
    },
    {
      name: "Jarvis AI Assistant",
      note: "Python voice-controlled AI assistant with API integration, web search, automation, and real-time task execution.",
    },
  ],
  certifications: [
    {
      name: "Data Analysis with Python | Python for Data Science",
      issuer: "Infosys Springboard",
    },
  ],
};

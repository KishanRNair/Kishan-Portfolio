import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Eyebrow, PageShell, Reveal, WordsReveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { skillCategories } from "@/data/skills";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kishan R Nair" },
      {
        name: "description",
        content:
          "About Kishan R Nair — creative developer and design engineer. Background, focus areas, and philosophy.",
      },
      { property: "og:title", content: "About — Kishan R Nair" },
      {
        property: "og:description",
        content: "Background, focus areas, and philosophy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

/* Dimensional portrait placeholder — layered frame with pointer tilt.
   Replace the inner composition with your own photo later. */
function PortraitFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--tilt-y", `${px * 9}deg`);
    ref.current.style.setProperty("--tilt-x", `${-py * 7}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--tilt-y", "0deg");
    ref.current?.style.setProperty("--tilt-x", "0deg");
  };

  return (
    <div className="scene-3d mx-auto w-full max-w-sm">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="scene-3d-inner relative aspect-[4/5] rounded-xl border border-border bg-card shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]"
      >
        {/* Floating typographic layer behind */}
        <span
          aria-hidden
          className="absolute -left-8 -top-8 select-none font-display text-7xl italic text-primary/30"
          style={{ transform: "translateZ(50px)" }}
        >
          KR
        </span>
        {/* Portrait container with subtle luxury framing & depth */}
        <div
          className="group absolute inset-3 sm:inset-4 overflow-hidden rounded-lg border border-primary/25 bg-card shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
          style={{
            transform: "translateZ(32px)",
          }}
        >
          <img
            src="/images/portrait.jpg"
            alt="Kishan R Nair"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="eager"
          />
          {/* Subtle editorial vignette & specular sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-75" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent" />
        </div>
        {/* Champagne ring accent */}
        <div
          aria-hidden
          className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border border-primary/40"
          style={{ transform: "translateZ(60px)" }}
        />
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-36 md:pb-36 md:pt-44">
        {/* Intro */}
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <h1 className="text-display mt-6 font-display font-medium text-foreground">
                <WordsReveal text="Design-minded developer, code-minded designer." />
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  I am a Computer Science & Data Science engineer and full-stack developer
                  based in Kochi, Kerala. My work lives at the intersection of robust backend
                  systems, artificial intelligence, and cinematic frontend design.
                </p>
                <p>
                  From engineering production full-stack enterprise platforms at SAM Corporate
                  with React, Next.js, NestJS, and PostgreSQL, to orchestrating multi-agent AI
                  pipelines with LangChain and Python, and sculpting real-time 3D interactive
                  WebGL worlds with Three.js—I craft digital products where architectural
                  rigor meets fluid, responsive aesthetics.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View resume
                </Link>
                <Link
                  to="/contact"
                  className="link-line inline-flex items-center gap-2 py-2.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact me
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <PortraitFrame />
            </Reveal>
          </div>
        </div>

        {/* Focus areas + expertise */}
        <div className="mt-28 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Interests & focus</Eyebrow>
              <ul className="mt-8 space-y-4">
                {[
                  "Full-stack architecture & enterprise platforms (React, Next.js, NestJS, PostgreSQL)",
                  "Interactive 3D web experiences, creative coding & shaders (Three.js, WebGL)",
                  "AI/ML engineering, multi-agent systems & NLP workflows (LangChain, Python)",
                  "Enterprise data analytics, ETL pipelines & BI intelligence (Power BI, SQL)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-muted-foreground"
                  >
                    <span className="h-px w-5 shrink-0 translate-y-[-0.3rem] bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <Eyebrow>Areas of expertise</Eyebrow>
              <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {skillCategories.map((cat) => (
                  <div key={cat.name}>
                    <p className="font-medium text-foreground">{cat.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {cat.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <Reveal>
            <Eyebrow>Milestones & Career Journey</Eyebrow>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              A chronological trajectory across software engineering, data analytics, and enterprise systems.
            </p>
          </Reveal>
          <div className="mt-10 border-l border-border pl-8">
            {[
              {
                period: "Feb 2026 — Present",
                title: "ESG Associate · SAM Corporate",
                note: "Architecting full-stack ESG applications, carbon tracking engines, and executive Power BI analytics dashboards.",
              },
              {
                period: "Jul 2025 — Dec 2025",
                title: "Data Analyst Intern · Paleri Business Info Solutions",
                note: "Led a cross-functional 20-member analytics team, optimized supply-chain data pipelines, and engineered business intelligence reports.",
              },
              {
                period: "Jun 2025 — Jul 2025",
                title: "Data Analyst Intern · Keltron REC",
                note: "Engineered interactive reporting dashboards and implemented advanced automated data transformation pipelines.",
              },
              {
                period: "2022 — 2026",
                title: "B.Tech in Computer Science & Engineering (Data Science) · SCMS",
                note: "Graduating with 7.11 CGPA, specializing in full-stack web engineering, artificial intelligence, and data modeling.",
              },
            ].map((entry, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="print-break relative pb-12 last:pb-0">
                  <span className="absolute -left-[2.17rem] top-1.5 h-2 w-2 rounded-full bg-primary" />
                  <p className="eyebrow text-primary">{entry.period}</p>
                  <p className="mt-2 font-medium text-foreground">{entry.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <Reveal className="mt-28">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 md:p-14">
            <div
              aria-hidden
              className="drift-slow absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.3 0.04 60 / 40%), transparent)",
              }}
            />
            <p className="eyebrow text-primary">Philosophy</p>
            <blockquote className="mt-6 max-w-2xl font-display text-2xl italic leading-snug text-foreground md:text-3xl">
              "Engineering precision gives systems durability; editorial design and real-time interaction make them unforgettable."
            </blockquote>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}

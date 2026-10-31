import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroStage } from "@/components/hero/HeroStage";
import {
  Eyebrow,
  PageShell,
  Reveal,
  WordsReveal,
} from "@/components/Reveal";
import { SkillsConveyor } from "@/components/SkillsConveyor";
import { ProjectVisual } from "@/components/ProjectVisual";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { useWebGL } from "@/hooks/useWebGL";

const MascotScene = lazy(() => import("@/components/hero/MascotScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Kishan R Nair — Creative Developer & Design Engineer",
      },
      {
        name: "description",
        content:
          "A cinematic, interactive portfolio by Kishan R Nair: selected projects, approach, and a downloadable resume.",
      },
      {
        property: "og:title",
        content: "Kishan R Nair — Creative Developer & Design Engineer",
      },
      {
        property: "og:description",
        content:
          "Selected projects, an interactive 3D hero, and a downloadable resume.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const webgl = useWebGL();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <PageShell>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Ambient atmospheric backdrop */}
        <HeroStage className="absolute inset-0 pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-16 md:py-32">
          <div className="grid items-center gap-8 md:grid-cols-12 lg:gap-12">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="md:col-span-7 lg:col-span-7 xl:col-span-7">
              <p className="eyebrow text-primary">
                {site.availability} · {site.location}
              </p>
              <h1 className="text-hero mt-6 font-display font-medium text-foreground">
                <WordsReveal text="I build digital experiences that feel alive." />
              </h1>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground">
                {/* TODO: replace with your own supporting statement */}
                {site.name} — {site.role}. Placeholder statement: crafting
                interfaces where engineering precision meets editorial design.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explore My Work
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  to="/resume"
                  className="link-line text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  View Resume
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Interactive Mascot */}
            <div className="md:col-span-5 lg:col-span-5 xl:col-span-5 flex items-center justify-center pt-4 md:pt-0">
              {mounted && webgl ? (
                <Suspense fallback={null}>
                  <MascotScene scale={0.82} />
                </Suspense>
              ) : null}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
        >
          <span className="flex flex-col items-center gap-2">
            <span className="eyebrow text-[0.6rem]">Scroll</span>
            <ArrowDown size={14} className="animate-bounce" />
          </span>
        </div>
      </section>

      {/* ---------- Introduction ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal>
          <Eyebrow>Introduction</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-12">
          <h2 className="text-display font-display font-medium text-foreground md:col-span-8">
            <WordsReveal text="A studio practice at the intersection of design, code, and motion." />
          </h2>
          <div className="md:col-span-4 md:pt-4">
            <Reveal delay={0.15}>
              {/* TODO: replace with your own introduction */}
              <p className="text-muted-foreground">
                Placeholder introduction — a short paragraph about who you are,
                the kind of work you do, and what drives it. Keep it personal
                and specific rather than corporate.
              </p>
              <Link
                to="/about"
                className="link-line mt-6 inline-block text-sm text-primary"
              >
                More about me
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Selected projects ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-28 md:pb-36">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <Eyebrow>Selected Projects</Eyebrow>
            <Link
              to="/projects"
              className="link-line hidden text-sm text-muted-foreground hover:text-foreground md:inline-block"
            >
              All projects
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 space-y-24 md:space-y-32">
          {featured.map((project, i) => (
            <Reveal key={project.slug}>
              <article
                className={`grid items-center gap-8 md:grid-cols-12 ${
                  i % 2 === 1 ? "" : ""
                }`}
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className={`block md:col-span-7 ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="group relative aspect-[16/11] overflow-hidden rounded-xl border border-border bg-card">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ProjectVisual
                        visual={project.visual}
                        project={project}
                        className="h-full w-full rounded-none border-0"
                      />
                    </div>
                  </div>
                </Link>
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1 md:pr-4" : "md:pl-4"}`}>
                  <p className="eyebrow text-primary">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="text-title mt-4 font-display font-medium text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm text-primary"
                  >
                    View project
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Skills ---------- */}
      <section className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="text-title mt-6 max-w-2xl font-display font-medium text-foreground">
              <WordsReveal text="A toolkit spanning engineering, design, and motion." />
            </h2>
          </Reveal>
          <div className="mt-10">
            <SkillsConveyor />
          </div>
          <Reveal delay={0.1}>
            <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {skillCategories.map((cat) => (
                <div key={cat.name}>
                  <p className="eyebrow text-primary">{cat.name}</p>
                  <ul className="mt-4 space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal>
          <Eyebrow>Approach</Eyebrow>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Design is engineering",
              // TODO: replace with your own principles
              body: "Placeholder principle — every animation, spacing value, and interaction is a deliberate decision, not decoration.",
            },
            {
              n: "02",
              title: "Feel over features",
              body: "Placeholder principle — the way something responds matters as much as what it does. Motion carries meaning.",
            },
            {
              n: "03",
              title: "Build for real people",
              body: "Placeholder principle — accessible, fast, and readable first; expressive second. Never at the cost of usability.",
            },
          ].map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12}>
              <div>
                <span className="font-display text-4xl italic text-primary/60">
                  {p.n}
                </span>
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden
          className="drift-slow absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.3 0.04 60 / 45%), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center md:py-36">
          <Reveal>
            <h2 className="text-display mx-auto max-w-3xl font-display font-medium text-foreground">
              <WordsReveal text="Have an idea worth building?" />
            </h2>
            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in touch
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

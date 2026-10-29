import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageShell, Reveal, WordsReveal } from "@/components/Reveal";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Kishan R Nair" },
      {
        name: "description",
        content:
          "Selected projects and case studies — interactive experiences, web applications, and creative coding experiments.",
      },
      { property: "og:title", content: "Projects — Kishan R Nair" },
      {
        property: "og:description",
        content:
          "Selected projects and case studies with interactive 3D and 2.5D previews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-36 md:pb-36 md:pt-44">
        <Reveal>
          <p className="eyebrow text-primary">Portfolio</p>
          <h1 className="text-display mt-6 max-w-3xl font-display font-medium text-foreground">
            <WordsReveal text="Work, experiments, and things built for the joy of building." />
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Placeholder introduction — a short description of what visitors will
            find here. All projects below are clearly labeled placeholders
            waiting for your real work.
          </p>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  filter === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery — mixed sizes, not identical cards */}
        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-x-10">
          {visible.map((project, i) => {
            const wide = i % 3 !== 2; // every third entry is narrower
            return (
              <Reveal
                key={project.slug}
                delay={(i % 2) * 0.08}
                className={wide ? "md:col-span-7" : "md:col-span-5"}
              >
                <article>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group block"
                  >
                    <ProjectVisual
                      visual={project.visual}
                      project={project}
                      className={`aspect-[4/3] ${wide ? "md:aspect-[16/11]" : ""}`}
                    />
                    <div className="mt-6 flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow text-primary">
                          {project.category} · {project.year}
                        </p>
                        <h2 className="text-title mt-2 font-display font-medium text-foreground">
                          {project.title}
                        </h2>
                        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                          {project.summary}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

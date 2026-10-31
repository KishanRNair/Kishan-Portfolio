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
            A curated selection of shipped client platforms, enterprise SaaS applications, and e-commerce systems engineered for performance and reliability.
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

        {/* Projects List — Sequential side-by-side alignment (left card, right info) */}
        <div className="mt-16 space-y-20 md:space-y-28">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <article className="grid items-center gap-8 md:grid-cols-12 lg:gap-12">
                {/* Left Side: 2.5D Device Showcase Card (Exact same dimensions as home page) */}
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="block md:col-span-7"
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

                {/* Right Side: Project Info */}
                <div className="md:col-span-5 md:pl-2">
                  <p className="eyebrow text-primary">{project.category}</p>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group block"
                  >
                    <h2 className="text-title mt-3 font-display font-medium text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h2>
                  </Link>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  {/* Tools Badges */}
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

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      View project
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Live site
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

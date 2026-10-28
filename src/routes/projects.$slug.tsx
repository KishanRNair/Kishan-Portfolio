import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell, Reveal, WordsReveal } from "@/components/Reveal";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProject, projectNeighbors } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.project.title} — Kishan R Nair`
          : "Project — Kishan R Nair",
      },
      {
        name: "description",
        content: loaderData?.project.summary ?? "Project case study.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.project.title} — Kishan R Nair` : "Project",
      },
      {
        property: "og:description",
        content: loaderData?.project.summary ?? "Project case study.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const { prev, next } = projectNeighbors(project.slug);

  return (
    <PageShell>
      <article className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pt-44">
        <Link
          to="/projects"
          className="link-line inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} />
          All projects
        </Link>

        <header className="mt-10">
          <p className="eyebrow text-primary">
            {project.category} · {project.year}
          </p>
          <h1 className="text-display mt-4 max-w-3xl font-display font-medium text-foreground">
            <WordsReveal text={project.title} />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {project.summary}
          </p>
        </header>

        {/* Large hero visual */}
        <Reveal className="mt-14">
          <ProjectVisual visual={project.visual} className="aspect-[16/9]" />
        </Reveal>

        {/* Meta grid */}
        <Reveal className="mt-16">
          <div className="grid gap-8 border-y border-border py-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow text-muted-foreground">My role</p>
              <p className="mt-2 text-sm text-foreground">{project.role}</p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Tools & technologies</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Year</p>
              <p className="mt-2 text-sm text-foreground">{project.year}</p>
            </div>
          </div>
        </Reveal>

        {/* Narrative sections */}
        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <div className="space-y-16 md:col-span-8">
            {[
              { label: "Overview", body: project.description },
              { label: "The objective", body: project.problem },
              { label: "Outcome & learnings", body: project.outcome },
            ].map((section) => (
              <Reveal key={section.label}>
                <section>
                  <h2 className="text-title font-display font-medium text-foreground">
                    {section.label}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>

          <aside className="md:col-span-4">
            <Reveal delay={0.1}>
              <div className="sticky top-28 rounded-xl border border-border bg-card p-6">
                <p className="eyebrow text-primary">Process</p>
                <ol className="mt-5 space-y-5">
                  {project.process.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-display text-lg italic text-primary/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Prev / next */}
        <nav
          aria-label="Project navigation"
          className="mt-24 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
        >
          {prev && (
            <Link
              to="/projects/$slug"
              params={{ slug: prev.slug }}
              className="group rounded-xl border border-border p-6 transition-colors hover:border-primary/50"
            >
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <ArrowLeft size={12} />
                Previous
              </p>
              <p className="mt-3 font-display text-xl text-foreground group-hover:text-primary">
                {prev.title}
              </p>
            </Link>
          )}
          {next && (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group rounded-xl border border-border p-6 text-right transition-colors hover:border-primary/50 sm:col-start-2"
            >
              <p className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                Next
                <ArrowRight size={12} />
              </p>
              <p className="mt-3 font-display text-xl text-foreground group-hover:text-primary">
                {next.title}
              </p>
            </Link>
          )}
        </nav>
      </article>
    </PageShell>
  );
}

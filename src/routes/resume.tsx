import { createFileRoute } from "@tanstack/react-router";
import { Download, Printer } from "lucide-react";
import { useState } from "react";
import { PageShell, Reveal, WordsReveal } from "@/components/Reveal";
import { resume } from "@/data/resume";
import { downloadResumePdf } from "@/lib/resume-pdf";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Kishan R Nair" },
      {
        name: "description",
        content:
          "Resume of Kishan R Nair — experience, skills, education, and selected projects. Download the PDF or print.",
      },
      { property: "og:title", content: "Resume — Kishan R Nair" },
      {
        property: "og:description",
        content: "Experience, skills, education, and selected projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const [downloading, setDownloading] = useState(false);

  const onDownload = async () => {
    setDownloading(true);
    try {
      await downloadResumePdf();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 pb-28 pt-36 md:pt-44">
        {/* Actions */}
        <Reveal>
          <div className="no-print flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">Resume</p>
              <h1 className="text-title mt-4 font-display font-medium text-foreground">
                <WordsReveal text="A concise record of what I do." />
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                <Download size={15} />
                {downloading ? "Preparing PDF…" : "Download PDF"}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                <Printer size={15} />
                Print / Save as PDF
              </button>
            </div>
          </div>
        </Reveal>

        {/* Document */}
        <Reveal delay={0.1} className="mt-12">
          <div className="print-sheet rounded-2xl border border-border bg-card p-8 md:p-12">
            {/* Header */}
            <header className="print-break border-b border-border pb-8">
              <h2 className="font-display text-3xl font-medium text-foreground md:text-4xl">
                {resume.name}
              </h2>
              <p className="mt-2 text-primary">{resume.title}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                {resume.contacts.map((c) =>
                  c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      className="link-line hover:text-foreground"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span key={c.label}>{c.value}</span>
                  )
                )}
              </div>
            </header>

            {/* Summary */}
            <section className="print-break mt-8">
              <h3 className="eyebrow text-primary">Professional summary</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {resume.summary}
              </p>
            </section>

            {/* Skills */}
            <section className="print-break mt-8">
              <h3 className="eyebrow text-primary">Skills</h3>
              <dl className="mt-3 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {resume.skills.map((group) => (
                  <div key={group.group} className="flex gap-2 text-sm">
                    <dt className="shrink-0 font-medium text-foreground">
                      {group.group}:
                    </dt>
                    <dd className="text-muted-foreground">{group.items}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Experience */}
            <section className="print-break mt-8">
              <h3 className="eyebrow text-primary">Experience</h3>
              <div className="mt-4 space-y-6">
                {resume.experience.map((job, i) => (
                  <div key={i} className="border-l border-border pl-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-foreground">{job.role}</p>
                      <p className="text-xs text-muted-foreground">{job.period}</p>
                    </div>
                    <p className="text-sm text-primary">{job.company}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                      {job.points.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="print-break mt-8">
              <h3 className="eyebrow text-primary">Education</h3>
              <div className="mt-4 space-y-4">
                {resume.education.map((ed, i) => (
                  <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">{ed.degree}</p>
                      <p className="text-sm text-muted-foreground">{ed.school}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{ed.period}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="print-break mt-8">
              <h3 className="eyebrow text-primary">Projects</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {resume.projects.map((proj, i) => (
                  <li key={i}>
                    <span className="font-medium text-foreground">{proj.name}</span>
                    <span className="text-muted-foreground"> — {proj.note}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Certifications */}
            <section className="print-break mt-8 border-t border-border pt-6">
              <h3 className="eyebrow text-primary">Certifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {resume.certifications.map((cert, i) => (
                  <li key={i}>
                    {cert.name} — {cert.issuer}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}


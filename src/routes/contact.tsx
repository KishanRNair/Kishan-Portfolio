import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Eyebrow, PageShell, Reveal, WordsReveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kishan R Nair" },
      {
        name: "description",
        content: "Get in touch with Kishan R Nair — collaborations, projects, and questions.",
      },
      { property: "og:title", content: "Contact — Kishan R Nair" },
      {
        property: "og:description",
        content: "Get in touch — collaborations, projects, and questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

type Status = "idle" | "submitting" | "sent";
type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot — bots only
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Simple time-trap: a real visitor takes a moment to fill this in.
  const mountedAt = useMemo(() => Date.now(), []);

  useEffect(() => () => setStatus("idle"), []);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const errs: Errors = {};
    if (!values.name.trim()) errs.name = "Please add your name.";
    if (!EMAIL_RE.test(values.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!values.subject.trim()) errs.subject = "Please add a subject.";
    if (values.message.trim().length < 10)
      errs.message = "Message should be at least 10 characters.";
    return errs;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam prevention: honeypot + minimum time-on-form.
    if (values.website || Date.now() - mountedAt < 2500) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // No backend is connected yet: fall back to the visitor's email client.
    // TODO: connect a real form service here (or a server function) later.
    const subject = `[Portfolio] ${values.subject.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/60 focus:outline-none";

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-36 md:pb-36 md:pt-44">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left: invitation + links */}
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="text-display mt-6 font-display font-medium text-foreground">
                <WordsReveal text="Let's make something considered." />
              </h1>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Placeholder invitation — a short line inviting the kind of
                collaborations you want to hear about.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="link-line mt-8 inline-block font-display text-xl text-primary"
              >
                {site.email}
              </a>
              <div className="mt-10 flex flex-col gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-2xl border border-border bg-card p-7 md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="eyebrow text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={set("name")}
                      aria-invalid={!!errors.name}
                      className={`${inputClass} mt-2`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="eyebrow text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={set("email")}
                      aria-invalid={!!errors.email}
                      className={`${inputClass} mt-2`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="subject" className="eyebrow text-muted-foreground">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={values.subject}
                    onChange={set("subject")}
                    aria-invalid={!!errors.subject}
                    className={`${inputClass} mt-2`}
                    placeholder="What is this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.subject}</p>
                  )}
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="eyebrow text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={!!errors.message}
                    className={`${inputClass} mt-2 resize-y`}
                    placeholder="Tell me about your project or idea…"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                {/* Honeypot — hidden from humans, catches bots */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={set("website")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sent"}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  {status === "sent" ? "Opening your email client…" : "Send message"}
                </button>

                <div className="mt-5 space-y-2 text-xs leading-relaxed text-muted-foreground">
                  <p>
                    No backend is connected yet — submitting opens your own email
                    client with the message pre-filled, addressed to{" "}
                    <span className="text-foreground">{site.email}</span>.
                  </p>
                  <p>
                    {/* TODO: connect a real form backend, then remove this note. */}
                    Setup note: connect a form service or a server function here to
                    send messages directly from the site.
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

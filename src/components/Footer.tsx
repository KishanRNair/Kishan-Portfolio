import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="font-display text-xl text-foreground">{site.wordmark}</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.role}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-line mt-4 inline-block text-sm text-primary"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          <span className="eyebrow text-muted-foreground">Site</span>
          {[
            { to: "/", label: "Home" },
            { to: "/projects", label: "Projects" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/resume", label: "Resume" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <span className="eyebrow text-muted-foreground">Elsewhere</span>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.label}
              <ArrowUpRight
                size={13}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">
          {site.copyright}
        </p>
      </div>
    </footer>
  );
}

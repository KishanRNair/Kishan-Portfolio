import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo, techStackList, credentialsList } from '../data/portfolioData';
import TechConveyor from '../components/TechConveyor';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/Accordion';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/Tooltip';
import { useParallax } from '../hooks/useParallax';

const techDetails = {
  Python: "CPython systems, asynchronous event loops, FastAPI & backend services",
  TypeScript: "Strict type boundaries, robust React & Next.js client architectures",
  JavaScript: "Modern ESNext, asynchronous DOM control & WebSocket streaming",
  SQL: "Complex joins, indexing strategies (B-Tree, GIN), window functions & RLS",
  "C++": "Algorithmic foundation, memory allocation & competitive computing",
  PyTorch: "Deep learning models, embedding generation & tensor transformations",
  FastAPI: "High-throughput asynchronous REST microservices & Pydantic validation",
  PostgreSQL: "Relational modeling, pgvector indexing & dynamic Row-Level Security",
  Redis: "In-memory caching, pub/sub queues & session state management",
  "Node.js": "Event-driven runtime for streaming gateways and microservice APIs",
  React: "Component composition, reactive UI state & modern design systems",
  "Next.js": "Server-side rendering, API route handlers & static optimization",
  "Tailwind CSS": "Utility-first design architecture & fluid responsive tokens",
  Docker: "Reproducible containerization, multi-stage builds & environment isolation",
  "Amazon AWS": "Decoupled cloud infrastructure, EC2 compute, S3 data storage & RDS",
  "Git & GitHub": "Feature branching, CI/CD automated deployments & code reviews",
  Linux: "Debian/Ubuntu server administration, systemd daemons & bash automation"
};

const architecturalFaqs = [
  {
    id: "restraint",
    question: "Why architectural restraint over AI demo-ware?",
    answer: "A flashy demo is trivial to build with a basic prompt wrapper, but real enterprise environments fail when edge cases, latency spikes, and schema mismatches occur. I focus on deterministic verification, robust Pydantic schemas, and structured fallbacks so that software remains reliable 24/7."
  },
  {
    id: "security",
    question: "How is data isolation and Row-Level Security enforced in multi-tenant SaaS?",
    answer: "Rather than relying on client-side filters, security is enforced directly at the data layer using PostgreSQL Row-Level Security (RLS) driven by JWT workspace claims. In embedded BI solutions like Apache Superset, tenant IDs are cryptographically verified before any query executes."
  },
  {
    id: "rate-limits",
    question: "What is your approach to LLM hallucinations and rate limits in production?",
    answer: "We decouple ingestion from inference using Celery/Redis background worker queues with exponential backoff and jitter. To eliminate hallucinations, we use sentence-window RAG, reciprocal rank fusion, and strict citation attribution with line-level source provenance."
  },
  {
    id: "cloud-deployment",
    question: "How do you architect end-to-end full-stack cloud deployments?",
    answer: "Applications are containerized with multi-stage Docker builds to produce minimal attack-surface images, orchestrated behind reverse proxies with TLS termination, and monitored using structured JSON logging and health-check heartbeats."
  }
];

export default function AboutPage() {
  const parallaxOffset = useParallax(0.14);

  return (
    <TooltipProvider delayDuration={150}>
      <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '9rem', overflow: 'hidden' }}>
        <div className="radial-mesh-bg" />

        {/* Parallax Ghost Watermark */}
        <div
          className="parallax-watermark"
          style={{
            top: '8rem',
            right: '-8rem',
            transform: `translateY(${parallaxOffset * 0.7}px)`
          }}
          aria-hidden="true"
        >
          CREDENTIALS
        </div>

        {/* 1. Header & Philosophy */}
        <section style={{ padding: '4rem 1.5rem 5rem' }}>
          <div className="container-max">
            <div className="section-pretitle">
              <span className="num">(01)</span>
              <span className="divider" />
              <span>About · AI/ML & Full-Stack Engineer</span>
            </div>

            <div style={{ maxWidth: '56rem' }}>
              <h1 className="hero-display-title">
                Building practical systems with <span className="italic-accent">intent</span>.
              </h1>

              <p style={{ marginTop: '2rem', fontSize: '1.25rem', lineHeight: 1.75, color: 'var(--text-foreground)', fontWeight: 350 }}>
                I am {personalInfo.name}, a Data Science Engineering graduate specializing in full-stack development, end-to-end AI products, cloud SaaS architectures, and high-performance backend systems. I combine deep algorithmic modeling with clean, reliable software engineering.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}>
                <Link
                  to="/projects"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--text-foreground)',
                    color: '#141311',
                    padding: '0.8rem 1.75rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Inspect Projects
                </Link>

                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-foreground)',
                    padding: '0.8rem 1.75rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Conveyor Ribbon */}
        <TechConveyor speed="34s" />

        {/* 2. Technology Stack Grid with Shadcn Tooltips */}
        <section style={{ padding: '5.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
          <div className="container-max">
            <div className="section-pretitle">
              <span className="num">(02)</span>
              <span className="divider" />
              <span>Technology Stack</span>
            </div>

            <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)', color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
              Tools of the <span className="italic-accent">craft</span>.
            </h2>
            <p style={{ maxWidth: '36rem', fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '3.5rem' }}>
              The battle-tested technologies, languages, and distributed frameworks I deploy across production environments. Hover over any technology to view architectural context.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '1rem'
              }}
            >
              {techStackList.map((tech) => (
                <Tooltip key={tech}>
                  <TooltipTrigger asChild>
                    <div
                      style={{
                        padding: '1.5rem 1.25rem',
                        borderRadius: '1rem',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'default',
                        transition: 'border-color 0.25s ease, transform 0.25s ease'
                      }}
                      className="hover:border-[var(--champagne-border)] hover:-translate-y-1"
                    >
                      <span style={{ fontSize: '1.05rem', color: 'var(--text-foreground)', fontWeight: 500 }}>
                        {tech}
                      </span>
                      <span style={{ color: 'var(--champagne)', fontSize: '0.85rem' }}>✦</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {techDetails[tech] || "Production deployed framework"}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Industry Credentials */}
        <section style={{ padding: '5.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
          <div className="container-max">
            <div className="section-pretitle">
              <span className="num">(03)</span>
              <span className="divider" />
              <span>Industry Credentials</span>
            </div>

            <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)', color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
              Verified <span className="italic-accent">mastery</span>.
            </h2>
            <p style={{ maxWidth: '36rem', fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '3.5rem' }}>
              Industry certifications validating architectural competence, data engineering, and machine learning foundations.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {credentialsList.map((cred, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '2.25rem',
                    borderRadius: '1.25rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <h3 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--text-foreground)', lineHeight: 1.25 }}>
                    {cred.title}
                  </h3>
                  <span className="font-mono-soft" style={{ color: 'var(--champagne)' }}>
                    {cred.issuer}
                  </span>
                  <p style={{ fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {cred.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Shadcn Accordion: Architectural Paradigms & Deep-Dives */}
        <section style={{ padding: '5.5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
          <div className="container-max" style={{ maxWidth: '860px' }}>
            <div className="section-pretitle">
              <span className="num">(04)</span>
              <span className="divider" />
              <span>Architectural FAQ & Paradigms</span>
            </div>

            <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)', color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
              Engineering <span className="italic-accent">conviction</span>.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Core architectural principles, security frameworks, and failure-mode mitigations.
            </p>

            <Accordion type="single" collapsible defaultValue="restraint">
              {architecturalFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </TooltipProvider>
  );
}

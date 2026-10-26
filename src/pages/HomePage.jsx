import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo, projects, processSteps } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import TechConveyor from '../components/TechConveyor';
import { useParallax } from '../hooks/useParallax';

export default function HomePage() {
  const parallaxOffset = useParallax(0.12);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '7rem', overflow: 'hidden' }}>
      {/* Mesh Ambience */}
      <div className="radial-mesh-bg" />

      {/* Parallax Ghost Watermark */}
      <div
        className="parallax-watermark"
        style={{
          top: '12rem',
          right: '-5rem',
          transform: `translateY(${parallaxOffset * 0.8}px)`
        }}
        aria-hidden="true"
      >
        SYSTEMS ARCHITECT
      </div>

      {/* 1. Hero Section */}
      <section style={{ padding: '3.5rem 1.5rem 5rem' }}>
        <div className="container-max">
          <div style={{ maxWidth: '58rem' }}>
            {/* Live Telemetry Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                marginBottom: '2rem'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                }}
              />
              <span className="font-mono-soft" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.16em' }}>
                Available for Opportunities · Kochi / Remote (IST)
              </span>
            </div>

            {/* Editorial Masked Headline */}
            <h1 className="hero-display-title">
              <span className="reveal-mask">
                <span className="reveal-text">I'm {personalInfo.name} — an</span>
              </span>
              <span className="reveal-mask">
                <span className="reveal-text reveal-delay-1">
                  <span className="italic-accent">AI/ML Engineer</span> building
                </span>
              </span>
              <span className="reveal-mask">
                <span className="reveal-text reveal-delay-2">practical AI applications,</span>
              </span>
              <span className="reveal-mask">
                <span className="reveal-text reveal-delay-3">agentic systems, and data-driven</span>
              </span>
              <span className="reveal-mask">
                <span className="reveal-text reveal-delay-3">products that solve real problems.</span>
              </span>
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
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
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, opacity 0.2s ease'
                }}
              >
                Explore Projects
              </Link>

              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-foreground)',
                  padding: '0.8rem 1.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease'
                }}
              >
                About Me <ArrowUpRight size={15} style={{ color: 'var(--champagne)' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Tech Conveyor Belt Ribbon */}
      <TechConveyor speed="32s" />

      {/* 2. Engineering Philosophy */}
      <section style={{ padding: '5.5rem 1.5rem', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <div
          className="parallax-watermark"
          style={{
            top: '4rem',
            left: '-6rem',
            transform: `translateY(${parallaxOffset * -0.6}px)`
          }}
          aria-hidden="true"
        >
          PHILOSOPHY
        </div>

        <div className="container-max">
          <div className="section-pretitle">
            <span className="num">(01)</span>
            <span className="divider" />
            <span>Engineering Philosophy</span>
          </div>

          <div style={{ maxWidth: '54rem' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)', lineHeight: 1.05, color: 'var(--text-foreground)', marginBottom: '1.5rem' }}>
              I build AI that is <span className="italic-accent">useful</span> before it is impressive.
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
              I care about systems that solve real problems, behave reliably, and make complex workflows simpler — not AI for the sake of a demo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How I Build */}
      <section style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div className="container-max">
          <div className="section-pretitle">
            <span className="num">(02)</span>
            <span className="divider" />
            <span>How I Build</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ padding: '2.25rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.75rem' }}>
                01 / Phase
              </span>
              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
                Understand
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Start with the problem, users, data, and constraints before choosing the technology.
              </p>
            </div>

            <div style={{ padding: '2.25rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.75rem' }}>
                02 / Phase
              </span>
              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
                Build
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Prototype quickly, test assumptions, and turn promising ideas into working systems.
              </p>
            </div>

            <div style={{ padding: '2.25rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
              <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.75rem' }}>
                03 / Phase
              </span>
              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
                Engineer
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Add the architecture, AI workflows, APIs, data layer, evaluation, and safeguards needed beyond the demo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section style={{ padding: '5rem 1.5rem', borderTop: '1px solid var(--border)' }}>
        <div className="container-max">
          <div className="section-pretitle">
            <span className="num">(03)</span>
            <span className="divider" />
            <span>Process</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {processSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  padding: '2rem',
                  borderRadius: '1.25rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                <span className="font-display" style={{ fontSize: '2.5rem', color: 'var(--champagne)', lineHeight: 1 }}>
                  {step.num}
                </span>
                <h4 className="font-display" style={{ fontSize: '1.45rem', color: 'var(--text-foreground)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Reverse Conveyor */}
      <TechConveyor reverse speed="38s" />

      {/* 5. Selected Projects */}
      <section style={{ padding: '6rem 1.5rem', position: 'relative' }}>
        <div className="container-max">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <div className="section-pretitle">
                <span className="num">(04)</span>
                <span className="divider" />
                <span>Selected Projects</span>
              </div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-foreground)', lineHeight: 1 }}>
                Engineered <span className="italic-accent">architectures</span>.
              </h2>
            </div>

            <Link
              to="/projects"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--champagne)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              Browse all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link
              to="/projects"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--champagne)',
                textDecoration: 'none',
                padding: '0.85rem 2.25rem',
                borderRadius: '9999px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-card)',
                transition: 'all 0.25s ease'
              }}
            >
              See every project ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Reverse Architectural Conveyor Ribbon */}
      <TechConveyor
        items={[
          "Deterministic Evaluation", "Pydantic Schemas", "Vector Indexes",
          "LangChain & LangGraph", "Async Task Queues", "Zero-Shot RAG",
          "Multi-Tenant Isolation", "Continuous Delivery", "REST & WebSocket Endpoints"
        ]}
        reverse={true}
        speed="38s"
      />

      {/* 6. Let's Build CTA */}
      <section style={{ padding: '6.5rem 1.5rem 8rem' }}>
        <div className="container-max">
          <div className="section-pretitle">
            <span className="num">(05)</span>
            <span className="divider" />
            <span>Let's Build</span>
          </div>

          <div style={{ maxWidth: '54rem' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.75rem)', lineHeight: 1.05, color: 'var(--text-foreground)' }}>
              Have an interesting problem?<br />
              <Link to="/contact" style={{ color: 'var(--champagne)', textDecoration: 'none' }}>
                Let's build it.
              </Link>
            </h2>

            <p style={{ marginTop: '1.75rem', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              I'm interested in AI, data, and software problems that are worth solving.
            </p>

            <div style={{ marginTop: '3.5rem', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
              <div>
                <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.45rem' }}>
                  Email
                </span>
                <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--text-foreground)', fontSize: '1.15rem', textDecoration: 'none', fontWeight: 500 }}>
                  {personalInfo.email}
                </a>
              </div>

              <div>
                <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.45rem' }}>
                  Elsewhere
                </span>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    GitHub ↗
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    LinkedIn ↗
                  </a>
                  <a href={personalInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                    WhatsApp ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

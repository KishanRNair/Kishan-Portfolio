import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';
import { projects } from '../data/portfolioData';
import TechConveyor from '../components/TechConveyor';
import { useParallax } from '../hooks/useParallax';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const parallaxOffset = useParallax(0.12);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '9rem', overflow: 'hidden' }}>
      <div className="radial-mesh-bg" />

      {/* Parallax Ghost Watermark */}
      <div
        className="parallax-watermark"
        style={{
          top: '12rem',
          right: '-4rem',
          transform: `translateY(${parallaxOffset * 0.75}px)`
        }}
        aria-hidden="true"
      >
        {project.id.toUpperCase()} // SYS
      </div>

      <div className="container-max" style={{ maxWidth: '960px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
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
              gap: '0.45rem',
              transition: 'transform 0.2s ease'
            }}
          >
            <ArrowLeft size={14} /> Back to All Projects
          </Link>
        </div>

        {/* Project Header */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '3rem', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="font-mono-soft" style={{ color: 'var(--champagne)' }}>
              {project.category}
            </span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span className="font-mono-soft" style={{ color: 'var(--text-muted)' }}>
              {project.status}
            </span>
          </div>

          <h1 className="hero-display-title" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', marginBottom: '1.5rem' }}>
            {project.title}
          </h1>

          <p style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '2.25rem' }}>
            {project.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-foreground)',
                padding: '0.75rem 1.6rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              Source Repository <ArrowUpRight size={14} style={{ color: 'var(--champagne)' }} />
            </a>

            <a
              href={project.links.demo}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--text-foreground)',
                color: '#141311',
                padding: '0.75rem 1.6rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Live Deployment <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Telemetry HUD Metrics Deck */}
        <div className="hud-metrics-grid">
          <div className="hud-metric-tile">
            <span className="hud-metric-label">Execution Latency</span>
            <span className="hud-metric-val">&lt; 2.0s</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>P95 production SLA</span>
          </div>
          <div className="hud-metric-tile">
            <span className="hud-metric-label">Batch Throughput</span>
            <span className="hud-metric-val">100+ Concurrent</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Asynchronous workers</span>
          </div>
          <div className="hud-metric-tile">
            <span className="hud-metric-label">Schema Accuracy</span>
            <span className="hud-metric-val">98.4%</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type verified commit</span>
          </div>
        </div>

        {/* Section 01: Overview & Context */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div className="section-pretitle">
            <span className="num">(01)</span>
            <span className="divider" />
            <span>Overview & Context</span>
          </div>

          <h2 className="font-display" style={{ fontSize: '2.4rem', color: 'var(--text-foreground)', marginBottom: '1.25rem' }}>
            Engineered to solve real-world bottlenecks.
          </h2>

          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '3rem' }}>
            {project.overview}
          </p>

          {/* Connected Architectural Telemetry Pipeline */}
          <div style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Cpu size={18} style={{ color: 'var(--champagne)' }} />
                <h3 className="font-display" style={{ fontSize: '1.65rem', color: 'var(--text-foreground)' }}>
                  Telemetry Data Pipeline
                </h3>
              </div>
              <span className="font-mono-soft" style={{ fontSize: '10px', color: 'var(--champagne)' }}>
                System Blueprint
              </span>
            </div>

            <div
              className="font-mono-soft"
              style={{
                fontSize: '11px',
                padding: '0.85rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                color: 'var(--champagne)',
                marginBottom: '2rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              ✦ Data Path: Input Feed ➔ Entity Extractor ➔ Embedding Matcher ➔ Multi-Agent Draft Loop ➔ Telemetry Deck
            </div>

            {/* Connected Node Flow */}
            <div className="node-flow-container">
              {project.pipelineFlow.map((flow, idx) => (
                <div key={idx} className="node-flow-card">
                  <div className="node-step-circle">{idx + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div className="node-flow-meta">{flow.step}</div>
                    <p className="node-flow-desc">{flow.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Key Capabilities */}
        <section style={{ marginBottom: '4.5rem', borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
          <div className="section-pretitle">
            <span className="num">(02)</span>
            <span className="divider" />
            <span>Key Capabilities & Features</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                  padding: '1.35rem 1.75rem',
                  borderRadius: '1.25rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <span style={{ color: 'var(--champagne)', marginTop: '0.2rem' }}>✦</span>
                <span style={{ fontSize: '1.025rem', color: 'var(--text-foreground)', lineHeight: 1.65 }}>
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 03: Deployed Technologies */}
        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
          <div className="section-pretitle">
            <span className="num">(03)</span>
            <span className="divider" />
            <span>Deployed Technologies & Frameworks</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono-soft"
                style={{
                  fontSize: '11px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  padding: '0.6rem 1.35rem',
                  color: 'var(--text-foreground)'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Blueprint Conveyor Footer Ribbon */}
      <div style={{ marginTop: '5rem' }}>
        <TechConveyor
          items={[
            `${project.title} Spec`, "Architecture Validated", "Sub-Second Latency",
            ...project.tech, "Enterprise Production Ready", "Zero Downtime Deploy"
          ]}
          speed="28s"
        />
      </div>
    </main>
  );
}

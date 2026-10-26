import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import TechConveyor from '../components/TechConveyor';
import { useParallax } from '../hooks/useParallax';

const categories = ["All", "Agentic AI", "Full-Stack & Cloud", "Applied ML", "Data & Systems"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const parallaxOffset = useParallax(0.12);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category === activeCategory ||
        project.domain.includes(activeCategory);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.domain.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '7rem', overflow: 'hidden' }}>
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
        BLUEPRINTS // 06
      </div>

      {/* Header Section */}
      <section style={{ padding: '4rem 1.5rem 2.5rem' }}>
        <div className="container-max">
          <div className="section-pretitle">
            <span className="num">(01)</span>
            <span className="divider" />
            <span>Engineered Systems · {projects.length} Architectures</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'flex-end', gap: '2rem' }}>
            <div>
              <h1 className="hero-display-title">
                Built systems,<br />
                <span className="italic-accent">architected</span> with intent.
              </h1>
            </div>
            <p style={{ maxWidth: '28rem', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              Detailed technical blueprints across autonomous agents, distributed data pipelines, and full-stack software.
            </p>
          </div>

          {/* Search & Counter Bar */}
          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '0.65rem 1.25rem',
                width: '100%',
                maxWidth: '420px'
              }}
            >
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name, architecture, tech (e.g. FastAPI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-foreground)',
                  fontSize: '0.875rem',
                  width: '100%'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="font-mono-soft" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Showing: </span>
              <span style={{ color: 'var(--champagne)', fontWeight: 500 }}>
                {filteredProjects.length} of {projects.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '0.75rem 1.5rem', position: 'sticky', top: '4.5rem', zIndex: 20, backdropFilter: 'blur(16px)' }}>
        <div className="container-max">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  borderRadius: '9999px',
                  padding: '0.5rem 1.15rem',
                  fontSize: '0.775rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--text-foreground)' : 'var(--border)',
                  backgroundColor: activeCategory === cat ? 'var(--text-foreground)' : 'rgba(36, 33, 28, 0.7)',
                  color: activeCategory === cat ? '#141311' : 'var(--text-muted)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Conveyor Ribbon */}
      <div style={{ margin: '1rem 0 2rem' }}>
        <TechConveyor
          items={[
            "Multi-Agent Workflows", "Vector Search & pgvector", "Vertex AI & Gemini 1.5",
            "Low-Latency RAG", "Production FastAPI", "Docker Containerization",
            "PostgreSQL & Redis", "Real-Time Telemetry HUD", "Agentic Orchestration"
          ]}
          speed="30s"
        />
      </div>

      {/* Projects Grid */}
      <section style={{ padding: '2rem 1.5rem 8rem' }}>
        <div className="container-max">
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
              <p className="font-display" style={{ fontSize: '1.75rem', color: 'var(--text-foreground)', marginBottom: '0.5rem' }}>
                No architectures found
              </p>
              <p>Try refining your search term or select "All" categories.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

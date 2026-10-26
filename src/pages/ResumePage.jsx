import React from 'react';
import { ArrowDownToLine, Briefcase, Cpu, GraduationCap } from 'lucide-react';
import { personalInfo, resumeExperience, resumeEducation, techStackList } from '../data/portfolioData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { useParallax } from '../hooks/useParallax';

export default function ResumePage() {
  const parallaxOffset = useParallax(0.1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '9rem', overflow: 'hidden' }}>
      <div className="radial-mesh-bg" />

      {/* Parallax Ghost Watermark */}
      <div
        className="parallax-watermark"
        style={{
          top: '10rem',
          right: '-4rem',
          transform: `translateY(${parallaxOffset * 0.7}px)`
        }}
        aria-hidden="true"
      >
        CURRICULUM VITAE
      </div>

      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container-max" style={{ maxWidth: '960px' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '3rem',
              marginBottom: '3rem'
            }}
          >
            <div>
              <div className="section-pretitle">
                <span className="num">(01)</span>
                <span className="divider" />
                <span>Curriculum Vitae · {personalInfo.name}</span>
              </div>

              <h1 className="hero-display-title">
                The <span className="italic-accent">engineering track</span><br />
                behind the work.
              </h1>

              <p className="font-mono-soft" style={{ marginTop: '1.25rem', color: 'var(--text-muted)' }}>
                AI/ML Engineer · Generative AI & LLM Systems · Agentic AI · Python Backend
              </p>
            </div>

            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--text-foreground)',
                color: '#141311',
                padding: '0.85rem 1.75rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease, transform 0.2s ease'
              }}
            >
              <ArrowDownToLine size={15} /> Download PDF Resume
            </button>
          </div>

          {/* Executive Summary Card */}
          <div
            style={{
              padding: '2.5rem',
              borderRadius: '1.5rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              marginBottom: '3.5rem'
            }}
          >
            <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.85rem' }}>
              ✦ Executive Summary
            </span>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--text-foreground)', fontWeight: 350 }}>
              AI Engineer with professional experience building Generative AI, LLM, and agentic systems for enterprise applications. Experienced in developing end-to-end AI solutions involving LLM orchestration, RAG, natural-language data querying, document intelligence, and AI-powered analytics, with strong Python, database, and backend engineering skills.
            </p>
          </div>

          {/* Shadcn UI Radix Tabs */}
          <Tabs defaultValue="experience" style={{ width: '100%' }}>
            <div style={{ marginBottom: '3rem' }}>
              <TabsList>
                <TabsTrigger value="experience">
                  <Briefcase size={14} /> Experience
                </TabsTrigger>
                <TabsTrigger value="skills">
                  <Cpu size={14} /> Core Skills
                </TabsTrigger>
                <TabsTrigger value="education">
                  <GraduationCap size={14} /> Education
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Experience with Vertical Timeline Spine */}
            <TabsContent value="experience">
              <div className="timeline-spine-wrapper">
                <div className="timeline-spine-line" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {resumeExperience.map((exp, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        transition: 'border-color 0.25s ease'
                      }}
                    >
                      {/* Spine Milestone Node */}
                      <div className="timeline-spine-node" />

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          borderBottom: '1px solid var(--border)',
                          paddingBottom: '1.25rem',
                          marginBottom: '1.75rem'
                        }}
                      >
                        <div>
                          <h2 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-foreground)' }}>
                            {exp.role}
                          </h2>
                          <p className="font-mono-soft" style={{ color: 'var(--champagne)', marginTop: '0.25rem' }}>
                            {exp.company} · {exp.location}
                          </p>
                        </div>

                        <span
                          className="font-mono-soft"
                          style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--champagne)', marginTop: '0.2rem', fontSize: '0.85rem' }}>✦</span>
                            <span style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Core Skills */}
            <TabsContent value="skills">
              <div
                style={{
                  padding: '2.5rem',
                  borderRadius: '1.5rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)'
                }}
              >
                <h2 className="font-display" style={{ fontSize: '2rem', color: 'var(--text-foreground)', marginBottom: '1.5rem' }}>
                  Technical Competencies
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {techStackList.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono-soft"
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-foreground)',
                        fontSize: '12px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Education */}
            <TabsContent value="education">
              <div className="timeline-spine-wrapper">
                <div className="timeline-spine-line" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {resumeEducation.map((edu, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        padding: '2.5rem',
                        borderRadius: '1.5rem',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <div className="timeline-spine-node" />

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          borderBottom: '1px solid var(--border)',
                          paddingBottom: '1.25rem',
                          marginBottom: '1.75rem'
                        }}
                      >
                        <div>
                          <h2 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--text-foreground)' }}>
                            {edu.degree}
                          </h2>
                          <p className="font-mono-soft" style={{ color: 'var(--champagne)', marginTop: '0.25rem' }}>
                            {edu.institution} · {edu.location}
                          </p>
                        </div>

                        <span
                          className="font-mono-soft"
                          style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {edu.period}
                        </span>
                      </div>

                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {edu.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <span style={{ color: 'var(--champagne)', marginTop: '0.2rem', fontSize: '0.85rem' }}>✦</span>
                            <span style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}

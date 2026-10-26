import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TechConveyor from '../components/TechConveyor';
import { useParallax } from '../hooks/useParallax';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const parallaxOffset = useParallax(0.12);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '8rem', overflow: 'hidden' }}>
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
        OPEN TO WORK // 2026
      </div>

      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="container-max">
          <div className="section-pretitle">
            <span className="num">(01)</span>
            <span className="divider" />
            <span>Direct Communication</span>
          </div>

          <div style={{ maxWidth: '56rem', marginBottom: '4.5rem' }}>
            <h1 className="hero-display-title">
              Have an <span className="italic-accent">interesting problem?</span><br />
              Let's build it.
            </h1>
            <p style={{ marginTop: '1.75rem', fontSize: '1.2rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
              Whether it's an AI engineering challenge, an enterprise ML pipeline, or an innovative agentic system — I'm open for full-time opportunities and technical discussions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
            {/* Direct Channel Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '2rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.4rem' }}>
                  Email
                </span>
                <a href={`mailto:${personalInfo.email}`} style={{ fontSize: '1.2rem', color: 'var(--text-foreground)', textDecoration: 'none', fontWeight: 500 }}>
                  {personalInfo.email}
                </a>
              </div>

              <div style={{ padding: '2rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.4rem' }}>
                  Direct Line
                </span>
                <a href={`tel:${personalInfo.phone}`} style={{ fontSize: '1.2rem', color: 'var(--text-foreground)', textDecoration: 'none', fontWeight: 500 }}>
                  {personalInfo.phone}
                </a>
              </div>

              <div style={{ padding: '2rem', borderRadius: '1.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.4rem' }}>
                  Location
                </span>
                <span style={{ fontSize: '1.15rem', color: 'var(--text-foreground)', fontWeight: 500 }}>
                  {personalInfo.location}
                </span>
              </div>

              {/* Social Channels */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-foreground)',
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.85rem',
                    textDecoration: 'none'
                  }}
                >
                  GitHub <ArrowUpRight size={14} style={{ color: 'var(--champagne)' }} />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-foreground)',
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.85rem',
                    textDecoration: 'none'
                  }}
                >
                  LinkedIn <ArrowUpRight size={14} style={{ color: 'var(--champagne)' }} />
                </a>

                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-foreground)',
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.85rem',
                    textDecoration: 'none'
                  }}
                >
                  WhatsApp Chat <ArrowUpRight size={14} style={{ color: 'var(--champagne)' }} />
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <span className="font-mono-soft" style={{ color: 'var(--champagne)', display: 'block', marginBottom: '0.5rem' }}>
                Direct Inquiry
              </span>
              <h2 className="font-display" style={{ fontSize: '2rem', color: 'var(--text-foreground)', marginBottom: '2rem' }}>
                Start a conversation.
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="font-mono-soft" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.15rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-foreground)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label className="font-mono-soft" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.15rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-foreground)',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label className="font-mono-soft" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    System or Project Context
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your engineering objective, problem, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.15rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-foreground)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.95rem 2rem',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--text-foreground)',
                    color: '#141311',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Transmit Message
                </button>

                {submitted && (
                  <div
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#6EE7B7',
                      fontSize: '0.9rem',
                      textAlign: 'center'
                    }}
                  >
                    ✦ Message received. Thank you for connecting; I will respond shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Availability Conveyor */}
      <div style={{ marginTop: '2rem' }}>
        <TechConveyor
          items={[
            "Direct Response Within 24 Hours", "Full-Time Opportunities",
            "GenAI Architecture Inquiries", "Remote & Hybrid Collaboration",
            "Kochi, Kerala (IST)", "Enterprise Consulting"
          ]}
          speed="32s"
        />
      </div>
    </main>
  );
}

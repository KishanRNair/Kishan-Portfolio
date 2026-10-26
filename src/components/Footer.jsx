import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container-max">
        <div className="footer-inner-grid">
          {/* Brand & Ethos */}
          <div style={{ maxWidth: '28rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <svg viewBox="0 0 40 40" style={{ width: '28px', height: '28px' }} fill="none">
                <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.2" />
                <line x1="27" y1="27" x2="34" y2="34" stroke="var(--champagne)" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '1.15rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                LOG<span className="text-champagne">!</span>C
              </span>
            </div>

            <p className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.15, color: 'var(--text-foreground)', marginBottom: '0.75rem' }}>
              Built with curiosity.<br />
              Engineered with intent.
            </p>
            <p className="font-mono-soft" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              AI/ML Engineer · Generative AI · Data · Software
            </p>
          </div>

          {/* Links Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="font-mono-soft" style={{ fontSize: '11px', color: 'var(--text-foreground)', marginBottom: '0.25rem' }}>
                Navigation
              </span>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Home
              </Link>
              <Link to="/projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Projects
              </Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                About & Credentials
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="font-mono-soft" style={{ fontSize: '11px', color: 'var(--text-foreground)', marginBottom: '0.25rem' }}>
                Connect
              </span>
              <Link to="/resume" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Resume
              </Link>
              <Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
                Contact
              </Link>
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-subtle)'
          }}
        >
          <span>© {new Date().getFullYear()} {personalInfo.name} · LOG!C</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-muted)' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
              }}
            />
            Available for Opportunities
          </span>
        </div>
      </div>
    </footer>
  );
}

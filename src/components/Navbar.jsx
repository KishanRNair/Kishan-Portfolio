import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="nav-wrapper">
      <nav className="glass-nav-bar">
        {/* Brand / Logo */}
        <Link to="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
          <svg viewBox="0 0 40 40" className="brand-icon" fill="none">
            <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.2" />
            <line x1="27" y1="27" x2="34" y2="34" stroke="var(--champagne)" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '1.05rem', fontWeight: 500, letterSpacing: '0.04em' }}>
            LOG<span className="text-champagne">!</span>C
          </span>
        </Link>

        {/* Center Navigation Links */}
        <div className="nav-center-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="nav-pill-active-bg" />}
                <span style={{ position: 'relative' }}>Home</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="nav-pill-active-bg" />}
                <span style={{ position: 'relative' }}>Projects</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="nav-pill-active-bg" />}
                <span style={{ position: 'relative' }}>About</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="nav-pill-active-bg" />}
                <span style={{ position: 'relative' }}>Contact</span>
              </>
            )}
          </NavLink>
        </div>

        {/* Right CTA Actions */}
        <div className="nav-actions">
          <Link to="/resume" className="btn-pill-resume">
            <ArrowDownToLine size={13} style={{ color: 'var(--champagne)' }} />
            Resume
          </Link>
          <Link to="/contact" className="btn-pill-talk">
            Let's Talk
          </Link>

          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-pane">
          <NavLink
            to="/"
            end
            className="nav-pill"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className="nav-pill"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            className="nav-pill"
            onClick={() => setMobileMenuOpen(false)}
          >
            About & Credentials
          </NavLink>
          <NavLink
            to="/resume"
            className="nav-pill"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resume
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-pill"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
}

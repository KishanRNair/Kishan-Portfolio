import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Atom, GraduationCap, Stethoscope, Music, Cpu, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  // Map icons
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="card-banner-icon" />;
      case 'brain':
        return <Brain className="card-banner-icon" />;
      case 'atom':
        return <Atom className="card-banner-icon" />;
      case 'graduation-cap':
        return <GraduationCap className="card-banner-icon" />;
      case 'stethoscope':
        return <Stethoscope className="card-banner-icon" />;
      case 'music':
        return <Music className="card-banner-icon" />;
      default:
        return <Cpu className="card-banner-icon" />;
    }
  };

  // Status dot color
  const getStatusDotColor = (statusColor) => {
    switch (statusColor) {
      case 'emerald':
        return '#34D399'; // subtle emerald
      case 'amber':
        return '#FBBF24'; // subtle amber
      case 'sky':
        return '#7DD3FC'; // subtle sky
      default:
        return 'var(--champagne)';
    }
  };

  return (
    <Link to={`/projects/${project.id}`} className="project-card-outer">
      <div>
        {/* Visual Banner Header */}
        <div className="card-banner" style={{ background: project.gradient }}>
          <div className="card-banner-overlay" />
          <div className="card-banner-grain" />

          {/* Banner Top info */}
          <div className="card-banner-top">
            <span>{project.category}</span>
            <span className="status-pill-chip">
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: getStatusDotColor(project.statusColor)
                }}
              />
              {project.status}
            </span>
          </div>

          {/* Big Ghost Number */}
          <span className="card-big-number">{project.number}</span>

          {/* Dynamic Corner Icon */}
          {renderIcon(project.icon)}
        </div>

        {/* Card Body */}
        <div className="card-body-content">
          <span className="card-domain-label">{project.domain}</span>
          <h3 className="card-heading-title">{project.title}</h3>
          <p className="card-desc-clamp">{project.summary}</p>

          <div className="card-tech-cloud">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="card-tech-badge">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="card-tech-badge" style={{ color: 'var(--champagne)' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Bottom Deck */}
      <div className="card-bottom-deck">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <Cpu size={13} style={{ color: 'var(--champagne)' }} />
          Architecture blueprint
        </span>
        <span className="explore-link">
          Explore <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}

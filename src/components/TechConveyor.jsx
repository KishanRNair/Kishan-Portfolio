import React from 'react';

const conveyorItems = [
  "Python", "Google Vertex AI", "Gemini 1.5", "FastAPI", "PostgreSQL",
  "pgvector", "Apache Superset", "PyTorch", "Docker", "Next.js",
  "React", "TypeScript", "Redis", "MongoDB", "AWS", "Distributed Systems"
];

export default function TechConveyor({ items = conveyorItems, reverse = false, speed = "35s" }) {
  // Duplicate array for seamless infinite looping
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="conveyor-wrapper">
      {/* Edge gradient fade masks */}
      <div className="conveyor-fade-left" aria-hidden="true" />
      <div className="conveyor-fade-right" aria-hidden="true" />

      <div
        className={`conveyor-track ${reverse ? 'reverse' : ''}`}
        style={{ animationDuration: speed }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="conveyor-item">
            <span className="conveyor-bullet">✦</span>
            <span className="conveyor-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

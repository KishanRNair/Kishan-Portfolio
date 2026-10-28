import { Marquee } from "@/components/Reveal";
import { conveyorRows } from "@/data/skills";

/**
 * Two continuously moving conveyor rows moving in opposite directions.
 * Loops seamlessly (duplicated track), pauses on hover/focus, and the
 * animation is disabled by the global reduced-motion CSS rule.
 */
export function SkillsConveyor() {
  return (
    <div className="space-y-3">
      {conveyorRows.map((row, i) => (
        <Marquee
          key={i}
          items={row}
          reverse={i % 2 === 1}
          duration={46 + i * 10}
        />
      ))}
    </div>
  );
}

import { Mascot } from "@/components/mascot";

export interface MascotSceneProps {
  className?: string;
  scale?: number;
}

/**
 * Hero stage mascot scene.
 * Embeds Aurum in a responsive square aspect-ratio box that scales cleanly
 * across all screen sizes without ever overflowing its column.
 */
export default function MascotScene({
  className,
  scale = 0.82,
}: MascotSceneProps) {
  return (
    <div
      className={`relative flex items-center justify-center w-full aspect-square max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] xl:max-w-[520px] mx-auto ${
        className ?? ""
      }`}
    >
      <Mascot
        scale={scale}
        className="h-full w-full"
        label="Aurum — Interactive 3D Mascot"
      />
    </div>
  );
}

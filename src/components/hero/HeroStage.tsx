/**
 * HeroStage: Provides the ambient CSS atmospheric lighting backdrop
 * that glows behind the hero section.
 */
export function HeroStage({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {/* CSS atmosphere — ambient lighting that glows behind the hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="drift-slow absolute -left-[15%] top-[15%] h-[55vmax] w-[55vmax] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.32 0.05 60 / 40%), transparent)",
          }}
        />
        <div
          className="drift-slower absolute -right-[10%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.26 0.02 80 / 45%), transparent)",
          }}
        />
        <div
          className="absolute left-1/2 md:left-[70%] lg:left-[74%] top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.2 0.012 80 / 55%), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

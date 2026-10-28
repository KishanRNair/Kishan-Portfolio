import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise reveal triggered once when entering the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered word-by-word reveal for editorial headlines. */
export function WordsReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "115%", opacity: 0 },
              show: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Smooth page-enter transition wrapper. */
export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Small uppercase section label with a champagne rule. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <span className="h-px w-10 bg-primary/60" aria-hidden />
      <span className="eyebrow text-primary">{children}</span>
    </div>
  );
}

/** Horizontal skills conveyor. Duplicated track loops seamlessly. */
export function Marquee({
  items,
  reverse = false,
  duration = 46,
  className,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const style = { "--marquee-duration": `${duration}s` } as CSSProperties;
  return (
    <div
      className={`marquee ${reverse ? "marquee-reverse" : ""} ${className ?? ""}`}
      style={style}
      tabIndex={0}
      role="list"
      aria-label="Skills"
    >
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            role="listitem"
            aria-hidden={i >= items.length ? true : undefined}
            className="mx-1.5 whitespace-nowrap rounded-full border border-border bg-card/70 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

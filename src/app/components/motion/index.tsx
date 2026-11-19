import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";

/* Shared motion layer. Every effect plays once, eases out, and is skipped under
   prefers-reduced-motion so the content is simply there. */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type RevealTag = "div" | "li" | "article" | "section" | "header";

/** Fades content up 24px the first time it scrolls into view. */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  as?: RevealTag;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/** A section heading and its subtitle: the heading rises out of a mask, a rule draws, the subtitle follows. */
export function SectionHeading({
  title,
  subtitle,
  subtitleClass = "max-w-[52ch]",
}: {
  title: string;
  subtitle: string;
  subtitleClass?: string;
}) {
  const reduce = useReducedMotion();
  // The trigger sits on the wrapper: the masked title starts outside its clip box,
  // so it can never be "in view" on its own.
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <h2 className="overflow-hidden pb-1 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.02em] text-burgundy dark:text-gold">
        <motion.span
          className="block"
          variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {title}
        </motion.span>
      </h2>
      <motion.div
        className="mt-3 h-px w-[min(160px,30%)] origin-left bg-burgundy/40 dark:bg-gold/40"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
        aria-hidden="true"
      />
      <motion.p
        className={`mt-4 text-lg text-ink-soft ${subtitleClass}`}
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

const NUM = /\d+(?:\.\d+)?/g;

/** Counts every number in a string up to its value when it scrolls into view.
    In a range like "60→90%" the second number counts on from the first. */
export function CountUp({ value, duration = 1.4, className }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const ctrl = animate(0, 1, { duration, ease: EASE_OUT, onUpdate: setP });
    return () => ctrl.stop();
  }, [inView, reduce, duration]);

  const nums = value.match(NUM)?.map(Number) ?? [];
  const isRange = nums.length === 2 && value.includes("→");
  let i = 0;
  const text =
    reduce || p >= 1
      ? value
      : value.replace(NUM, (m) => {
          const k = i++;
          const decimals = (m.split(".")[1] ?? "").length;
          const from = isRange && k === 1 ? nums[0] : 0;
          return (from + (Number(m) - from) * p).toFixed(decimals);
        });

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

/** A thin gold reading-progress line across the top of the viewport. */
export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gold ${className}`}
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}

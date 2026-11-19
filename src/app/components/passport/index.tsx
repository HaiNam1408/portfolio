import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Stamp: an inked border mark that lands once with a single press.     */
/* ------------------------------------------------------------------ */

type StampShape = "oval" | "rect" | "circle";
type Ink = "red" | "navy" | "green" | "plum";

const inkClass: Record<Ink, string> = {
  red: "text-stamp-red",
  navy: "text-stamp-navy",
  green: "text-stamp-green",
  plum: "text-stamp-plum",
};

type StampProps = {
  shape: StampShape;
  ink: Ink;
  /** [top, main, bottom] */
  lines: [string, string, string];
  rotate?: number;
  delay?: number;
  /** true: presses on mount. "view": presses the first time it scrolls into view. false: already on the page. */
  press?: boolean | "view";
  className?: string;
  label?: string;
};

export function Stamp({
  shape,
  ink,
  lines,
  rotate = 0,
  delay = 0,
  press = true,
  className = "",
  label,
}: StampProps) {
  const reduce = useReducedMotion();
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `ink-${id}`;
  const animate = press && !reduce;

  const svg = (() => {
    const common = {
      fill: "none",
      stroke: "currentColor",
    } as const;
    const text = {
      fill: "currentColor",
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      textAnchor: "middle" as const,
      fontWeight: 700,
    };

    if (shape === "circle") {
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <defs>
            <path id={`top-${id}`} d="M 26 80 A 54 54 0 0 1 134 80" />
            <path id={`bot-${id}`} d="M 32 80 A 48 48 0 0 0 128 80" />
          </defs>
          <g filter={`url(#${filterId})`}>
            <circle cx="80" cy="80" r="74" {...common} strokeWidth="4" />
            <circle cx="80" cy="80" r="66" {...common} strokeWidth="1.5" />
            <circle cx="80" cy="80" r="38" {...common} strokeWidth="1.2" />
            <text {...text} fontSize="15" letterSpacing="3">
              <textPath href={`#top-${id}`} startOffset="50%">{lines[0]}</textPath>
            </text>
            <text {...text} fontSize={lines[1].length > 6 ? 14 : 22} x="80" y={lines[1].length > 6 ? 85 : 88}>
              {lines[1]}
            </text>
            <text {...text} fontSize="12" letterSpacing="2.5" dy="12">
              <textPath href={`#bot-${id}`} startOffset="50%">{lines[2]}</textPath>
            </text>
          </g>
        </svg>
      );
    }

    if (shape === "oval") {
      return (
        <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden="true">
          <g filter={`url(#${filterId})`}>
            <ellipse cx="120" cy="70" rx="114" ry="64" {...common} strokeWidth="4" />
            <ellipse cx="120" cy="70" rx="103" ry="53" {...common} strokeWidth="1.5" />
            <text {...text} x="120" y="50" fontSize="17" letterSpacing="4">{lines[0]}</text>
            <text {...text} x="120" y="84" fontSize="25">{lines[1]}</text>
            <text {...text} x="120" y="108" fontSize="13" letterSpacing="3">{lines[2]}</text>
          </g>
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 240 130" className="h-full w-full" aria-hidden="true">
        <g filter={`url(#${filterId})`}>
          <rect x="4" y="4" width="232" height="122" rx="8" {...common} strokeWidth="4" />
          <rect x="13" y="13" width="214" height="104" rx="4" {...common} strokeWidth="1.5" />
          <text {...text} x="120" y="46" fontSize="17" letterSpacing="4">{lines[0]}</text>
          <text {...text} x="120" y="80" fontSize="24">{lines[1]}</text>
          <text {...text} x="120" y="105" fontSize="13" letterSpacing="3">{lines[2]}</text>
        </g>
      </svg>
    );
  })();

  return (
    <motion.div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`pointer-events-none select-none ${inkClass[ink]} ${className}`}
      style={{ rotate }}
      {...(animate && press === "view"
        ? {
            // Lifted off the page, then slammed down with a small overshoot, like a real stamp.
            initial: { scale: 1.7, opacity: 0, filter: "blur(2px)" },
            whileInView: { scale: [1.7, 0.94, 1], opacity: [0, 0.96, 0.88], filter: "blur(0px)" },
            // Low threshold: the lifted (1.7x) stamp is often clipped by its card's overflow.
            viewport: { once: true, amount: 0.25, margin: "0px 0px -12% 0px" },
            transition: { delay, duration: 0.5, times: [0, 0.6, 1], ease: "easeOut" },
          }
        : {
            initial: animate ? { scale: 1.35, opacity: 0 } : false,
            animate: { scale: 1, opacity: 0.88 },
            transition: { delay, duration: 0.32, ease: [0.16, 1, 0.3, 1] },
          })}
    >
      {/* Ink absorption: speckle the mark so it reads pressed, not printed. */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={id.length} result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.6"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="speckled" />
          <feDisplacementMap in="speckled" in2="noise" scale="1.6" />
        </filter>
      </svg>
      {svg}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Guilloché: procedurally drawn security-paper line work.              */
/* ------------------------------------------------------------------ */

function rosetteRing(r0: number, amp: number, lobes: number, count: number, steps = 220) {
  const paths: string[] = [];
  for (let k = 0; k < count; k++) {
    const phase = (k / count) * ((2 * Math.PI) / lobes);
    let d = "";
    for (let s = 0; s <= steps; s++) {
      const t = (s / steps) * Math.PI * 2;
      const r = r0 + amp * Math.sin(lobes * t + phase);
      const x = 200 + r * Math.cos(t);
      const y = 200 + r * Math.sin(t);
      d += `${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(d + "Z");
  }
  return paths;
}

export function Rosette({ className = "" }: { className?: string }) {
  const paths = useMemo(
    () => [
      ...rosetteRing(168, 12, 24, 30),
      ...rosetteRing(124, 10, 18, 26),
      ...rosetteRing(80, 8, 12, 20),
      ...rosetteRing(38, 5, 8, 14),
    ],
    []
  );
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.4">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

function waveLines(count: number, width: number, height: number, amp: number, freq: number, shift: number) {
  const lines: string[] = [];
  const step = height / count;
  for (let i = 0; i < count; i++) {
    const y0 = i * step + step / 2;
    let d = "";
    for (let x = 0; x <= width; x += 12) {
      const y = y0 + amp * Math.sin(x * freq + i * shift);
      d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
    }
    lines.push(d);
  }
  return lines;
}

/** Fine interference waves for a security-paper ground. */
export function WaveField({ className = "", density = 46 }: { className?: string; density?: number }) {
  const [a, b] = useMemo(
    () => [
      waveLines(density, 1200, 800, 9, 0.011, 0.42),
      waveLines(density, 1200, 800, 7, 0.016, -0.31),
    ],
    [density]
  );
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <g fill="none" strokeWidth="0.6">
        {a.map((d, i) => (
          <path key={`a${i}`} d={d} stroke="rgb(var(--guilloche-a))" />
        ))}
        {b.map((d, i) => (
          <path key={`b${i}`} d={d} stroke="rgb(var(--guilloche-b))" />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Crest: pressed-gold monogram for the cover.                          */
/* ------------------------------------------------------------------ */

export function Crest({ className = "" }: { className?: string }) {
  const ticks = useMemo(() => Array.from({ length: 48 }, (_, i) => (i / 48) * Math.PI * 2), []);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="46" strokeWidth="2" />
        <circle cx="50" cy="50" r="41" strokeWidth="0.8" />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={50 + 41 * Math.cos(t)}
            y1={50 + 41 * Math.sin(t)}
            x2={50 + 37 * Math.cos(t)}
            y2={50 + 37 * Math.sin(t)}
            strokeWidth="0.8"
          />
        ))}
        <circle cx="50" cy="50" r="33" strokeWidth="0.8" />
      </g>
      <text
        x="50"
        y="61"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="'Noto Serif Display', Georgia, serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="-1"
      >
        HN
      </text>
      {/* Laurel sprigs under the monogram. */}
      <g fill="currentColor">
        {[-1, 1].map((side) =>
          [0, 1, 2, 3].map((k) => (
            <ellipse
              key={`${side}-${k}`}
              cx={50 + side * (7 + k * 4.2)}
              cy={74 - k * 2.6}
              rx="2.6"
              ry="1.1"
              transform={`rotate(${side * (24 + k * 14)} ${50 + side * (7 + k * 4.2)} ${74 - k * 2.6})`}
            />
          ))
        )}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hologram: the iridescent security seal laid over the photo.          */
/* ------------------------------------------------------------------ */

export function Hologram({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none rounded-full ${className}`}
      style={{
        background:
          "conic-gradient(from 210deg, rgb(255 200 150 / .5), rgb(150 220 195 / .5), rgb(150 180 245 / .45), rgb(245 170 200 / .5), rgb(255 200 150 / .5))",
        boxShadow: "inset 0 0 0 1px rgb(255 255 255 / .5)",
        opacity: 0.8,
      }}
    >
      <Rosette className="h-full w-full text-stamp-plum/55" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Engraved lettering: intaglio hatching inside a fine outline.         */
/* ------------------------------------------------------------------ */

export function EngravedName({ lines, className = "" }: { lines: string[]; className?: string }) {
  const rawId = useId();
  const id = `hatch-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const size = 112;
  const lead = size * 1.08;
  const height = Math.round(size * 0.98 + lead * (lines.length - 1) + 34);
  return (
    <svg viewBox={`0 0 540 ${height}`} className={className} aria-hidden="true">
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="3.4" patternTransform="rotate(-12)">
          <rect width="6" height="2.1" fill="currentColor" />
        </pattern>
      </defs>
      {lines.map((line, i) => (
        <text
          key={line}
          x="2"
          y={size * 0.98 + lead * i}
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="800"
          fontSize={size}
          letterSpacing="-2.5"
          fill={`url(#${id})`}
          stroke="currentColor"
          strokeWidth="1.6"
          paintOrder="stroke"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Machine-readable zone helpers.                                       */
/* ------------------------------------------------------------------ */

/** Two MRZ lines that always fill their box exactly, never clipping a glyph. */
export function Mrz({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <svg viewBox={`0 0 440 ${lines.length * 17}`} className={className} aria-hidden="true">
      {lines.map((l, i) => (
        <text
          key={i}
          x="0"
          y={13 + i * 17}
          textLength="440"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontSize="12.5"
          fill="currentColor"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

export function mrz(...parts: string[]) {
  const raw = parts
    .join("<")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "D")
    .toUpperCase()
    .replace(/[^A-Z0-9<]/g, "<");
  return (raw + "<".repeat(44)).slice(0, 44);
}

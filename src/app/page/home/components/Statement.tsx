import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { statement, type Lang } from "../../../../content/career";

/**
 * Dealt moment: word-highlight (tasteskill, kind "service").
 * One statement rests at reduced ink and turns to ink word by word as it crosses the middle of the
 * screen; the strong phrase turns to the accent. Scrubbed to the scrollbar, so it runs back on the
 * way up. Same thresholds as the kit's moment (from .85, to .45). The words are always in the DOM in
 * their finished place; under reduced motion the whole statement is in ink.
 * Ported to React because the kit's loader splits DOM nodes React owns, which breaks on a language
 * switch.
 */
const FROM = 0.85;
const TO = 0.45;

export default function Statement() {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("vi") ? "vi" : "en";
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  const words = useMemo(
    () =>
      statement[lang].flatMap((part) =>
        part.text
          .split(/\s+/)
          .filter(Boolean)
          .map((w) => ({ w, strong: Boolean(part.strong) }))
      ),
    [lang]
  );

  const [lit, setLit] = useState(reduce ? words.length : 0);

  useEffect(() => {
    if (reduce) {
      setLit(words.length);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * FROM;
      const end = vh * TO;
      const t = Math.min(1, Math.max(0, (start - r.top) / Math.max(1, start - end + r.height)));
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setLit(atEnd ? words.length : Math.round(t * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, words.length]);

  return (
    <div className="flex min-h-[70svh] items-center py-24 lg:min-h-[80vh] lg:py-32" data-moment="word-highlight">
      <p
        ref={ref}
        className="max-w-[960px] font-display text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.16] tracking-[-0.015em] [text-wrap:pretty]"
      >
        {words.map((x, i) => {
          const on = i < lit;
          const color = on ? (x.strong ? "text-burgundy dark:text-gold" : "text-ink") : "text-ink/60";
          return (
            <span key={`${lang}-${i}`} className={`transition-colors duration-[160ms] ${color}`}>
              {x.w}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>
    </div>
  );
}

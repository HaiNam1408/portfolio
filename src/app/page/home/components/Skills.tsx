import { useTranslation } from "react-i18next";
import { education, skills, type Lang } from "../../../../content/career";
import { Stamp, WaveField } from "../../../components/passport";
import { CountUp, Reveal, SectionHeading } from "../../../components/motion";

export default function Skills() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("vi") ? "vi" : "en";
  const [gpa, scale] = education.gpa.split("/").map((s) => s.trim());

  return (
    <div className="py-24 lg:py-32">
      <SectionHeading title={t("common.passport.credentials.title")} subtitle={t("common.passport.credentials.subtitle")} />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <h3 className="font-display text-[1.75rem] font-bold text-ink">{t("common.passport.credentials.skills")}</h3>
          <dl className="mt-6 border-t border-rule/25">
            {skills.map((g, gi) => (
              <Reveal
                key={g.label.en}
                delay={gi * 0.08}
                y={16}
                className="grid gap-2.5 border-b border-rule/20 py-5 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-baseline sm:gap-8"
              >
                <dt className="field-label">{g.label[lang]}</dt>
                <dd className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  {g.items.map((item, i) => (
                    <span key={item} className="inline-flex items-center gap-3 whitespace-nowrap">
                      <span className="font-mono text-[0.9375rem] tracking-[0.03em] text-ink">{item}</span>
                      {i < g.items.length - 1 && <span className="h-1 w-1 rounded-full bg-rule/40" aria-hidden="true" />}
                    </span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <figure aria-label={t("common.passport.credentials.education")} className="relative self-start overflow-hidden rounded-[10px] border border-rule/25 bg-sage p-6 shadow-[0_30px_60px_-44px_rgb(var(--burgundy-deep)/0.5)] sm:p-8">
          <WaveField className="absolute inset-0 h-full w-full opacity-60 dark:opacity-25" density={40} />
          <Stamp
            shape="circle"
            ink="plum"
            lines={["DONG A UNIV", "CLASS 2025", "VALEDICTORIAN"]}
            rotate={-11}
            press="view"
            delay={0.5}
            className="absolute right-4 top-4 w-24 sm:right-6 sm:top-6 sm:w-28"
          />
          <div className="relative">
            <h3 className="max-w-[14ch] font-display text-[1.75rem] font-bold leading-tight text-ink">{education.school}</h3>
            <p className="mt-1 font-display text-lg italic text-ink-soft">{education.degree[lang]}</p>
            <p className="field-value mt-3 !text-[0.875rem]">{education.period}</p>

            <div className="mt-8 border-t border-rule/20 pt-5">
              <p className="field-label">{t("common.passport.credentials.gpa")}</p>
              <p className="mt-2 font-display leading-none text-stamp-green">
                <span className="text-[clamp(3.5rem,7vw,5rem)] font-extrabold tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
                  <CountUp value={gpa} duration={1.6} />
                </span>
                <span className="ml-2 text-2xl font-medium text-ink-soft">/ {scale}</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {education.honors.map((h) => (
                <li key={h.en} className="flex gap-3">
                  <span className="mt-[0.8em] h-px w-3 shrink-0 bg-burgundy dark:bg-gold" aria-hidden="true" />
                  <p className="text-[0.9375rem] leading-relaxed text-ink">{h[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </div>
    </div>
  );
}

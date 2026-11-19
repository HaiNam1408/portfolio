import { useTranslation } from "react-i18next";
import { experience, type Lang } from "../../../../content/career";
import { Stamp, WaveField } from "../../../components/passport";
import { CountUp, Reveal, SectionHeading } from "../../../components/motion";

export default function Experience() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("vi") ? "vi" : "en";

  return (
    <div className="py-24 lg:py-32">
      <SectionHeading
        title={t("common.passport.experience.title")}
        subtitle={t("common.passport.experience.subtitle")}
        subtitleClass="max-w-[56ch]"
      />

      <ol className="mt-14 space-y-12">
        {experience.map((job, jobIndex) => (
          <Reveal as="li" key={job.company}>
            <article
              className={`relative rounded-[10px] border border-rule/25 shadow-[0_30px_60px_-44px_rgb(var(--burgundy-deep)/0.55)] ${
                jobIndex % 2 === 0 ? "bg-raised" : "bg-mist"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]">
                <WaveField className="h-full w-full opacity-25 dark:opacity-10" density={44} />
              </div>

              <div className="relative grid lg:grid-cols-[300px_minmax(0,1fr)]">
                <header className="relative border-b border-rule/20 lg:border-b-0 lg:border-r">
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 p-6 sm:p-8 lg:sticky lg:top-6 lg:flex-col lg:flex-nowrap lg:items-start lg:justify-start">
                  <div>
                    <h3 className="font-display text-[1.875rem] font-bold leading-tight text-ink">{job.company}</h3>
                    <p className="mt-1 font-display text-lg italic text-ink-soft">{job.role[lang]}</p>
                    <p className="field-value mt-5 !text-[0.875rem]">{job.period}</p>
                    <p className="field-label mt-2 !normal-case !tracking-[0.04em]">{job.location}</p>
                  </div>
                  <Stamp
                    shape={job.stamp.shape}
                    ink={job.stamp.ink}
                    lines={job.stamp.lines}
                    rotate={job.stamp.rotate}
                    press="view"
                    delay={0.35}
                    className="w-32 lg:mt-6 lg:w-40"
                  />
                  {job.exit && (
                    <Stamp
                      shape={job.exit.shape}
                      ink={job.exit.ink}
                      lines={job.exit.lines}
                      rotate={job.exit.rotate}
                      press="view"
                      delay={0.7}
                      className="w-32 lg:-mt-2 lg:ml-10 lg:w-40"
                    />
                  )}
                  </div>
                </header>

                <div className="divide-y divide-rule/20">
                  {job.projects.map((p) => (
                    <section key={p.name} className="p-6 sm:p-8">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                        <div className="max-w-[56ch]">
                          <h4 className="font-display text-[1.625rem] font-bold leading-tight text-ink">{p.name}</h4>
                          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{p.kind[lang]}</p>
                        </div>
                        {p.metric && (
                          <div className="shrink-0 sm:text-right">
                            <div className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-none tracking-[-0.02em] text-stamp-green [font-variant-numeric:tabular-nums]">
                              <CountUp value={p.metric.value} />
                            </div>
                            <div className="field-label mt-2 max-w-[24ch] !leading-snug sm:ml-auto">{p.metric.label[lang]}</div>
                          </div>
                        )}
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {p.highlights.map((h) => (
                          <li key={h.en} className="flex gap-3">
                            <span className="mt-[0.8em] h-px w-3 shrink-0 bg-burgundy dark:bg-gold" aria-hidden="true" />
                            <p className="max-w-[72ch] text-[0.9375rem] leading-relaxed text-ink">{h[lang]}</p>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[0.8125rem] tracking-[0.02em] text-ink-soft">
                        <span className="sr-only">{t("common.passport.experience.stack")}: </span>
                        {p.tech.map((tech, i) => (
                          <span key={tech} className="whitespace-nowrap">
                            {tech}
                            {i < p.tech.length - 1 && (
                              <span className="ml-2 text-rule/50" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

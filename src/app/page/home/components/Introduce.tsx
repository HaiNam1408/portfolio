import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { EngravedName, Hologram, Mrz, Stamp, WaveField, mrz } from "../../../components/passport";
import { facts, headline, summary, type Lang } from "../../../../content/career";
import { CountUp } from "../../../components/motion";

/* Hero entrance, once per visit (taste motion layer):
   the h1 rises whole out of its mask (700ms), then each item in its column fades up 12px
   (520ms, 60ms apart, starting as the h1 is half way up); the data page settles from .98
   (900ms, never fades); the stamps press once the page stands. All about 1.1 s, ease-out. */
const ENTER: Transition["ease"] = [0.22, 1, 0.36, 1];
const FOLLOW_START = 0.35;

function DataPage({ animate }: { animate: boolean }) {
  const { t } = useTranslation();

  const fields: { label: string; value: string; status?: boolean }[] = [
    { label: t("common.passport.surname"), value: "Phạm" },
    { label: t("common.passport.given"), value: "Hải Nam" },
    { label: t("common.passport.nationality"), value: t("common.passport.nationalityValue") },
    { label: t("common.passport.base"), value: t("common.passport.baseValue") },
    { label: t("common.passport.occupation"), value: "Software Engineer" },
    { label: t("common.passport.employer"), value: "Kozocom Vietnam" },
    { label: t("common.passport.status"), value: t("common.passport.statusValue"), status: true },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[600px] pt-14 sm:pt-6 lg:pt-0">
      <motion.div
        initial={animate ? { scale: 0.98 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.9, ease: ENTER }}
        className="relative overflow-hidden rounded-[10px] border border-rule/25 bg-rose shadow-[0_40px_70px_-40px_rgb(var(--burgundy-deep)/0.55),0_2px_6px_-2px_rgb(0_0_0/0.12)]"
      >
        <WaveField className="absolute inset-0 h-full w-full opacity-70 dark:opacity-30" density={64} />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule/25 pb-3">
            <span className="font-display text-lg font-bold uppercase tracking-[0.16em] text-burgundy dark:text-gold">
              {t("common.passport.document")}
            </span>
            <span className="field-label">
              {t("common.passport.type")} <span className="text-ink">P</span> · {t("common.passport.code")}{" "}
              <span className="text-ink">VNM</span> · {t("common.passport.number")}{" "}
              <span className="text-ink">HAINAM1408</span>
            </span>
          </div>

          <div className="mt-5 grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-4 sm:gap-7">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] border border-rule/30 bg-paper">
                <img
                  src="/images/avatar.jpg"
                  alt={t("common.passport.photoAlt")}
                  className="h-full w-full object-cover saturate-[0.85]"
                  width={360}
                  height={480}
                />
              </div>
              <Hologram className="absolute -bottom-4 -right-4 h-14 w-14 sm:h-[72px] sm:w-[72px]" />
            </div>

            <dl className="flex flex-col justify-between gap-2.5">
              {fields.map((f) => (
                <div key={f.label}>
                  <dt className="field-label !text-[0.625rem] sm:!text-[0.6875rem]">{f.label}</dt>
                  <dd className="field-value mt-0.5 flex items-center gap-2 whitespace-nowrap !text-[0.8125rem] sm:!text-[0.9375rem] lg:!text-[0.8125rem] xl:!text-[0.9375rem]">
                    {f.status && <span className="h-2 w-2 shrink-0 rounded-full bg-stamp-green" aria-hidden="true" />}
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 border-t border-rule/25 pt-4 text-ink/80">
            <Mrz
              className="block w-full"
              lines={[
                mrz("P", "VNMPHAM", "", "HAI", "NAM"),
                mrz("HAINAM1408", "VNM", "BACKEND", "NESTJS", "LLM", "RAG"),
              ]}
            />
          </div>
        </div>
      </motion.div>

      <Stamp
        shape="oval"
        ink="navy"
        lines={["KOZOCOM", "MAR 2025", "ENTRY · DA NANG"]}
        rotate={-9}
        delay={0.55}
        className="absolute right-2 top-0 w-36 sm:-top-8 sm:right-3 sm:w-48 lg:-top-16 lg:right-0 lg:w-40 xl:-top-10 xl:w-48"
        label="Kozocom Vietnam, since March 2025"
      />
      <Stamp
        shape="rect"
        ink="red"
        lines={["KDHM", "JAN 2024", "BACKEND DEV"]}
        rotate={6}
        delay={0.68}
        className="absolute -left-3 bottom-16 w-32 sm:-left-10 sm:bottom-20 sm:w-44"
        label="KDHM Solutions, backend developer from January to November 2024"
      />
      <Stamp
        shape="circle"
        ink="green"
        lines={["DONG A UNIV", "GPA 3.81", "VALEDICTORIAN"]}
        rotate={-14}
        delay={0.81}
        className="absolute -bottom-10 right-6 w-24 sm:-bottom-12 sm:right-10 sm:w-32"
        label="Dong A University, GPA 3.81, valedictorian"
      />
    </div>
  );
}

function Introduce() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("vi") ? "vi" : "en";
  const animate = !useReducedMotion();

  const stats = facts.map((f) => ({ value: f.value, label: f.label[lang] }));

  /** The n-th item after the h1: fades up 12px, 60ms after the one before. */
  const follow = (n: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.52, delay: FOLLOW_START + n * 0.06, ease: ENTER },
        }
      : {};

  return (
    <div className="grid min-h-[calc(100svh-3.5rem)] items-center gap-16 pb-20 pt-10 lg:min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:py-16 xl:gap-16">
      <div className="flex flex-col">
        <h1 className="overflow-hidden pb-2 font-display text-burgundy dark:text-ink">
          <motion.span
            className="block"
            initial={animate ? { y: "105%" } : false}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: ENTER }}
          >
            <span className="block text-[clamp(1.25rem,2vw,1.6rem)] font-medium italic text-ink-soft">
              {t("common.intro.hello")}
            </span>
            <span className="sr-only">Phạm Hải Nam</span>
            <EngravedName
              lines={["Phạm", "Hải Nam"]}
              className="mt-3 block w-[clamp(280px,40vw,560px)] text-burgundy dark:text-gold"
            />
          </motion.span>
        </h1>

        <motion.p
          {...follow(0)}
          className="mt-4 max-w-[26ch] font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.18] text-ink"
        >
          {headline[lang]}
        </motion.p>

        <motion.p {...follow(1)} className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          {summary[lang]}
        </motion.p>

        <motion.dl
          {...follow(3)}
          className="order-last mt-8 grid max-w-[520px] grid-cols-3 border-y border-rule/20 sm:order-none"
        >
          {stats.map((s, i) => (
            <div key={s.label} className={`py-3 ${i > 0 ? "border-l border-rule/20 pl-4" : "pr-4"}`}>
              <dt className="field-label leading-snug">{s.label}</dt>
              <dd className="field-value mt-1 whitespace-nowrap !text-base [font-variant-numeric:tabular-nums] sm:!text-lg">
                <CountUp value={s.value} duration={1.6} />
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div {...follow(2)} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
          <a href="/files/CV_Software_Engineer.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ArrowDownToLine size={17} strokeWidth={1.75} aria-hidden="true" />
            {t("common.intro.resume")}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary group"
          >
            {t("common.passport.contactCta")}
            <ArrowRight
              size={17}
              strokeWidth={1.75}
              aria-hidden="true"
              className="transition-transform duration-[120ms] group-hover:translate-x-[3px] group-hover:duration-150"
            />
          </a>
        </motion.div>
      </div>

      <DataPage animate={animate} />
    </div>
  );
}

export default Introduce;

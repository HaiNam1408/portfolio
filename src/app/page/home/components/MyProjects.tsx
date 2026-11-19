import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";
import * as data from "../../../../assets/data.json";
import { Mrz, Stamp, WaveField, mrz } from "../../../components/passport";
import { Reveal, SectionHeading } from "../../../components/motion";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = data.projects;

const tints = [
  { bg: "bg-rose", ink: "text-stamp-red" },
  { bg: "bg-sage", ink: "text-stamp-green" },
  { bg: "bg-mist", ink: "text-stamp-navy" },
] as const;

const stampStyles = [
  { shape: "oval", ink: "navy", rotate: -8 },
  { shape: "rect", ink: "red", rotate: 7 },
  { shape: "circle", ink: "green", rotate: -13 },
  { shape: "rect", ink: "plum", rotate: -6 },
  { shape: "oval", ink: "red", rotate: 9 },
  { shape: "circle", ink: "navy", rotate: 12 },
] as const;

function destination(p: Project) {
  if (p.liveUrl) return new URL(p.liveUrl).hostname.replace(/^www\./, "");
  if (p.githubUrl) return new URL(p.githubUrl).pathname.split("/").filter(Boolean).pop() ?? "";
  return "";
}

function VisaPlate({
  project,
  index,
  lead = false,
  reverse = false,
}: {
  project: Project;
  index: number;
  lead?: boolean;
  reverse?: boolean;
}) {
  const { t } = useTranslation();
  const tint = tints[index % tints.length];
  const stamp = stampStyles[index % stampStyles.length];
  const dest = destination(project);
  const isMobile = project.technologies.some((x) => /flutter/i.test(x));
  const [name, tagline] = project.title.split(/\s+[–-]\s+/);
  const shortDest = dest.split(".")[0].split("-").slice(0, 2).join("-").toUpperCase();

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-rule/25 ${tint.bg} shadow-[0_24px_50px_-36px_rgb(var(--burgundy-deep)/0.5)] transition-[transform,box-shadow] duration-[120ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:duration-[180ms] hover:shadow-[0_32px_60px_-34px_rgb(var(--burgundy-deep)/0.6)]`}
    >
      <WaveField className="absolute inset-0 h-full w-full opacity-50 dark:opacity-20" density={lead ? 48 : 36} />

      <header className="relative flex items-baseline justify-between gap-4 border-b border-rule/20 px-5 pb-3 pt-5 sm:px-6">
        <span className={`font-display text-[1.75rem] font-bold uppercase leading-none tracking-[0.14em] ${tint.ink}`}>
          {t("common.passport.visa")}
        </span>
        <span className="field-label truncate !normal-case !tracking-[0.06em] text-ink">{dest}</span>
      </header>

      <div
        className={`relative flex flex-1 flex-col ${
          lead
            ? `lg:grid lg:gap-2 ${reverse ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]" : "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"}`
            : ""
        }`}
      >
        <div className={`relative px-5 pt-5 sm:px-6 ${lead ? "lg:pb-24" : "lg:pb-6"} ${lead && reverse ? "lg:order-2" : ""}`}>
          <a
            href={project.liveUrl ?? project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("common.passport.openProject", { title: name })}
            className="m-zoom relative block aspect-[16/10] overflow-hidden rounded-[4px] border border-rule/25 bg-paper"
          >
            <img src={project.image} alt={name} loading="lazy" className="h-full w-full object-cover object-top" />
          </a>
          <Stamp
            shape={stamp.shape}
            ink={stamp.ink}
            rotate={stamp.rotate}
            press="view"
            delay={0.45}
            lines={[t("common.passport.entry").toUpperCase(), shortDest, isMobile ? "MOBILE" : "WEB"]}
            className={`absolute right-3 z-10 ${stamp.shape === "circle" ? "-bottom-[70px] w-24 sm:w-28" : "-bottom-12 w-32 sm:w-36"} ${
              lead ? "lg:bottom-3 lg:right-4 lg:w-40" : ""
            }`}
          />
        </div>

        <div className={`relative flex flex-1 flex-col px-5 pb-5 pt-16 sm:px-6 ${lead ? "lg:pt-5" : ""}`}>
          <h3 className={`font-display font-bold leading-tight text-ink ${lead ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[1.625rem]"}`}>
            {name}
            {tagline && <span className="mt-1 block text-base font-medium italic text-ink-soft">{tagline}</span>}
          </h3>
          <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-soft">{project.description}</p>

          <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 border-t border-rule/20 pt-4">
            <dt className="field-label pt-0.5">{t("common.passport.visaType")}</dt>
            <dd className="field-value !text-[0.8125rem]">
              {isMobile ? t("common.passport.typeMobile") : t("common.passport.typeWeb")}
            </dd>
            <dt className="field-label pt-0.5">{t("common.passport.visaStack")}</dt>
            <dd className="field-value !text-[0.8125rem] !normal-case">{project.technologies.join(" · ")}</dd>
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-4 !py-2.5 !text-[0.75rem]"
                aria-label={`${t("common.projectsSection.demo")}: ${name}`}
              >
                <ExternalLink size={15} strokeWidth={1.75} aria-hidden="true" />
                {t("common.projectsSection.demo")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !px-4 !py-2.5 !text-[0.75rem]"
                aria-label={`${t("common.projectsSection.viewCode")}: ${name}`}
              >
                <Github size={15} strokeWidth={1.75} aria-hidden="true" />
                {t("common.projectsSection.viewCode")}
              </a>
            )}
          </div>
        </div>
      </div>

      <footer className="relative border-t border-rule/20 px-5 py-3 text-ink/65 sm:px-6">
        <Mrz className={`block w-full ${lead ? "max-w-[520px]" : ""}`} lines={[mrz("V", "VNM", dest, ...project.technologies)]} />
      </footer>
    </article>
  );
}

function MyProjects() {
  const { t } = useTranslation();

  return (
    <div className="py-24 lg:py-32">
      <SectionHeading title={t("common.projectsSection.title")} subtitle={t("common.projectsSection.subtitle")} />

      <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-10 lg:gap-y-14">
        {projects.map((project, index) => {
          const lead = index % 3 === 0 && index < projects.length - 1;
          // The second plate of a pair follows the first by a beat.
          const delay = !lead && index % 3 === 2 ? 0.12 : 0;
          return (
            <Reveal key={project.title} delay={delay} y={36} className={lead ? "md:col-span-2" : ""}>
              <VisaPlate project={project} index={index} lead={lead} reverse={index % 6 === 3} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default MyProjects;

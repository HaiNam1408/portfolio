import { BookUser, BriefcaseBusiness, FolderOpen, Languages, MessageCircleQuestion, Moon, PenLine, ScrollText, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Theme } from "../../hooks";
import { Crest } from "../components/passport";

type NavbarProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  activeSection: string;
  onChat: () => void;
};

const sections = [
  { id: "home", key: "home", Icon: BookUser },
  { id: "experience", key: "experience", Icon: BriefcaseBusiness },
  { id: "projects", key: "projects", Icon: FolderOpen },
  { id: "skills", key: "skills", Icon: ScrollText },
  { id: "contact", key: "contact", Icon: PenLine },
] as const;

function useNavActions(theme: Theme, setTheme: (t: Theme) => void) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("vi") ? "vi" : "en";

  const toggleLang = () => {
    const next = lang === "en" ? "vi" : "en";
    i18n.changeLanguage(next);
    try {
      localStorage.setItem("i18nextLng", next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return { lang, toggleLang, toggleTheme };
}

function go(e: React.MouseEvent, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export default function Navbar({ theme, setTheme, activeSection, onChat }: NavbarProps) {
  const { t } = useTranslation();
  const { lang, toggleLang, toggleTheme } = useNavActions(theme, setTheme);
  const themeLabel = theme === "dark" ? t("common.passport.themeLight") : t("common.passport.themeDark");
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <>
      {/* Desktop: the passport cover runs down the left edge. */}
      <aside className="leather fixed inset-y-0 left-0 z-40 hidden w-[96px] flex-col items-center border-r border-black/20 py-6 text-on-burgundy lg:flex">
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          className="mb-8 block h-14 w-14 text-gold transition-transform duration-300 ease-out-expo hover:scale-105"
          aria-label="Phạm Hải Nam"
        >
          <Crest className="h-full w-full" />
        </a>

        <nav aria-label={t("common.passport.nav.menu")} className="flex flex-1 flex-col items-stretch gap-1 self-stretch px-2">
          {sections.map(({ id, key, Icon }) => {
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                aria-current={active ? "location" : undefined}
                className={`group relative flex flex-col items-center gap-1.5 rounded-[4px] px-1 py-3 text-center transition-colors duration-200 ${
                  active ? "text-on-burgundy" : "text-on-burgundy/75 hover:bg-black/10 hover:text-on-burgundy"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-desktop"
                    className="absolute inset-0 rounded-[4px] bg-black/20"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    aria-hidden="true"
                  />
                )}
                <Icon size={20} strokeWidth={1.5} className="relative transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span className="relative font-mono text-[0.625rem] uppercase leading-tight tracking-[0.12em]">
                  {t(`common.passport.nav.${key}`)}
                </span>
                <span className="relative h-px w-6" aria-hidden="true">
                  {active && (
                    <motion.span
                      layoutId="nav-active-rule"
                      className="absolute inset-0 bg-gold"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("common.passport.language")}
            className="flex h-11 w-11 items-center justify-center rounded-[4px] font-mono text-xs tracking-[0.14em] text-on-burgundy/85 transition-colors hover:bg-black/15 hover:text-on-burgundy"
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="flex h-11 w-11 items-center justify-center rounded-[4px] text-on-burgundy/85 transition-colors hover:bg-black/15 hover:text-on-burgundy"
          >
            <ThemeIcon size={18} strokeWidth={1.5} />
          </button>
          <div className="mt-3 flex flex-col items-center gap-1.5 border-t border-on-burgundy/20 pt-4">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
            <span className="w-[80px] text-center font-mono text-[0.625rem] uppercase leading-tight tracking-[0.1em] text-on-burgundy/80">
              {t("common.passport.statusValue")}
            </span>
          </div>
        </div>
      </aside>

      {/* Tablet and phone: a slim cover strip on top. */}
      <header className="leather fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-black/20 px-4 text-on-burgundy lg:hidden">
        <a href="#home" onClick={(e) => go(e, "home")} className="flex items-center gap-2.5">
          <Crest className="h-8 w-8 text-gold" />
          <span className="font-display text-lg font-bold tracking-[0.02em]">Hainam.</span>
        </a>
        <nav aria-label={t("common.passport.nav.menu")} className="hidden items-center gap-1 md:flex">
          {sections.slice(1).map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              aria-current={activeSection === id ? "location" : undefined}
              className={`rounded-[4px] px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                activeSection === id ? "bg-black/20 text-on-burgundy" : "text-on-burgundy/80 hover:text-on-burgundy"
              }`}
            >
              {t(`common.passport.nav.${key}`)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onChat}
            aria-label={t("common.passport.chat.open")}
            className="flex h-11 w-11 items-center justify-center rounded-[4px] text-on-burgundy/90 hover:bg-black/15 md:hidden"
          >
            <MessageCircleQuestion size={19} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("common.passport.language")}
            className="flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-[4px] px-2 font-mono text-xs tracking-[0.14em] text-on-burgundy/90 hover:bg-black/15"
          >
            <Languages size={16} strokeWidth={1.5} aria-hidden="true" />
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="flex h-11 w-11 items-center justify-center rounded-[4px] text-on-burgundy/90 hover:bg-black/15"
          >
            <ThemeIcon size={18} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Phone: section tabs along the bottom edge. */}
      <nav
        aria-label={t("common.passport.nav.menu")}
        className="leather fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-black/25 pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {sections.map(({ id, key, Icon }) => {
          const active = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              aria-current={active ? "location" : undefined}
              className={`relative flex min-h-[60px] flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-on-burgundy" : "text-on-burgundy/70"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active-mobile"
                  className="absolute inset-0 border-t-2 border-gold bg-black/20"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  aria-hidden="true"
                />
              )}
              <Icon size={19} strokeWidth={1.5} className="relative" />
              <span className="relative font-mono text-[0.625rem] uppercase tracking-[0.1em]">{t(`common.passport.nav.${key}`)}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

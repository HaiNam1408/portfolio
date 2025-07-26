import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "../../hooks";
import { useTranslation } from "react-i18next";

type NavebarProps = {
  theme: string;
  setTheme: (theme: Theme) => void;
};

const Navbar = (props: NavebarProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme } = props;
  const [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "en");
  const { t, i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = 1000;
          const progress = Math.min(lastScrollY / maxScroll, 1);
          setScrollProgress(progress);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navWidth = 80 - scrollProgress * 30;

  return (
    <div
      className="flex justify-between items-center rounded-full py-4 px-8"
      style={{
        width: `${navWidth}vw`,
        backgroundColor:
          theme === "dark"
            ? `rgba(0, 0, 0, ${scrollProgress})`
            : `rgba(255, 255, 255, ${scrollProgress})`,
        transition: "background-color 0.3s ease",
        boxShadow: `0 0 10px rgba(0, 0, 0, ${scrollProgress * 0.2})`,
      }}
    >
      <a href="/" className="text-lg">Hainam</a>
      <div className="flex">
        <a href="#" className="px-4">{t('common.about')}</a>
        <a href="#" className="px-4">{t('common.projects')}</a>
        <a href="#" className="px-4">{t('common.blogs')}</a>
        <a href="#" className="px-4">{t('common.contact')}</a>
      </div>
      <div className="flex gap-8">
        <div className="cursor-pointer" onClick={() => handleLanguageChange()}>
          {lang === "en" ? "EN" : "VI"}
        </div>
        <div
          className="cursor-pointer hover:scale-110 duration-200"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

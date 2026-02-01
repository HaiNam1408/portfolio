import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "../../hooks";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type NavbarProps = {
  theme: string;
  setTheme: (theme: Theme) => void;
};

const Navbar = ({ theme, setTheme }: NavbarProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [deviceWidth, setDeviceWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [lang, setLang] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("i18nextLng") || "en"
      : "en"
  );
  const { t, i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = lang === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking && deviceWidth > 768) {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [deviceWidth]);

  const navWidth = deviceWidth < 1150 ? 80 : 80 - scrollProgress * 30;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{
        y: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      }}
    >
      <div
        className="flex justify-between items-center rounded-full py-4 px-8 border"
        style={{
          width: `${navWidth}vw`,
          backgroundColor:
            theme === "dark"
              ? `rgba(0, 0, 0, ${scrollProgress * 0.8})`
              : `rgba(255, 255, 255, ${0.9 + scrollProgress * 0.1})`,
          borderColor:
            theme === "dark"
              ? `rgba(255, 255, 255, ${0.1 + scrollProgress * 0.2})`
              : `rgba(0, 0, 0, ${0.1 + scrollProgress * 0.1})`,
          color: theme === "dark" ? "#ffffff" : "#000000",
          transition: "all 0.3s ease",
          boxShadow: 
            theme === "dark"
              ? `0 0 10px rgba(0, 0, 0, ${scrollProgress * 0.3})`
              : `0 4px 20px rgba(0, 0, 0, ${0.05 + scrollProgress * 0.1})`,
          backdropFilter: "blur(10px)",
        }}
      >
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="text-lg font-semibold"
          style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
        >
          Hainam.
        </a>

        <div className="hidden md:flex">
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className="px-4 transition-colors cursor-pointer"
            style={{ 
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#1f2937")}
          >
            {t("common.about")}
          </a>
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
            className="px-4 transition-colors cursor-pointer"
            style={{ 
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#1f2937")}
          >
            {t("common.projects")}
          </a>
          <a 
            href="#blogs" 
            className="px-4 transition-colors cursor-pointer"
            style={{ 
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#1f2937")}
          >
            {t("common.blogs")}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="px-4 transition-colors cursor-pointer"
            style={{ 
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme === "dark" ? "#ffffff" : "#1f2937")}
          >
            {t("common.contact")}
          </a>
        </div>

        <div className="flex gap-6 items-center">
          <div
            className="cursor-pointer font-medium"
            onClick={handleLanguageChange}
            style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
          >
            {lang.toUpperCase()}
          </div>

          <div
            className="cursor-pointer hover:scale-110 duration-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;

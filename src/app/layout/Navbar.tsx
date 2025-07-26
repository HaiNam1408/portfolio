import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { Theme } from "../../hooks";

type NavebarProps = {
  theme: string;
  setTheme: (theme: Theme) => void;
};

const Navbar = (props: NavebarProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme } = props;

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
      <div className="text-lg">Hainam</div>
      <div className="flex">
        <div className="px-4">About Me</div>
        <div className="px-4">Projects</div>
        <div className="px-4">My Blogs</div>
        <div className="px-4">Contact</div>
      </div>
      <div
        className="cursor-pointer hover:scale-110 duration-200"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </div>
    </div>
  );
};

export default Navbar;

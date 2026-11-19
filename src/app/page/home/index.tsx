import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import type { Theme } from "../../../hooks";
import { Navbar } from "../../layout";
import Footer from "../../layout/Footer";
import Introduce from "./components/Introduce";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Statement from "./components/Statement";
import { useTranslation } from "react-i18next";
import MyProjects from "./components/MyProjects";
import Contact from "./components/Contact";
import FloatButton from "../../components/ui/FloatButton";
import ChatBox from "../../components/ui/ChatBox";
import { WaveField } from "../../components/passport";
import { ScrollProgress } from "../../components/motion";

const SECTIONS = ["home", "experience", "projects", "skills", "contact"];

function Home({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const { t } = useTranslation();
  const [isShowChatBox, setIsShowChatBox] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleChatBox = () => setIsShowChatBox((v) => !v);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        {t("common.passport.skip")}
      </a>

      <WaveField className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.22] dark:opacity-[0.08]" density={52} />

      <ScrollProgress className="lg:left-[96px] max-lg:top-14" />
      <Navbar theme={theme} setTheme={setTheme} activeSection={activeSection} onChat={toggleChatBox} />

      <div className="pt-14 lg:pl-[96px] lg:pt-0">
        <main id="main" tabIndex={-1} className="mx-auto max-w-[1240px] px-5 outline-none md:px-10">
          <section id="home">
            <Introduce />
          </section>
          <section aria-label={t("common.passport.statementLabel")} className="border-t border-rule/15">
            <Statement />
          </section>
          <section id="experience" className="border-t border-rule/15">
            <Experience />
          </section>
          <section id="projects" className="border-t border-rule/15">
            <MyProjects />
          </section>
          <section id="skills" className="border-t border-rule/15">
            <Skills />
          </section>
          <section id="contact" className="border-t border-rule/15">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>

      {isShowChatBox && <ChatBox toogleChatBox={toggleChatBox} />}
      <FloatButton onClick={toggleChatBox} open={isShowChatBox} className="!hidden md:!flex" />
    </MotionConfig>
  );
}

export default Home;

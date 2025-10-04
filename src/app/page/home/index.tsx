import type { Theme } from "../../../hooks";
import Dock from "../../components/ui/Dock";
import { Navbar } from "../../layout";
import Introduce from "./components/Introduce";
import { Activity, Archive, HomeIcon, Settings } from "lucide-react";
import WhatIDo from "./components/WhatIDo";
import MyProjects from "./components/MyProjects";
import Contact from "./components/Contact";
import Footer from "../../layout/Footer";

function Home(props: { theme: string; setTheme: (theme: Theme) => void }) {
  const { theme, setTheme } = props;
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const items = [
    {
      icon: <HomeIcon size={18} />,
      label: "Home",
      onClick: () => scrollToSection("home"),
    },
    {
      icon: <Archive size={18} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <Activity size={18} />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => alert("Settings coming soon!"),
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>
      {/* Main */}
      <main className="container mx-auto px-2 md:px-4 pt-20 md:pt-0 pb-8 md:pb-4 space-y-16 md:space-y-24">
        <section id="home">
          <Introduce />
        </section>
        <section id="about">
          <WhatIDo />
        </section>
        <section id="projects">
          <MyProjects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
      <div className="block md:hidden fixed bottom-1 left-1/2 -translate-x-1/2 z-50">
        <Dock
          items={items}
          panelHeight={58}
          baseItemSize={40}
          magnification={50}
        />
      </div>
    </>
  );
}

export default Home;

import type { Theme } from "../../../hooks";
import Dock from "../../components/ui/Dock";
import { Navbar } from "../../layout";
import Introduce from "./components/Introduce";
import { HomeIcon, MessageSquare, Rocket, User2Icon } from "lucide-react";
import WhatIDo from "./components/WhatIDo";
import MyProjects from "./components/MyProjects";
import Contact from "./components/Contact";
import Footer from "../../layout/Footer";
import FloatButton from "../../components/ui/FloatButton";
import ChatBox from "../../components/ui/ChatBox";
import { useState } from "react";

function Home(props: { theme: string; setTheme: (theme: Theme) => void }) {
  const { theme, setTheme } = props;
  const [ isShowChatBox, setIsShowChatBox ] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toogleChatBox = () : void => {
    setIsShowChatBox(!isShowChatBox);
  };

  const items = [
    {
      icon: <HomeIcon size={18} />,
      label: "Home",
      onClick: () => scrollToSection("home"),
    },
    {
      icon: <User2Icon size={18} />,
      label: "About",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <Rocket size={18} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>
      {/* Main */}
      <main className="w-full px-4 md:px-8 lg:px-16 pt-20 md:pt-0 pb-24 md:pb-8 space-y-16 md:space-y-24 overflow-x-hidden">
        <section id="home" className="w-full max-w-7xl mx-auto">
          <Introduce />
        </section>
        <section id="about" className="w-full max-w-7xl mx-auto">
          <WhatIDo />
        </section>
        <section id="projects" className="w-full max-w-7xl mx-auto">
          <MyProjects />
        </section>
        <section id="contact" className="w-full max-w-7xl mx-auto">
          <Contact />
        </section>
      </main>

      <Footer />
      <div className="block md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pb-2">
        <Dock
          items={items}
          panelHeight={58}
          baseItemSize={40}
          magnification={50}
        />
      </div>
      { isShowChatBox && <ChatBox />}
      <FloatButton onClick={toogleChatBox} />
    </>
  );
}

export default Home;

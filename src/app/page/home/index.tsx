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
  const items = [
    {
      icon: <HomeIcon size={18} />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <Archive size={18} />,
      label: "Archive",
      onClick: () => alert("Archive!"),
    },
    {
      icon: <Activity size={18} />,
      label: "Profile",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => alert("Settings!"),
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
        <Introduce />
        <WhatIDo />
        <MyProjects />
        <Contact />
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

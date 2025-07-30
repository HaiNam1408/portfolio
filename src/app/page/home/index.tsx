import type { Theme } from "../../../hooks";
import Dock from "../../components/ui/Dock";
import { Navbar } from "../../layout";
import Introduce from "./components/Introduce";
import { Activity, Archive, HomeIcon, Settings } from "lucide-react";

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
    <div>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>
      {/* Main */}
      <main className="h-[3000px] container mx-auto px-2 md:px-4 pt-12 md:pt-28 pb-8 md:pb-4 space-y-16 md:space-y-24">
        <Introduce />
      </main>

      <div className="z-10">{/* <Footer /> */}</div>
      <div className="block md:hidden fixed bottom-1 left-1/2 -translate-x-1/2 z-50">
        <Dock
          items={items}
          panelHeight={58}
          baseItemSize={40}
          magnification={50}
        />
      </div>
    </div>
  );
}

export default Home;

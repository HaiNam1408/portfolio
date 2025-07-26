import "./App.css";
import Navbar from "./components/layout/Navbar";
import Squares from "./components/ui/Squares";
import { useTheme } from "./hooks";

function App() {
  const {theme, setTheme} = useTheme();

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300 relative">
      <Squares
        speed={0.2}
        squareSize={40}
        direction="diagonal"
        borderColor={theme === "dark" ? "#fff1" : "#0001"}
        fillColor={theme === "dark" ? "#0001" : "#fff"}
      />

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>
      {/* Nội dung */}
      <main className="h-[3000px] container mx-auto px-4 pt-8 md:pt-24 pb-8 md:pb-4 space-y-16 md:space-y-24 relative z-10">
        <div className="relative min-h-[80vh] w-full">
          <h1 className="text-3xl font-bold underline dark:text-amber-200">
            Hello world!
          </h1>
          
        </div>
      </main>

      <div className="relative z-10">{/* <Footer /> */}</div>
    </div>
  );
}

export default App;

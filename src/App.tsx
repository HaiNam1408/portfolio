import "./App.css";
import { Squares } from "./app/components/ui";
import { Home } from "./app/page";
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

      <Home theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;

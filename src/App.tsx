import { Home } from "./app/page";
import { useTheme } from "./hooks";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full overflow-x-clip text-ink">
      <Home theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;

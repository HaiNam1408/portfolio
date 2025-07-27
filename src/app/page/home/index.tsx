import type { Theme } from '../../../hooks';
import { Navbar } from '../../layout';
import Introduce from './components/Introduce';

function Home(props: { theme: string; setTheme: (theme: Theme) => void }) {
    const { theme, setTheme } = props;
    return (
      <div>
        {/* Navbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <Navbar theme={theme} setTheme={setTheme} />
        </div>
        {/* Main */}
        <main className="h-[3000px] container mx-auto px-4 pt-12 md:pt-28 pb-8 md:pb-4 space-y-16 md:space-y-24">
          <Introduce />
        </main>

        <div className="relative z-10">{/* <Footer /> */}</div>
      </div>
    );
}

export default Home;
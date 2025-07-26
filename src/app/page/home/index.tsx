import { useTranslation } from 'react-i18next';
import type { Theme } from '../../../hooks';
import { Navbar } from '../../layout';

function Home(props: { theme: string; setTheme: (theme: Theme) => void }) {
    const { t } = useTranslation();
    const { theme, setTheme } = props;
    return (
      <div>
        {/* Navbar */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <Navbar theme={theme} setTheme={setTheme} />
        </div>
        {/* Main */}
        <main className="h-[3000px] container mx-auto px-4 pt-8 md:pt-24 pb-8 md:pb-4 space-y-16 md:space-y-24 relative z-10">
          <div className="relative min-h-[80vh] w-full">
            <h1 className="text-3xl font-bold underline dark:text-amber-200">
              {t('common.hello')}
            </h1>
          </div>
        </main>

        <div className="relative z-10">{/* <Footer /> */}</div>
      </div>
    );
}

export default Home;
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

function readStoredTheme(): Theme {
    try {
        const fromUrl = new URLSearchParams(window.location.search).get('theme');
        if (fromUrl === 'dark' || fromUrl === 'light') return fromUrl;
        return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(readStoredTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch {
            /* storage unavailable: theme still applies for this visit */
        }
    };

    return { theme, setTheme: changeTheme };
}

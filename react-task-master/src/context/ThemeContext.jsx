import { useEffect, useState } from 'react';
import { ThemeContext } from './theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
  } catch { /* ignore */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch { /* ignore */ }
    } else {
      root.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch { /* ignore */ }
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(v => !v);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
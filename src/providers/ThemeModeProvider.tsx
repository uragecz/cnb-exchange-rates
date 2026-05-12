import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, type ThemeMode } from '../theme';

const STORAGE_KEY = 'momence:theme-mode';

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === 'light' || value === 'dark';

const getInitialMode = (): ThemeMode => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isThemeMode(stored)) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

type ThemeModeContextValue = {
  mode: ThemeMode;
  toggle: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

type ThemeModeProviderProps = {
  children: ReactNode;
};

export const ThemeModeProvider = ({ children }: ThemeModeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  const toggle = useCallback(() => {
    setMode((current) => {
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeModeContextValue>(() => ({ mode, toggle }), [mode, toggle]);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeModeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = (): ThemeModeContextValue => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return ctx;
};

const sharedTokens = {
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  radii: { sm: '6px', md: '10px' },
  fontSizes: { sm: '0.75rem', md: '0.875rem', lg: '1rem', xl: '1.25rem' },
} as const;

export const darkTheme = {
  ...sharedTokens,
  mode: 'dark',
  colors: {
    background: '#0f1117',
    surface: '#1a1d27',
    text: '#e8eaf0',
    textMuted: '#7b8099',
    primary: '#4f8ef7',
    border: '#2a2d3a',
    error: '#e05c5c',
  },
  shadows: { card: '0 2px 8px rgba(0, 0, 0, 0.4)' },
} as const;

export const lightTheme = {
  ...sharedTokens,
  mode: 'light',
  colors: {
    background: '#f5f6fa',
    surface: '#ffffff',
    text: '#1a1d27',
    textMuted: '#6b7185',
    primary: '#3b6ee0',
    border: '#dfe2eb',
    error: '#c53030',
  },
  shadows: { card: '0 2px 8px rgba(20, 30, 60, 0.08)' },
} as const;

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    primary: string;
    border: string;
    error: string;
  };
  spacing: { xs: string; sm: string; md: string; lg: string; xl: string };
  radii: { sm: string; md: string };
  fontSizes: { sm: string; md: string; lg: string; xl: string };
  shadows: { card: string };
};

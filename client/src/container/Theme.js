import { createTheme } from '@mui/material/styles';

const neonGlowColors = {
  base: '#0d0f17',
  surface: '#16191f',
  accent: '#00ffc6',
  vibrantPink: '#ff007f',
  neonYellow: '#ffea00',
  textPrimary: '#ffffff',
  textSecondary: '#b3b3b3',
  error: '#ff1744',
  warning: '#ff9100',
  success: '#00e676',
  info: '#2979ff',
  overlay: '#212121',
  lightBase: '#f5f5f5',
  lightSurface: '#ffffff',
  lightTextPrimary: '#000000',
  lightTextSecondary: '#757575',
  lightAccent: '#6200ea',
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: neonGlowColors.base,
      paper: neonGlowColors.surface,
    },
    primary: {
      main: neonGlowColors.accent,
    },
    secondary: {
      main: neonGlowColors.vibrantPink,
    },
    error: {
      main: neonGlowColors.error,
    },
    warning: {
      main: neonGlowColors.warning,
    },
    info: {
      main: neonGlowColors.info,
    },
    success: {
      main: neonGlowColors.success,
    },
    text: {
      primary: neonGlowColors.textPrimary,
      secondary: neonGlowColors.textSecondary,
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: neonGlowColors.lightBase,
      paper: neonGlowColors.lightSurface,
    },
    primary: {
      main: neonGlowColors.lightAccent,
    },
    secondary: {
      main: neonGlowColors.vibrantPink,
    },
    error: {
      main: neonGlowColors.error,
    },
    warning: {
      main: neonGlowColors.warning,
    },
    info: {
      main: neonGlowColors.info,
    },
    success: {
      main: neonGlowColors.success,
    },
    text: {
      primary: neonGlowColors.lightTextPrimary,
      secondary: neonGlowColors.lightTextSecondary,
    },
  },
});

// Export a function to create the theme based on mode
export const createThemeByMode = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
import { createTheme } from '@mui/material/styles';

const customColors = {
  // 🌙 Dark Mode (New Purple Tones)
  darkBase: '#110022', // Deep Space Purple
  darkSurface: '#1C0B2B', // Dark Amethyst
  darkAccent: '#8A2BE2', // Electric Purple
  darkSecondary: '#C71585', // Dark Pinkish Purple
  darkTextPrimary: '#E6E6FA', // Lavender Mist
  darkTextSecondary: '#B39EB5', // Muted Mauve
  darkError: '#E63946', // Deep Red
  darkWarning: '#D72638', // Crimson
  darkSuccess: '#7DCEA0', // Mint Green
  darkInfo: '#9370DB', // Soft Purple

  // ☀️ Light Mode (New Greens)
  lightBase: '#F0FFF0', // Honeydew White
  lightSurface: '#FFFFFF', // Pure White
  lightAccent: '#145A32', // Dark Emerald
  lightSecondary: '#1E8449', // Shamrock Green
  lightTextPrimary: '#7DCEA0', // Mint Green
  lightTextSecondary: '#196F3D', // Deep Green
  lightError: '#FF595E', // Coral Red
  lightWarning: '#C70039', // Deep Red (No Orange)
  lightSuccess: '#4CAF50', // Fresh Green
  lightInfo: '#5F7161', // Muted Olive Green
};

// 🌙 **Dark Theme**
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: customColors.darkBase,
      paper: customColors.darkSurface,
    },
    primary: {
      main: customColors.darkAccent,
    },
    secondary: {
      main: customColors.darkSecondary,
    },
    error: {
      main: customColors.darkError,
    },
    warning: {
      main: customColors.darkWarning,
    },
    success: {
      main: customColors.darkSuccess,
    },
    info: {
      main: customColors.darkInfo,
    },
    text: {
      primary: customColors.darkTextPrimary,
      secondary: customColors.darkTextSecondary,
    },
  },
});

// ☀️ **Light Theme**
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: customColors.lightBase,
      paper: customColors.lightSurface,
    },
    primary: {
      main: customColors.lightAccent,
    },
    secondary: {
      main: customColors.lightSecondary,
    },
    error: {
      main: customColors.lightError,
    },
    warning: {
      main: customColors.lightWarning,
    },
    success: {
      main: customColors.lightSuccess,
    },
    info: {
      main: customColors.lightInfo,
    },
    text: {
      primary: customColors.lightTextPrimary,
      secondary: customColors.lightTextSecondary,
    },
  },
});

// 📌 **Export function to create the theme based on mode**
export const createThemeByMode = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

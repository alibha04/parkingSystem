import { createTheme } from '@mui/material/styles';

const solarizedDarkColors = {
  base: '#002b36',
  surface: '#073642',
  overlay: '#586e75',
  muted: '#657b83',
  subtle: '#839496',
  text: '#93a1a1',
  love: '#dc322f',
  gold: '#b58900',
  green: '#859900',
  blue: '#268bd2',
  cyan: '#2aa198',
  violet: '#6c71c4',
  highlightLow: '#073642',
  highlightMed: '#586e75',
  highlightHigh: '#839496',
};

const solarizedDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: solarizedDarkColors.base,
      paper: solarizedDarkColors.surface,
    },
    primary: {
      main: solarizedDarkColors.blue,
    },
    secondary: {
      main: solarizedDarkColors.cyan,
    },
    error: {
      main: solarizedDarkColors.love,
    },
    warning: {
      main: solarizedDarkColors.gold,
    },
    info: {
      main: solarizedDarkColors.violet,
    },
    success: {
      main: solarizedDarkColors.green,
    },
    text: {
      primary: solarizedDarkColors.text,
      secondary: solarizedDarkColors.subtle,
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h2: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h3: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h4: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h5: {
      fontFamily: '"Source Code Pro", monospace',
    },
    h6: {
      fontFamily: '"Source Code Pro", monospace',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: solarizedDarkColors.surface,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&family=Source+Code+Pro:wght@400;700&display=swap');
      `,
    },
  },
});

export default solarizedDarkTheme;

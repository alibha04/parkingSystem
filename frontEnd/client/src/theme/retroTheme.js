// src/theme/generateTheme.js
import { createTheme } from '@mui/material/styles';

const colors = {
  base: '#f4f4f9', // Light background for the home page
  surface: '#c0c0d0', // Surface elements like cards
  navbar: '#004d40', // Dark teal for navbar background
  footer: '#002f34', // Dark teal variant for footer background
  muted: '#9090a0', // Muted text
  subtle: '#606070', // Subtle text
  textPrimary: '#ffffff', // White text for visibility on dark elements
  textSecondary: '#303030', // Dark text for light backgrounds
  primary: '#00796b', // Button primary color
  secondary: '#00acc1', // Button hover or secondary actions
  error: '#ae2012', // Error state color
  warning: '#bb3e03', // Warning state color
  info: '#009688', // Info state color
  success: '#2e7d32', // Success state color
  highlight: '#edf2f4', // Highlight backgrounds
};

const generateTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: colors.base,
      paper: colors.surface,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: colors.textSecondary, // Dark color for light backgrounds
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      color: colors.textSecondary,
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 500,
      fontSize: '1.75rem',
      color: colors.textSecondary,
    },
    body1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1rem',
      color: colors.textSecondary,
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.875rem',
      color: colors.textSecondary,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.navbar, // Updated navbar color
          color: colors.textPrimary, // White text for visibility
          borderBottom: `3px solid ${colors.primary}`,
        },
      },
    },
    MuiFooter: {
      styleOverrides: {
        root: {
          backgroundColor: colors.footer, // Updated footer color
          color: colors.textPrimary, // White text for visibility
          borderTop: `3px solid ${colors.primary}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          borderRadius: '6px',
          padding: '10px 18px',
          backgroundColor: colors.primary,
          color: colors.textPrimary, // White text for visibility
          '&:hover': {
            backgroundColor: colors.secondary,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@import': `url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap')`,
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: colors.base,
            color: colors.textSecondary, // Default text color for light backgrounds
            fontFamily: `'Nunito', sans-serif`,
            lineHeight: 1.8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '24px',
          borderRadius: '10px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
          backgroundColor: colors.surface,
          color: colors.textSecondary, // Dark text for contrast
        },
      },
    },
  },
});

export default generateTheme;

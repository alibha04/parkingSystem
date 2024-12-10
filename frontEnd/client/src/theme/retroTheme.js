import { createTheme } from '@mui/material/styles';

const luxuriousColors = {
  darkBase: '#262425',          // Deep, rich dark background for the website
  goldAccent: '#D9B88F',        // Elegant gold for primary highlights
  bronze: '#BF8654',            // Warm bronze for buttons and accents
  lightBeige: '#A67A60',        // Light beige for borders, text
  deepMaroon: '#733030',        // Bold red for error messages and emphasis
};

const luxuriousTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: luxuriousColors.darkBase, // Main background
      paper: luxuriousColors.lightBeige, // Card background
    },
    primary: {
      main: luxuriousColors.goldAccent, // Key UI elements
    },
    secondary: {
      main: luxuriousColors.bronze, // Secondary buttons or accents
    },
    error: {
      main: luxuriousColors.deepMaroon, // Error or emphasis
    },
    warning: {
      main: '#F5A623', // Warm yellow for warnings
    },
    info: {
      main: '#8D99AE', // Neutral soft gray for info
    },
    success: {
      main: '#2D6A4F', // Deep green for success
    },
    text: {
      primary: luxuriousColors.goldAccent, // Primary text
      secondary: '#A2A2A2', // Muted text
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: luxuriousColors.goldAccent, // Headers use gold
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: luxuriousColors.goldAccent,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: luxuriousColors.bronze,
    },
    body1: {
      fontSize: '1rem',
      color: '#E0E0E0', // Neutral light text for readability
    },
    body2: {
      fontSize: '0.875rem',
      color: '#BFBFBF',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: luxuriousColors.darkBase, // Dark background for Navbar
          color: luxuriousColors.lightBeige, // Ensure visibility of text
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          backgroundColor: luxuriousColors.bronze,
          color: '#FFFFFF', // Ensuring text is visible on dark backgrounds
          '&:hover': {
            backgroundColor: '#A65F3B', // Slightly darker bronze on hover
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: ${luxuriousColors.darkBase};
          color: ${luxuriousColors.lightBeige};
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: luxuriousColors.lightBeige, // Warm beige card
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', // Luxurious shadow
        },
      },
    },
  },
});

export default luxuriousTheme;

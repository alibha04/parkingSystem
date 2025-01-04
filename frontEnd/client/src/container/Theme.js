// // src/container/Theme.js
// import { createTheme } from '@mui/material/styles';

// // Define light and dark theme palettes
// const lightPalette = {
//   mode: 'light',
//   primary: {
//     main: '#1976d2',
//   },
//   secondary: {
//     main: '#dc004e',
//   },
// };

// const darkPalette = {
//   mode: 'dark',
//   primary: {
//     main: '#90caf9',
//   },
//   secondary: {
//     main: '#f48fb1',
//   },
// };

// // Create theme by mode
// export const createThemeByMode = (mode, existingTypography) => {
//   const palette = mode === 'noctis-obscuro' ? darkPalette : lightPalette;

//   return createTheme({
//     palette,
//     typography: {
//       ...existingTypography, // Preserve original font size and family
//     },
//   });
// };

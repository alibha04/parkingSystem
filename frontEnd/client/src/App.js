import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router anymore
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import solarizedDarkTheme from './theme/solarizedDarkTheme' ;
 
import CreateSlot from './components/CreateSlot';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <ThemeProvider theme={solarizedDarkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createSlotList" element={<CreateSlot />} />
            {/* Uncomment and add these routes as needed */}
            {/* <Route path="/about-us" element={<AboutUs />} /> */}
            {/* <Route path="/show-rooms" element={<ShowRooms />} /> */}
            {/* <Route path="/create-room" element={<CreateRoom />} /> */}
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
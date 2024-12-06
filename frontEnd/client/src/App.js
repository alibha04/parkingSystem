// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import solarizedDarkTheme from './theme/solarizedDarkTheme';

import { BrowserRouter } from 'react-router-dom';
import Header from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';


// import ParkingLots from './pages/ParkingLots';
// import Reservations from './pages/Reservation';
// import User from './pages/User';

const App = () => {
  return (
    <ThemeProvider theme={solarizedDarkTheme}>
    <CssBaseline />
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Box component="main" flexGrow={1} py={3}>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/book-list' element={<ShowBookList />} />
            <Route path='/create-book' element={<CreateBook />} />
            <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
            <Route path='/show-book/:id' element={<ShowBookDetails />} />
            <Route path='/notes/*' element={<NotesPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  </ThemeProvider>
);
};

export default App;
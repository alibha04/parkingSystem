// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';


// import ParkingLots from './pages/ParkingLots';
// import Reservations from './pages/Reservation';
// import User from './pages/User';

const App = () => {
  return (
    <BrowserRouter >
      <Header />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/parking-lots" element={<ParkingLots />} /> */}
        {/* <Route path="/reservations" element={<Reservations />} /> */}
        {/* <Route path="/login" element={<User />} /> */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
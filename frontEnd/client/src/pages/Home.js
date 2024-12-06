
// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <h1>Parking System</h1>
      <nav>
        <Link to="/">Home</Link>
        {/* <Link to="/parking-lots">Parking Lots</Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/login">Login</Link>  */}
      </nav>
    </header>
  );
};

export default Navbar;


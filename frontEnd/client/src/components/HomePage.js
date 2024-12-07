// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h2" component="h1" color="primary" gutterBottom>
       Parking System Management
      </Typography>
      <Typography variant="h5" gutterBottom>
        Park your vehicles with out any chaos
      </Typography>
      <Box mt={4}>
        <Button 
          component={Link} 
          to="/parkingLotList" // Updated to link to the ShowBookList component
          color="primary" 
          variant="contained"
        >
          Available Slots
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
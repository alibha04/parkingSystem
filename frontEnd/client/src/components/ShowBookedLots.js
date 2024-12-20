// src/components/ShowParkingList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import ParkingSlotCard from './ParkingSlotCard'; // Component to display individual parking slot details

function ShowParkingList() {
  const [parkingSlots, setParkingSlots] = useState([]); // State for parking slots data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    axios
      .get('https://your-api-endpoint/api/parking-slots') // Replace with your parking slots API
      .then((res) => {
        setParkingSlots(res.data); // Populate parking slots
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        console.error('Error fetching parking slots:', err);
        setError('Failed to fetch parking slots. Please try again later.');
        setLoading(false); // Set loading to false
      });
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" component="p" sx={{ mt: 2 }}>
          Loading parking slots...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Parking Slot List
      </Typography>

      <Button
        component={Link}
        to="/add-parking-slot"
        color="primary"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Add New Parking Slot
      </Button>

      <Grid container spacing={4}>
        {parkingSlots.map((slot, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ParkingSlotCard slot={slot} /> {/* Render individual parking slot */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ShowParkingList;

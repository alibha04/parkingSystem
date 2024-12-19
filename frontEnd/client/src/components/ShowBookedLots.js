import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

function ShowBookedLots() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the list of booked parking lots from an API endpoint
    axios
      .get(`/api/parking-lots`)
      .then((res) => {
        setLots(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log('Error from ShowBookedLots ->', err);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Booked Parking Lots
      </Typography>

      <Button
        component={Link}
        to="/create-parking-lot"
        color="primary"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Add New Booking
      </Button>

      {loading ? (
        // Show a loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {lots.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary">
                No booked parking lots found!
              </Typography>
            </Grid>
          ) : (
            lots.map((lot, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Slot Number: {lot.slotNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Customer Name: {lot.customerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vehicle Number: {lot.vehicleNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vehicle Type: {lot.vehicleType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Booking Date: {lot.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Arrival Time: {lot.arrivalTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Rent: {lot.totalRent} Rupees
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                    <Button size="small" color="error">
                      Cancel Booking
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
}

export default ShowBookedLots;

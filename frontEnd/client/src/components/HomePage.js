// import React from 'react';
// import { Container, Typography, Box, Grid } from '@mui/material';
// import { motion } from 'framer-motion';

// const Homepage = () => {
//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         textAlign: 'center',
//         py: 5,
//         backgroundColor: '#f4f4f4',
//         borderRadius: 2,
//         boxShadow: 3,
//         mt: 3,
//         mb: 3,
//       }}
//     >
//       {/* Animated Title */}
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <Typography variant="h2" component="h1" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
//           Parking System Management
//         </Typography>
//       </motion.div>

//       {/* Animated Subtitle */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.5 }}
//       >
//         <Typography variant="h4" color="textSecondary" gutterBottom>
//           Park your vehicles without any chaos
//         </Typography>
//       </motion.div>

//       {/* Features Section */}
//       <Grid container spacing={4} mt={6} justifyContent="center">
//         <Grid item xs={12} sm={6} md={4}>
//           <Box
//             sx={{
//               background: '#c0c0d0',
//               borderRadius: 2,
//               boxShadow: 2,
//               padding: 3,
//               transition: 'transform 0.3s ease',
//               '&:hover': { transform: 'scale(1.05)' },
//             }}
//           >
//             <Typography variant="h6" color="primary" gutterBottom>
//               Fast & Easy
//             </Typography>
//             <Typography color="textSecondary">
//               Find available parking spots in seconds. No more circling around for hours!
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <Box
//             sx={{
//               background: '#c0c0d0',
//               borderRadius: 2,
//               boxShadow: 2,
//               padding: 3,
//               transition: 'transform 0.3s ease',
//               '&:hover': { transform: 'scale(1.05)' },
//             }}
//           >
//             <Typography variant="h6" color="primary" gutterBottom>
//               Secure Parking
//             </Typography>
//             <Typography color="textSecondary">
//               Your parking spot is reserved, ensuring a safe and guaranteed space.
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <Box
//             sx={{
//               background: '#c0c0d0',
//               borderRadius: 2,
//               boxShadow: 2,
//               padding: 3,
//               transition: 'transform 0.3s ease',
//               '&:hover': { transform: 'scale(1.05)' },
//             }}
//           >
//             <Typography variant="h6" color="primary" gutterBottom>
//               Easy Payment
//             </Typography>
//             <Typography color="textSecondary">
//               Pay online through our secure gateway. Hassle-free and quick.
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Homepage;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Fade,
  CircularProgress,
} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import axios from 'axios';
import { motion } from 'framer-motion';

const ParkingHomePage = () => {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    recentBooking: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/slots") // API to fetch parking slot data
      .then(res => {
        const slots = res.data;
        
        // Calculate available slots (for example, slots where the vehicle number is empty)
        const availableSlots = slots.filter(slot => !slot.vehicleNumber).length;
  
        // Find the most recent booking
        const recentBooking = slots.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        )[0]?.customerName; // Assuming each slot has a 'customerName' field
  
        setStats({
          totalSlots: slots.length,
          availableSlots: availableSlots,
          recentBooking: recentBooking || 'No recent bookings'
        });
  
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching parking slot stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: 'center',
        py: 5,
        backgroundColor: '#f4f4f4',
        borderRadius: 2,
        boxShadow: 3,
        mt: 3,
        mb: 3,
      }}
    >
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" component="h1" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          Parking System Management
        </Typography>
      </motion.div>

      {/* Animated Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Park your vehicles without any chaos
        </Typography>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={4} mt={6} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ textAlign: 'center', width: '100%' }}>
              <LocalParkingIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {stats.totalSlots}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Total Parking Slots
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ textAlign: 'center', width: '100%' }}>
              <CreditCardIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {stats.availableSlots}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Available Slots
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ textAlign: 'center', width: '100%' }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Latest Booking
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stats.recentBooking || 'No recent bookings'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary.light">
          Available Features
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/slots"
            variant="contained"
            size="large"
            startIcon={<LocalParkingIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            View Slots
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/add"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            Add New Slot
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/search"
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            Search Slots
          </Button>
        </Grid>


        {/* Feature 4 - Download Parking Slots List */}
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/export"
            variant="contained"
            size="large"
            startIcon={<GroupIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            Download Parking Slots List
          </Button>
        </Grid>


      </Grid>
    </Container>
  );
};

export default ParkingHomePage;

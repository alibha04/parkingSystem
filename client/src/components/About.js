import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Our Parking System
        </Typography>
        <Box
  sx={{
    width: '100%',
    height: '400px', // Adjust the height as needed
    backgroundImage: 'url(https://img.freepik.com/premium-photo/hightech-automated-parking-systems-dubais-commercial-areas_1314467-193851.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
    boxShadow: '5px 5px 15px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', // Ensures text stands out if you add content
    textAlign: 'center',
  }}
>
  {/* Add optional text/content inside */}
  <Typography variant="h4" sx={{ background: 'rgba(0, 0, 0, 0.5)', p: 2, borderRadius: '5px' }}>
    Welcome to Our Parking System
  </Typography>
</Box>

<Typography variant="body1" sx={{ mb: 3 }}>
  🚗 <strong>About Our Smart Parking System</strong>
  <br />
  Welcome to our Smart Parking System, an advanced and efficient solution designed to simplify parking management. Whether you're a customer looking for a hassle-free way to book a parking slot or an admin managing multiple locations, our system ensures a smooth and seamless experience.
</Typography>

<Typography variant="body1" sx={{ mb: 3 }}>
  🌟 <strong>Key Features</strong>
  <br />
  🔹 <strong>Easy Slot Booking</strong> – Reserve parking slots quickly and securely. <br />
  🔹 <strong>Real-Time Availability Tracking</strong> – Instantly view available and occupied slots. <br />
  🔹 <strong>QR Code Integration</strong> – Generate and scan QR codes for faster check-ins and slot verification. <br />
  🔹 <strong>Role-Based Access Control (RBAC)</strong> – Secure authentication with different access levels for admins and customers. <br />
  🔹 <strong>Dynamic Pricing Calculation</strong> – Automatically compute rent based on the duration of parking. <br />
  🔹 <strong>Multi-Location Support</strong> – Manage multiple parking locations effortlessly. <br />
  🔹 <strong>Modern UI with Dark/Light Mode</strong> – Choose between themes for a visually appealing experience. <br />
  🔹 <strong>Comprehensive Reports & Analytics</strong> – Gain insights into parking usage, revenue, and customer activity.
</Typography>

<Typography variant="body1" sx={{ mb: 3 }}>
  🔧 <strong>How It Works</strong>
  <br />
  1️⃣ <strong>Choose a Location</strong> – Select a parking area from our list of available locations. <br />
  2️⃣ <strong>Book a Slot</strong> – Provide vehicle details, select the duration, and confirm your booking. <br />
  3️⃣ <strong>Scan & Park</strong> – Use a QR code for quick entry and slot verification. <br />
  4️⃣ <strong>Track & Manage</strong> – Admins can monitor slot usage, bookings, and customer details in real time.
</Typography>

<Typography variant="body1" sx={{ mb: 3 }}>
  🚀 <strong>Why Choose Our Parking System?</strong>
  <br />
  ✅ <strong>Efficiency</strong> – Eliminates manual work and speeds up the parking process. <br />
  ✅ <strong>Security</strong> – Ensures safe transactions and secure access for customers and admins. <br />
  ✅ <strong>Scalability</strong> – Easily adaptable for small parking lots or large multi-location parking facilities. <br />
  ✅ <strong>User-Friendly</strong> – Simple and intuitive interface for both customers and administrators.
</Typography>

<Typography variant="body1" sx={{ mb: 3 }}>
  Our Smart Parking System is designed to make parking management more efficient, organized, and stress-free. Say goodbye to parking hassles and hello to a smarter way of managing your parking space!
</Typography>

<Typography variant="body1" sx={{ mb: 3 }}>
  📌 <strong>Experience the future of parking today! 🚘</strong>
</Typography>

      </Paper>
    </Container>
  );
};

export default About;

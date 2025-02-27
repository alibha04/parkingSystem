import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import QrCodeIcon from "@mui/icons-material/QrCode"; 
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import axios from "axios";
import { motion } from "framer-motion";

const ParkingHomePage = () => {
  const TOTAL_SLOTS = 1000;
  const [stats, setStats] = useState({
    totalBookedSlots: 0,
    availableSlots: TOTAL_SLOTS,
    recentBooking: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://parkingsystem-8xdu.onrender.com/api/lots")
      .then((res) => {
        const slots = res.data;
        const totalBookedSlots = slots.filter((slot) => slot.vehicleNumber).length;
        const availableSlots = TOTAL_SLOTS - totalBookedSlots;
        const recentBooking = slots
          .filter((slot) => slot.vehicleNumber)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.customerName;

        setStats({
          totalBookedSlots,
          availableSlots,
          recentBooking: recentBooking || "No recent bookings",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching parking slot stats:", err);
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
      maxWidth="xl"  // ⬅ Increased the max width to "xl" for a larger page
      sx={{
        textAlign: "center",
        py: 5,
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: 3,
        mt: 3,
        mb: 3,
      }}
    >
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Typography variant="h2" component="h1" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
          Parking System Management
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Park your vehicles without any chaos
        </Typography>
      </motion.div>

      <Grid container spacing={4} mt={6} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <LocalParkingIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                {stats.totalBookedSlots}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Total Booked Slots
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
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
          <Card sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Latest Booking
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stats.recentBooking}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary.light">
          Available Features
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {[
          { to: "/slots", label: "View Slots", icon: <LocalParkingIcon /> },
          { to: "/add-slot", label: "Add New Slot", icon: <AddIcon /> },
          { to: "/search", label: "Search Slots", icon: <SearchIcon /> },
          { to: "/qrcodes", label: "QR Codes", icon: <QrCodeIcon /> },
          { to: "/export", label: "Download Slots List", icon: <GroupIcon /> },
          { href: "https://docs.google.com/document/d/1z5jlCUQCnseKXfEx0OPbSf-uA9YbQBDXU7vncDMGUE0/edit", label: "Documentation", icon: <InsertDriveFileIcon /> },
          { href: "https://docs.google.com/document/d/1CWyqXhAvyTfxwv0Giqa-ITFZZYGYbootp2S3_bSeOf8/edit?usp=sharing", label: "Resume", icon: <ContactPageIcon /> },
        ].map((button, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button
              component={button.to ? Link : "a"}
              to={button.to}
              href={button.href}
              target={button.href ? "_blank" : undefined}
              rel={button.href ? "noopener noreferrer" : undefined}
              variant="contained"
              size="large"
              startIcon={button.icon}
              fullWidth
              sx={{
                py: 2,  // Increased padding for a bigger button
                fontSize: "1.1rem", // Slightly larger text
              }}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ParkingHomePage;

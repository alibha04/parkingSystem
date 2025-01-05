import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const CreateSlot = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [slot, setSlot] = useState({
    slotNumber: Math.floor(Math.random() * 1000) + 1,
    vehicleType: '',
    duration: '',
    rentPerHour: 50,
    totalRent: 0,
    customerName: '',
    phoneNumber: '',
    vehicleNumber: '',
    arrivalTime: '',
    date: '',
  });

  // Populate slot state for editing
  useEffect(() => {
    if (state?.slot) {
      setSlot((prevSlot) => ({
        ...prevSlot,
        ...state.slot,
      }));
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlot((prevSlot) => {
      const updatedSlot = { ...prevSlot, [name]: value };

      // Calculate total rent dynamically
      if (name === 'duration') {
        const hours = parseInt(value, 10) || 0;
        updatedSlot.totalRent = hours * prevSlot.rentPerHour;
      }
      return updatedSlot;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (
      !slot.customerName ||
      !slot.phoneNumber ||
      !slot.vehicleNumber ||
      !slot.vehicleType ||
      !slot.duration
    ) {
      enqueueSnackbar('Please fill out all fields before submitting.', {
        variant: 'warning',
      });
      return;
    }

    const apiUrl = 'http://localhost:3000/api/lots';

    try {
      const response = state?.slot
        ? await axios.put(`${apiUrl}/${slot.slotNumber}`, slot) // Edit existing slot
        : await axios.post(apiUrl, slot); // Create new slot

      enqueueSnackbar(
        state?.slot
          ? 'Slot updated successfully!'
          : 'Slot created successfully!',
        { variant: 'success' }
      );

      navigate('/ConfirmedSlot', { state: { slot: response.data } });
    } catch (error) {
      console.error('Error in creating/updating slot:', error);
      enqueueSnackbar('Something went wrong, please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        mt: 5,
        bgcolor: '#f9f9f9',
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" color="#00e5ff"gutterBottom>
        {state?.slot ? 'Edit Parking Slot' : 'Create Parking Slot'}
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        {state?.slot
          ? 'Update an existing parking slot'
          : 'Create a new parking slot record'}
      </Typography>
  

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Customer Name"
          name="customerName"
          value={slot.customerName}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={slot.phoneNumber}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Vehicle Number"
          name="vehicleNumber"
          value={slot.vehicleNumber}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            name="vehicleType"
            value={slot.vehicleType}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select Vehicle Type
            </MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="EV Charging">EV Charging</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Duration (in hours)"
          name="duration"
          value={slot.duration}
          onChange={handleChange}
          type="number"
          variant="outlined"
          margin="normal"
        />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Total Rent: {slot.totalRent} Rupees
        </Typography>

        <TextField
          fullWidth
          label="Arrival Time"
          name="arrivalTime"
          value={slot.arrivalTime}
          onChange={handleChange}
          type="time"
          pattern={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Booking Date"
          name="date"
          value={slot.date}
          onChange={handleChange}
          type="date"
          pattern={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {state?.slot ? 'Update Slot' : 'Create Slot'}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/ConfirmedSlot')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateSlot;

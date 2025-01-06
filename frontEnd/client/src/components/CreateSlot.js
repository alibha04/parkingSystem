import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const CreateSlot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { enqueueSnackbar } = useSnackbar();

  const [slot, setSlot] = useState({
    slotNumber: Math.floor(Math.random() * 1000) + 1,
    vehicleType: '',
    customerName: '',
    phoneNumber: '',
    vehicleNumber: '',
    duration: '',
    rentPerHour: 50,
    totalRent: 0,
    arrivalTime: '',
    bookingDate: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (location.state?.slot) {
      setSlot(location.state.slot);
      setIsEdit(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlot((prev) => {
      const updatedSlot = { ...prev, [name]: value };

      if (name === 'duration') {
        updatedSlot.totalRent = (parseInt(value, 10) || 0) * prev.rentPerHour;
      }
      return updatedSlot;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slot.customerName || !slot.phoneNumber || !slot.vehicleNumber || !slot.vehicleType) {
      enqueueSnackbar('All fields are required.', { variant: 'warning' });
      return;
    }

    const apiUrl = 'http://localhost:3000/api/lots';

    try {
      if (isEdit) {
        await axios.put(`${apiUrl}/${slot.slotNumber}`, slot);
        enqueueSnackbar('Slot updated successfully!', { variant: 'success' });
      } else {
        await axios.post(apiUrl, slot);
        enqueueSnackbar('Slot created successfully!', { variant: 'success' });
      }

      navigate('/slots');
    } catch (error) {
      console.error('Error in slot submission:', error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
    }
  };
  axios
  .post("https://parkingsystem-8xdu.onrender.com/api/lots", lots)
  .then(() => {
    setSlot({
      Customer_Name: '',
      Phone_Number: '',
      Vehicle_Number: '',
      Vehicle_Type: '',
      Duration: '',
      Arrival_Time: '',
      Booking_Date: '',
    });
    enqueueSnackbar('Slot added successfully!', { variant: 'success' });
    navigate('/SlotList');
  })
  .catch((err) => {
    console.error('Error in creating slot:', err);
    enqueueSnackbar('Something went wrong, try again!', { variant: 'error' });
  });


  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        mt: 5,
        bgcolor: isDarkMode ? theme.palette.background.paper : '#f9f9f9',
        color: isDarkMode ? theme.palette.text.primary : 'inherit',
        borderRadius: 2,
        boxShadow: isDarkMode ? '0 4px 10px rgba(0, 0, 0, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {isEdit ? 'Edit Parking Slot' : 'Create Parking Slot'}
      </Typography>

      <form onSubmit={handleSubmit}>
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

        <FormControl fullWidth margin="normal">
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            name="vehicleType"
            value={slot.vehicleType}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Select Vehicle Type
            </MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Duration (in hours)"
          name="duration"
          type="number"
          value={slot.duration}
          onChange={handleChange}
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
          type="time"
          value={slot.arrivalTime}
          onChange={handleChange}
          pattern={{ shrink: true }}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Booking Date"
          name="bookingDate"
          type="date"
          value={slot.bookingDate}
          onChange={handleChange}
          pattern={{ shrink: true }}
          variant="outlined"
          margin="normal"
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isEdit ? 'Update Slot' : 'Create Slot'}
          </Button>
          <Button type="button" variant="contained" color="secondary" fullWidth onClick={() => navigate('/slots')}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateSlot;

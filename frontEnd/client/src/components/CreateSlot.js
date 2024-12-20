// etiki add kariba 
// axios
// .post('/api/books', book)
// .then((res) => {
//   setBook({
//     title: '',
//     isbn: '',
//     author: '',
//     description: '',
//     published_date: '',
//     publisher: '',
//   });



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const CreateSlot = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [slot, setSlot] = useState({
    slotNumber: Math.floor(Math.random() * 1000) + 1,
    type: '',
    duration: '',
    rentPerHour: 50,
    totalRent: 0,
    status: 'Available',
    arrivalTime: '',
    date: '',
    customerName: '',
    phoneNumber: '',
    vehicleNumber: '',
    vehicleType: '',
  });

  const [errors, setErrors] = useState({});
  const [warning, setWarning] = useState('');

  // Prefill form if editing a slot
  useEffect(() => {
    if (state?.slot) {
      setSlot(state.slot);
    }
  }, [state]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'customerName' && !/^[A-Za-z ]*$/.test(value)) {
      error = 'Only alphabets and spaces are allowed';
    } else if (name === 'phoneNumber') {
      if (!/^[0-9]*$/.test(value)) {
        error = 'Only numeric values are allowed';
      } else if (value.length > 10) {
        error = 'You cannot enter more than 10 digits';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (!error) {
      setSlot((prevSlot) => {
        const updatedSlot = { ...prevSlot, [name]: value };

        if (name === 'duration') {
          const hours = parseInt(value, 10) || 0;
          updatedSlot.totalRent = hours * prevSlot.rentPerHour;
        }

        return updatedSlot;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !slot.customerName ||
      !slot.phoneNumber ||
      !slot.vehicleNumber ||
      !slot.vehicleType ||
      !slot.duration
    ) {
      setWarning('Every area should be filled before booking the slot');
      return;
    }
    setWarning('');
    navigate('/confirmedSlot', { state: { slot } });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: 'auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        mt: 3,
        mb: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        mb={3}
        color="primary"
      >
        {state?.slot ? 'Edit Parking Slot' : 'Create Parking Slot'}
      </Typography>

      <TextField
        fullWidth
        label="Customer Name"
        name="customerName"
        variant="outlined"
        type="text"
        value={slot.customerName}
        onChange={handleChange}
        error={Boolean(errors.customerName)}
        helperText={errors.customerName}
        sx={{
          mb: 2,
          input: { color: 'black' },
        }}
      />

      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        variant="outlined"
        type="tel"
        value={slot.phoneNumber}
        onChange={handleChange}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber}
        sx={{
          mb: 2,
          input: { color: 'black' },
        }}
      />

      <TextField
        fullWidth
        label="Vehicle Number"
        name="vehicleNumber"
        variant="outlined"
        value={slot.vehicleNumber}
        onChange={handleChange}
        sx={{
          mb: 2,
          input: { color: 'black' },
        }}
      />

      {warning && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {warning}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Typography
          variant="body1"
          sx={{ mb: 2, fontWeight: 'bold', color: 'gray' }}
        >
          Slot Number: {slot.slotNumber}
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            name="vehicleType"
            value={slot.vehicleType}
            onChange={handleChange}
            required
            sx={{ textAlign: 'left' }}
          >
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
          variant="outlined"
          type="number"
          value={slot.duration}
          onChange={handleChange}
          required
          sx={{
            mb: 2,
            input: { color: 'black' },
          }}
        />

        <Typography variant="body1" sx={{ mb: 2 }}>
          Total Rent: {slot.totalRent} Rupees
        </Typography>

        <TextField
          fullWidth
          label="Arrival Time"
          name="arrivalTime"
          variant="outlined"
          type="time"
          value={slot.arrivalTime || ''}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mb: 2,
            input: { color: 'black' },
          }}
        />

        <TextField
          fullWidth
          label="Booking Date"
          name="date"
          variant="outlined"
          type="date"
          value={slot.date || ''}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mb: 2,
            input: { color: 'black' },
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: '48%' }}
          >
            {state?.slot ? 'Update Slot' : 'Book Slot'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ width: '48%' }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateSlot;

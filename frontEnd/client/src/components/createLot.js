import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Typography, 
  Button, 
  Snackbar, 
  Alert 
} from '@mui/material';
import axios from 'axios';

const CreateLot = () => {
  const navigate = useNavigate();
  const [slot, setSlot] = useState({
    name: '',
    maxcount: '',
    phonenumber: '',
    rentperday: '',
    type: '',
    description: '',
    location: '',
    features: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request
      await axios.post('http://localhost:5000/Slots', {
        ...room,
        features: slot.features.split(',').map((item) => item.trim()),
      });

      // Show success notification
      setNotification({
        open: true,
        message: 'Slot Booked successfully!',
        severity: 'success',
      });

      // Clear the form and redirect to home after a short delay
      setSlot({
        name: '',
        maxcount: '',
        phonenumber: '',
        rentperday: '',
        type: '',
        description: '',
        location: '',
        features: '',
      });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error in Booking Slot:', error);

      // Show error notification
      setNotification({
        open: true,
        message: 'Failed to book slot Please try again!',
        severity: 'error',
      });
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigate back to home
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        textAlign="center" 
        mb={3}
        color="primary"
      >
        Book A New Slot
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Slot Number"
          name="name"
          variant="outlined"
          value={slot.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Max Count"
          name="maxcount"
          variant="outlined"
          value={slot.maxcount}
          onChange={handleChange}
          required
          type="number"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phonenumber"
          variant="outlined"
          value={slot.phonenumber}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Rent per Day"
          name="rentperday"
          variant="outlined"
          value={slot.rentperday}
          onChange={handleChange}
          required
          type="number"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Type (e.g., Single, Double)"
          name="type"
          variant="outlined"
          value={slot.type}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          value={slot.description}
          onChange={handleChange}
          required
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          variant="outlined"
          value={slot.location}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Features (comma-separated)"
          name="features"
          variant="outlined"
          value={slot.features}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
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
            Create Slot
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

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateLot;
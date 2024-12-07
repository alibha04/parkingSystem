// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Box, 
//   TextField, 
//   Typography, 
//   Button, 
//   Snackbar, 
//   Alert 
// } from '@mui/material';
// import axios from 'axios';

// const CreateSlot = () => {
//   const navigate = useNavigate();
//   const [slot, setSlot] = useState({
//     name: '',
//     maxcount: '',
//     phonenumber: '',
//     rentperhour: '',
//     type: '',
//     description: '',
//     location: '',
//     features: '',
//   });

//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     severity: '',
//   });

//   const handleChange = (e) => {
//     setSlot({ ...slot, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send POST request
//       await axios.post('http://localhost:5000/Slots', {
//         ...slot,
//         features: slot.features.split(',').map((item) => item.trim()),
//       });

//       // Show success notification
//       setNotification({
//         open: true,
//         message: 'Slot Booked successfully!',
//         severity: 'success',
//       });

//       // Clear the form and redirect to home after a short delay
//       setSlot({
//         name: '',
//         maxcount: '',
//         phonenumber: '',
//         rentperhour: '',
//         type: '',
//         description: '',
//         location: '',
//         features: '',
//       });
//       setTimeout(() => navigate('/'), 1500);
//     } catch (error) {
//       console.error('Error in Booking Slot:', error);

//       // Show error notification
//       setNotification({
//         open: true,
//         message: 'Failed to book slot Please try again!',
//         severity: 'error',
//       });
//     }
//   };

//   const handleCancel = () => {
//     navigate('/'); // Navigate back to home
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: 'auto',
//         padding: 4,
//         borderRadius: 2,
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//         backgroundColor: 'white',
//       }}
//     >
//       <Typography 
//         variant="h4" 
//         component="h1" 
//         textAlign="center" 
//         mb={3}
//         color="primary"
//       >
//         Book A New Slot
//       </Typography>
      
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Slot Number"
//           name="name"
//           variant="outlined"
//           value={slot.name}
//           onChange={handleChange}
//           required
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Max Count"
//           name="maxcount"
//           variant="outlined"
//           value={slot.maxcount}
//           onChange={handleChange}
//           required
//           type="number"
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Phone Number"
//           name="phonenumber"
//           variant="outlined"
//           value={slot.phonenumber}
//           onChange={handleChange}
//           required
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Rent per Day"
//           name="rentperday"
//           variant="outlined"
//           value={slot.rentperday}
//           onChange={handleChange}
//           required
//           type="number"
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Type (e.g., Single, Double)"
//           name="type"
//           variant="outlined"
//           value={slot.type}
//           onChange={handleChange}
//           required
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           variant="outlined"
//           value={slot.description}
//           onChange={handleChange}
//           required
//           multiline
//           rows={3}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Location"
//           name="location"
//           variant="outlined"
//           value={slot.location}
//           onChange={handleChange}
//           required
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Features (comma-separated)"
//           name="features"
//           variant="outlined"
//           value={slot.features}
//           onChange={handleChange}
//           required
//           sx={{ mb: 2 }}
//         />
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             mt: 3,
//           }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             sx={{ width: '48%' }}
//           >
//             Create Slot
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={handleCancel}
//             sx={{ width: '48%' }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </form>

//       <Snackbar
//         open={notification.open}
//         autoHideDuration={3000}
//         onClose={handleCloseNotification}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default CreateSlot;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import axios from 'axios';

const CreateSlot = () => {
  const navigate = useNavigate();

  const [slot, setSlot] = useState({
    slotNumber: '',
    type: '',
    maxCapacity: '',
    rentPerHour: '',
    status: 'Available',
    customerName: '',
    phoneNumber: '',
    vehicleNumber: '',
    vehicleType: '',
    location: '',
    gpsCoordinates: '',
    features: '',
    description: '',
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
      // Submit form data
      await axios.post('http://localhost:5000/slots', {
        ...slot,
        features: slot.features.split(',').map((feature) => feature.trim()),
      });

      // Success notification
      setNotification({
        open: true,
        message: 'Slot created successfully!',
        severity: 'success',
      });

      // Clear form and redirect
      setSlot({
        slotNumber: '',
        type: '',
        maxCapacity: '',
        rentPerHour: '',
        status: 'Available',
        customerName: '',
        phoneNumber: '',
        vehicleNumber: '',
        vehicleType: '',
        location: '',
        gpsCoordinates: '',
        features: '',
        description: '',
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Error creating slot:', error);

      setNotification({
        open: true,
        message: 'Failed to create slot. Please try again!',
        severity: 'error',
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        mb={3}
        color="primary"
      >
        Create Parking Slot
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Slot Details */}
        <TextField
          fullWidth
          label="Slot Number"
          name="slotNumber"
          variant="outlined"
          value={slot.slotNumber}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type of Slot</InputLabel>
          <Select
            name="type"
            value={slot.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="EV Charging">EV Charging</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Max Capacity"
          name="maxCapacity"
          variant="outlined"
          type="number"
          value={slot.maxCapacity}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Rent per Hour (e.g., 50)"
          name="rentPerHour"
          variant="outlined"
          type="number"
          value={slot.rentPerHour}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Slot Status</InputLabel>
          <Select
            name="status"
            value={slot.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Occupied">Occupied</MenuItem>
            <MenuItem value="Reserved">Reserved</MenuItem>
          </Select>
        </FormControl>

        {/* Customer Details */}
        <TextField
          fullWidth
          label="Customer Name"
          name="customerName"
          variant="outlined"
          value={slot.customerName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          value={slot.phoneNumber}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Vehicle Number"
          name="vehicleNumber"
          variant="outlined"
          value={slot.vehicleNumber}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Vehicle Type (e.g., Sedan, SUV)"
          name="vehicleType"
          variant="outlined"
          value={slot.vehicleType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        {/* Location Details */}
        <TextField
          fullWidth
          label="Location/Area Name"
          name="location"
          variant="outlined"
          value={slot.location}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        {/* <TextField
          fullWidth
          label="GPS Coordinates "
          name="gpsCoordinates"
          variant="outlined"
          value={slot.gpsCoordinates}
          onChange={handleChange}
          sx={{ mb: 2 }}
        /> */}

        {/* Additional Details
        <TextField
          fullWidth
          label="Features (comma-separated)"
          name="features"
          variant="outlined"
          value={slot.features}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        /> */}
        {/* <TextField
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
        /> */}

        {/* Buttons */}
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
            Save/Create Slot
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

export default CreateSlot;

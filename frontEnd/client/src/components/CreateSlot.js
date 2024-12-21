// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';

// const CreateSlot = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { enqueueSnackbar } = useSnackbar();

//   const [slot, setSlot] = useState({
//     slotNumber: Math.floor(Math.random() * 1000) + 1,
//     vehicleType: '',
//     duration: '',
//     rentPerHour: 50,
//     totalRent: 0,
//     customerName: '',
//     phoneNumber: '',
//     vehicleNumber: '',
//     arrivalTime: '',
//     date: '',
//   });

//   useEffect(() => {
//     // Prefill form if editing a slot
//     if (state?.slot) {
//       setSlot(state.slot);
//     }
//   }, [state]);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setSlot((prevSlot) => {
//       const updatedSlot = { ...prevSlot, [name]: value };

//       // Calculate total rent dynamically when duration changes
//       if (name === 'duration') {
//         const hours = parseInt(value, 10) || 0;
//         updatedSlot.totalRent = hours * prevSlot.rentPerHour;
//       }
//       return updatedSlot;
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     // Form validation
//     if (
//       !slot.customerName ||
//       !slot.phoneNumber ||
//       !slot.vehicleNumber ||
//       !slot.vehicleType ||
//       !slot.duration
//     ) {
//       enqueueSnackbar('Please fill out all fields before submitting.', {
//         variant: 'warning',
//       });
//       return;
//     }

//     // Replace with your backend API endpoint
//     const apiUrl = 'http://localhost:5000/api/create'; // Adjust the endpoint as needed

//     axios
//       .post(apiUrl, slot)
//       .then((response) => {
//         enqueueSnackbar('Slot created successfully!', { variant: 'success' });
//         navigate('/'); // Navigate to the home or desired page after submission
//       })
//       .catch((err) => {
//         console.error('Error in creating slot:', err);
//         enqueueSnackbar('Something went wrong, try again!', { variant: 'error' });
//       });
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         mx: 'auto',
//         p: 3,
//         mt: 5,
//         bgcolor: '#f9f9f9',
//         borderRadius: 2,
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom>
//         {state?.slot ? 'Edit Parking Slot' : 'Create Parking Slot'}
//       </Typography>
//       <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
//         {state?.slot
//           ? 'Update an existing parking slot'
//           : 'Create a new parking slot record'}
//       </Typography>
//       <div className="col-md-8 m-auto">
//         <br />
//         <Link to="/" className="btn btn-outline-warning float-left">
//           Show Slot List
//         </Link>
//       </div>

//       <form noValidate onSubmit={onSubmit}>
//         <TextField
//           fullWidth
//           label="Customer Name"
//           name="customerName"
//           value={slot.customerName}
//           onChange={onChange}
//           variant="outlined"
//           margin="normal"
//         />

//         <TextField
//           fullWidth
//           label="Phone Number"
//           name="phoneNumber"
//           value={slot.phoneNumber}
//           onChange={onChange}
//           variant="outlined"
//           margin="normal"
//         />

//         <TextField
//           fullWidth
//           label="Vehicle Number"
//           name="vehicleNumber"
//           value={slot.vehicleNumber}
//           onChange={onChange}
//           variant="outlined"
//           margin="normal"
//         />

//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel>Vehicle Type</InputLabel>
//           <Select
//             name="vehicleType"
//             value={slot.vehicleType}
//             onChange={onChange}
//           >
//             <MenuItem value="" disabled>
//               Select Vehicle Type
//             </MenuItem>
//             <MenuItem value="Car">Car</MenuItem>
//             <MenuItem value="Bike">Bike</MenuItem>
//             <MenuItem value="Truck">Truck</MenuItem>
//             <MenuItem value="EV Charging">EV Charging</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           fullWidth
//           label="Duration (in hours)"
//           name="duration"
//           value={slot.duration}
//           onChange={onChange}
//           type="number"
//           variant="outlined"
//           margin="normal"
//         />

//         <Typography variant="body1" sx={{ mt: 2 }}>
//           Total Rent: {slot.totalRent} Rupees
//         </Typography>

//         <TextField
//           fullWidth
//           label="Arrival Time"
//           name="arrivalTime"
//           value={slot.arrivalTime}
//           onChange={onChange}
//           type="time"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           variant="outlined"
//           margin="normal"
//         />

//         <TextField
//           fullWidth
//           label="Booking Date"
//           name="date"
//           value={slot.date}
//           onChange={onChange}
//           type="date"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           variant="outlined"
//           margin="normal"
//         />

//         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             {state?.slot ? 'Update Slot' : 'Create Slot'}
//           </Button>
//           <Button
//             type="button"
//             variant="contained"
//             color="secondary"
//             fullWidth
//             onClick={() => navigate('/')}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default CreateSlot;




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

  useEffect(() => {
    if (state?.slot) {
      setSlot(state.slot);
    }
  }, [state]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setSlot((prevSlot) => {
      const updatedSlot = { ...prevSlot, [name]: value };

      // Calculate total rent dynamically when duration changes
      if (name === 'duration') {
        const hours = parseInt(value, 10) || 0;
        updatedSlot.totalRent = hours * prevSlot.rentPerHour;
      }
      return updatedSlot;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

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

    const apiUrl = 'http://localhost:5000/api/parking-lots'; // Adjust API endpoint as needed

    axios
      .post(apiUrl, slot)
      .then((response) => {
        enqueueSnackbar('Slot created successfully!', { variant: 'success' });
        navigate('/confirmed'); // Redirect to confirmed page after submission
      })
      .catch((err) => {
        console.error('Error in creating slot:', err);
        enqueueSnackbar('Something went wrong, try again!', { variant: 'error' });
      });
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
      <Typography variant="h4" align="center" gutterBottom>
        {state?.slot ? 'Edit Parking Slot' : 'Create Parking Slot'}
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        {state?.slot
          ? 'Update an existing parking slot'
          : 'Create a new parking slot record'}
      </Typography>
      <div className="col-md-8 m-auto">
        <br />
        <Link to="/" className="btn btn-outline-warning float-left">
          Show Slot List
        </Link>
      </div>

      <form noValidate onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Customer Name"
          name="customerName"
          value={slot.customerName}
          onChange={onChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={slot.phoneNumber}
          onChange={onChange}
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Vehicle Number"
          name="vehicleNumber"
          value={slot.vehicleNumber}
          onChange={onChange}
          variant="outlined"
          margin="normal"
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            name="vehicleType"
            value={slot.vehicleType}
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          type="time"
          InputLabelProps={{
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
          onChange={onChange}
          type="date"
          InputLabelProps={{
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
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateSlot;

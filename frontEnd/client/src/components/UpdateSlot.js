import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack"; // Import the useSnackbar hook

function UpdateSlot() {
  const [slot, setSlot] = useState({
    slotNumber: "",
    status: "",
    location: "",
    imageUrl: "",
  });

  const { slotNumber } = useParams(); // Assuming slotNumber is the unique identifier
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Initialize the notification hook

  useEffect(() => {
    axios
      .get(`https://parkingsystemapi.onrender.com/api/slots/${slotNumber}`)
      .then((res) => {
        setSlot(res.data);
      })
      .catch((err) => {
        console.error("Error from UpdateSlot GET request", err);
        enqueueSnackbar("Failed to fetch slot details.", { variant: "error" });
      });
  }, [slotNumber, enqueueSnackbar]);

  const onChange = (e) => {
    setSlot({ ...slot, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://parkingsystemapi.onrender.com/api/slots/${slotNumber}`, slot)
      .then(() => {
        enqueueSnackbar("Slot updated successfully!", { variant: "success" });
        navigate(`/slot-detail/${slotNumber}`);
      })
      .catch((err) => {
        console.error("Error in UpdateSlot PUT request", err);
        enqueueSnackbar("Failed to update slot details. Please try again.", { variant: "error" });
      });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Parking Slot
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Update Parking Slot Information
        </Typography>
      </Box>

      <Box mb={2}>
        <Button
          component={Link}
          to="/slot-list"
          variant="outlined"
          color="secondary"
          fullWidth
        >
          Show Slot List
        </Button>
      </Box>

      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Slot Number"
              name="slotNumber"
              value={slot.slotNumber}
              onChange={onChange}
              variant="outlined"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={slot.status}
              onChange={onChange}
              variant="outlined"
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Occupied">Occupied</MenuItem>
              <MenuItem value="Reserved">Reserved</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={slot.location}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={slot.imageUrl}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Update Slot
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default UpdateSlot;

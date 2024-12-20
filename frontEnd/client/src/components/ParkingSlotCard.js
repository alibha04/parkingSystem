// src/components/ParkingSlotCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function ParkingSlotCard({ slot }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Slot Number: {slot.slotNumber}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {slot.isOccupied ? 'Occupied' : 'Available'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Vehicle: {slot.vehicle || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ParkingSlotCard;

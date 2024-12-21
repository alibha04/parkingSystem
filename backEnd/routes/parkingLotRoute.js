const express = require('express');
const parkingLotController = require('../controllers/parkingLotControllers'); // Adjusted import path
const router = express.Router();

// Create a new parking lot
router.post("/lots", parkingLotController.createParkingLot);

// Get all parking lots
router.get("/lots", parkingLotController.getAllParkingLots);

// Get a single parking lot by ID
router.get("/lots/:id", parkingLotController.getParkingLotById);

// Update a parking lot by ID
router.put("/lots/:id", parkingLotController.updateParkingLot);

// Delete a parking lot by ID
router.delete("/lots/:id", parkingLotController.deleteParkingLot);

module.exports = router;

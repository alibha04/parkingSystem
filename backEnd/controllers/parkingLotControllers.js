const ParkingLot = require('../models/parkingLot'); // Adjust the path as needed

/**
 * Create a new parking lot
 */
exports.createParkingLot = async (req, res) => {
    try {
        let newParkingLot = new ParkingLot({
            slotNumber: req.body.slotNumber,
            type: req.body.type,
            duration: req.body.duration,
            rentPerHour: req.body.rentPerHour,
            totalRent: req.body.totalRent,
            status: req.body.status,
            arrivalTime: req.body.arrivalTime,
            date: req.body.date,
            customerName: req.body.customerName,
            phoneNumber: req.body.phoneNumber,
            vehicleNumber: req.body.vehicleNumber,
            vehicleType: req.body.vehicleType,
        });

        newParkingLot = await newParkingLot.save(); // Save the new parking lot to the database
        res.send(newParkingLot); // Send the saved parking lot as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};

/**
 * Get all parking lots
 */
exports.getAllParkingLots = async (req, res) => {
    try {
        const allParkingLots = await ParkingLot.find(); // Get all parking lots from the database
        res.send(allParkingLots); // Send all parking lots as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};

/**
 * Get a parking lot by ID
 */
exports.getParkingLotById = async (req, res) => {
    try {
        const parkingLotById = await ParkingLot.findById(req.params.id); // Find parking lot by ID
        if (!parkingLotById) return res.status(404).send('Parking lot not found in database'); // If parking lot not found, return 404
        res.send(parkingLotById); // Send the parking lot as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};

/**
 * Update a parking lot by ID
 */
exports.updateParkingLot = async (req, res) => {
    try {
        const updatedParkingLot = await ParkingLot.findByIdAndUpdate(req.params.id, {
            slotNumber: req.body.slotNumber,
            type: req.body.type,
            duration: req.body.duration,
            rentPerHour: req.body.rentPerHour,
            totalRent: req.body.totalRent,
            status: req.body.status,
            arrivalTime: req.body.arrivalTime,
            date: req.body.date,
            customerName: req.body.customerName,
            phoneNumber: req.body.phoneNumber,
            vehicleNumber: req.body.vehicleNumber,
            vehicleType: req.body.vehicleType,
        }, { new: true }); // Return the updated parking lot

        if (!updatedParkingLot) return res.status(404).send('Parking lot not found in database'); // If parking lot not found, return 404
        res.send(updatedParkingLot); // Send the updated parking lot as a response
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};

/**
 * Delete a parking lot by ID
 */
exports.deleteParkingLot = async (req, res) => {
    try {
        const parkingLotById = await ParkingLot.findByIdAndDelete(req.params.id); // Find parking lot by ID and delete it
        if (!parkingLotById) return res.status(404).send('Parking lot not found in database'); // If parking lot not found, return 404
        res.send("Parking lot deleted successfully"); // Send success message
    } catch (err) {
        res.status(400).send(err.message); // Send an error response if something goes wrong
    }
};

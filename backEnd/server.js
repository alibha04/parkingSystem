// import express from 'express'; // Import Express
// import mongoose from 'mongoose'; // Import Mongoose
// import {
//     getAllParkingLots,
//     getParkingLotById,
//     createParkingLot,
//     updateParkingLot,
//     deleteParkingLot,
// } from './controllers/parkingLotController.js'; // Import Controller Functions

// const app = express(); // Create an Express App
// const PORT = 5000; // Define the Port Number

// // Middleware to Parse JSON
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/parking-system', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('MongoDB connected successfully!'))
//     .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Define Routes for Parking Lots
// app.get('/parkinglots', getAllParkingLots);         // Get all parking lots
// app.get('/parkinglots/:id', getParkingLotById);     // Get a specific parking lot by ID
// app.post('/parkinglots', createParkingLot);         // Create a new parking lot
// app.put('/parkinglots/:id', updateParkingLot);      // Update a parking lot by ID
// app.delete('/parkinglots/:id', deleteParkingLot);   // Delete a parking lot by ID

// // Start the Server
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for ES module directory resolution

// Configure environment variables
dotenv.config({ path: './config.env' });

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load sample data dynamically
let sampleData = [];
import('./sample.json', { assert: { type: 'json' } })
  .then((data) => {
    sampleData = data.default; // Access the default export of the JSON file
    console.log('Sample data loaded successfully.');
  })
  .catch((err) => {
    console.error('Error loading sample data:', err);
  });

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Parking System API!');
});

// Fetch all parking lot details
app.get('/parkinglots', (req, res) => {
  res.json(sampleData);
});

// Fetch parking lot details by ID
app.get('/details/:id', (req, res) => {
  const { id } = req.params;

  // Find parking lot by ID in the dummy data
  const parkingDetails = sampleData.find((lot) => lot.id === id);

  if (parkingDetails) {
    res.json(parkingDetails);
  } else {
    res.status(404).json({ message: `Parking ID ${id} not found` });
  }
});

// Serve static files for React frontend
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found. Please check the URL.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

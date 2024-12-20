


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
app.get('/api', (req, res) => {
  res.json(sampleData);
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

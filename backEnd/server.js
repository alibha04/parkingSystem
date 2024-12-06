import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
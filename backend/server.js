const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.send("AI Character API is running");
});

// Routes will be added here
// app.use('/api/characters', require('./routes/characters'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/templates', require('./routes/templates'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

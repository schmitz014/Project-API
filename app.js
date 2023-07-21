// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

const personRoutes = require('./routes/personRoutes');

// Middleware to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use('/person', personRoutes);

// Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Express is up!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

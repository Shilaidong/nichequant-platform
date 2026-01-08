const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
require('dotenv').config();

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/market-data', require('./routes/marketData'));
app.use('/api/ai', require('./routes/ai'));

// Health check route
app.get('/', (req, res) => res.send('API is running...'));

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
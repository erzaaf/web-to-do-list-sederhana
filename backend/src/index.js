const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const taskRoutes = require('../routes/taskRoutes');
const errorHandler = require('../middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Frontend Assets
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));
app.use('/src', express.static(path.join(__dirname, '..', '..', 'frontend', 'src')));

// API Routes
app.use('/api/tasks', taskRoutes);

// Centralized Error Handler Middleware
app.use(errorHandler);

// Fallback Route for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 To-Do List Backend Server running at http://localhost:${PORT}`);
});

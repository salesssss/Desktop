const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/posturapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  image: String,
  description: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// API Routes
app.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
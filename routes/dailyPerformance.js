const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const DailyPerformance = require('../models/DailyPerformance');

// Storage setup for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists at backend/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with extension
  }
});

const upload = multer({ storage });

// POST route to upload daily performance entry
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { heading, content } = req.body;

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newEntry = new DailyPerformance({
      heading,
      content,
      imageUrl,
      date: new Date() // Sets the current date
    });

    await newEntry.save();
    res.status(201).json({ message: 'Uploaded successfully' });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload data.' });
  }
});

// GET route to fetch all entries
router.get('/', async (req, res) => {
  try {
    const data = await DailyPerformance.find().sort({ date: -1 }); // Newest first
    res.json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});


// DELETE route to delete a specific entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await DailyPerformance.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});




module.exports = router;

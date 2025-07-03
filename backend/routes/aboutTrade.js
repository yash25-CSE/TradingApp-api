const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const AboutTrade = require('../models/AboutTrade');

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// POST route to create entry
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { heading, content } = req.body;
    
    const imageUrl = `/uploads/${req.file.filename}`;
    const newEntry = new AboutTrade({ heading, content, imageUrl });
    await newEntry.save();
    res.status(201).json({ message: 'About Trade uploaded successfully' });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload About Trade.' });
  }
});

// GET route to fetch entries
router.get('/', async (req, res) => {
  try {
    const data = await AboutTrade.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch About Trade data.' });
  }
});

// routes/aboutTrade.js
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AboutTrade.findByIdAndDelete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete entry' });
    }
  });
  
  

module.exports = router;

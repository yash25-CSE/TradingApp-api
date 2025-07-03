const express = require('express');
const router = express.Router();
const multer = require('multer');
const ChartPattern = require('../models/ChartPattern');
const path = require('path');
const fs = require('fs');

// Configure image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST: Upload chart pattern
router.post('/', upload.single('image'), async (req, res) => {
  const { heading, content } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  try {
    const pattern = new ChartPattern({ heading, content, imageUrl });
    await pattern.save();
    res.status(201).json(pattern);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload chart pattern' });
  }
});

// GET: Fetch all patterns
router.get('/', async (req, res) => {
  try {
    const data = await ChartPattern.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chart patterns' });
  }
});


router.delete('/chart-patterns/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const pattern = await ChartPattern.findById(id);
      if (!pattern) return res.status(404).json({ message: 'Pattern not found' });
  
      // Delete image from uploads folder
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(pattern.imageUrl));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await ChartPattern.findByIdAndDelete(id);
      res.json({ message: 'Pattern deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  

module.exports = router;

// routes/dailyUpdate.js
const express = require('express');
const router = express.Router();
const DailyUpdate = require('../models/DailyUpdate');

// POST - Add new update
router.post('/', async (req, res) => {
  try {
    const { heading, content } = req.body;

    const newUpdate = new DailyUpdate({
      heading,
      content,
      date: new Date()
    });

    await newUpdate.save();
    res.status(201).json({ message: 'Update uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload update' });
  }
});

// GET - Fetch all updates
router.get('/', async (req, res) => {
  try {
    const updates = await DailyUpdate.find().sort({ date: -1 });
    res.json(updates);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await DailyUpdate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete update.' });
  }
});

module.exports = router;

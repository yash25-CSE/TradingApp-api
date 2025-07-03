const express = require('express');
const router = express.Router();
const WatchVideo = require('../models/WatchVideo');

// POST: Add video
router.post('/', async (req, res) => {
  try {
    const { heading, content, youtubeLink } = req.body;
    const newEntry = new WatchVideo({ heading, content, youtubeLink });
    await newEntry.save();
    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload video.' });
  }
});

// GET: Fetch all videos
router.get('/', async (req, res) => {
  try {
    const data = await WatchVideo.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
});

// DELETE: Delete a video by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await WatchVideo.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete video.' });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const TradingSession = require('../models/TradingSession');

// POST - Add new trading session
router.post('/', async (req, res) => {
  try {
    const session = new TradingSession(req.body);
    await session.save();
    res.status(201).send('Trading session added');
  } catch (err) {
    res.status(500).send('Failed to add session');
  }
});

// GET - Get all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await TradingSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).send('Failed to fetch sessions');
  }
});

// DELETE - Delete session
router.delete('/:id', async (req, res) => {
  try {
    await TradingSession.findByIdAndDelete(req.params.id);
    res.send('Deleted successfully');
  } catch (err) {
    res.status(500).send('Failed to delete');
  }
});

module.exports = router;

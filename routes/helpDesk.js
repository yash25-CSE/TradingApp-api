const express = require('express');
const router = express.Router();
const HelpDesk = require('../models/HelpDesk');

// POST - Add Help Desk
router.post('/', async (req, res) => {
  try {
    const entry = new HelpDesk(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - All Help Desk Contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await HelpDesk.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - One Help Desk Contact
router.delete('/:id', async (req, res) => {
  try {
    await HelpDesk.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

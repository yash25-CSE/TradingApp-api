const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const TradingMaterial = require('../models/TradingMaterial');

// Upload storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Create (upload) material
router.post('/trading-materials', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;
    const material = new TradingMaterial({ title, description, fileUrl });
    await material.save();
    res.json(material);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all materials
router.get('/trading-materials', async (req, res) => {
  const data = await TradingMaterial.find().sort({ date: -1 });
  res.json(data);
});

// Delete material
router.delete('/trading-materials/:id', async (req, res) => {
  try {
    const material = await TradingMaterial.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Not found' });

    const filePath = path.join(__dirname, '..', 'uploads', path.basename(material.fileUrl));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await TradingMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;

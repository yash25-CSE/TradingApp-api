const express = require('express');
const router = express.Router();
const BuyProduct = require('../models/BuyProduct');

// Add new product
router.post('/', async (req, res) => {
  try {
    const { heading, price, content } = req.body;
    const product = new BuyProduct({ heading, price, content });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await BuyProduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BuyProduct.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;

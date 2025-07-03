const mongoose = require('mongoose');

const tradingMaterialSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TradingMaterial', tradingMaterialSchema);

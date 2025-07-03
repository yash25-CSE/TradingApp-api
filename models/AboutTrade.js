const mongoose = require('mongoose');

const AboutTradeSchema = new mongoose.Schema({
  heading: String,
  content: String,
  imageUrl: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AboutTrade', AboutTradeSchema);
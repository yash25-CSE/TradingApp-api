const mongoose = require('mongoose');

const TradingSessionSchema = new mongoose.Schema({
  videoLink: String,
  content: String
});

module.exports = mongoose.model('TradingSession', TradingSessionSchema);

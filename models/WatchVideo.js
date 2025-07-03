const mongoose = require('mongoose');

const WatchVideoSchema = new mongoose.Schema({
  heading: String,
  content: String,
  youtubeLink: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WatchVideo', WatchVideoSchema);

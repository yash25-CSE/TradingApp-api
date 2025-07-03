// models/DailyUpdate.js
const mongoose = require('mongoose');

const dailyUpdateSchema = new mongoose.Schema({
  heading: String,
  content: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DailyUpdate', dailyUpdateSchema);

const mongoose = require('mongoose');

const dailyPerformanceSchema = new mongoose.Schema({
  heading: String,
  content: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DailyPerformance', dailyPerformanceSchema);



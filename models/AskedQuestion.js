const mongoose = require('mongoose');

const askedQuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AskedQuestion', askedQuestionSchema);
const mongoose = require('mongoose');

const helpDeskSchema = new mongoose.Schema({
  heading: String,
  email: String,
  phone: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HelpDesk', helpDeskSchema);

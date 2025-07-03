const mongoose = require('mongoose');

const BuyProductSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BuyProduct', BuyProductSchema);

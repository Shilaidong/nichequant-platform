const mongoose = require('mongoose');

const MarketDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'general'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MarketData', MarketDataSchema);
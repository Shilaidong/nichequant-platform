const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true,
    default: 'https://picsum.photos/seed/user/100/100'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
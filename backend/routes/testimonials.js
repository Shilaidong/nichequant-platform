const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// @route    GET api/testimonials
// @desc     Get all testimonials
// @access   Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/testimonials
// @desc     Create a testimonial
// @access   Public
router.post('/', async (req, res) => {
  const { quote, name, handle, avatarUrl } = req.body;

  try {
    const newTestimonial = new Testimonial({
      quote,
      name,
      handle,
      avatarUrl
    });

    const testimonial = await newTestimonial.save();
    res.json(testimonial);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
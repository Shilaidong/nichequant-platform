const express = require('express');
const router = express.Router();
const MarketData = require('../models/MarketData');

// @route    GET api/market-data
// @desc     Get all market data
// @access   Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    const marketData = await MarketData.find(query).sort({ date: 1 });
    res.json(marketData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/market-data
// @desc     Create market data
// @access   Public
router.post('/', async (req, res) => {
  const { date, value, category } = req.body;

  try {
    const newMarketData = new MarketData({
      date,
      value,
      category
    });

    const marketData = await newMarketData.save();
    res.json(marketData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
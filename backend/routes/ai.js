const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'default_key');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// @route    POST api/ai/verify
// @desc     Verify product authenticity from image
// @access   Public
router.post('/verify', async (req, res) => {
  const { imageUrl, description } = req.body;

  try {
    // Generate content using Gemini
    const prompt = `Verify the authenticity of this vintage item. Image URL: ${imageUrl}. Description: ${description}. Provide a detailed analysis including authenticity indicators, estimated age, and condition assessment.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ verification: text });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/ai/valuate
// @desc     Valuate product price
// @access   Public
router.post('/valuate', async (req, res) => {
  const { name, category, description, imageUrl, condition } = req.body;

  try {
    // Generate content using Gemini
    const prompt = `Estimate the market value of this vintage item. Details: Name: ${name}, Category: ${category}, Description: ${description}, Image URL: ${imageUrl}, Condition: ${condition}. Provide a price range and factors influencing the valuation.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ valuation: text });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
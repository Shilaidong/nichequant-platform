const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'default_key');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// @route    POST api/ai/verify
// @desc     Verify product authenticity from image
// @access   Public
router.post('/verify', async (req, res) => {
  const { image, description } = req.body;

  try {
    const prompt = "You are an expert authenticator specializing in vintage clothing, rare sneakers, and subculture collectibles. Analyze the following image and provide a brief authentication assessment. Identify the item, point out key characteristics (like stitching, tags, wear patterns), and give your opinion on its authenticity and potential era. Keep your analysis concise and easy to understand for a collector, in Chinese.";
    
    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = image.includes(',') ? image.split(',')[1] : image;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({ verification: text });
  } catch (err) {
    console.error('AI Verify Error:', err);
    res.status(500).send('AI Verification Failed');
  }
});

// @route    POST api/ai/valuate
// @desc     Valuate product price
// @access   Public
router.post('/valuate', async (req, res) => {
  const { image } = req.body;

  try {
    const prompt = "You are an expert appraiser specializing in vintage clothing, rare sneakers, and subculture collectibles. Analyze the following image and provide an estimated market value for the item. Identify the item, its key value-driving characteristics (like brand, era, condition, rarity), and provide a price range in USD. Justify your valuation. Keep your analysis concise and easy to understand for a collector, in Chinese.";
    
    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = image.includes(',') ? image.split(',')[1] : image;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({ valuation: text });
  } catch (err) {
    console.error('AI Valuate Error:', err);
    res.status(500).send('AI Valuation Failed');
  }
});

module.exports = router;
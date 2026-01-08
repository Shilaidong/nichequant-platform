const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

// Initialize Google Generative AI
// Using gemini-1.5-flash which is multimodal and faster
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'default_key');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Helper function to fetch image from URL and convert to Google AI part
 */
async function urlToGenerativePart(url, mimeType) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return {
      inlineData: {
        data: Buffer.from(response.data).toString('base64'),
        mimeType
      },
    };
  } catch (error) {
    throw new Error(`Failed to fetch image from URL: ${error.message}`);
  }
}

// @route    POST api/ai/verify
// @desc     Verify product authenticity from image URL
// @access   Public
router.post('/verify', async (req, res) => {
  const { imageUrl, description } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Please provide an image URL' });
  }

  try {
    const imagePart = await urlToGenerativePart(imageUrl, 'image/jpeg');
    const prompt = `你是一位专门鉴定古着衣物、稀有球鞋和亚文化收藏品的专家。
    请分析这张图片并提供简要的鉴定评估。
    鉴定对象：${description || '未提供描述'}
    要求：识别该物品，指出关键特征（如缝线、标签、磨损模式），并对其真实性和潜在年代给出意见。
    分析应简洁易懂，使用中文。`;
    
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({ verification: text });
  } catch (err) {
    console.error('AI Verify Error:', err.message);
    res.status(500).json({ message: 'AI鉴定失败: ' + err.message });
  }
});

// @route    POST api/ai/valuate
// @desc     Valuate product price from image URL
// @access   Public
router.post('/valuate', async (req, res) => {
  const { name, category, description, imageUrl, condition } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Please provide an image URL' });
  }

  try {
    const imagePart = await urlToGenerativePart(imageUrl, 'image/jpeg');
    const prompt = `你是一位专门评估古着衣物、稀有球鞋和亚文化收藏品的专家。
    请分析图片并为该物品提供估计的市场价值。
    详情：名称: ${name}, 分类: ${category}, 描述: ${description}, 品相: ${condition}
    要求：识别物品，分析其价值驱动特征（如品牌、年代、稀有度），并提供美元(USD)价格范围。
    分析应简洁易懂，使用中文。`;
    
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    res.json({ valuation: text });
  } catch (err) {
    console.error('AI Valuate Error:', err.message);
    res.status(500).json({ message: 'AI估价失败: ' + err.message });
  }
});

module.exports = router;
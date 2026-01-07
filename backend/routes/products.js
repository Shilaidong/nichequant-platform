const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const User = require('../models/User');

// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name avatarUrl');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/products/:id
// @desc     Get product by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name avatarUrl');

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/products
// @desc     Create a product
// @access   Private
router.post('/', auth, async (req, res) => {
  const { name, category, price, imageUrl, description } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const newProduct = new Product({
      name,
      category,
      price,
      imageUrl,
      seller: req.user.id,
      description
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/products/:id
// @desc     Update a product
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { name, category, price, imageUrl, description } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if user owns the product
    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update product fields
    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    product.description = description || product.description;
    product.updatedAt = Date.now();

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if user owns the product
    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await product.remove();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
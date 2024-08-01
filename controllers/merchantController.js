require('dotenv').config();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register Merchant
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const merchant = await db.Merchant.create({ name, email, password: hashedPassword });
    res.json({
      status: 'success',
      data: merchant,
      message: 'Merchant registered successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error registering merchant'
    });
  }
};

// Login Merchant
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const merchant = await db.Merchant.findOne({ where: { email } });
    if (!merchant) return res.status(400).json({
      status: 'error',
      error: 'Email or password is wrong',
      message: 'Invalid credentials'
    });

    const validPass = await bcrypt.compare(password, merchant.password);
    if (!validPass) return res.status(400).json({
      status: 'error',
      error: 'Email or password is wrong',
      message: 'Invalid credentials'
    });

    const token = jwt.sign({ id: merchant.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated Token:', token); // Debug log

    res.header('Authorization', token).json({
      status: 'success',
      data: token,
      message: 'Logged in successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error logging in'
    });
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await db.Product.create({ name, price, merchantId: req.user.id });
    res.json({
      status: 'success',
      data: product,
      message: 'Product created successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error creating product'
    });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({ where: { merchantId: req.user.id } });
    res.json({
      status: 'success',
      data: products,
      message: 'Products retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error listing products'
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock } = req.body;

    const product = await db.Product.findOne({ where: { id, merchantId: req.user.id } });
    if (!product) return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    });

    await product.update({ name, price, description, stock });

    res.json({
      status: 'success',
      data: product,
      message: 'Product updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error updating product'
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await db.Product.findOne({ where: { id, merchantId: req.user.id } });
    if (!product) return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    });

    await product.destroy();

    res.json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error deleting product'
    });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      include: [
        {
          model: db.Product,
          include: [
            {
              model: db.Merchant,
              where: { id: req.user.id }
            }
          ]
        },
        { model: db.Customer }
      ]
    });

    res.json({
      status: 'success',
      data: orders,
      message: 'Orders retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error listing orders'
    });
  }
};


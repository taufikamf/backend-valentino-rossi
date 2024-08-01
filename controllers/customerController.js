require('dotenv').config();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register Customer
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await db.Customer.create({ name, email, password: hashedPassword });
    res.json({
      status: 'success',
      data: customer,
      message: 'Customer registered successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error registering customer'
    });
  }
};

// Login Customer
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await db.Customer.findOne({ where: { email } });
    if (!customer) return res.status(400).json({
      status: 'error',
      error: 'Email or password is wrong',
      message: 'Invalid credentials'
    });

    const validPass = await bcrypt.compare(password, customer.password);
    if (!validPass) return res.status(400).json({
      status: 'error',
      error: 'Email or password is wrong',
      message: 'Invalid credentials'
    });

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

// List Products
exports.listProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
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

// Buy Product
exports.buyProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await db.Product.findOne({ where: { id: productId } });
    if (!product) return res.status(400).json({
      status: 'error',
      error: 'Product not found',
      message: 'Invalid product ID'
    });

    let discount = 0;
    let finalPrice = product.price;

    if (product.price > 50000) {
      discount = product.price * 0.1;
    }

    finalPrice -= discount;

    const order = await db.Order.create({
      customerId: req.user.id,
      productId: product.id,
      totalPrice: product.price,
      discount,
      finalPrice
    });

    res.json({
      status: 'success',
      data: order,
      message: 'Product purchased successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message,
      message: 'Error purchasing product'
    });
  }
};

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.get('/products', verifyToken, customerController.listProducts);
router.post('/buy', verifyToken, customerController.buyProduct);

module.exports = router;

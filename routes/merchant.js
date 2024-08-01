const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', merchantController.register);
router.post('/login', merchantController.login);
router.post('/products', verifyToken, merchantController.createProduct);
router.get('/products', verifyToken, merchantController.listProducts);
router.get('/orders', verifyToken, merchantController.listOrders);

module.exports = router;

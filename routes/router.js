const express = require('express');
const router = express.Router();

// Require controller modules.
const item_controller = require('../controllers/itemController');
const user_controller = require('../controllers/userController');
const order_controller = require('../controllers/orderController');

// Use base router.
router.use('/items', item_controller);
router.use('/orders', order_controller);
router.use('/users', user_controller);

module.exports = router;
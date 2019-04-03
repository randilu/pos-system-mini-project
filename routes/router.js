const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Require controller modules.
const item_controller = require('../controllers/itemController');
const user_controller = require('../controllers/userController');
const order_controller = require('../controllers/orderController');
const auth_controller = require('../controllers/authController');

// Use base router.
router.use('/items', auth, item_controller);
router.use('/orders', auth, order_controller);
router.use('/users', user_controller);
router.use('/auth', auth_controller);

module.exports = router;
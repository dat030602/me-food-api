const express = require('express');
const router = express.Router();

const CheckoutController = require('../controllers/CheckoutController');

router.post('/order', CheckoutController.order)

module.exports = router;
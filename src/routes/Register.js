const express = require('express');
const router = express.Router();

const RegisterController = require('../controllers/RegisterController');

router.post('/coop', RegisterController.registerCoop);
router.post('/driver', RegisterController.registerDriver);
router.post('/customer', RegisterController.registerCustomer)

module.exports = router;
const express = require('express');
const router = express.Router();

const ManageCartController = require('../controllers/ManageCartController');

router.get('/getCarts/:slug', ManageCartController.getCarts);
router.get('/getDetailCart/:slug', ManageCartController.getDetailCart);
router.get('/products/:slug', ManageCartController.getProducts);
router.post('/submit', ManageCartController.submitOrder);
router.post('/deleteOrder', ManageCartController.deleteOrder);
router.get('/', ManageCartController.index)

module.exports = router;
const express = require('express');
const router = express.Router();

const RestaurantsController = require('../controllers/RestaurantsController');

router.get('/getBranch1', RestaurantsController.getBranch1);
router.get('/getBranch2', RestaurantsController.getBranch2);
router.get('/', RestaurantsController.index)
router.get('/getName/:slug', RestaurantsController.getName);
module.exports = router;
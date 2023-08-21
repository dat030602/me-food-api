const express = require('express');
const router = express.Router();

const StatisticsController = require('../controllers/StatisticsController');

// router.get('/getBranch/:slug', StatisticsController.getBranch);
router.get('/getOrder/:slug', StatisticsController.getOrder);
router.get('/getUnprocessOrder/:slug', StatisticsController.getUnprocessOrder);
router.get('/getTrendOrder/:slug', StatisticsController.getTrendOrder);
// router.get('/getOrderPerDay/:slug', StatisticsController.getOrderPerDay);
router.get('/', StatisticsController.index)

module.exports = router;
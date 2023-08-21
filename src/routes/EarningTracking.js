const express = require('express');
const router = express.Router();

const EarningTrackingController = require('../controllers/EarningTrackingController');

router.get('/getThuNhap/:slug', EarningTrackingController.getThuNhap);
router.get('/getThongKe/:slug', EarningTrackingController.getThongKe);
router.get('/', EarningTrackingController.index)

module.exports = router;
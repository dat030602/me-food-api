const express = require('express');
const router = express.Router();

const ManageDriverController = require('../controllers/ManageDriverController');

router.post('/getDetail', ManageDriverController.getDetail);
router.get('/getDonHang', ManageDriverController.getDonHang)
router.post('/getTenKH', ManageDriverController.getTenKH)
router.post('/submitDriver', ManageDriverController.submitDriver)

module.exports = router;
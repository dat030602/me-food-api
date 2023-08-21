const express = require('express');
const router = express.Router();

const ManageDataController = require('../controllers/ManageDataController');

router.post('/get1', ManageDataController.get1);
router.post('/get2', ManageDataController.get2);
router.post('/get3', ManageDataController.get3);

module.exports = router;
const express = require('express');
const router = express.Router();

const ManageCoopController = require('../controllers/ManageCoopController');

router.post('/get1', ManageCoopController.get1)
router.post('/get2', ManageCoopController.get2)
router.post('/get3', ManageCoopController.get3)
router.post('/get4', ManageCoopController.get4)
router.post('/get5', ManageCoopController.get5)
router.post('/get6', ManageCoopController.get6)

module.exports = router;
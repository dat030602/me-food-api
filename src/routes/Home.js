const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');

router.get('/getBranch1', HomeController.getBranch1);
router.get('/getBranch2', HomeController.getBranch2);
router.get('/', HomeController.index)

module.exports = router;
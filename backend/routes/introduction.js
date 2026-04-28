const express = require('express');
const router = express.Router();
const introductionController = require('../controllers/introductionController');

router.get('/', introductionController.getIntroduction);

module.exports = router;

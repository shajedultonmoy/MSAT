const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

router.get('/', skillsController.getSkills);

module.exports = router;

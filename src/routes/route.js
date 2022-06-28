const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController')

// college apis
router.post('/functionup/colleges' , collegeController.createColleges)

module.exports = router;
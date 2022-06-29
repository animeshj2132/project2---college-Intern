const express = require('express');
const router = express.Router();
const collegeController = require('../controller/collegeController')
const internController = require('../controller/internController')

// college apis
router.post('/functionup/colleges' , collegeController.createColleges); //validator for name and full name is missing

router.post('/functionup/interns' , internController.createIntern);

router.get('/functionup/collegeDetails' , collegeController.collegeDetails)

module.exports = router;
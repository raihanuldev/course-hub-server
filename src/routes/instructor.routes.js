const express = require('express');
const { getTopInstructor, getAllInstructor } = require('../controllers/instructor.controller');
const router = express.Router()

router.get('/topinstructor',getTopInstructor)
router.get('/instructors',getAllInstructor)

module.exports = router;
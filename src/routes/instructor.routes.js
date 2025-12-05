const express = require('express');
const { getTopInstructor, getAllInstructor, makeInstructor } = require('../controllers/instructor.controller');
const router = express.Router()

router.get('/topinstructor',getTopInstructor)
router.get('/instructors',getAllInstructor)
router.get('/make-instructors/:id',makeInstructor)

module.exports = router;
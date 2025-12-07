const express = require('express');
const { getTopInstructor, getAllInstructor, makeInstructor, getMyAddedClass } = require('../controllers/instructor.controller');
const router = express.Router()

router.get('/topinstructor',getTopInstructor)
router.get('/instructors',getAllInstructor)
router.get('/make-instructors/:id',makeInstructor)

router.get('/my-classes',getMyAddedClass) //to get all taked class.


module.exports = router;
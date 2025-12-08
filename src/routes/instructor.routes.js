const express = require('express');
const { getTopInstructor, getAllInstructor, makeInstructor, getMyAddedClass } = require('../controllers/instructor.controller');
const router = express.Router()


/**
 * @swagger
 * /v1/instructor/topinstructor:
 *   get:
 *     summary: Get top instructors based on total enrollments
 *     tags: [Instructor]
 *     responses:
 *       200:
 *         description: Top instructors retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /v1/instructor/instructors:
 *   get:
 *     summary: Get all instructors
 *     tags: [Instructor]
 *     responses:
 *       200:
 *         description: List of instructors returned successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /v1/instructor/make-instructors/{id}:
 *   get:
 *     summary: Promote a user to instructor role
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ObjectId
 *     responses:
 *       200:
 *         description: User promoted to instructor successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /v1/instructor/my-classes:
 *   get:
 *     summary: Get all classes added by this instructor
 *     tags: [Instructor]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Instructor email address
 *     responses:
 *       200:
 *         description: List of classes retrieved successfully
 *       400:
 *         description: Email missing
 *       500:
 *         description: Server error
 */



router.get('/topinstructor',getTopInstructor)
router.get('/instructors',getAllInstructor)
router.get('/make-instructors/:id',makeInstructor)

router.get('/my-classes',getMyAddedClass) //to get all taked class.


module.exports = router;
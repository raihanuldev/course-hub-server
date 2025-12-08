const express = require('express');
const { getTopCoures, getAllCoures, getAllApprovedCoures, makeApprovalCoures, Feedback, enrolledCoures, deniedCoures, addNewCoures, AddNewModule, GetContent } = require('../controllers/coures.controller');

const router = express.Router()


/**
 * @openapi
 * /v1/courses/topCoures:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get top 6 most enrolled courses
 *     description: Returns a list of top courses sorted by enrolled count.
 *     responses:
 *       200:
 *         description: Successfully returned top courses
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/allCoures:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all courses
 *     description: Fetches all available courses from the database.
 *     responses:
 *       200:
 *         description: All courses returned
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/enrolled-classes:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all enrolled courses for a user
 *     description: Returns enrolled courses based on email. Club members get access to all courses.
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: "user@gmail.com"
 *     responses:
 *       200:
 *         description: Enrolled course list returned
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/all-approved-coures:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get all approved courses
 *     description: Returns courses where status is 'approved'.
 *     responses:
 *       200:
 *         description: Approved courses returned
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/make-approval/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Approve a course
 *     description: Updates a course status to approved, increments enrolled count, and reduces seats.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "6789012345abcdef12345678"
 *     responses:
 *       200:
 *         description: Course approved
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/feedback/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Add instructor/admin feedback to a course
 *     description: Writes feedback message into the course document.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             feedback: "Course content needs improvement."
 *     responses:
 *       200:
 *         description: Feedback updated
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/deniedCoures/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Deny a course
 *     description: Updates course status to 'denied'.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course denied successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/addNewCoures:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Add a new course
 *     description: Inserts a new course document into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Full Stack Web Development"
 *             instructor: "John Doe"
 *             price: 49.99
 *             availableSeats: 30
 *             status: "pending"
 *     responses:
 *       200:
 *         description: Course added
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/content-collections/{courseId}:
 *   patch:
 *     tags:
 *       - Courses
 *     summary: Add a new module to a course
 *     description: Pushes a new module object into the course content collection.
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         example: "course-123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             moduleName: "Module 1"
 *             lessons:
 *               - "Introduction"
 *               - "Setup"
 *     responses:
 *       200:
 *         description: Module added successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/courses/content-collections/{courseId}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get course content/modules
 *     description: Fetches a course content by course ID.
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         example: "course-123"
 *     responses:
 *       200:
 *         description: Content returned
 *       404:
 *         description: No content found
 *       500:
 *         description: Internal server error
 */


router.get('/topCoures', getTopCoures) //top coures
router.get('/allCoures', getAllCoures)
router.get('/enrolled-classes', enrolledCoures)
router.get('/all-approved-coures', getAllApprovedCoures)
router.put('/make-approval/:id', makeApprovalCoures)
router.put('/feedback/:id', Feedback)
router.put('/deniedCoures/:id', deniedCoures)
router.post('/addNewCoures', addNewCoures)
router.patch('/content-collections/:courseId', AddNewModule)
router.get('/content-collections/:courseId', GetContent)
module.exports = router;
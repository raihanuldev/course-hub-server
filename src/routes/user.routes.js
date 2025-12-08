const express = require('express');
const { getUser, postUser, getAllUser, MakeAdmin, isClubMember, GetAllClubMembers, addClubMember } = require('../controllers/user.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and club member APIs
 */

/**
 * @swagger
 * /getUser:
 *   get:
 *     summary: Get a single user by email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User details
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /postuser:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added or already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /getAllUsers:
 *   get:
 *     summary: Get all users with pagination
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of users with pagination metadata
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /make-admin/{id}:
 *   put:
 *     summary: Make a user admin by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User role updated to admin
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /is-club-member:
 *   get:
 *     summary: Check if a user is a club member
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: Returns boolean isMember
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /club-members:
 *   get:
 *     summary: Get all club members
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of club members
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /add-club-member:
 *   post:
 *     summary: Add a new club member
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Club member added successfully
 *       400:
 *         description: Email is required
 *       500:
 *         description: Internal server error
 */



router.get('/getUser',getUser)
router.post('/postuser',postUser)
router.get('/getAllUsers',getAllUser)
router.put('/make-admin/:id',MakeAdmin)
router.get('/is-club-member',isClubMember)
router.get('/club-members',GetAllClubMembers)
router.post('/add-club-member',addClubMember)

module.exports= router;

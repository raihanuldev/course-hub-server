const express = require('express');
const aiController = require('../controllers/ai.controller');

const router = express.Router();


/**
 * @openapi
 * /ai/chat:
 *   post:
 *     tags:
 *       - AI
 *     summary: Send a chat query to OpenAI
 *     description: This endpoint sends a user prompt to OpenAI and returns the generated response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 example: "Explain bubble sort in simple words"
 *     responses:
 *       200:
 *         description: Successful AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bubble sort is a simple sorting algorithm..."
 *       500:
 *         description: Internal server error
 */


router.post('/chat',aiController)


module.exports = router;
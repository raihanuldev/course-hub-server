const express = require('express');
const { getMyCart, AddToCart, deleteFromCart } = require('../controllers/carts.controller');
const router = express.Router();

/**
 * @openapi
 * /v1/carts:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Get all cart items for a specific user
 *     description: Returns all cart items associated with the provided user email.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "user@example.com"
 *     responses:
 *       200:
 *         description: Successfully returned user's cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/carts:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Add an item to the cart
 *     description: Inserts a new cart item into the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               cartId:
 *                 cartId: "CART123"
 *                 email: "user@example.com"
 *               productId: "PROD001"
 *               productName: "JavaScript Course"
 *               price: 29.99
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /v1/carts:
 *   delete:
 *     tags:
 *       - Carts
 *     summary: Delete an item from the cart
 *     description: Deletes a cart item using the provided request body query.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             productId: "PROD001"
 *             email: "user@example.com"
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal server error
 */

router.get('/',getMyCart)
router.post('/',AddToCart)
router.delete('/',deleteFromCart)

module.exports = router;
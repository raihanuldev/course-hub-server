const express = require('express');
const { sslPay, getPaymentHistory, createPaymentIntent, payment } = require('../controllers/payment.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment related APIs
 */

/**
 * @swagger
 * /v1/pay/sslPay:
 *   post:
 *     summary: Initiate SSLCommerz payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               cartId:
 *                 type: string
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL to redirect user for payment
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/pay/create-payment-intent:
 *   post:
 *     summary: Create a Stripe payment intent
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Returns clientSecret of the payment intent
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/pay/payment-history:
 *   get:
 *     summary: Get payment history for a user
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: List of payment history
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /v1/pay/payments:
 *   get:
 *     summary: Record a payment and update related course and cart
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               couresId:
 *                 type: string
 *               email:
 *                 type: string
 *               price:
 *                 type: number
 *               name:
 *                 type: string
 *               cartId:
 *                 type: string
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment recorded and course/cart updated
 *       500:
 *         description: Internal server error
 */




router.post('/sslPay',sslPay);
router.post('/create-payment-intent',createPaymentIntent);
router.get('/payment-history',getPaymentHistory);
router.get('/payments',payment);


module.exports = router;
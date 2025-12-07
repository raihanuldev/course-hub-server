const express = require('express');
const { sslPay, getPaymentHistory, createPaymentIntent, payment } = require('../controllers/payment.controller');
const router = express.Router();

router.post('/sslPay',sslPay);
router.post('/create-payment-intent',createPaymentIntent);
router.get('/payment-history',getPaymentHistory);
router.get('/payments',payment);


module.exports = router;
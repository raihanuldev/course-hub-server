const express = require('express');
const { sslPay, getPaymentHistory, createPaymentIntent } = require('../controllers/payment.controller');
const router = express.Router();

router.post('/sslPay',sslPay);
router.post('/create-payment-intent',createPaymentIntent);
router.get('/payment-history',getPaymentHistory);


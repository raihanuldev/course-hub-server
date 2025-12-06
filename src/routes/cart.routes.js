const express = require('express');
const { getMyCart, AddToCart, deleteFromCart } = require('../controllers/carts.controller');
const router = express.Router();



router.get('/',getMyCart)
router.post('/',AddToCart)
router.delete('/',deleteFromCart)

module.exports = router;
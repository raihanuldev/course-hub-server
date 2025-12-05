const express = require('express');
const { getUser, postUser } = require('../controllers/user.controller');

const router = express.Router();

router.get('/getUser',getUser)
router.post('/postuser',postUser)

module.exports= router;

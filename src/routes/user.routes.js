const express = require('express');
const { getUser, postUser, getAllUser } = require('../controllers/user.controller');

const router = express.Router();

router.get('/getUser',getUser)
router.post('/postuser',postUser)
router.get('/getAllUsers',getAllUser)
module.exports= router;

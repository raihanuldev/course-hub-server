const express = require('express');
const { getUser, postUser, getAllUser, MakeAdmin } = require('../controllers/user.controller');

const router = express.Router();

router.get('/getUser',getUser)
router.post('/postuser',postUser)
router.get('/getAllUsers',getAllUser)
router.put('/make-admin/:id',MakeAdmin)
module.exports= router;

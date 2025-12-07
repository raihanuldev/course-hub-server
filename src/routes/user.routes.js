const express = require('express');
const { getUser, postUser, getAllUser, MakeAdmin, isClubMember, GetAllClubMembers, addClubMember } = require('../controllers/user.controller');

const router = express.Router();

router.get('/getUser',getUser)
router.post('/postuser',postUser)
router.get('/getAllUsers',getAllUser)
router.put('/make-admin/:id',MakeAdmin)
router.get('/is-club-member',isClubMember)
router.get('/club-members',GetAllClubMembers)
router.post('/add-club-member',addClubMember)

module.exports= router;

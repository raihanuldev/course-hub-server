const express = require('express');
const { getTopCoures } = require('../controllers/coures.controller');

const router = express.Router()


router.get('/topCoures', getTopCoures) //top coures



module.exports=router;
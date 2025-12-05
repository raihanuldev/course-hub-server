const express = require('express');
const { getTopCoures, getAllCoures, getAllApprovedCoures } = require('../controllers/coures.controller');

const router = express.Router()


router.get('/topCoures', getTopCoures) //top coures
router.get('/allCoures', getAllCoures) 
router.get('/all-approved-coures',getAllApprovedCoures)


module.exports = router;
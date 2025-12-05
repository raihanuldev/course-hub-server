const express = require('express');
const { getTopCoures, getAllCoures, getAllApprovedCoures, makeApprovalCoures } = require('../controllers/coures.controller');

const router = express.Router()


router.get('/topCoures', getTopCoures) //top coures
router.get('/allCoures', getAllCoures) 
router.get('/all-approved-coures',getAllApprovedCoures)
router.put('/make-approval/:id',makeApprovalCoures)

module.exports = router;
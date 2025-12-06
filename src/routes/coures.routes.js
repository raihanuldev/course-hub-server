const express = require('express');
const { getTopCoures, getAllCoures, getAllApprovedCoures, makeApprovalCoures, Feedback, enrolledCoures, deniedCoures } = require('../controllers/coures.controller');

const router = express.Router()


router.get('/topCoures', getTopCoures) //top coures
router.get('/allCoures', getAllCoures) 
router.get('/enrolled-classes', enrolledCoures) 
router.get('/all-approved-coures',getAllApprovedCoures)
router.put('/make-approval/:id',makeApprovalCoures)
router.put('/feedback/:id',Feedback)
router.put('/deniedCoures/:id',deniedCoures)

module.exports = router;
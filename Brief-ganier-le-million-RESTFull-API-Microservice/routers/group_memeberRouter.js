const express = require('express')
const {createGroupMember, allGroupMember, updateGroupMember, groupMemberId} = require('../controllers/group_memberController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')
const {codeId} = require('../controllers/codeController')


const router = express.Router()

router.post('/create/:codeId/:participantId', [requireSignIn, isAuth], createGroupMember)
router.put('/rejoindre/:groupMember/:codeId', updateGroupMember)
router.get('/', allGroupMember)

router.param('participantId', participantById)
router.param('codeId', codeId)
router.param('groupMember', groupMemberId)

module.exports = router
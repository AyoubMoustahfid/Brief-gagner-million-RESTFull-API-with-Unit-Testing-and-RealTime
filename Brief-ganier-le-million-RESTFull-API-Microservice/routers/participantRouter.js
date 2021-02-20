const express = require('express')
const {getOneParticipant, updateOneParticipant} = require('../controllers/participantController')
const {participantById} = require('../midelleware/participant')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')


const router = express.Router()

router.get('/:participantId', [requireSignIn, isAuth, isAdmin], getOneParticipant)
router.put('/:participantId', [requireSignIn, isAuth, isAdmin], updateOneParticipant)

router.param("participantId", participantById)


module.exports = router
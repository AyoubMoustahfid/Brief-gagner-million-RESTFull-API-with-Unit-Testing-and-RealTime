const express = require('express')
const {createQuestionToken, allQuestionToken} = require('../controllers/questionTokenController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')


const router = express.Router()

router.post('/create/:participantId', [requireSignIn, isAuth], createQuestionToken)
router.get('/', allQuestionToken)

router.param('participantId', participantById)

module.exports = router
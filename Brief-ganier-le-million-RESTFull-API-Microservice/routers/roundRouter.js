const express = require('express')
const {createRound} = require('../controllers/roundController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')


const router = express.Router()

router.post('/create/:participantId', [requireSignIn, isAuth], createRound)


router.param('participantId', participantById)



module.exports = router
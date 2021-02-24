const express = require('express')
const {createGift, photoGift, giftById, allGift} = require('../controllers/giftController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')
const {participantById} = require('../midelleware/participant')



const router = express.Router()

router.post('/create/:participantId', [requireSignIn, isAuth, isAdmin], createGift)
router.get('/', allGift)
router.get('/photo/:giftId', photoGift)

router.param('participantId', participantById)
router.param('giftId', giftById)

module.exports = router
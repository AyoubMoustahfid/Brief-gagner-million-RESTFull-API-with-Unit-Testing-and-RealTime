const express = require('express')
const {createFinalWinner} = require('../controllers/final_winnerController')
const {requireSignIn, isAuth} = require('../midelleware/auth')
const {groupMemberId} = require('../controllers/group_memberController')


const router = express.Router()

 
router.get('/:groupMemberId', [requireSignIn, isAuth], createFinalWinner)


router.param('/groupMemberId', groupMemberId)

module.exports = router
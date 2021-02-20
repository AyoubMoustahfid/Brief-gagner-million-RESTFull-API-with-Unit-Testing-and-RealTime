const express = require('express')
const {singin, signup, signout} = require('../controllers/authController')
const {requireSignIn} = require('../midelleware/auth')


const router = express.Router()

router.post("/signup", signup)
router.post('/signin', singin)
router.get('/signout', signout)

router.get('/hello', requireSignIn, (req, res) => {
    res.send("hello there")
})


module.exports = router
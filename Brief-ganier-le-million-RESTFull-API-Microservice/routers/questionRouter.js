const express = require('express')
const {createQuestion, allQuestion} = require('../controllers/questionController')
const {requireSignIn, isAdmin, isAuth} = require('../midelleware/auth')


const router = express.Router()

router.post('/create', [requireSignIn, isAuth, isAdmin], createQuestion)
router.get('/', [requireSignIn, isAuth, isAdmin], allQuestion)


module.exports = router
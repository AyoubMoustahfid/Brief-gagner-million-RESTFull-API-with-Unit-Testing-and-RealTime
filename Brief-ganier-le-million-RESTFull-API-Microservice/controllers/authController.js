const Participant = require('../models/participantModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()



exports.signup = (req, res) => {
    const participant = new Participant(req.body)

    participant.save((err, participant) => {
        if(err){
            return res.status(400).send(err)
        }
        participant.hashed_password = undefined
        participant.salt = undefined

        res.json(participant)
    })
}



exports.singin = (req, res) => {
    const {email, password} = req.body

    Participant.findOne({email}, (err, participant) => {
        if(err || !participant) {
            return res.status(400).json({
                error : "User not found with this email, Please Singup"
            })
        }

        if(!participant.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password don't mutch !"
            })
        }
        
        if(participant.is_valid === false){
            return res.status(401).json({
                error: "Participant is not valid "
            })
        }
        const token  = jwt.sign({_id: participant._id, role: participant.role}, process.env.JWT_SECRET)

        res.cookie("token", token, {expire: new Date() + 802600})
        
        const {_id, username, email, role} = participant;

        res.json({
            token, participant: {_id, username, email, role}
        })
    })
}



exports.signout = (req, res) => {
    res.clearCookie("token")

    res.json({
        message: 'User is Signout !!'
    })
}
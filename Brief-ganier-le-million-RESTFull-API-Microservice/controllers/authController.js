const Participant = require('../models/participantModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const Nexmo = require('nexmo');




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
        }else{

            const nexmo = new Nexmo({
                apiKey: process.env.API_KEY_SMS,
                apiSecret: process.env.API_SECRET_SMS,
              });

            const from = 'Admin';
            const to = '212696396672';
            const text = `Hello ${participant.username} , Email: ${participant.email} votre compte est activé`;

            nexmo.message.sendSms(from, to, text);
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
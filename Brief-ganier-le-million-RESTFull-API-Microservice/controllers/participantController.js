const Participant = require('../models/participantModel')


exports.getOneParticipant = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    res.json({
        participant : req.profile
    })
}

exports.updateOneParticipant = (req, res) => {
    Participant.findByIdAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, participant) => {
        if(err){
            return res.status(400).json({err})
        }

        req.profile.hashed_password = undefined
        req.profile.hashed_password = undefined

        res.json({participant})
    })
}
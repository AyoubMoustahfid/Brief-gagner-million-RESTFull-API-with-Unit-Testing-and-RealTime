const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const roundSchema = new mongoose.Schema({
    groupmembers: {
        type: ObjectId,
        ref: 'GroupMember'
    },
    participant: {
        type: ObjectId,
        ref: 'Participant'
    },
    question: {
        type: ObjectId,
        ref: 'Question'
    },
    questiontoken: {
        type: ObjectId,
        ref: 'QuestionToken'
    }
}, {timestamps: true})




module.exports = mongoose.model('Round', roundSchema)
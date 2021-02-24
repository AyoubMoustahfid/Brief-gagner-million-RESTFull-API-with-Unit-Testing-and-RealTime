const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const roundSchema = new mongoose.Schema({
    groupmembers: {
        type: ObjectId,
        ref: 'GroupMember',
        required: true,
        trim: true,
        unique: true
    },
      participant: {
        type: ObjectId,
        ref: 'Participant',
        required: true,
        trim: true,
        unique: true
    },
    question: {
        type: ObjectId,
        ref: 'Question',
        required: true,
        trim: true,
        unique: true
    },
    questiontoken: {
        type: ObjectId,
        ref: 'QuestionToken',
        required: true,
        trim: true,
        unique: true
    }
}, {timestamps: true})




module.exports = mongoose.model('Round', roundSchema)
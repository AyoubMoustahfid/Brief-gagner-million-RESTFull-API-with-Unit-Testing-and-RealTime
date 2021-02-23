const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const roundSchema = new mongoose.Schema({
    group_members: {
        type: ObjectId,
        ref: 'GroupMember',
        required: true,
        trim: true
    },
    question: {
        type: ObjectId,
        ref: 'Question',
        required: true,
        trim: true
    },
    question_token: {
        type: ObjectId,
        ref: 'QuestionToken',
        required: true,
        trim: true
    }
}, {timestamps: true})




module.exports = mongoose.model('Round', roundSchema)
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const groupMemberSchema = new mongoose.Schema({
    participant: {
          type: ObjectId,
          ref: 'Participant',
          required: true,
          trim: true
    },
    group_code: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('GroupMember', groupMemberSchema)
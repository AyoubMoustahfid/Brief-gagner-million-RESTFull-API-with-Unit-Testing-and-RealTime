const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const roundScoreStatisticSchema = new mongoose.Schema({

    round: {
        type: ObjectId,
        ref: 'Round',
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        trim: true
    }
}, {timestamps: true})


module.exports = mongoose.model('RoundScoreStatistic', roundScoreStatisticSchema)
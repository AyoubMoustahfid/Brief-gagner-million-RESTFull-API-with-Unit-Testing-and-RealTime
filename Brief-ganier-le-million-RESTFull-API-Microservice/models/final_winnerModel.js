const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');


const finalWinnerSchema = new mongoose.Schema({

    round: {
        type: Array,
        required: true,
        trim: true
    },
    finalScore: {
        type: Number,
        required: true,
        trim: true
    },
    participant: {
        type: Number,
        required: true,
        trim: true
    },
    gift: {
        type: ObjectId,
        ref: 'Gift',
        required: true,
        trim : true
    }
}, {timestamps: true})

module.exports = mongoose.model('FinalWinner', finalWinnerSchema)
const mongoose = require('mongoose')


const giftSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Gift', giftSchema)
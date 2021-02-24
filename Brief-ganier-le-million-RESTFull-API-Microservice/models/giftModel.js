const mongoose = require('mongoose')


const giftSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim : true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
}, {timestamps: true})


module.exports = mongoose.model('Gift', giftSchema)
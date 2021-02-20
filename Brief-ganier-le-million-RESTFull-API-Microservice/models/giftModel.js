const mongoose = require('mongoose')


const giftSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim : true
    },
    image: {
        type: String,
        required: true,
         trim : true
    }
}, {timestamps: true})


module.exports = mongoose.model('Gift', giftSchema)
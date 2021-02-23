const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const questionTokenSchema = new mongoose.Schema({

     question: {
         type: ObjectId,
         ref: 'Question',
         required: true,
         trim: true
     },
     participant_answer: {
         type: String,
         required: true,
         trim : true
     },
     participant: {
         type: ObjectId,
         ref: 'Participant',
         required: true,
         trim: true
     },
       score: {
        type: Number,
        default: 0,
        required: true,
        trim: true
    }
}, {timestamps: true})



// questionTokenSchema.methods = {
//     check: function(answer) {
//         return answer.question.false_choices == participant_answer
//     }
// }

module.exports = mongoose.model('QuestionToken', questionTokenSchema)
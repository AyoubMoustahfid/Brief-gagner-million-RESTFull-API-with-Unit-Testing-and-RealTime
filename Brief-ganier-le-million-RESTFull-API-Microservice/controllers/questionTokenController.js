const QuestionToken = require('../models/question_tokenModel')


exports.createQuestionToken = (req, res) => {

    const questionToken = new QuestionToken(req.body)

    questionToken.save((err, questionToken) => {
      if(err){
          return res.status(400).json({
              error: "bad Request !"
          })
      }
      
   

      res.json({
          questionToken
      })
    })


}



exports.allQuestionToken = (req, res) => {

    QuestionToken.find()
    .populate('question')
    .populate('participant')
    .exec((err, questiontokens) => {
        if(err){
            return res.status(404).json({
                error: 'Question Token is not found!!'
            })
        }

        res.json({
            questiontokens
        })
    })
}


exports.questionTokenId = (req, res, next, id) => {

    QuestionToken.findById(id).exec((err, questionToken) => {

        if(err || !questionToken) {
            return res.status(404).json({
                error: "Question not found !"
            })
        }

        req.questionToken = questionToken;
        next()
    })

} 
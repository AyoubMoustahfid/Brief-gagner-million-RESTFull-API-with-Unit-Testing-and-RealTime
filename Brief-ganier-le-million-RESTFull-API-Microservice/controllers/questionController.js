const Question = require('../models/questionModel')


exports.createQuestion = (req, res) => {

    const question = new Question(req.body)

    question.save((err, question) => {
      if(err){
          return res.status(400).json({
              error: "bad Request !"
          })
      }

      res.json({
          question
      })
    })
}



exports.allQuestion = (req, res) => {

    Question.find().exec((err, questions) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            questions
        })
    })
}

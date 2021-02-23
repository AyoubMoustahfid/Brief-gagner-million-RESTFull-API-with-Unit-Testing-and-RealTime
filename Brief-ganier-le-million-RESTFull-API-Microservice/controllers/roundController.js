const Round = require('../models/roundModel.js')
const Question = require('../models/questionModel.js')
const QuestionToken = require('../models/question_tokenModel')


// function return answer and points
async function checkQuestion1(id){
    try{
          const checkId = await Question.findOne({_id: id}, (err, y) => {
               return y.answer;
          })
      }catch(err){
          console.log(err);
      }
}

async function checkQuestion2(id){
    try{
          const checkId = await Question.findOne({_id: id}, (err, y) => {
               return console.log(y.points);
          })
      }catch(err){
          console.log(err);
      }
}

// function return participant_answer and score
async function checkQuestionToken1(id){
    try{
          const checkId = await QuestionToken.findById({_id: id}, (err, t) => {
              return t.participant_answer;
          }) 
      }catch(err){
          console.log(err);
      }
}

async function checkQuestionToken2(id){
    try{
          const checkId = await QuestionToken.findById({_id: id}, (err, t) => {
              return console.log(t.score);
          }) 
      }catch(err){
          console.log(err);
      }
}



exports.createRound = async (req, res) => {

    const round = new Round(req.body);
    round.save((err, round) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

    
       const check = checkQuestion1(round.question) == checkQuestionToken1(round.question_token)
    //    if(!check == false){
    //            return checkQuestion2(round.question) + checkQuestionToken2(round.question_token)
    //    }
       
       console.log(checkQuestion1(round.question) != checkQuestionToken1(round.question_token));
       console.log( 10 + checkQuestionToken2(round.question_token));
        res.json({
            message: 'tu gagner 10 points',
            round: round
        })
    })

}
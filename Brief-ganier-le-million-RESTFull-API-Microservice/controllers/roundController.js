const Round = require('../models/roundModel')
const Question = require('../models/questionModel')
const QuestionToken = require('../models/question_tokenModel')
const GroupMember = require('../models/group_membersModel')



// function return answer and points
async function checkQuestion1(id){
    try{
          const checkId = await Question.findOne(id)

          return checkId.answer
      }catch(err){
          console.log(err);
      }
}

async function checkQuestion2(id){
    try{
          const checkId = await Question.findOne(id)

          return checkId.points

      }catch(err){
          console.log(err);
      }
}

// function return participant_answer and score
async function checkQuestionToken1(id){
    try{
          const checkId = await QuestionToken.findById(id)

          return checkId.participant_answer
      }catch(err){
          console.log(err);
      }
}

// async function checkQuestionToken2(id){
//     try{
//           const checkId = await QuestionToken.findById(id)
//           console.log(checkId);
//           return checkId;
        
//       }catch(err){
//           console.log(err);
//       }
// }

async function checkScore(id){
    try{
          const checkId = await QuestionToken.findByIdAndUpdate(id, {score: 10})
          console.log(checkId);
          return checkId.score;
        
      }catch(err){
          console.log(err);
      }
}


// function for check is four participant in group member
async function checkGroupMember(id){
    try{
          const group = await GroupMember.findOne(id)
           return group
      }catch(err){
          console.log(err);
      }
}




exports.createRound = async (req, res) => {

    const round = new Round(req.body);
    round.save(async (err, round) => {
         
        if(err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

      var reponce = await checkQuestion1(round.question)
      var sendReponce = await checkQuestionToken1(round.question_token)
      const check = reponce == sendReponce
       
       if(check){
            const scoreReponce = await checkScore(round.question_token)
            console.log(`valeur: ${scoreReponce}`);
            return scoreReponce 
       }

       
       const groupMember = await checkGroupMember(round.group_members)
       if(groupMember.participant.length < 4){
           return res.status(404).json({
               error: "Please, Vérifier votre groupe est ce que il y'a 4 participant ou non"
           })
       }
    

        res.json({
            round: round
        })
    })

}
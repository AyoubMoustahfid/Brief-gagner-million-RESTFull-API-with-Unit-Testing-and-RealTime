// const Round = require('../models/roundModel')
// const Question = require('../models/questionModel')
// const GroupMember = require('../models/group_membersModel')

// async function checkQuestion(id){
//     try{
//         const checkId = await Question.findOne(id)

//         return checkId.answer
//     }catch(err){
//         console.log(err);
//     }
// }

// async function checkGroupMember(id){
//     try{
//         const checkId = await GroupMember.findOne(id)

//         return checkId
//     }catch(err){
//         console.log(err);
//     }
// }



// exports.createRound = async (req, res) => {

//     const round = new Round(req.body);
//     const minTemp = Math.min(round.createdAt)
    
//     const resultQuestion = await checkQuestion(round.question)
//     console.log(resultQuestion);
//     if(minTemp){
//         if(resultQuestion == round.participant_answer){
//             round.score += 10
//         }
//     }



//     round.save(async (err, round) => {
         
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         const resultGroupMember = await checkGroupMember(round.groupmembers)
//         console.log(resultGroupMember);
//         if(resultGroupMember.participant.length < 3){
//             return res.status(400).json({
//                 error: "Please, Vérifier votre groupe est ce que il y'a 4 participant ou non"
//             })
//         }

       
//         res.json({
//             round: round
//         })
//     })

// }


const Round = require('../models/roundModel')
const Question = require('../models/questionModel')
const GroupMember = require('../models/group_membersModel')



async function checkQuestion(id) {
  try {

    const checkId = await Question.findOne(id)

    return checkId
  }catch(err){
      console.log(err);
  }
}

async function checkGroupMember(id) {
    try {

      const checkId = await GroupMember.findOne(id)

      return checkId
    }catch(err){
        console.log(err);
    }
  }

exports.createRound =  async (req, res) => {
    const round = new Round(req.body)

    const minTemp = Math.min(round.createdAt)
    const resultQuestion = await checkQuestion(round.question)
    console.log(resultQuestion);


    if(resultQuestion.answer == round.participant_answer && minTemp){
        round.score = 10
    } 


    round.save(async(err, round) => {
        if(err){
            return res.status(404).json({
                error: "bad request !"
            })
        }

          const resultGroupMember = await checkGroupMember(round.groupMember)

        if(resultGroupMember.participant.length < 3){
            return res.status(404).json({
                error: "Check your Group Member !"
            })
        }




        res.json({
            round
        })

    })
}
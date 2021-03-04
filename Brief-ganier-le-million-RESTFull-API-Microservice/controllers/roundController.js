const Round = require('../models/roundModel')
const Question = require('../models/questionModel')
const GroupMember = require('../models/group_membersModel')

async function checkQuestion(id){
    try{
        const checkId = await Question.findOne(id)

        return checkId.answer
    }catch(err){
        console.log(err);
    }
}

async function checkGroupMember(id){
    try{
        const checkId = await GroupMember.findOne(id)

        return checkId.participant
    }catch(err){
        console.log(err);
    }
}



exports.createRound = async (req, res) => {

    const round = new Round(req.body);
    round.save(async (err, round) => {
         
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        const resultGroupMember = await checkGroupMember(round.groupmembers)
        if(resultGroupMember.length < 3){
            return res.status(400).json({
                error: "Please, Vérifier votre groupe est ce que il y'a 4 participant ou non"
            })
        }
    
        const resultQuestion = await checkQuestion(round.question)
        if(resultQuestion == round.participant_answer){
            round.score += 10
        }
        
    

        res.json({
            round: round
        })
    })

}
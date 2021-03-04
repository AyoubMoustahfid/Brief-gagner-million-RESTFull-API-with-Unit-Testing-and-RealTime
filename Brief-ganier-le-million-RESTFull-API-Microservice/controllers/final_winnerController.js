const FinalWinner = require('./../models/final_winnerModel')
const Gift = require('./../models/gift')
const Round = require('./../models/round')


async function getGiftWinner(){
    const gift = await Gift.find()
    let random_gift =  gift[Math.floor(Math.random() * gift.length)]
    return random_gift._id
}


async function getSumScore(id){
    const round = await Round.find({group_member: id})

    return round
}

async function winner(id, finalScore){
    const round = await Round.findOne({group_member: id, score: finalScore})

    return round.participant
}


 exports.createFinalWinner = (req, res) => {

    let group_member = req.body.group_member;
    let round = await getSumScore(group_member);

    let finalScore = await Math.max.apply(Math, round.map((round => {
        return round.score
    })))

    let participantWinner = await winner(group_member, finalScore);

    let gift = await getGiftWinner();


    const finalWinner = new FinalWinner({
        group_member: group_member,
        finalScore: finalScore,
        participant: participantWinner,
        gift: gift
    })
    finalWinner.save((err, result) => {
        if(err) {
            return res.status(404).json({
                error: "Error in creation final Winner"
            })
        }

        res.json({
            result
        })
    })

}
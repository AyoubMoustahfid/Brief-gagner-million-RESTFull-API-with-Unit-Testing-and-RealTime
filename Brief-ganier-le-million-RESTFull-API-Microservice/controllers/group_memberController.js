const GroupMember = require('../models/group_membersModel')


exports.createGroupMember =  (req, res) => {

    const groupMember = new GroupMember(req.body)

    groupMember.save((err, groupMember) =>  {
        
      if(err || groupMember.participant.length <= 3){
           res.status(400).json({
              error: "Group is exists, Change Your group_code, bad Request !"
          })
      }

       res.json({
        groupMember
    })
      
     
    })


}



exports.allGroupMember = (req, res) => {

    GroupMember.find()
    .populate('participant')
    .exec((err, groupmembers) => {
        if(err){
            return res.status(404).json({
                error: 'Group is not found!!'
            })
        }

        res.json({
            groupmembers
        })
    })
}


exports.updateGroupMember= (req, res) => {

    let groupMember = req.groupMember;

    groupMember.participant = req.body.participant;
    

    groupMember.save((err, groupMember) => {

        if(err || groupMember.participant.length <= 3) {
            return res.status(400).json({
                error: "Group Created, but if you add 4 member in group for start game"
            })
        }
    
        res.json({
            groupMember,
            message: 'Group Member updated '
        })

    })

}

exports.groupMemberId = (req, res, next, id) => {

    GroupMember.findById(id).exec((err, groupMember) => {

        if(err || !groupMember) {
            return res.status(404).json({
                error: "Group Member not found !"
            })
        }

        req.groupMember = groupMember;
        next()
    })

}


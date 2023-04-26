const Badge = require('../../models/badge')
const user = require('../../models/user')

const addBadge = async(req,res)=>{
    const name = req.body.name
    const criteria = req.body.criteria
    const badge =  new Badge ({
        name:name,
        description:criteria,
    })
   await badge.save()
    res.json({
        success:true
    })
}
const badgeList = async (req,res)=>{
    const badgelist = await Badge.find().populate('Achievers')
    res.json({
        badgelist
    })
}
const editBadge = async (req,res)=>{
    console.log(req.body);
 const Id = req.body.id
 const name = req.body.name
 const criteria = req.body.criteria
 await Badge.findOneAndUpdate({_id:Id},{$set:{name:name,description:criteria}})
 res.json({
    success:true
 })
}

module.exports = {
    addBadge,
    badgeList,
    editBadge
}
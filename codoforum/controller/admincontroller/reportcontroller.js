const QNS = require('../../models/questions')
const Report = require('../../models/report')
const ANS = require('../../models/answer')
const Comments = require('../../models/comment')

const reportedQns = async(req,res)=>{
    const questions = await QNS.find({reportcount:{$gt:0},state:'active'})
    res.json({
        questions
    })
}

const singleReport = async(req,res)=>{
    const Id = req.query.Id
    const question = await QNS.findOne({_id:Id}).populate('user')
    const answers= await ANS.find({question:Id})
    const reports = await Report.find({question:Id})
    const comments = await Comments.find({question:Id})

    res.json({
        question,
        answers,
        reports,
        comments
    })
}
const blockQuestion = async (req,res)=>{
    console.log("Hello");
    const Id=req.query.id
    console.log(Id);
    await QNS.findOneAndUpdate({_id:Id},{$set:{state:'reported'}})
    res.json({
        success:true
    })
}
module.exports = {
    reportedQns,
    singleReport,
    blockQuestion
}
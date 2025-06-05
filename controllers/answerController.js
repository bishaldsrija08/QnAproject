const {sequelize, Answers } = require("../model")


exports.handleAnswer = async(req,res)=>{
    const userId = req.userId 
    const {answer} = req.body 
    const {id:questionId} = req.params 
   const data =  await Answers.create({
        ansText : answer, 
        userId, 
        questionId,
    })    
    res.redirect(`/question/${questionId}`)
}
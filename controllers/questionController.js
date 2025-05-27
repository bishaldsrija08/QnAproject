const { Questions, Users } = require("../model")

exports.renderAskQuestionPage = async (req, res) => {
    res.render("questions/askQuestion")
}

exports.askQuestion = async (req, res) => {
    const { quesTitle, quesDescription } = req.body
    const uId = req.userId
    const fileName = req.file.filename

    if (!quesTitle || !quesDescription) {
        return res.send("Please provide Titlel and Description!")
    }
    await Questions.create({
        quesTitle,
        quesDescription,
        quesImage: fileName,
        uId
    })
    res.redirect("/")
}


exports.getAllQuestion = async (req, res) => {
    const data = await Questions.findAll({
        include: [
            {
                where: Users
            }
        ]
    })
}
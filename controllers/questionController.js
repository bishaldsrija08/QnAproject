const { Questions, Users } = require("../model")

exports.renderAskQuestionPage = async (req, res) => {
    res.render("questions/askQuestion")
}

exports.askQuestion = async (req, res) => {
    try {
        const { quesTitle, quesDescription } = req.body;
        const {userId} = req;
        const fileName = req.file?.filename; // Optional chaining to avoid error if file not uploaded

        if (!quesTitle || !quesDescription) {
            return res.send("Please provide Title and Description!");
        }

        await Questions.create({
            quesTitle,
            quesDescription,
            quesImage: fileName || null, // Save null if no file
            userId
        });

        res.redirect("/");
    } catch (err) {
        console.error("Error in askQuestion:", err);
        res.status(500).send("Something went wrong!");
    }
};


exports.getAllQuestion = async (req, res) => {
    const data = await Questions.findAll({
        include: [
            {
                where: Users
            }
        ]
    })
}
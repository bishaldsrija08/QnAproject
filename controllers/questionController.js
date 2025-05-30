const { Questions, Users } = require("../model")

exports.renderAskQuestionPage = async (req, res) => {
    res.render("questions/askQuestion")
}

exports.askQuestion = async (req, res) => {
    try {
        const { quesTitle, quesDescription } = req.body;
        const { userId } = req; //isAuthenticated bata forward vako id
        const fileName = req.file?.filename; // Optional chaining to avoid error if file not uploaded

        if (!quesTitle || !quesDescription) {
            return res.send("Please provide Title and Description!");
        }

        await Questions.create({
            quesTitle,
            quesDescription,
            quesImage: fileName || null, // Save null if no file
            userId //isAuthenticated middleware bata ako idlai questionko data base ma as a foreighn key rakhekko
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

exports.renderSingleQuestionPage = async (req, res) => {
    const { id } = req.params
    const question = await Questions.findAll(
        {
            where: { id: id },
            include: [{
                model: Users,
                attribute: ["userName"]
            }]
        }
    )
    res.render("questions/singleQuestion.ejs", { data: question })
}
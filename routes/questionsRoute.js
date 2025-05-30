const { askQuestion, renderAskQuestionPage, renderSingleQuestionPage } = require("../controllers/questionController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

//Multer import
const {multer, storage} = require("../middleware/multerConfig")
const upload = multer({storage:storage});

const router = require("express").Router();

router.route('/askquestion').get(isAuthenticated, renderAskQuestionPage).post(isAuthenticated, upload.single('quesImage'), askQuestion);

router.route("/question/:id").get(renderSingleQuestionPage)


module.exports = router;
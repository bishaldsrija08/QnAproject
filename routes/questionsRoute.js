const { askQuestion, renderAskQuestionPage } = require("../controllers/questionController");

//Multer import
const {multer, storage} = require("../middleware/multerConfig")
const upload = multer({storage:storage});

const router = require("express").Router();

router.route('/askquestion').get(renderAskQuestionPage).post(upload.single('quesImage'), askQuestion);


module.exports = router;
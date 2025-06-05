const { handleAnswer } = require("../controllers/answerController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const catchError = require("../utils/catchError.js")

const router = require("express").Router()

router.route("/:id").post(isAuthenticated,catchError( handleAnswer))


module.exports = router 
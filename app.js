const express = require("express")
const app = express()
require("./model/index.js")
require("./config/dbConfig.js")
const cookieParser = require("cookie-parser")
const authroutes = require("./routes/authRoutes")
const questionRoutes = require("./routes/questionsRoute")

//formbata ako data buj vaneko
app.use(express.urlencoded({ extended: true })) // adi frontend pani backend batai render vako xa vane yo use garne
app.use(express.json()) // client server ma yo use garne
app.use(cookieParser())

//Set view engine - nodelai vaneko ejs buj
app.set('view engine', 'ejs')

//auth route goes here
app.use("/", authroutes)
app.use("/", questionRoutes)

//nodelai vaneko ki public vitra ko css folder lai access gar vanarw natra nodele file access gardena atikai
app.use(express.static('public/css/'))

app.listen(3000, () => {
    console.log("Project has started at port 3000")
})
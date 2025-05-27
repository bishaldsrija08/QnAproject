const express = require("express")
const app = express()
require("./model/index.js")
require("./config/dbConfig.js")
const { userRegister, userLogin, renderHomepage, renderLoginPage, renderRegisterPage } = require("./controllers/authController.js")

//formbata ako data buj vaneko
app.use(express.urlencoded({ extended: true })) // adi frontend pani backend batai render vako xa vane yo use garne
app.use(express.json()) // client server ma yo use garne

//Set view engine 
app.set('view engine', 'ejs')

app.get("/", renderHomepage)

app.post("/register", userRegister)

app.get("/login", renderLoginPage)

app.post("/login", userLogin)

app.get("/register", renderRegisterPage)

//nodelai vaneko ki public vitra ko css folder lai access gar vanarw natra nodele file access gardena atikai
app.use(express.static('public/css/'))


app.listen(3000, () => {
    console.log("Project has started at port 3000")
})
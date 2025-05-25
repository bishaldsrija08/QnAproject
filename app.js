const express = require("express")
const { Users } = require("./model/index.js")
const app = express()
require("./model/index.js")
require("./config/dbConfig.js")
const bcrypt = require("bcrypt")

//formbata ako data buj vaneko
app.use(express.urlencoded({ extended: true })) // adi frontend pani backend batai render vako xa vane yo use garne
app.use(express.json()) // client server ma yo use garne

//Set view engine 
app.set('view engine', 'ejs')

app.post("/register", async (req, res) => {
    console.log(req.body)
    const { userName, userPassword, userEmail } = req.body
    await Users.create({
        userName,
        userEmail,
        userPassword: bcrypt.hashSync(userPassword, 10)
    })
    res.json({
        message: "Registered Successfully"
    })
})

app.get("/login", (req, res) => {
    res.render("auth/login")
})

app.get("/register", (req, res) => {
    res.render("auth/register")
})

app.use(express.static('public/css/'))


app.listen(3000, () => {
    console.log("Project has started at port 3000")
})
const express = require("express")
const { Users } = require("./model/index.js")
const app = express()
require("./model/index.js")
require("./config/dbConfig.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//formbata ako data buj vaneko
app.use(express.urlencoded({ extended: true })) // adi frontend pani backend batai render vako xa vane yo use garne
app.use(express.json()) // client server ma yo use garne

//Set view engine 
app.set('view engine', 'ejs')

app.post("/register", async (req, res) => {
    console.log(req.body)
    const { userName, userPassword, userEmail } = req.body

    if (!userEmail || !userPassword || !userName) {
        return (
            res.json({
                message: "please provide all the details."
            })
        )
    }

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

app.post("/login", async (req, res) => {
    const { userEmail, userPassword } = req.body
    if (!userEmail || !userPassword) {
        return res.json({
            message: "Please provide email and password!"
        })
    }

    //email check

    const [data] = await Users.findAll({
        where: {
            userEmail: userEmail
        }
    })

    if (data) {
        const isMatched = bcrypt.compareSync(userPassword, data.userPassword) //compareSync returns boolean

        if (isMatched) {
        const token = jwt.sign({id:data.id}, "bishal", {
                expiresIn: '30d'
            })
            res.cookie("jwtLoginToken", token)
            res.json({
                message: "Login Successfull!"
            })

        } else {
            res.json({
                message: "Invalid password!"
            })
        }
    } else {
        res.json({
            message: "Email is not registered!"
        })
    }
})

app.get("/register", (req, res) => {
    res.render("auth/register")
})

//nodelai vaneko ki public vitra ko css folder lai access gar vanarw natra nodele file access gardena atikai
app.use(express.static('public/css/'))


app.listen(3000, () => {
    console.log("Project has started at port 3000")
})
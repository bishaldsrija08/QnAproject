const { Users, Questions } = require("../model/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.renderHomepage = async (req, res) => {
    const data = await Questions.findAll({
        include: [ //joining tables
            {
                model: Users,
                attributes: ["userName"]
            }
        ]
    }) // returns array
    console.log(data)
    res.render("home.ejs", { data })
}

exports.renderLoginPage = (req, res) => {
    res.render("auth/login")
}

exports.renderRegisterPage = (req, res) => {
    res.render("auth/register")
}

exports.userRegister = async (req, res) => {
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
}

//Login
exports.userLogin = async (req, res) => {
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
            const token = jwt.sign({ id: data.id }, "bishal", { //k data lukaunee, password, options in jwt
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
}
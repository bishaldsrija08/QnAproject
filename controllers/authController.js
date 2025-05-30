const { Users, Questions } = require("../model/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

exports.renderHomepage = async (req, res) => {
    const data = await Questions.findAll({
        include: [ //joining tables
            {
                model: Users,
                attributes: ["userName"]
            }
        ]
    }) // returns array
    res.render("home.ejs", { data })
}

exports.renderLoginPage = (req, res) => {
    res.render("auth/login")
}

exports.renderRegisterPage = (req, res) => {
    res.render("auth/register")
}

exports.userRegister = async (req, res) => {
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
    res.redirect('/login')
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
            res.redirect('/')

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


exports.renderForgotPasswordPage = (req, res) => {
    res.render("auth/forgotPw")
}

exports.handleForgotPassword = async (req, res) => {
    const { userEmail } = req.body
    const data = await Users.findAll({
        where: {
            userEmail
        }
    })
    if (data.length === 0) return res.redirect("/register")
    const otp = Math.floor(Math.random() * 10000, 9999)

    //otp  sending code  goes  here
    await sendEmail({
        email: userEmail,
        subject: "Your OTP is here!",
        text: `Dear User,

Your one time password (OTP) is ${otp}. This code is valid for the next 10 minutes. Please do not share it with anyone.

Best regards,
Bishal Rijal
`
    })

    //it save otp to database
    data[0].otp = otp
    await data[0].save()
    res.redirect("/otp-check")
}

exports.renderVerifyOTP = (req, res) => {
    res.render("auth/veryfyOTP")
}
// const { Users, Questions } = require("../model/index")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const sendEmail = require("../utils/sendEmail")

// exports.renderHomepage = async (req, res) => {
//     const [success] = req.flash('success')
//     const data = await Questions.findAll({
//         include: [ //joining tables
//             {
//                 model: Users,
//                 attributes: ["userName"]
//             }
//         ]
//     }) // returns array
//     res.render("home.ejs", { data, success })
// }

// exports.renderLoginPage = (req, res) => {
//     const [error] = req.flash('error')
//     const [success] = req.flash('success')
//     res.render("auth/login", { error, success })
// }

// exports.renderRegisterPage = (req, res) => {
//     const [error] = req.flash('error')
//     res.render("auth/register", { error })
// }

// exports.userRegister = async (req, res) => {
//     const { userName, userPassword, userEmail } = req.body

//     if (!userEmail || !userPassword || !userName) {

//         req.flash('error', "please provide all the details.")
//         res.redirect('/register')
//     }

//     await Users.create({
//         userName,
//         userEmail,
//         userPassword: bcrypt.hashSync(userPassword, 10)
//     })
//     req.flash('success', "Registered successfull!")
//     res.redirect('/login')
// }

// //Login
// exports.userLogin = async (req, res) => {
//     const { userEmail, userPassword } = req.body
//     if (!userEmail || !userPassword) {
//         req.flash('error', "Please provide email and password!")
//         res.redirect('/login')
//     }

//     //email check
//     const [data] = await Users.findAll({
//         where: {
//             userEmail: userEmail
//         }
//     })

//     if (data) {
//         const isMatched = bcrypt.compareSync(userPassword, data.userPassword) //compareSync returns boolean

//         if (isMatched) {
//             const token = jwt.sign({ id: data.id }, "bishal", { //k data lukaunee, password, options in jwt
//                 expiresIn: '30d'
//             })
//             res.cookie("jwtLoginToken", token)
//             req.flash('success', "Login Successfully!")
//             res.redirect('/')

//         } else {
//             req.flash('error', "Invalid Passord")
//             res.redirect('/login')
//         }

//     } else {

//         req.flash('error', "Email is not registered!")
//         res.redirect('/login')
//     }
// }


// exports.renderForgotPasswordPage = (req, res) => {
//     res.render("auth/forgotPw")
// }

// exports.handleForgotPassword = async (req, res) => {
//     const { userEmail } = req.body
//     const data = await Users.findAll({
//         where: {
//             userEmail
//         }
//     })
//     if (data.length === 0) return res.redirect("/register")
//     const otp = Math.floor(Math.random() * 10000, 9999)

//     //otp  sending code  goes  here
//     await sendEmail({
//         email: userEmail,
//         subject: "Your OTP is here!",
//         text: `Dear User,

// Your one time password (OTP) is ${otp}. This code is valid for the next 10 minutes. Please do not share it with anyone.

// Best regards,
// Bishal Rijal
// `
//     })

//     //it save otp to database
//     data[0].otp = otp
//     data[0].otpGeneratedTime = Date.now()
//     await data[0].save()
//     res.redirect("/otp-check?userEmail=" + userEmail)
// }

// exports.renderVerifyOTP = (req, res) => {
//     const userEmail = req.query.userEmail
//     const [error] = req.flash('error')
//     res.render("auth/veryfyOTP", { userEmail, error })
// }

// exports.veryfyOtp = async (req, res) => {
//     const { otp } = req.body
//     const userEmail = req.params.id
//     const data = await Users.findAll({
//         where: {
//             otp: otp,
//             userEmail: userEmail
//         }
//     })
//     if (data.length === 0) {
//         req.flash('error', "Invalid OTP")
//         res.redirect('/otp-check?userEmail=' + userEmail)
//     }
//     const currentTime = Date.now()
//     const otpGeneratedTime = data[0].otpGeneratedTime
//     if (currentTime - otpGeneratedTime <= 120000) {
//         res.redirect(`/reset-password?userEmail=${userEmail}&otp=${otp}`)
//     } else {
//         req.flash('error', "OTP Expired!")
//         res.redirect('/otp-check')
//     }
// }

// exports.renderResetPassword = async (req, res) => {
//     const { userEmail, otp } = req.query
//     if (!userEmail || !otp) {
//         return res.send("Please provide all the details!")
//     }
//     const [error] = req.flash('error')
//     res.render("./auth/resetPassword", { userEmail, otp, error })
// }

// exports.handleResetPassword = async (req, res) => {
//     const { userEmail, otp } = req.params
//     const { newPassword, confirmPassword } = req.body
//     if (!userEmail || !otp || !newPassword || !confirmPassword) {
//         res.send("Please provide all the credentials!")
//     }

//     if (newPassword !== confirmPassword) {
//         req.flash('error', "new and confirm password must match!")
//         res.redirect(`/reset-password?userEmail=${userEmail}&otp=${otp}`)
//     }
//     const data = await Users.findAll({
//         where: {
//             userEmail,
//             otp
//         }
//     })
//     const currentTime = Date.now()
//     const otpGeneratedTime = data[0].otpGeneratedTime
//     if (currentTime - otpGeneratedTime <= 120000) {
//         await Users.update({
//             userPassword: bcrypt.hashSync(newPassword, 10)
//         }, {
//             where: {
//                 userEmail: userEmail
//             }
//         })
//         res.redirect('/login')
//     } else {
//         req.flash('error', "OTP Expired!")
//         res.redirect(`/reset-password?userEmail=${userEmail}&otp=${otp}`)
//     }
// }

// exports.logout= (req,res)=>{
//     res.clearCookie("jwtLoginToken")
//     req.flash('success', "Logged Out Successfully")
//     res.redirect('/login')
// }

//After error handling from GPT

const { Users, Questions } = require("../model/index")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

exports.renderHomepage = async (req, res) => {
    try {
        const [success] = req.flash('success')
        const data = await Questions.findAll({
            include: [
                {
                    model: Users,
                    attributes: ["userName"]
                }
            ]
        })
        res.render("home.ejs", { data, success })
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.renderLoginPage = (req, res) => {
    const [error] = req.flash('error')
    const [success] = req.flash('success')
    res.render("auth/login", { error, success })
}

exports.renderRegisterPage = (req, res) => {
    const [error] = req.flash('error')
    res.render("auth/register", { error })
}

exports.userRegister = async (req, res) => {
    try {
        const { userName, userPassword, userEmail } = req.body

        if (!userEmail || !userPassword || !userName) {
            req.flash('error', "please provide all the details.")
            return res.redirect('/register')
        }

        await Users.create({
            userName,
            userEmail,
            userPassword: bcrypt.hashSync(userPassword, 10)
        })

        req.flash('success', "Registered successfull!")
        res.redirect('/login')
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body
        if (!userEmail || !userPassword) {
            req.flash('error', "Please provide email and password!")
            return res.redirect('/login')
        }

        const [data] = await Users.findAll({
            where: {
                userEmail: userEmail
            }
        })

        if (data) {
            const isMatched = bcrypt.compareSync(userPassword, data.userPassword)

            if (isMatched) {
                const token = jwt.sign({ id: data.id }, "bishal", {
                    expiresIn: '30d'
                })
                res.cookie("jwtLoginToken", token)
                req.flash('success', "Login Successfully!")
                res.redirect('/')
            } else {
                req.flash('error', "Invalid Passord")
                res.redirect('/login')
            }
        } else {
            req.flash('error', "Email is not registered!")
            res.redirect('/login')
        }
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.renderForgotPasswordPage = (req, res) => {
    res.render("auth/forgotPw")
}

exports.handleForgotPassword = async (req, res) => {
    try {
        const { userEmail } = req.body
        const data = await Users.findAll({
            where: {
                userEmail
            }
        })
        if (data.length === 0) return res.redirect("/register")

        const otp = Math.floor(Math.random() * 10000, 9999)

        await sendEmail({
            email: userEmail,
            subject: "Your OTP is here!",
            text: `Dear User,

Your one time password (OTP) is ${otp}. This code is valid for the next 10 minutes. Please do not share it with anyone.

Best regards,
Bishal Rijal
`
        })

        data[0].otp = otp
        data[0].otpGeneratedTime = Date.now()
        await data[0].save()
        res.redirect("/otp-check?userEmail=" + userEmail)
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.renderVerifyOTP = (req, res) => {
    const userEmail = req.query.userEmail
    const [error] = req.flash('error')
    res.render("auth/veryfyOTP", { userEmail, error })
}

exports.veryfyOtp = async (req, res) => {
    try {
        const { otp } = req.body
        const userEmail = req.params.id
        const data = await Users.findAll({
            where: {
                otp: otp,
                userEmail: userEmail
            }
        })

        if (data.length === 0) {
            req.flash('error', "Invalid OTP")
            return res.redirect('/otp-check?userEmail=' + userEmail)
        }

        const currentTime = Date.now()
        const otpGeneratedTime = data[0].otpGeneratedTime

        if (currentTime - otpGeneratedTime <= 120000) {
            res.redirect(`/reset-password?userEmail=${userEmail}&otp=${otp}`)
        } else {
            req.flash('error', "OTP Expired!")
            res.redirect('/otp-check')
        }
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.renderResetPassword = async (req, res) => {
    try {
        const { userEmail, otp } = req.query
        if (!userEmail || !otp) {
            return res.send("Please provide all the details!")
        }
        const [error] = req.flash('error')
        res.render("./auth/resetPassword", { userEmail, otp, error })
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.handleResetPassword = async (req, res) => {
    try {
        const { userEmail, otp } = req.params
        const { newPassword, confirmPassword } = req.body

        if (!userEmail || !otp || !newPassword || !confirmPassword) {
            return res.send("Please provide all the credentials!")
        }

        if (newPassword !== confirmPassword) {
            req.flash('error', "new and confirm password must match!")
            return res.redirect(`/reset-password?userEmail=${userEmail}&otp=${otp}`)
        }

        const data = await Users.findAll({
            where: {
                userEmail,
                otp
            }
        })

        const currentTime = Date.now()
        const otpGeneratedTime = data[0].otpGeneratedTime

        if (currentTime - otpGeneratedTime <= 120000) {
            await Users.update({
                userPassword: bcrypt.hashSync(newPassword, 10)
            }, {
                where: {
                    userEmail: userEmail
                }
            })
            res.redirect('/login')
        } else {
            req.flash('error', "OTP Expired!")
            res.redirect(`/reset-password?userEmail=${userEmail}&otp=${otp}`)
        }
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

exports.logout = (req, res) => {
    res.clearCookie("jwtLoginToken")
    req.flash('success', "Logged Out Successfully")
    res.redirect('/login')
}
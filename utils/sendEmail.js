//otp  sending code  goes  here
const nodemailer = require('nodemailer')
const sendEmail = async (data) => {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "d3vt3stin9@gmail.com",
            pass: "fmxffupaihiohvoz",

        }
    })
    const mailOption = {
        from: "Bishal Rijal",
        to: data.email,
        subject: data.subject,
        text: data.text
    }
    await transpoter.sendMail(mailOption)
}

module.exports = sendEmail
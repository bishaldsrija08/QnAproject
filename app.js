// Import core modules
const express = require("express")
const cookieParser = require("cookie-parser")
const { promisify } = require('util')
const jwt = require("jsonwebtoken")

// Initialize app
const app = express()

// Load configurations and database
require("./config/dbConfig.js")
require("./model/index.js")

// Set up middlewares
app.use(express.urlencoded({ extended: true })) // Parse form data (for server-side rendered forms)
app.use(express.json()) // Parse JSON data (for APIs)
app.use(cookieParser()) // Parse cookies

// Set view engine
app.set('view engine', 'ejs')

// Serve static files (e.g., CSS)
app.use(express.static('public/css/'))

// Authentication middleware to check JWT in cookies - yo jati bela ni trigger hunxa
app.use(async (req, res, next) => { 
    const token = req.cookies.jwtLoginToken
    try {
        const decryptedData = await promisify(jwt.verify)(token, "bishal")
        if (decryptedData) {
            res.locals.isAuthenticated = true
        } else {
            res.locals.isAuthenticated = false
        }
    } catch (error) {
        res.locals.isAuthenticated = false
    }
    next()
})

// Route handlers
const authroutes = require("./routes/authRoutes")
const questionRoutes = require("./routes/questionsRoute")
app.use("/", authroutes)
app.use("/", questionRoutes)

// Start server
app.listen(3000, () => {
    console.log("Project has started at port 3000")
})
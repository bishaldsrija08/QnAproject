const express = require("express")
const app = express()

//Set view engine 
app.set('view engine', 'ejs')

app.get("/", (req, res)=>{
res.render('home') //second argument in object
})

app.get("/register", (req,res)=>{
    res.render("auth/register.ejs")
})

app.get("/login", (req,res)=>{
    res.render("auth/login")
})

app.use(express.static('public/css/'))

app.listen(3000, ()=>{
    console.log("Project has started at port 3000")
})
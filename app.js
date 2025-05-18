const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.send("<h1>This is Homepage.</h1>")
})

app.listen(3000, ()=>{
    console.log("Project has started at port 3000")
})
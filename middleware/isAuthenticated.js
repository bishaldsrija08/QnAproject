const jwt = require("jsonwebtoken")
const {promisify} = require('util')
const { Users } = require("../model")
exports.isAuthenticated= async(req, res, next)=>{
    const token = req.cookies.jwtLoginToken
    if(!token || token===null || token===undefined){
        return res.redirect('/login')
    }
    //if token ayo vane
const decryptedData =await promisify(jwt.verify)(token, "bishal")

//encrypted vayerw ako id xa ki nai check gareko
const data = await Users.findByPk(decryptedData.id)
if(!data){
    return res.send("Invalid Token")
}

req.userId= decryptedData.id

next();
}
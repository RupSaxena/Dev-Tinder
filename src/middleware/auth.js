const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userauth=async(req,res,next)=>{
    try{
const cookies=req.cookies;
const {token} =cookies;
console.log(token);
if(!token){
    res.status(400).send("invalid token")
}

const msg=await jwt.verify(token,"DEVtinder12")
const user=await User.findById(msg._id);
if(!user){
    res.status(400).send("user not found")
}
    req.user=user;
    next()
}
catch(err){
    res.status(400).send(err.message)
}
}
module.exports={userauth};
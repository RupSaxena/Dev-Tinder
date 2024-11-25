
const express=require('express');
const bcrypt=require("bcrypt")
const User=require("../Models/user")
const {validation} = require("../Utils/validation");
const authRouter=express.Router();
const jwt=require("jsonwebtoken");
authRouter.post("/signup",async(req,res)=>{
    // console.log(req.body);
   try{
  validation(req);
  const{firstName,lastName,email,password}=req.body;
  console.log(email);
    const encryptpass=await bcrypt.hash(password,10)
    console.log(encryptpass);
    const user=new User({firstName,lastName,email,password:encryptpass});
// hardcore data ------------------const user=new User({
//     firstName:"Ankit",
//     lastName:"Sharma",
//     password:"123",
//     gender:"fan",
//     email:"a@gmail.com"
// });
const saveduser=await user.save();
const token=await saveduser.getJWT();
res.cookie("token",token,{
    expires:new Date(Date.now()+8*3600000)
})
res.send("successful"+saveduser)}
catch(err){
    res.status(401).send("error"+err.message,)
}
})
authRouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).send("Email doesn't exist");
        }
        const ispass=await bcrypt.compare(password,user.password);
        if(ispass){
            const token=await user.getJWT();
            
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})
        res.send("login successfull"+user)
    }
    else{
        res.status(400).send("wrong password");
    }
    }
    catch(err){
        res.status(400).send(err.message)
    }
})
authRouter.post('/logout',async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("logout successful");
})
module.exports=authRouter;
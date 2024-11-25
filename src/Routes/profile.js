const express=require('express');
const {userauth}=require("../middleware/auth")
const {validateeditdata}=require("../Utils/validation")
const profilerouter=express.Router();
profilerouter.get("/profile",userauth ,async(req,res)=>{

    try{
       const user=req.user;
   // const cookies=req.cookies;
   // if(!cookies.token){
   //     res.status(401).send("invalid")
   // }
   // const decodemsg=await jwt.verify(cookies.token,"DEVtinder12")
   // console.log(decodemsg._id);
   // const username=await User.findById(decodemsg._id)
   // if(!username){
   //     res.status(400).send("user doesnot exist")
   // }else{
   res.send(user)
}
   //}
    catch(err){
        res.status(400).send(err.message)
    }
})
profilerouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
        console.log("before")
if(!validateeditdata(req)){
    res.status(400).send("something went wrong in data part")
}
console.log("after")
const loggeduser=req.user;
console.log(loggeduser);
Object.keys(req.body).forEach((key)=>(loggeduser[key]=req.body[key]));
await loggeduser.save();
res.send('successfull')
    }
    catch(err){
        res.send("something went wrong in try section"+err)
    }
})
module.exports=profilerouter;
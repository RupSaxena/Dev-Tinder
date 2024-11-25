const express=require('express');
const { userauth } = require('../middleware/auth');
const requestrouter=express.Router();
const ConnectionRequest=require("../Models/connectionRequest");
const User = require('../Models/user');
requestrouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
    try{ 
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        console.log(status);
        const allowedstatus=["ignored","interested"]
        if(!allowedstatus.includes(status))
            {
                return res.status(400).send("invalid") 
            }
        if(fromUserId.equals(toUserId)){
    
            return res.status(400).send("you can't sent to yourself") 
         }
         const exist=await ConnectionRequest.findOne({$or:[{fromUserId,toUserId},{fromUserId:fromUserId,toUserId:toUserId}]})
         if(exist){
           return res.status(400).send("you can't sent request twice or you already sent")
         }
         const touser=await User.findById(toUserId);
         if(!touser){
           return res.status(400).send("user doesn't exist")
        
         }
const connectionRequest=new ConnectionRequest({fromUserId,toUserId,status})
const data=await connectionRequest.save();

res.json({message:"connect request successfully",data})
    }
    catch(err){
        res.status(400).send(err)
    }
    // res.send(req.user.firstName+"is");
})
requestrouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
    try{
const loggeduser=req.user;
const{status,requestId}=req.params;
const allow=["accepted","rejected"];
if(!allow.includes(status)){
    res.status(400).send("wrong status")
}
const connectionRequest=await ConnectionRequest.findOne({_id:requestId,status:"interested",toUserId:loggeduser._id});
console.log(connectionRequest);
if(!connectionRequest){
    res.status(400).send("no request")

}
connectionRequest.status=status;
const data=await connectionRequest.save();
res.send(data)

    }
    catch(e){
        res.status(400).send("error"+e)
    }
})
module.exports=requestrouter;
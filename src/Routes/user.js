const express=require("express");
const { userauth } = require("../middleware/auth");
const connectionRequestModel = require("../Models/connectionRequest");
const User = require("../Models/user");
const Userrouter=express.Router();
Userrouter.get("/user/requests/received",userauth,async(req,res)=>{
    try{
const loggeduser=req.user;
const connectionrequests=await connectionRequestModel.find({toUserId:loggeduser,status:"interested"}).populate("fromUserId","firstName lastName");
res.send(connectionrequests)
    }
    catch{
        res.status(400).send("something went down")
    }
})
Userrouter.get("/user/connections",userauth,async(req,res)=>{
    try{
        const loggeduser=req.user;
        const connectionrequests=await connectionRequestModel.find({
            $or:[{
                toUserId:loggeduser,status:"accepted"
        },{
            fromUserId:loggeduser,status:"accepted"
        }]
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName")
const data=connectionrequests.map((row)=>{
    if(row.fromUserId._id.toString()===loggeduser._id.toString()){
        return row.toUserId
    }
    return row.fromUserId;
})
res.send(data)
    }
    catch(e){
        res.status(400).send("something went wrong"+e)
    }
})
Userrouter.get("/feed",userauth,async(req,res)=>{
try{
let loogeduser=req.user;
const page=parseInt(req.query.page);
let limit=parseInt(req.query.limit);
limit=limit>50?50:limit;
const skip=(page-1)*limit;
const connectionrequests=await connectionRequestModel.find({
    $or:[{
        toUserId:loogeduser._id
    },{fromUserId:loogeduser._id}]
}).select("fromUserId toUserId")
const hideuser=new Set();
connectionrequests.forEach(req=>{hideuser.add(req.toUserId.toString());
hideuser.add(req.fromUserId.toString())})
const users=await User.find({$and:[{_id:{$nin:Array.from(hideuser)}},{_id:{$ne:loogeduser._id}}]}).select("firstName").skip(skip).limit(limit);
res.send(users)
}


catch(e){
    res.status(400).send("wronggg"+e)
}
})
module.exports={Userrouter}
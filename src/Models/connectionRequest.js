const mongoose=require("mongoose");
const User = require("./user");
const connectionRequesSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true, 
        ref:User
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User
    },
    status:{
        type:String,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:`{value} is not supported status`
        }
    },
},
    {timestamps:true}
);
connectionRequesSchema.index({fromUserId:1,toUserId:1})
const connectionRequestModel=new mongoose.model("connectRequest",connectionRequesSchema);
module.exports=connectionRequestModel;
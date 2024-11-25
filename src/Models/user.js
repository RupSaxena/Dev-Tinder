const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    photourl:{
        type:String

    },
gender:{
    type:String
}, 
email:{
    type:String,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("wrong mail")
        }
    } 
},
skills:{
    type:[String]
},
about:{
    type:String,
    default:"default data"
},age:{
    type:Number,
    validate(val){
if(val<5){
    throw new Error("below age 5 is not allowed")
}}
}
},{timestamps:true})
Userschema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt .sign({_id:user._id},"DEVtinder12",{expiresIn:"7d"});
    return token;
}

const User=mongoose.model("User",Userschema);
module.exports=User;
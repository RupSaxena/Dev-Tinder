const validator=require("validator")
const validation=(req)=>{
const{firstName,lastName,password,email}=req.body;
if(!firstName||!lastName){
    throw new Error("firstname or lastname doesn't exist")
}
else if(!validator.isEmail(email)){
    throw new Error("email is not valid")
}
}
const validateeditdata=(req)=>{
const allowedEditfields=["firstName","lastName","age","gender","skills","email","about"];
const isallowed=Object.keys(req.body).every((f)=>allowedEditfields.includes(f));
return isallowed;
}
module.exports={validation,validateeditdata};
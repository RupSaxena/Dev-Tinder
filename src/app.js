const express=require("express");
const app=express();
app.use("/",(req,res)=>{res.send("hello")})
app.use("/login",(req,res)=>{
    res.send("hello login")
})
app.listen(3000,()=>{
    console.log("listening....");
})
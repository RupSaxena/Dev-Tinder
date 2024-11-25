const mongoose=require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://rupal:rupal1997@cluster0.xrwhb.mongodb.net/devTinder");
}
module.exports=connectDB;
//  In this first api loaded then database but first database should be loaded then api so for this we export connect DB  file api file so that we coonect database in api file --------
//connectDB().then(()=>{
//     console.log("connection established");
// }).catch(()=>{
//     console.log("failed");
// })
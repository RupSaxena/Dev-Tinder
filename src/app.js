const express=require("express");
const app=express();
const cors=require("cors")
const User=require("./Models/user")
const {userauth}=require("./middleware/auth")
const connectDB=require("./Config/Database");
const authrouter=require('./Routes/auth');
const profilerouter=require("./Routes/profile");
const requestrouter=require('./Routes/request');
// const {validation} = require("./Utils/validation");
// const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const authRouter = require("./Routes/auth");
const { Userrouter } = require("./Routes/user");
app.use(express.json())//for converting json to js object
// require("./Config/Database")
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/",authRouter);
app.use("/",profilerouter);
app.use("/",requestrouter);
app.use("/",Userrouter)
app.get("/feed",async(req,res)=>{
    try{
    const emailid=req.body.email;
    const user=await User.find({email:emailid});
    if(user.length===0){
        // res.send("not exist")
        res.status(401).send("something went wrong")
    }else{
        res.send(user)
    }}
    catch{
        res.status(401).send("something went wrong")
    }
})
app.delete("/user",async(req,res)=>{
    const id=req.body.id;
    try{
    const user=await User.findByIdAndDelete({_id:id});
    res.send("successfully deleted")
    }
    catch{
        res.status(401).send("something went wrong")
    }
})
app.patch("/user/:userid",async(req,res)=>{
    // id=req.body.id;
   const  userid=req.params?.userid;
    data=req.body;
    try{
      
      
        const allowed=["firstName","lastName","skills","age","gender","about"]
        const isAllowed=Object.keys(data).every((k)=>allowed.includes(k));
        if(!isAllowed){
            throw new Error("update not allowed")
        }
        const update=await User.findByIdAndUpdate({_id:userid},data,{returnDocument:"after",runValidators:true});
        res.send("updated successfulyy")
    }
    catch{
        res.status(401).send("something went wrong")
    }
})
app.put("/user",async(req,res)=>{
    const id=req.body.id;
    data=req.body;
    const updated=await User.findByIdAndUpdate({_id:id},data);
    console.log(updated);
    res.send("updated successful")
})
connectDB().then(()=>{

    console.log("connection established");
    app.listen(3001,()=>{
        console.log("listening....");
    })
}).catch(()=>{
    console.log("failed");
})

// app.use('/',(err,req,res,next)=>{
//     if(err){
//         res.send("something went wrong")
//     }
// })
//or we use this for error handling
// app.get('/data',(req,res)=>{
//     try{
//    throw new Error("oops..")
//     res.send("hey!")}
//    catch{
//         res.send("something went wrong please")
//   }
// })
// app.use('/',(err,req,res,next)=>{
//     if(err){
//         res.send("something went wrong")
//     }
// })
// app .use() or app.all()->middleware.......use is for all http request post ,delete,etc and also we can make different folder for middleware and require it
// app.use("/admin",(req,res,next)=>{
//     token="abc"
//     let auth=token==="abcd";
//     if(!auth){
//         res.status(401).send("oopss...")
//     }
//     else{
//         next()
//     }
// })
//if we have multiple path for admin then we have to repeat authentication for all path for avoiding repeating code we can use middleware-----------------------------
//app.get("/admin/add",(req,res)=>{
    // token="abc";
    // let auth=token==="abcd";
    // if(auth){
    //res.send("authorised")
    // }else{
    //     res.status(401).send("oops")
    // }
//})
//app.get("/admin/delete",(req,res)=>{
    //same process as above
   // res.send("deleted")
//})
//--------------------------------------------------------------------------------------------//
// app.get("/user",(req,res,next)=>{

        //  it will give errors----  res.send("gettimg data")
           //next();it helps express to call next fumction
    //    },(req,res)=>{
    //     res.send("hello2")
    //    })
       // 1)we can also do by making two different apps.get

//2)dynamic routes using params and query paramss
// app.get("/user/:userid",(req,res)=>{
//     console.log(req.query);
//     console.log(req.params);
//              res.send("gettimg data")
//         })
//ac or abc
// app.get("/ab?c",(req,res)=>{
//          res.send("gettimg data")s
//     })
// app.get("/data",(req,res)=>{
//     res.send("gettimg data")
// })
// app.post("/data",(req,res)=>{
//     res.send("posted successfully")
// })
// app.use("/data",(req,res)=>{
//     res.send("hello login")
// })
// app.use("/",(req,res)=>{res.send("hello")})


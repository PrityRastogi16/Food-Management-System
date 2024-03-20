const express = require("express");
const connection = require("./dbConnect");
const {userRouter} = require("./routes/userRoute")
const {restaurantRouter} = require("./routes/restaurantRoute");
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("Working Fine");
})
 app.use("/user", userRouter);
 app.use("/restaurant",restaurantRouter);

app.listen("2002",async(req,res)=>{
   try{
    await connection;
    console.log("Connected to DB");
    console.log("Server is running on port 2002");
   }
   catch(err){
    console.log(err);
   }
})
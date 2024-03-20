const express = require("express");
const connection = require("./dbConnect");
const app = express();

app.get("/",(req,res)=>{
    res.json("Working Fine");
})


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
const express = require("express");
const {UserModel} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

// Register
userRouter.post('/register', (req,res)=>{
    const {name, email, password, address} = req.body;
    try{
      bcrypt.hash(password,5, async(err,hash)=>{
        if(err){
            res.status(201).json({msg:"error"});
        }
        else{
            const user = new UserModel({name, email, password:hash, address})
            await user.save();
            res.status(201).json({msg:"User Registered Successful", user});
        }
      })
    }
    catch(err){
       res.status(401).send({"error":err}) 
    }

})

// Login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
       const user = await UserModel.findOne({email});
       if(user){
        bcrypt.compare(password, user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({userId:user._id}, "Prity", {expiresIn:"7d"});
                res.status(201).json({msg:"Login Successfull", token})
            }else{
                res.status(201).json({msg:"Wrong Password"})
            }
        })
       }
    }
    catch(err){
        res.status(401).send({"error":err}) 
    }
})

module.exports = {
    userRouter
}
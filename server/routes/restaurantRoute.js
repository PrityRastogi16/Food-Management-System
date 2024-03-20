const express = require("express");
const {RestaurantModel} = require("../models/restaurantModel");

const restaurantRouter = express.Router();

// ADD Restaurants

restaurantRouter.post("/restaurants", async(req,res)=>{
    try{
    const {name, address, menu} = req.body;
    const restaurant = new RestaurantModel({name, address, menu});
    await restaurant.save();
    res.status(201).json({msg:"Restaurant Added Successful"})
    }catch(err){
        res.status(401).send({"error":err}) 
    }

})

// Get Restaurnat

module.exports = {
    restaurantRouter
}
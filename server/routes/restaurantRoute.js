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

restaurantRouter.get("/", async(req,res)=>{
    try{
    const restaurants = await RestaurantModel.find();
    res.status(200).json({msg: restaurants});
    }
    catch(err){
        res.status(401).send({"error":err})
    }
})

restaurantRouter.get("/:id", async(req,res)=>{
    try{
    const restaurants = await RestaurantModel.findById(req.params.id);
    res.status(200).json({msg: restaurants});
    }
    catch(err){
        res.status(401).send({"error":err})
    }
})

// GET MENU

// ADD MENU:-
restaurantRouter.post("/:id/menu", async(req,res)=>{
    try{
        const id = req.params.id;
        const {name,  description, price, image } = req.body;
        const restaurant = await RestaurantModel.findById(id);
        if(!restaurant){
            res.status(200).json({msg:"Restaurant not found" });
        }
        const newMenu = {
            name, description,price,image
        };
        restaurant.menu.push(newMenu);
        await restaurant.save();
        res.status(200).json({ msg: "Menu item added successfully", menuItem: newMenu });
    }
    catch(err){
        res.status(401).send({"error":err})
    }
})

// Delete 
restaurantRouter.delete("/:resID/menu/:menuID", async(req,res)=>{
    try{
       const {resID, menuID} = req.params;
       const restaurant = await RestaurantModel.findById(resID);
       if(!restaurant){
        res.status(404).json({ error: "Restaurant not found" });
       }
       const menuIndex = restaurant.menu.findIndex(item => item._id.toString() === menuID);
       if(menuIndex === -1){
        res.status(200).json({ error: "Menu item not found" });
       }
       restaurant.menu.splice(menuIndex,1);
       await restaurant.save();
       res.status(200).json({ error: "Menu Deleted" });
    }
    catch(err){
        res.status(401).send({"error":err})
    }
})

module.exports = {
    restaurantRouter
}
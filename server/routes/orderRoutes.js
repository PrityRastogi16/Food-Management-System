const express = require("express");
const {OrderModel} = require("../models/orderModel");
const {RestaurantModel} = require("../models/restaurantModel");

const orderRoute = express.Router();

orderRoute.post("/orders", async(req,res)=>{
    try{
        const { restaurantId, items, totalPrice } = req.body;
    const restaurant = new RestaurantModel(restaurantId);
    if (!restaurant) {
        return res.status(200).json({ error: "Restaurant not found" });
    }

    const newOrder = new OrderModel({
        restaurant: restaurantId,
        items,
        totalPrice
    });

    // Save the order
    await newOrder.save();

    res.status(201).json({ msg: "Order placed successfully", order: newOrder });
        res.status(401).send({"error":err}) 
    }

})
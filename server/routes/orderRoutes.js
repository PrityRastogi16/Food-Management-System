const express = require("express");
const {OrderModel} = require("../models/orderModel");
// const {RestaurantModel} = require("../models/restaurantModel");

const orderRoute = express.Router();

orderRoute.post("/orders", async(req,res)=>{
    try {
        const { userId, restaurantId, items, totalPrice, deliveryAddress } = req.body;
        // Create a new order
        const newOrder = new OrderModel({
            user: userId,
            restaurant: restaurantId,
            items,
            totalPrice,
            deliveryAddress,
            status: "placed"
        });
        await newOrder.save();

        res.status(200).json({ msg: "Order placed successfully", order: newOrder });
    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

orderRoute.get("/:id", async(req,res)=>{
    try{
    const orders = await OrderModel.findById(req.params.id);
    res.status(200).json({msg: orders});
    }
    catch(err){
        res.status(401).send({"error":err})
    }
})

orderRoute.put("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(200).json({ error: "Please provide the status to update" });
        }
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({ msg: "Order status updated successfully", order: updatedOrder });
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(400).json({ error: "Internal Server Error" });
    }
});


module.exports = {
  orderRoute
}
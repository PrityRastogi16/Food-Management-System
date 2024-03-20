const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    items: [{
      name: String,
      price: Number,
      quantity: Number
    }],
    totalPrice: {
      type: Number
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    status: {
      type: String,
      enum: ["placed", "preparing", "on the way", "delivered"],
      default: "placed"
    }
  });
  
  const OrderModel = mongoose.model('Order', orderSchema);
  
  module.exports = {
    OrderModel
  };
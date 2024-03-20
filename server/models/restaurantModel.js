const mongoose = require("mongoose");

const menuItems = new Schema({
    name: {
        type: String,
        required: true
      },
      description: String,
      price: {
        type: Number,
        required: true
      },
      image: String
    });

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      address: {
        street: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        zip: {
          type: String,
          required: true
        }
      },
      menu: [menuItems]

})
const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports={
    restaurantSchema
}
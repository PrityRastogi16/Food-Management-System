const mongoose = require("mongoose");

const menuItems = mongoose.Schema({
    name: {
        type: String
      },
      description: String,
      price: {
        type: Number
      },
      image: String
    });

const restaurantSchema = mongoose.Schema({
    name: {
        type: String
      },
      address: {
        street: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        },
        country: {
          type: String
        },
        zip: {
          type: String
        }
      },
      menu: [menuItems]

})
const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports={
    RestaurantModel
}
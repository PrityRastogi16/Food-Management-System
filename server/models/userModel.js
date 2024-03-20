const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    address: {
        street: {
          type: String,
        },
        city: {
          type: String,
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
      }
})
const UserModel = mongoose.model('user', userSchema);

module.exports={
    UserModel
}
const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  selectedFoodItems: [
    {
      foodName: {
        type: String,
        required: true,
      },
      foodImage: String,
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const UserCart = mongoose.model('UserCart', userCartSchema);

module.exports = UserCart;

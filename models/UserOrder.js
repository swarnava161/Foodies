const mongoose = require('mongoose');

// Define the user orders schema
const userOrderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  orders: [
    {
      orderDate: {
        type: Date,
        default: Date.now,
      },
      foodItems: [
        {
          foodName: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        foodImage: String,
          price: {
            type: Number,
            required: true,
          },
          size: {
            type: String,
          },
        },
      ],
    },
  ],
});

// Create a model for user orders
const UserOrder = mongoose.model('UserOrder', userOrderSchema);

module.exports = UserOrder;

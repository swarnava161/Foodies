const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: [ {
        type: Number,
        required: true,
      }],
 
    image: String, 
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
  });

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
  foodItems: [foodItemSchema]
});

const FoodData = mongoose.model('FoodData', categorySchema);

module.exports = FoodData;

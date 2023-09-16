const express = require('express');
const router = express.Router();
const FoodData = require('../models/FoodData'); // Import the Category model

// Create a new category with food items
router.post('/foodData', async (req, res) => {
  try {
    const { name, foodItems } = req.body;

    // Create a new category with the provided data
    const newFoodData = new FoodData({
      name,
      foodItems,
    });

    // Save the category to the database
    const savedFoodData= await newFoodData.save();

    res.status(201).json(savedFoodData);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/foodData', async (req, res) => {
    try {
      const allFoodData = await FoodData.find();
      res.status(200).json(allFoodData);
    } catch (error) {
      console.error('Error fetching food data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.get('/foodData/:categoryName', async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
  
      // Query the database to find the category by name
      const category = await FoodData.findOne({ name: categoryName });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Return the category's food items as a response
      res.status(200).json(category.foodItems);
    } catch (error) {
      console.error('Error fetching data by category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 
  




// Create a new food item under a category
router.post('/foodData/foodItem', async (req, res) => {
    try {
      const { foodItem } = req.body;
      console.log(foodItem.category);
  
      // Find the category by name
      const category = await FoodData.findOne({ name: foodItem.category });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Add the food item to the category's foodItems array
      category.foodItems.push(foodItem);
  
      // Save the category with the new food item
      const savedFoodData = await category.save();
  
      res.status(201).json(savedFoodData);
    } catch (error) {
      console.error('Error creating food item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




module.exports = router;

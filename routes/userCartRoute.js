const express = require('express');
const router = express.Router();
const UserCart = require('../models/UserCart'); // Import the UserCart model

// Add selected food item to the user's cart
router.post('/addToCart', async (req, res) => {
  try {
    const { userEmail, selectedFoodItem } = req.body;

    // Find the user's cart by email or create a new one if it doesn't exist
    let userCart = await UserCart.findOne({ userEmail });

    if (!userCart) {
      userCart = new UserCart({ userEmail, selectedFoodItems: [] });
    }

    // Check if an item with the same name already exists in the user's cart
    const existingItemIndex = userCart.selectedFoodItems.findIndex(item => item.foodName === selectedFoodItem.foodName);

    if (existingItemIndex !== -1) {
      // Update quantity and price of the existing item
      userCart.selectedFoodItems[existingItemIndex].quantity += selectedFoodItem.quantity;
      userCart.selectedFoodItems[existingItemIndex].price += selectedFoodItem.price;
    } else {
      // Add the selected food item to the user's cart
      userCart.selectedFoodItems.push(selectedFoodItem);
    }

    // Save the updated user's cart
    const savedUserCart = await userCart.save();

    res.status(201).json(savedUserCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/getUserCartItems', async (req, res) => {
    try {
      const userEmail = req.query.email; // Get the email from the query parameter
  
      // Find the user's cart by email
      const userCart = await UserCart.findOne({ userEmail });
  
      if (!userCart) {
        // Handle the case where the user's cart is not found
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Return the selected food items in the user's cart
      res.status(200).json(userCart.selectedFoodItems);
    } catch (error) {
      console.error('Error fetching user cart items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });









  
  // Delete a specific food item from the user's cart by food name
  router.delete('/deleteFromCart/:foodName', async (req, res) => {
    try {
      const { foodName } = req.params;
      const { userEmail } = req.body;
  
      // Find the user's cart by email
      let userCart = await UserCart.findOne({ userEmail });
  
      if (!userCart) {
        // Handle the case where the user's cart doesn't exist
        return res.status(404).json({ error: 'User cart not found' });
      }
  
      // Filter out the food item with the matching name
      userCart.selectedFoodItems = userCart.selectedFoodItems.filter(
        (item) => item.foodName !== foodName
      );
  
      // Save the updated user's cart
      const savedUserCart = await userCart.save();
  
      res.status(200).json(savedUserCart);
    } catch (error) {
      console.error('Error deleting from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  

  
  // Delete all food items from a user's cart
  router.delete('/clearCart/:userEmail', async (req, res) => {
    try {
      const { userEmail } = req.params;
  
      // Find the user's cart by email
      const userCart = await UserCart.findOne({ userEmail });
  
      if (!userCart) {
        // If no cart found for the user, return a response or handle as needed
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
  
      // Clear all food items from the user's cart
      userCart.selectedFoodItems = [];
  
      // Save the updated user's cart
      const savedUserCart = await userCart.save();
  
      // Return a success response
      res.status(200).json(savedUserCart);
    } catch (error) {
      console.error('Error clearing user cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  







module.exports = router;


const express = require('express');
const router = express.Router();
const UserOrders = require('../models/UserOrder');

// Add order to the user's orders
router.post('/addOrder', async (req, res) => {
    try {
      const { userEmail, foodItems } = req.body;
  
      // Get today's date in the format YYYY-MM-DD
      const orderDate = new Date().toISOString().split('T')[0];
        

      // Find the user's orders by email or create a new one if it doesn't exist
      let userOrders = await UserOrders.findOne({ userEmail });
   
        
      if (!userOrders) {
        userOrders = new UserOrders({ userEmail, orders: [] });
      }
    
      // Check if there is an order with the same date
      const existingOrder = userOrders.orders.find(order => order.orderDate.toISOString().split('T')[0] === orderDate);
      console.log(existingOrder);
      if (existingOrder) {
        // If there is an order with the same date, add food items to it
        existingOrder.foodItems.push(...foodItems);
      } else {
        // If not, create a new order with the current date and add food items to it
        userOrders.orders.push({ orderDate: orderDate, foodItems });
      }
  
      // Save the updated user's orders
      const savedUserOrders = await userOrders.save();
  
      res.status(201).json(savedUserOrders);
    } catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });





  
  // Get all orders for a user
  router.get('/getOrders/:userEmail', async (req, res) => {
    try {
      const { userEmail } = req.params;
  
      // Find the user's orders by email
      const userOrders = await UserOrders.findOne({ userEmail });
  
      if (!userOrders) {
        // If no orders found for the user, return an empty array or handle as needed
        return res.json([]);
      }
  
      // Return the user's orders as a response
      res.json(userOrders.orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  



  module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');


// POST route for user signup
router.post('/signup', async (req, res) => {
    try {
      // Destructure user data from the request body
      const { name, email, address, city, phone, state, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        address,
        city,
        phone,
        state,
        password,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Respond with a success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle any errors and respond with an error message
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
  });





  // POST route for user login
router.post('/login', async (req, res) => {
    try {
      // Destructure email and password from the request body
      const { email, password } = req.body;
  
      // Check if the user exists based on the provided email (in a real application, you would fetch the hashed password from the database)
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the actual password (in a real application, you would use bcrypt.compare)
      if (password !== existingUser.password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      // Respond with a success message and the user's email and password (for testing purposes)
      res.status(200).json({
        message: 'Login successful',
        email: existingUser.email,
        password: existingUser.password, // Note: This is for testing only, never send the actual password in a real response
      });
    } catch (error) {
      // Handle any errors and respond with an error message
      console.error('Error during user login:', error);
      res.status(500).json({ message: 'Login failed. Please try again later.' });
    }
  });
  

  module.exports = router;

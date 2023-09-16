const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const userOrderRoute = require('./routes/userOrderRoute');

const foodDataRoute = require('./routes/foodDataRoute');
const userCartRoute = require('./routes/userCartRoute');
const app = express();
connectDB();
// Load environment variables from a .env file
dotenv.config();

// Middleware
app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend domain
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    })
  );
app.use(express.json());


app.use('/api/users', userRoutes);

app.use('/api', foodDataRoute);
app.use('/api',userCartRoute);
app.use('/api',userOrderRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

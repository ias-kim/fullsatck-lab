const express = require('express');
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';

app.use(bodyParser.json());

// to load environment variables from .env file
dotenv.config();
const app = express();

// authRoute
app.use('/api/auth', authRoutes);
// userRoute
app.use('/api/user', userRoutes);

// default route
app.get('/', (req, res) => {
  res.send('welcome! ');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

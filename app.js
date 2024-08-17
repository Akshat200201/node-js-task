const express = require('express');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { loginUser, refreshToken } = require('./controllers/authController');

const app = express();
connectDB();

app.use(express.json());

app.post('/api/login', loginUser);
app.post('/api/refresh-token', refreshToken);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;

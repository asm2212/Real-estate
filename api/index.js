import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import UserRouter from './route/UserRoute.js';

config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(
    () => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

const app = express();

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

app.use('/api/user',UserRouter);

import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import UserRouter from './route/UserRoute.js';
import AuthRouter from './route/AuthRoute.js';
import cookieParser from 'cookie-parser';

config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(
    () => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

app.use('/api/user',UserRouter);
app.use('/api/auth',AuthRouter);

app.use((error,req,res,next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,

    });
});
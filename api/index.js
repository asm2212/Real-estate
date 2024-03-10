import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import UserRouter from './route/UserRoute.js';
import AuthRouter from './route/AuthRoute.js';


config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(
    () => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

app.use('/api/user',UserRouter);
app.use('/api/auth',AuthRouter);

import User from "../model/Usermodel.js";
import bcrypt from 'bcrypt';

export const signup = async(req, res, next) => {
    const { username, email, password } = req.body;
    try {
       
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
};

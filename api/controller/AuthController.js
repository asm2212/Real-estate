import User from "../model/Usermodel.js";
import bcrypt from "bcrypt";
import errorHandler from "../util/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const {password: pass,...rest} = user._doc;
    res
     .cookie("access_token", token, { httpOnly: true })
     .status(200)
     .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async(req,res,next) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })
    if(user) {
      const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
      const {password: pass,...rest} = user._doc;
      res
         .cookie("access_token",token,{httpOnly: true})
         .status(200)
         .json(rest);
    }
    else {  
      const generatedPassword = Math.random().toString(36).slice(-8)  + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword,10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4),
        email: req.body.email,password: hashedPassword,avatar: req.body.photo });
        await newUser.save();
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET);
        const {password: pass,...rest} = newUser._doc;
        res
        .cookie("access_token",token,{httpOnly:true})
        .status(200)
        .json(rest);
        
      }
  } catch (error) {
    next(error);
  }
}

export const signOut = (req, res, next) => {
   try {
    res.clearCookie("access_token");
    res.status(200).json({message: "Successfully signed out"});
   } catch (error) {
    next(error);
   }
}

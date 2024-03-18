import { error } from "console";
import User from "../model/Usermodel.js";
import errorHandler from "../util/error.js";
import bcrypt from 'bcrypt';

export const test = (req, res) => {
    res.json({
        message: "api route",
      });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, 'Unauthorized'));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        }
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req, res, next) => {
  if(req.user.id !== req.params.id)
  return next(errorHandler(401,'you can only delete your own account!'));
try{
   await User.findByIdAndDelete(req.params.id);
   res.clearCookie('access_token')
   res.status(200).json('user has been deleted');
}
catch (error){
  next(error);
}
}

export const getUserLists = async(req,res,next) => {
  if(req.user.id !== req.params.id){
      try{
        const lists = await List.find({userRef: req.params.id});
        res.status(200).json(lists);
      
  }catch(error){
    next(error)
  }}
  else{
    return next(errorHandler(401,'you can only view your own lists!'));
  }
}

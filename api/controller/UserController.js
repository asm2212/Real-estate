import User from "../model/Usermodel.js";
import errorHandler from "../util/error.js";
import bcrypt from 'bcrypt';


export const test = (req, res) => {
    res.json({
        message: "api route",
      });



};export const updateUser = async (req, res, next) => {
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

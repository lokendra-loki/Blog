const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //username check
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        error: "Username already exist",
      });
    }
    //email check
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({
        error: "Email already exist",
      });
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user1 = await newUser.save();
    res.status(200).json(user1);
  } catch (error) {
    next(error);
  }
};

//Login
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        //create token
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "3d" }
        );
        //now saving the token in the cookies
        const { password, ...others } = user._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(others);
      } else {
        return next(createError(401, "Invalid password"));
      }
    } else {
      return next(createError(401, "User not found "));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
//check if username and email already exists
// const user = await User.findOne({
//   $or: [{ username: req.body.username }, { email: req.body.email }],
// });
// if (user) {
//   return res.status(400).json({
//     error: "Username or email already exists",
//   });
// }

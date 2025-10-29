import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/tokenGen.js";
import bcrypt from "bcrypt";

const matchPassword = async (enteredPassword, hash) => {
  return await bcrypt.compare(enteredPassword, hash);
};

const userSignup = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name + email + password);

  if (!name || !email || !password) {
    console.log("please fill all details");
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.send("user already exists");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("failed to register user");
  }
});
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("please fill all the fields");
  }

  const user = await User.findOne({ email: email });

  if (user && await matchPassword(password, user.password)) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("incorrect email or password");
  }
});

export { userSignup, loginUser };

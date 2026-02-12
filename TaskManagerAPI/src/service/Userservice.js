require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/Usermodel");
const Task = require("../models/Taskmodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { configDotenv } = require("dotenv");
const createUser = async ({ username, email,password }) => {
  const exists = await User.findOne({email});

  if (exists) {
    throw new Error("User already exists");
  }
  const salt=await bcrypt.genSalt(10);
  const pass=await bcrypt.hash(password,salt);

  return await User.create({ username, email,password:pass });
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return user;
};

const updateUser = async (userId, data) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  if (!user) throw new Error("User not found");

  return user;
};

const deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  await Task.deleteMany({ userId });
  const user = await User.findByIdAndDelete(userId);

  if (!user) throw new Error("User not found");
  return user;
};

const loginUser=async({email,password})=>{
  const user=await User.findOne({email});
  if(!user) throw new Error("User not found");
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch) throw new Error("Invalid password");

  const token=jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
  );

  return {user,token};
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};

const mongoose = require("mongoose");
const User = require("../models/Usermodel");
const Task = require("../models/Taskmodel");

const createUser = async ({ username, email }) => {
  const exists = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (exists) {
    throw new Error("User already exists");
  }

  return await User.create({ username, email });
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

const mongoose = require("mongoose");
const Task = require("../models/Taskmodel");
const User = require("../models/Usermodel");

const createTask = async ({ title, userId, status }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User does not exist");

  return await Task.create({ title, userId, status });
};

const getAllTasks = async () => {
  return await Task.find().populate("userId", "username email");
};

const getTaskById = async (taskId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  return task;
};

const getTaskByUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  return await Task.find({ userId });
};

const updateTask = async (taskId, data) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
  if (!task) throw new Error("Task not found");

  return task;
};

const deleteTask = async (taskId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findByIdAndDelete(taskId);
  if (!task) throw new Error("Task not found");

  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUser,
  updateTask,
  deleteTask
};

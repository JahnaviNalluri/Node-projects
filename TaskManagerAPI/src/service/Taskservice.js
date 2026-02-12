const mongoose = require("mongoose");
const Task = require("../models/Taskmodel");
const User = require("../models/Usermodel");

const createTask = async (data,userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User does not exist");
  const {title,status,duedate,priority}=data; 
  return await Task.create({ title,status,priority,duedate,userId});
};

const getAllTasks = async (userId,page=1,limit=2) => {
  const skip=(page-1)*limit;
  const tasks=await Task.find({userId}).sort({priority:1}).skip(skip).limit(limit);
  const total=await Task.countDocuments({userId});
  return{
    total,page,totalPages:Math.ceil(total/limit),tasks
  };
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

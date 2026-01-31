const taskService = require("../service/taskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTaskByUser = async (req, res) => {
  try {
    const tasks = await taskService.getTaskByUser(req.params.userId);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUser,
  updateTask,
  deleteTask
};

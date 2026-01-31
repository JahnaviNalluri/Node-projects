const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

// ORDER MATTERS
router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/user/:userId", taskController.getTaskByUser);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;

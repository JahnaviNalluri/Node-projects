const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const authMiddleware=require("../middleware/authMiddleware");
// ORDER MATTERS
router.post("/",authMiddleware, taskController.createTask);
router.get("/", authMiddleware,taskController.getAllTasks);
//router.get("/user/:userId",authMiddleware, taskController.getTaskByUser);
router.get("/:id",authMiddleware, taskController.getTaskById);
router.put("/:id",authMiddleware, taskController.updateTask);
router.delete("/:id",authMiddleware, taskController.deleteTask);

module.exports = router;
import express from "express"
import { createTask, getAllTasks, getSingleTask, updateTask, deleteTask } from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router()

// create a task
router.post("/tasks", protect, createTask)

// get all tasks
router.get("/", protect, getAllTasks)

// get single task
router.get("/tasks/:id", protect, getSingleTask)

// update a task
router.put("/tasks/:id", protect, updateTask)

// delete a task
router.delete("/tasks/:id", protect, deleteTask)

export default router
import express from "express"
import { createTask, getAllTasks, getSingleTask, updateTask, deleteTask, softDeleteTask, getTrashedTasks, restoreTask } from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router()

// create a task
router.post("/tasks", protect, createTask)

// get all tasks
router.get("/", protect, getAllTasks)

// get trashed tasks
router.get("/tasks/trash/", protect, getTrashedTasks)

// get single task
router.get("/tasks/:id", protect, getSingleTask)

// restore a task
router.patch("/tasks/:id/restore", protect, restoreTask)

// update a task
router.put("/tasks/:id", protect, updateTask)

// soft delete a task
router.patch("/tasks/:id", protect, softDeleteTask)

// delete a task
router.delete("/tasks/:id", protect, deleteTask)


export default router
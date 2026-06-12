import express from "express"
import { createTask, getAllTasks, getSingleTask, updateTask, deleteTask } from "../controllers/taskController";

const router = express.Router()

// create a task
router.post("/tasks", createTask)

// get all tasks
router.get("/", getAllTasks)

// get single task
router.get("/tasks/:id", getSingleTask)

// update a task
router.put("/tasks/:id", updateTask)

// delete a task
router.delete("/tasks/:id", deleteTask)

export default router
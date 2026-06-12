import { Request, Response } from "express";
import Task from "../models/Task";


export const createTask = async(req: Request, res:Response)=>{
    try {
        const {title, description, completed, tag} = req.body
        if (!title || !description) {
            return res.status(400).json({message: "Fill out required fields!"})
        }

        const existingTitle = await Task.findOne({title});
        if(existingTitle){
        return res.status(400).json({message: "Task already exists!"}) 
        }

        const task = await Task.create({title, description, completed, tag})
        res.status(201).json({sucess:true, task})

    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}

// get all tasks
export const getAllTasks = async(req: Request, res:Response)=>{
    const task = await Task.find()
    res.status(200).json({sucess: true, task})
}

// get single task
export const getSingleTask = async(req:Request, res:Response)=>{
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({success: false, message: `Task with id: ${req.params.id} not found`})
        }
        res.status(200).json( {success: true, task})
    } catch (error) {
        console.error("Get single task error:", error);
        res.status(500).json({ success: false, message: "Server Error" });  
    }
}

// update a task
export const updateTask = async(req:Request, res:Response)=>{
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
              return res.status(404).json({message: "Task not found"})
        }

        const {title, description, completed, tag} = req.body

        const updateTask: Record<string, unknown> = {}

        if (title !== undefined) updateTask.title = title;
        if (description !== undefined) updateTask.description = description;
        if (completed !== undefined) updateTask.completed = completed;
        if (tag !== undefined) updateTask.tag = tag;

        const updated = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: updateTask },  // Use $set to avoid wiping untouched fields
        { returnDocument: "after", runValidators: true },
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updated
            
        })
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({ success: false, message: "Server Error" }); 
    }
}

// delete task
export const deleteTask = async(req:Request, res:Response)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({success: false, message: "Task not found"})
        }

        res.status(200).json({success: true, message: "Task deleted"})
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}
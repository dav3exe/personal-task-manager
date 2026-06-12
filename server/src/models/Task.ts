import { Schema, model } from "mongoose";

export interface ITask  {
    title: string;
    description: string;
    completed: boolean;
    tag: string
  
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },

        completed:{
            type: Boolean,
            default: false
        },

        tag:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Task = model<ITask>("Task", taskSchema)

export default Task
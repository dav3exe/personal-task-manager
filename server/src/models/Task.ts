import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    tag: string;
    user: mongoose.Types.ObjectId
  
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
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
}
    },
    {
        timestamps: true,
    }
)

const Task = model<ITask>("Task", taskSchema)

export default Task
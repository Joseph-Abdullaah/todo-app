import mongoose, { Schema } from "mongoose";

export interface TodoDocument extends mongoose.Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<TodoDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Todo = mongoose.model<TodoDocument>("Todo", todoSchema);

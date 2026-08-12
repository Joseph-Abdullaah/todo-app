import { Todo } from "../models/todo.model.js";
import type { CreateTodoInput, UpdateTodoInput } from "../types/todo.types.js";

export async function createTodo(input: CreateTodoInput) {
  return Todo.create({
    title: input.title,
    description: input.description,
  });
}

export async function getTodos() {
  return Todo.find().sort({ createdAt: -1 });
}

export async function getTodoById(id: string) {
  return Todo.findById(id);
}

export async function updateTodo(id: string, input: UpdateTodoInput) {
  return Todo.findByIdAndUpdate(id, input, { new: true, runValidators: true });
}

export function deleteTodo(id: string) {
  return Todo.findByIdAndDelete(id);
}

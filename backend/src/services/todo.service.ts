import { Todo } from "../models/todo.model.js";
import type {
  CreateTodoInput,
  UpdateTodoInput,
  GetTodosOptions,
} from "../types/todo.types.js";

export async function createTodo(input: CreateTodoInput) {
  return Todo.create({
    title: input.title,
    description: input.description,
  });
}

export async function getTodos({
  status = "all",
  search,
}: GetTodosOptions = {}) {
  const filter: Record<string, any> = {};

  if (status === "active") {
    filter.completed = false;
  }

  if (status === "completed") {
    filter.completed = true;
  }

  if (search?.trim()) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  return Todo.find(filter).sort({ createdAt: -1 });
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

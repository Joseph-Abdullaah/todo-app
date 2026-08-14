import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../services/todo.service.js";

export async function getAllTodos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    type Status = "all" | "active" | "completed";
    const rawStatus =
      typeof req.query.status === "string" ? req.query.status : undefined;
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    if (
      rawStatus !== undefined &&
      !["all", "active", "completed"].includes(rawStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use all, active, or completed.",
      });
    }

    const status: Status =
      rawStatus === "active"
        ? "active"
        : rawStatus === "completed"
          ? "completed"
          : "all";

    const todos = await getTodos({ status, search });
    res.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSingleTodo(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
    }

    const todo = await getTodoById(id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { title, description } = req.body;
    if (!title?.trim()) {
      res.status(400).json({
        success: false,
        message: "Title is required",
      });
      return;
    }

    const todo = await createTodo({ title, description });
    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTodoController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
      return;
    }

    const todo = await updateTodo(id, req.body);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTodoController(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid todo ID",
      });
      return;
    }

    const todo = await deleteTodo(id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

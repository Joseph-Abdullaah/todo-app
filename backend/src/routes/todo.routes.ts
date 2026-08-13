import { Router } from "express";

import {
  createTodoController,
  updateTodoController,
  getAllTodos,
  getSingleTodo,
  deleteTodoController,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getAllTodos);
router.get("/:id", getSingleTodo);
router.post("/", createTodoController);
router.patch("/:id", updateTodoController);
router.delete("/:id", deleteTodoController);

export default router;

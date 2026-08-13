import express from "express";
import cors from "cors";

import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Todo API is running",
  });
});

app.use("/api/todos", todoRoutes);

export default app;

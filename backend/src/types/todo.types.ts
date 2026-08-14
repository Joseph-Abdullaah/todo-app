export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface GetTodosOptions {
  status?: "all" | "active" | "completed";
  search?: string;
}

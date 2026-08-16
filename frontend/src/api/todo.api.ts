import type { Todo, TodoFilter } from "@/types/todo"

const API_URL = `${import.meta.env.VITE_API_URL}/todos`

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface RawTodo {
  _id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

function mapTodo(raw: RawTodo): Todo {
  return {
    id: raw._id,
    title: raw.title,
    description: raw.description,
    completed: raw.completed,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

export async function getTodos(options?: {
  status?: TodoFilter
  search?: string
}): Promise<Todo[]> {
  const params = new URLSearchParams()
  if (options?.status && options.status !== "all") {
    params.set("status", options.status)
  }
  if (options?.search) {
    params.set("search", options.search)
  }

  const queryString = params.toString()
  const url = queryString ? `${API_URL}?${queryString}` : API_URL

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`)
  }

  const result: ApiResponse<RawTodo[]> = await response.json()
  return result.data.map(mapTodo)
}

export async function getTodo(id: string): Promise<Todo> {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch todo: ${response.statusText}`)
  }

  const result: ApiResponse<RawTodo> = await response.json()
  return mapTodo(result.data)
}

export async function createTodo(data: {
  title: string
  description?: string
}): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`)
  }

  const result: ApiResponse<RawTodo> = await response.json()
  return mapTodo(result.data)
}

export async function updateTodo(
  id: string,
  data: { title?: string; description?: string; completed?: boolean }
): Promise<Todo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`)
  }

  const result: ApiResponse<RawTodo> = await response.json()
  return mapTodo(result.data)
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.statusText}`)
  }
}

import { useMemo, useRef, useState } from "react"

import { TodoFilters } from "./todo-filters"
import { TodoForm } from "./todo-form"
import { TodoHeader } from "./todo-header"
import { TodoList } from "./todo-list"
import { TodoStats } from "./todo-stats"
import type { Todo, TodoFilter } from "@/types/todo"

const initialTodos: Todo[] = (() => {
  const now = new Date().toISOString()
  return [
    {
      id: "1",
      title: "Finish React project",
      description: "Complete the todo app frontend with shadcn/ui",
      completed: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "2",
      title: "Learn Express",
      description: "Set up the API backend",
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "3",
      title: "Build database",
      description: "Design the schema for todos",
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
  ]
})()

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<TodoFilter>("all")
  const [search, setSearch] = useState("")
  const titleInputRef = useRef<HTMLInputElement>(null)

  const addTodo = (input: { title: string; description?: string }) => {
    const timestamp = new Date().toISOString()
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    setTodos((prev) => [todo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const editTodo = (
    id: string,
    input: { title: string; description?: string }
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: input.title,
              description: input.description,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    )
  }

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase()
    return todos.filter((todo) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed)
      const matchesSearch =
        query === "" ||
        todo.title.toLowerCase().includes(query) ||
        (todo.description?.toLowerCase().includes(query) ?? false)
      return matchesFilter && matchesSearch
    })
  }, [todos, filter, search])

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length
    return {
      total: todos.length,
      completed,
      active: todos.length - completed,
    }
  }, [todos])

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <TodoHeader />
      <TodoStats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />
      <TodoForm inputRef={titleInputRef} onAdd={addTodo} />
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />
      <TodoList
        todos={filteredTodos}
        hasAnyTodos={todos.length > 0}
        onCreate={() => titleInputRef.current?.focus()}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

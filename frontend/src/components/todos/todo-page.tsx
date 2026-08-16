import { useCallback, useEffect, useRef, useState } from "react"

import { TodoFilters } from "./todo-filters"
import { TodoForm } from "./todo-form"
import { TodoHeader } from "./todo-header"
import { TodoList } from "./todo-list"
import { TodoStats } from "./todo-stats"
import type { Todo, TodoFilter } from "@/types/todo"
import * as api from "@/api/todo.api"

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoFilter>("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const fetchAllTodos = useCallback(async () => {
    return api.getTodos()
  }, [])

  const fetchFilteredTodos = useCallback(async () => {
    return api.getTodos({ status: filter, search })
  }, [filter, search])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [allData, filteredData] = await Promise.all([
          fetchAllTodos(),
          fetchFilteredTodos(),
        ])
        if (!cancelled) {
          setAllTodos(allData)
          setTodos(filteredData)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load todos"
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [fetchAllTodos, fetchFilteredTodos])

  const addTodo = async (input: { title: string; description?: string }) => {
    try {
      setError(null)
      await api.createTodo(input)
      const [allData, filteredData] = await Promise.all([
        fetchAllTodos(),
        fetchFilteredTodos(),
      ])
      setAllTodos(allData)
      setTodos(filteredData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo")
    }
  }

  const toggleTodo = async (id: string) => {
    const todo = allTodos.find((t) => t.id === id)
    if (!todo) return

    try {
      setError(null)
      await api.updateTodo(id, { completed: !todo.completed })
      const [allData, filteredData] = await Promise.all([
        fetchAllTodos(),
        fetchFilteredTodos(),
      ])
      setAllTodos(allData)
      setTodos(filteredData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo")
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      setError(null)
      await api.deleteTodo(id)
      const [allData, filteredData] = await Promise.all([
        fetchAllTodos(),
        fetchFilteredTodos(),
      ])
      setAllTodos(allData)
      setTodos(filteredData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo")
    }
  }

  const editTodo = async (
    id: string,
    input: { title: string; description?: string }
  ) => {
    try {
      setError(null)
      await api.updateTodo(id, input)
      const [allData, filteredData] = await Promise.all([
        fetchAllTodos(),
        fetchFilteredTodos(),
      ])
      setAllTodos(allData)
      setTodos(filteredData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo")
    }
  }

  const stats = {
    total: allTodos.length,
    completed: allTodos.filter((t) => t.completed).length,
    active: allTodos.filter((t) => !t.completed).length,
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <TodoHeader />
      <TodoStats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />
      <TodoForm inputRef={titleInputRef} onAdd={addTodo} />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />
      <TodoList
        todos={todos}
        hasAnyTodos={allTodos.length > 0 || todos.length > 0}
        loading={loading}
        onCreate={() => titleInputRef.current?.focus()}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

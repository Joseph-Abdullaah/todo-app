import { TodoEmpty } from "./todo-empty"
import { TodoItem } from "./todo-item"
import type { Todo } from "@/types/todo"

interface TodoListProps {
  todos: Todo[]
  hasAnyTodos: boolean
  loading?: boolean
  onCreate: () => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, input: { title: string; description?: string }) => void
}

export function TodoList({
  todos,
  hasAnyTodos,
  loading,
  onCreate,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[72px] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    )
  }

  if (todos.length === 0) {
    return <TodoEmpty hasAnyTodos={hasAnyTodos} onCreate={onCreate} />
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

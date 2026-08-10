import { useState } from "react"
import {
  Check,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import type { Todo } from "@/types/todo"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, input: { title: string; description?: string }) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description ?? "")

  const cancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description ?? "")
    setIsEditing(false)
  }

  const handleSave = () => {
    const trimmedTitle = editTitle.trim()
    if (!trimmedTitle) {
      return
    }
    const trimmedDescription = editDescription.trim()
    onEdit(todo.id, {
      title: trimmedTitle,
      ...(trimmedDescription ? { description: trimmedDescription } : {}),
    })
    setEditTitle(trimmedTitle)
    setEditDescription(trimmedDescription)
    setIsEditing(false)
  }

  return (
    <Card size="sm">
      <CardContent className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? "Mark as active" : "Mark as complete"}
          className="mt-0.5"
        />
        {isEditing ? (
          <div className="flex flex-1 flex-col gap-2">
            <InputGroup>
              <InputGroupInput
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave()
                  }
                  if (e.key === "Escape") {
                    cancelEdit()
                  }
                }}
                autoFocus
              />
              <InputGroupAddon align="inline-end" className="flex gap-1">
                <InputGroupButton size="icon-xs" onClick={handleSave}>
                  <Check />
                </InputGroupButton>
                <InputGroupButton
                  size="icon-xs"
                  variant="outline"
                  onClick={cancelEdit}
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupTextarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    cancelEdit()
                  }
                }}
                placeholder="Add more details..."
                aria-label="Description"
                className="min-h-10"
              />
            </InputGroup>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-1">
            <p
              className={cn(
                "font-medium",
                todo.completed && "text-muted-foreground line-through"
              )}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p className="text-sm text-muted-foreground">
                {todo.description}
              </p>
            )}
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Todo actions"
              />
            }
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onToggle(todo.id)}>
                {todo.completed ? <RotateCcw /> : <Check />}
                {todo.completed ? "Mark active" : "Mark complete"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditTitle(todo.title)
                  setEditDescription(todo.description ?? "")
                  setIsEditing(true)
                }}
              >
                <Pencil />
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

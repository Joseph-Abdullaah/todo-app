import { useState, type FormEvent, type Ref } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TodoFormProps {
  inputRef: Ref<HTMLInputElement>
  onAdd: (input: { title: string; description?: string }) => void
}

export function TodoForm({ inputRef, onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return
    }
    const trimmedDescription = description.trim()
    onAdd({
      title: trimmedTitle,
      ...(trimmedDescription ? { description: trimmedDescription } : {}),
    })
    setTitle("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Add a new task</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="todo-title">Task</FieldLabel>
              <Input
                id="todo-title"
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="todo-description">
                Description (optional)
              </FieldLabel>
              <Textarea
                id="todo-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
              />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={!title.trim()}>
            <Plus data-icon="inline-start" />
            Add Todo
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

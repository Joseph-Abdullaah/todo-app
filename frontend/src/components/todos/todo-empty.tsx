import { ClipboardList, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface TodoEmptyProps {
  hasAnyTodos: boolean
  onCreate: () => void
}

export function TodoEmpty({ hasAnyTodos, onCreate }: TodoEmptyProps) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ClipboardList />
        </EmptyMedia>
        <EmptyTitle>{hasAnyTodos ? "No todos found" : "No todos yet"}</EmptyTitle>
        <EmptyDescription>
          {hasAnyTodos
            ? "No todos match your current filters or search. Try adjusting them."
            : "Create your first task to get started."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onCreate}>
          <Plus data-icon="inline-start" />
          Add Todo
        </Button>
      </EmptyContent>
    </Empty>
  )
}

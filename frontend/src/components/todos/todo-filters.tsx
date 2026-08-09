import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { TodoFilter } from "@/types/todo"

const filterOptions: Array<{ value: TodoFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
]

interface TodoFiltersProps {
  filter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
  search: string
  onSearchChange: (search: string) => void
}

export function TodoFilters({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <ToggleGroup
        value={[filter]}
        onValueChange={(value) => {
          if (value[0]) {
            onFilterChange(value[0] as TodoFilter)
          }
        }}
        variant="outline"
        size="sm"
      >
        {filterOptions.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <InputGroup className="sm:max-w-64">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          aria-label="Search todos"
        />
      </InputGroup>
    </div>
  )
}

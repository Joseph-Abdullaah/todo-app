import { CheckCircle2, Circle, ListTodo } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TodoStatsProps {
  total: number
  active: number
  completed: number
}

export function TodoStats({ total, active, completed }: TodoStatsProps) {
  const stats = [
    { label: "Total", value: total, icon: ListTodo },
    { label: "Active", value: active, icon: Circle },
    { label: "Completed", value: completed, icon: CheckCircle2 },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} size="sm">
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardAction>
              <Icon className="size-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function TodoHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        My Tasks
      </h1>
      <p className="text-sm text-muted-foreground">
        Manage your daily tasks and keep track of your progress.
      </p>
    </div>
  )
}

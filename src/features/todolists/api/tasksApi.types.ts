export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    addedDate: string
}
export type FetchTasks = {
    items: TaskType[],
    totalCount: number
    error: null | string
}
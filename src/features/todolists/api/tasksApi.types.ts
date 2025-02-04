import {TaskStatus} from "../../../common/enums/enums";

export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: TaskStatus
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

export type UpdateTask = {
    title?: string
    description?: string | null
    status?: TaskStatus
    priority?: number
    startDate?: string | null
    deadline?: string | null
}
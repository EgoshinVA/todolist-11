import {AppStatus} from "../../../app/appSlice";

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type DomainTodolist = TodolistType & {
    filter: FilterValuesType
    entityStatus: AppStatus
}
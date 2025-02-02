import {instance} from "../../../common/instance/instance";

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export const todolistsApi = {
    getTodolists(){
        return instance.get<TodolistType[]>('/todo-lists')
    }
}
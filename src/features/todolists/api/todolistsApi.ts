import {instance} from "../../../common/instance/instance";
import {TodolistType} from "./todolistsApi.types";
import {BaseResponse} from "../../../common/types/types";

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<BaseResponse<{ item: TodolistType }>>('todo-lists', {title})
    },
    removeTodolist (todolistId: string) {
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}`)
    },
    updateTodolist(params: {title: string, todolistId: string}){
        return instance.put<BaseResponse>(`todo-lists/${params.todolistId}`, {title: params.title})
    }
}
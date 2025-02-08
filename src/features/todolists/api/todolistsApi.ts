import {DomainTodolist, TodolistType} from "./todolistsApi.types";
import {BaseResponse} from "../../../common/types/types";
import {baseApi} from "../../../app/baseApi";

export const todolistApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTodolists: build.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            providesTags: ['Todolist'],
            transformResponse: (res: TodolistType[]): DomainTodolist[] => {
                return res.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            }
        }),
        addTodolist: build.mutation<BaseResponse<{ item: TodolistType }>, string>({
            query: title => ({
                url: "todo-lists",
                method: "POST",
                body: {title},
            }),
            invalidatesTags: ['Todolist']
        }),
        removeTodolist: build.mutation<BaseResponse, string>({
            query: todolistId => ({
                url: `todo-lists/${todolistId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTodolist: build.mutation<BaseResponse, { title: string, todolistId: string }>({
            query: ({todolistId, title}) => ({
                url: `todo-lists/${todolistId}`,
                method: "PUT",
                body: {title},
            }),
            invalidatesTags: ['Todolist']
        })
    })

})

export const {useFetchTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistMutation} = todolistApi
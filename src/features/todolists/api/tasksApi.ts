import {FetchTasks, TaskType, UpdateTask} from "./tasksApi.types";
import {BaseResponse} from "../../../common/types/types";
import {baseApi} from "../../../app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTasks: build.query<FetchTasks, string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks`,
            providesTags: ['Todolist']
        }),
        addTask: build.mutation<BaseResponse<{ item: TaskType }>, { todolistId: string, title: string }>({
            query: ({title, todolistId}) => ({
                url: `todo-lists/${todolistId}/tasks`,
                body: {title},
                method: 'POST'
            }),
            invalidatesTags: ['Todolist']
        }),
        removeTask: build.mutation<BaseResponse, { todolistId: string, taskId: string }>({
            query: ({taskId, todolistId}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTask: build.mutation<BaseResponse<{ item: TaskType }>, { todolistId: string, taskId: string, task: UpdateTask }>({
            query: ({taskId, task, todolistId}) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                body: task,
                method: 'PUT'
            }),
            invalidatesTags: ['Todolist']
        })
    })
})

export const {useFetchTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation} = tasksApi
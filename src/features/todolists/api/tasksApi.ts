import {instance} from "../../../common/instance/instance";
import {FetchTasks, TaskType} from "./tasksApi.types";
import {BaseResponse} from "../../../common/types/types";

//todo export types for any files

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<FetchTasks>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(params: { todolistId: string, title: string }) {
        return instance.post<BaseResponse<{
            item: TaskType
        }>>(`todo-lists/${params.todolistId}/tasks`, {title: params.title})
    },
    removeTask(params: { todolistId: string, taskId: string }) {
        const {taskId, todolistId} = params;
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
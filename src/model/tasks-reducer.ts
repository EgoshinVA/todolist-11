import {v1} from "uuid";
import {TasksStateType, TaskType} from '../app/App'
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {createSlice} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            addTask: create.reducer<{ title: string, todolistId: string }>((state, action) => {
                const newTask: TaskType = {
                    title: action.payload.title,
                    isDone: false,
                    id: v1()
                }
                state[action.payload.todolistId].unshift(newTask)
            }),
            removeTask: create.reducer<{ taskId: string, todolistId: string }>((state, action) => {
                return {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
                }
            })
        }
    }
})

export default tasksSlice.reducer;

const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, isDone: action.payload.isDone
                } : t)
            }
        }

        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, title: action.payload.title
                } : t)
            }
        }

        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}
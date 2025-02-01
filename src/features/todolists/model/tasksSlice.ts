import {v1} from "uuid";
import {TasksStateType, TaskType} from '../../../app/App'
import {addTodolist, removeTodolist} from "./todolistsSlice";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const tasksSlice = createSliceWithThunks({
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
                state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }),
            changeTaskStatus: create.reducer<{
                taskId: string,
                isDone: boolean,
                todolistId: string
            }>((state, action) => {
                state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, isDone: action.payload.isDone
                } : t)
            }),
            changeTaskTitle: create.reducer<{ taskId: string, title: string, todolistId: string }>((state, action) => {
                state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, title: action.payload.title
                } : t)
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTodolist, (state, action) => {
                return {...state, [action.payload.todolistId]: []}
            })
            .addCase(removeTodolist, (state, action) => {
                let copyState = {...state}
                delete copyState[action.payload]
                return copyState
            })
    },
    selectors: {
        selectTasks: state => state
    }
})

export const {addTask, removeTask, changeTaskStatus, changeTaskTitle} = tasksSlice.actions;
export const {selectTasks} = tasksSlice.selectors;

export default tasksSlice.reducer;
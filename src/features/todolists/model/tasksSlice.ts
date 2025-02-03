import {addTodolist, removeTodolist} from "./todolistsSlice";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {tasksApi} from "../api/tasksApi";
import {TaskType} from "../api/tasksApi.types";
import {ResultCode} from "../../../common/enums/enums";

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const tasksSlice = createSliceWithThunks({
    name: 'tasks',
    initialState,
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            addTask: createAThunk(async (params: { title: string, todolistId: string }, {
                    dispatch,
                    rejectWithValue
                }) => {
                    try {
                        const res = await tasksApi.addTask(params)
                        if (res.data.resultCode === ResultCode.Success) {
                            return {task: res.data.data.item, todolistId: params.todolistId}
                        } else {
                            return rejectWithValue(null)
                        }
                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todolistId].unshift(action.payload.task)
                    }
                }),
            removeTask: createAThunk(async (params: { taskId: string, todolistId: string }, {
                    dispatch,
                    rejectWithValue
                }) => {
                    try {
                        const res = await tasksApi.removeTask(params)
                        if (res.data.resultCode === ResultCode.Success) {
                            return params
                        } else {
                            return rejectWithValue(null)
                        }
                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todolistId] = state[action.payload.todolistId].filter(ts => ts.id !== action.payload.taskId)

                    }
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
            }),
            fetchTasks: createAThunk(async (todolistId: string, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await tasksApi.getTasks(todolistId)
                        return {items: res.data.items, todolistId}
                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todolistId] = action.payload.items
                    }
                })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTodolist.fulfilled, (state, action) => {
                return {...state, [action.payload.id]: []}
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                let copyState = {...state}
                delete copyState[action.payload]
                return copyState
            })
    },
    selectors: {
        selectTasks: state => state
    }
})

export const {addTask, removeTask, changeTaskStatus, changeTaskTitle, fetchTasks} = tasksSlice.actions;
export const {selectTasks} = tasksSlice.selectors;

export default tasksSlice.reducer;
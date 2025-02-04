import {addTodolist, removeTodolist} from "./todolistsSlice";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {tasksApi} from "../api/tasksApi";
import {TaskType, UpdateTask} from "../api/tasksApi.types";
import {ResultCode} from "../../../common/enums/enums";
import {RootState} from "../../../app/store";

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
            updateTask: createAThunk(async (params: { todolistId: string, taskId: string, task: UpdateTask }, {
                    dispatch,
                    getState,
                    rejectWithValue
                }) => {
                    try {
                        const tasks = (getState() as RootState).tasks
                        const todoTasks = tasks[params.todolistId]
                        const task = todoTasks.find(t => t.id === params.taskId)

                        if (!task)
                            return rejectWithValue(null)

                        const newTask: UpdateTask = {
                            title: task.title,
                            status: task.status,
                            deadline: task.deadline,
                            description: task.description,
                            priority: task.priority,
                            startDate: task.startDate,
                            ...params.task
                        }

                        const res = await tasksApi.updateTask({
                            todolistId: params.todolistId,
                            taskId: params.taskId,
                            task: newTask
                        })

                        if (res.data.resultCode === ResultCode.Success) {
                            return res.data.data.item
                        } else {
                            return rejectWithValue(null)
                        }
                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todoListId] = state[action.payload.todoListId].map(t => t.id === action.payload.id ? action.payload : t)
                    }
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

export const {addTask, removeTask, updateTask, fetchTasks} = tasksSlice.actions;
export const {selectTasks} = tasksSlice.selectors;

export default tasksSlice.reducer;
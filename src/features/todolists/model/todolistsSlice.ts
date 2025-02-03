import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {todolistsApi} from "../api/todolistsApi";
import {AppStatus} from "../../../app/appSlice";
import {TodolistType} from "../api/todolistsApi.types";
import {ResultCode} from "../../../common/enums/enums";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = TodolistType & {
    filter: FilterValuesType
    entityStatus: AppStatus
}

const initialState: DomainTodolist[] = []

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const todolistsSlice = createSliceWithThunks({
    name: 'todolists',
    initialState,
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            removeTodolist: createAThunk(async (todolistId: string, {dispatch, rejectWithValue}) => {
                try {
                    const res = await todolistsApi.removeTodolist(todolistId)
                    if (res.data.resultCode === ResultCode.Success) {
                        return todolistId
                    } else {
                        return rejectWithValue(null)
                    }
                }
                catch (error: any) {
                    return rejectWithValue(null)
                }
            },
                {
                    fulfilled: (state, action) => {
                        return state.filter(tl => tl.id !== action.payload)
                    }
                }),
            addTodolist: createAThunk(async (title: string, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await todolistsApi.addTodolist(title)
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
                        state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
                    }
                }),
            changeTodolistTitle: create.reducer<{ id: string, title: string }>((state, action) => {
                return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
            }),
            changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
                return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
            }),
            fetchTodolists: createAThunk(async (undefined, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await todolistsApi.getTodolists()
                        return res.data

                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
                    }
                })
        }
    },
    selectors: {
        selectTodolists: state => state
    }
})

export const {
    changeTodolistTitle,
    changeTodolistFilter,
    addTodolist,
    removeTodolist,
    fetchTodolists
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export default todolistsSlice.reducer


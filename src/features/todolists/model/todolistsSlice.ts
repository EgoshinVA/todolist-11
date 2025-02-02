import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {todolistsApi, TodolistType} from "../api/todolistsApi";
import {AppStatus} from "../../../app/appSlice";
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
            removeTodolist: create.reducer<string>((state, action) => {
                return state.filter(tl => tl.id !== action.payload)
            }),
            addTodolist: create.reducer<{ title: string, todolistId: string }>((state, action) => {
                const newTodolist: DomainTodolist = {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0,
                    entityStatus: 'idle'
                }
                state.unshift(newTodolist)
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


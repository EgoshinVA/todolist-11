import {FilterValuesType, TodolistType} from "../../../app/App";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";

const initialState: TodolistType[] = []

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
                const newTodolist: TodolistType = {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: 'all'
                }
                state.unshift(newTodolist)
            }),
            changeTodolistTitle: create.reducer<{ id: string, title: string }>((state, action) => {
                return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
            }),
            changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
                return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
            })
        }
    },
    selectors: {
        selectTodolists: state => state
    }
})

export const {changeTodolistTitle, changeTodolistFilter, addTodolist, removeTodolist} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export default todolistsSlice.reducer


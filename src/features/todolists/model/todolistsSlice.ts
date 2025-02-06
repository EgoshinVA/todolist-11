import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {AppStatus} from "../../../app/appSlice";
import {TodolistType} from "../api/todolistsApi.types";
import {clearAction} from "../../../common/actions/commonActions";

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
        //const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
                return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
            }),
        }
    },
    extraReducers: builder =>
        builder.addCase(
            clearAction, (state, action) => {
                return action.payload.todolists
            }
        ),
    selectors: {
        selectTodolists: state => state
    }
})

export const {changeTodolistFilter} = todolistsSlice.actions

export default todolistsSlice.reducer


import {asyncThunkCreator, buildCreateSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {todolistApi} from "../features/todolists/api/todolistsApi";
import {tasksApi} from "../features/todolists/api/tasksApi";

export type ThemeMode = 'dark' | 'light'

export type AppStatus = 'idle' | 'loading' | 'success' | 'rejected'

const initialState = {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as AppStatus,
    error: null as null | string,
    isAuth: false
}

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const appSlice = createSliceWithThunks({
    name: 'app',
    initialState,
    reducers: create => {
        return {
            changeTheme: create.reducer<ThemeMode>((state, action) => {
                state.themeMode = action.payload
            }),
            setIsAuth: create.reducer<boolean>((state, action) => {
                state.isAuth = action.payload
            })
        }
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
        selectIsAuth: state => state.isAuth,
    },
    extraReducers: builder => {
        builder.addMatcher(isPending, (state, action) => {
            if (todolistApi.endpoints.fetchTodolists.matchPending(action) || tasksApi.endpoints.fetchTasks.matchPending(action)) {
                return
            }
            state.status = 'loading'
        }).addMatcher(isFulfilled, (state) => {
            state.status = 'success'
        }).addMatcher(isRejected, (state) => {
            state.status = 'rejected'
        })
    }
})

export const {changeTheme, setIsAuth} = appSlice.actions;
export const {selectThemeMode, selectIsAuth} = appSlice.selectors;

export default appSlice.reducer;
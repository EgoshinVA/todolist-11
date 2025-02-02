import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'

export type AppStatus = 'idle' | 'loading' | 'success' | 'rejected'

const initialState = {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as AppStatus,
    error: null as null | string,
}

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

const appSlice = createSliceWithThunks({
    name: 'app',
    initialState,
    reducers: create => {
        return {
            changeTheme: create.reducer<ThemeMode>((state, action) => {
                state.themeMode = action.payload
            })
        }
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
    }
})

export const {changeTheme} = appSlice.actions;
export const {selectThemeMode} = appSlice.selectors;

export default appSlice.reducer;
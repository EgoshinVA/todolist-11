import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {authApi} from "../api/authApi";
import {ResultCode} from "../../../common/enums/enums";

export type Inputs = {
    email: string
    password: string
    rememberMe?: boolean
}

const initialState = {
    isAuth: false,
    isInitialized: false,
}

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const authSlice = createSliceWithThunks({
    name: 'auth',
    initialState,
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            login: createAThunk(async (arg: Inputs, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await authApi.login(arg)
                        if (res.data.resultCode === ResultCode.Success) {
                            localStorage.setItem('sn-token', res.data.data.token)
                            return true
                        } else {
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isAuth = action.payload
                    }
                }),
            authMe: createAThunk(async (undefined, {dispatch, rejectWithValue}) => {
                try {
                    const res = await authApi.auth()
                    if (res.data.resultCode === ResultCode.Success) {
                        return true
                    } else {
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    return rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    state.isAuth = action.payload
                }
            }),
            logout: createAThunk(async (undefined, {dispatch, rejectWithValue}) => {
                try {
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        localStorage.removeItem('sn-token')
                        return false
                    } else {
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    return rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    state.isAuth = action.payload
                }
            }),
        }
    },
    selectors: {
        selectIsAuth: state => state.isAuth,
        selectIsInitialized: state => state.isInitialized
    }
})

export const {login, authMe, logout} = authSlice.actions;
export const {selectIsAuth, selectIsInitialized} = authSlice.selectors

export default authSlice.reducer
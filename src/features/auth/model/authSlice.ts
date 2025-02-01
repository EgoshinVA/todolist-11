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
                    if (res.data.resultCode === ResultCode.Success){
                        localStorage.setItem('sn-token', res.data.data.token)
                        return true
                    }
                    else return false
                } catch (error) {
                    return rejectWithValue(null)
                }
            },
                {
                    fulfilled: (state, action) => {
                        state.isAuth = action.payload
                    }
                })
        }
    }
})

export const {login} = authSlice.actions;

export default authSlice.reducer
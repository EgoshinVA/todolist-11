import {BaseResponse} from "../../../common/types/types";
import {baseApi} from "../../../app/baseApi";
import {Inputs} from "./authApi.types";

export const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        authMe: build.query<BaseResponse, void>({
            query: () => "auth/me"
        }),
        login: build.mutation<BaseResponse<{ userId: number, token: string }>, Inputs>({
            query: (params) => ({
                url: "auth/login",
                method: "POST",
                body: params,
            })
        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => ({
                url: "auth/login",
                method: "DELETE",
            })
        })
    })
})

export const {useAuthMeQuery, useLoginMutation, useLogoutMutation} = authApi;
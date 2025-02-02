import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";
import {Inputs} from "../model/authSlice";

export const authApi = {
    login: (params: Inputs) => {
        return instance.post<BaseResponse<{ userId: number, token: string }>>("auth/login", params);
    },
    auth: () => {
        return instance.get<BaseResponse<{
            id: number,
            email: string,
            login: string
        }>>("auth/me");
    },
    logout: () => {
        return instance.delete<BaseResponse>("auth/login");
    }
}
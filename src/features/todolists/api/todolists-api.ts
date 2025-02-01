import {instance} from "../../../common/instance/instance";

//todo types

export const todolistsApi = {
    getTodolists(){
        return instance.get('/todo-lists')
    }
}
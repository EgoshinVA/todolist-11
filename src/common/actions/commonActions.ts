import {createAction} from "@reduxjs/toolkit";


export const clearAction = createAction('common/clearTodolist', function prepare() {
    return {
        payload: {
            tasks: {},
            todolists: []
        },
    }
})
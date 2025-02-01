
import {todolistsReducer} from "../model/todolists-reducer";
import {appReducer} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "../model/tasks-reducer";

// непосредственно создаём store
export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistsReducer,
		app: appReducer
	}
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store


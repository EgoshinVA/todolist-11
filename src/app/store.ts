import todolistsReducer from "../features/todolists/model/todolistsSlice";
import appReducer from "./appSlice";
import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "../features/todolists/model/tasksSlice";
import authSlice from "../features/auth/model/authSlice";

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistsReducer,
		app: appReducer,
		auth: authSlice
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store


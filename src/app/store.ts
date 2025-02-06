import todolistsReducer from "../features/todolists/model/todolistsSlice";
import appReducer from "./appSlice";
import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "../features/todolists/model/tasksSlice";
import {baseApi} from "./baseApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistsReducer,
		app: appReducer,
		[baseApi.reducerPath]: baseApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)


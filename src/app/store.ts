import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { api } from "../api"
import shopSlice from "./slices/shopSlice"

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		shop: shopSlice,
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		api.middleware,
	],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

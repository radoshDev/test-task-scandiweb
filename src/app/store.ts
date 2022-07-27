import { configureStore } from "@reduxjs/toolkit"
import { api } from "../api"
import { localStorageMiddleware } from "../middleware/localStorageMiddleware"
import shopSlice from "./slices/shopSlice"

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		shop: shopSlice,
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		api.middleware,
		localStorageMiddleware,
	],
})

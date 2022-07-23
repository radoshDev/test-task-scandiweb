import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
	Category,
	CategoriesResponse,
	OneCategoryResponse,
} from "../types/category"
import { NavigationData, NavigationDataResponse } from "../types/navigationData"
import { GET_NAVIGATION_DATA, GET_ONE_CATEGORY } from "./queries"

const baseUrl = "http://localhost:4000"

const baseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: headers => {
		headers.set("Content-Type", "application/json")

		return headers
	},
})

export const api = createApi({
	reducerPath: "api",
	baseQuery,
	endpoints: builder => ({
		getNavigationData: builder.query<NavigationData, void>({
			query: () => ({
				url: "",
				method: "POST",
				body: { query: GET_NAVIGATION_DATA },
			}),
			transformResponse: (response: NavigationDataResponse) => response.data,
		}),
		getCategory: builder.query<Category, string | undefined>({
			query: categoryName => ({
				url: "",
				method: "POST",
				body: { query: GET_ONE_CATEGORY(categoryName) },
			}),
			transformResponse: (response: OneCategoryResponse) =>
				response.data.category,
		}),
	}),
})

export const { getNavigationData, getCategory } = api.endpoints

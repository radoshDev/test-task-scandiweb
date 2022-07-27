import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Category, OneCategoryResponse } from "../types/category"
import { NavigationData, NavigationDataResponse } from "../types/navigationData"
import { Product, ProductResponse } from "../types/product"
import {
	GET_NAVIGATION_DATA,
	GET_ONE_CATEGORY,
	GET_ONE_PRODUCT,
} from "./queries"

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
			transformResponse: (response: OneCategoryResponse) => {
				const sortedProducts = response.data.category.products.sort((a, b) =>
					a.name > b.name ? 1 : -1
				)
				return { ...response.data.category, products: sortedProducts }
			},
		}),
		getProduct: builder.query<Product, string>({
			query: id => ({
				url: "",
				method: "POST",
				body: { query: GET_ONE_PRODUCT(id) },
			}),
			transformResponse: (response: ProductResponse) => response.data.product,
		}),
	}),
})

export const { getNavigationData, getCategory, getProduct } = api.endpoints

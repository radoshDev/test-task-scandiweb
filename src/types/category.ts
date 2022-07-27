import { Attribute, Price } from "./product"

export interface CategoriesResponse {
	data: {
		categories: Category[]
	}
}

export interface OneCategoryResponse {
	data: {
		category: Category
	}
}

export interface Category {
	name: string
	products: CategoryProduct[]
}

export interface CategoryProduct {
	id: string
	name: string
	brand: string
	inStock: boolean
	gallery: string[]
	prices: Price[]
	attributes: Attribute[]
}

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
}

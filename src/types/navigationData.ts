import { Category } from "./category"

export interface NavigationDataResponse {
	data: NavigationData
}

export interface NavigationData {
	categories: Category[]
	currencies: Currency[]
}

export interface Currency {
	label: string
	symbol: string
}

export interface ProductResponse {
	data: Data
}

interface Data {
	product: Product
}

export interface Product {
	id: string
	name: string
	inStock: boolean
	gallery: string[]
	description: string
	category: string
	attributes: Attribute[]
	prices: Price[]
	brand: string
}

export interface Price {
	amount: number
	currency: Currency
}

interface Currency {
	label: string
	symbol: string
}

export interface Attribute {
	id: string
	name: string
	type: string
	items: Item[]
}

interface Item {
	id: string
	value: string
	displayValue: string
}

import { store } from "../app/store"
import { Currency } from "./navigationData"
import { Price, Product } from "./product"

export type Store = typeof StorageManager
export type RootState = ReturnType<typeof store.getState>

export type Cart = {
	productId: Product["id"]
	options: Record<string, string>
	prices: Price[]
	qty: number
}

export type ShopState = {
	category: string
	currency: Currency | null
	cart: {
		products: Cart[]
		isShow: boolean
	}
	productPerPage: number
}

export type AddToCartPayload = Omit<Cart, "qty">

export type UpdateCartPayload = {
	newQty: number
} & Omit<Cart, "qty" | "prices">

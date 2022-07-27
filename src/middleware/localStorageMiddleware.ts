import { Middleware } from "@reduxjs/toolkit"
import { CART_STORAGE_KEY, CURRENCY_STORAGE_KEY } from "../constants"
import { Cart, RootState } from "../types/storeTypes"

export const localStorageMiddleware: Middleware =
	store => next => (action: { type: string }) => {
		const result = next(action)
		const state = store.getState() as RootState
		if (action.type?.toLocaleLowerCase().includes("cart")) {
			const cartProducts: Cart[] = state.shop.cart.products
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartProducts))
		}
		if (action.type === "shop/setCurrency") {
			const { currency } = state.shop
			localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(currency))
		}
		return result
	}

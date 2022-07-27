import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CART_STORAGE_KEY, CURRENCY_STORAGE_KEY } from "../../constants"
import { Currency } from "../../types/navigationData"
import {
	AddToCartPayload,
	ShopState,
	UpdateCartPayload,
} from "../../types/storeTypes"
import { getExactProductInCart } from "../../utils/getExactProductInCart"

const initialState: ShopState = {
	category: "",
	currency: JSON.parse(localStorage.getItem(CURRENCY_STORAGE_KEY) || "null"),
	cart: {
		products: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]"),
		isShow: false,
	},
}

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
		setCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload
		},
		addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
			const { options, productId, prices } = action.payload
			const exactProduct = getExactProductInCart(
				state.cart.products,
				productId,
				options
			)
			if (exactProduct) {
				exactProduct.qty += 1
			} else {
				state.cart.products.unshift({ options, productId, prices, qty: 1 })
			}
			state.cart.isShow = true
		},
		toggleShowCart: state => {
			state.cart.isShow = !state.cart.isShow
		},
		updateCartQty: (state, action: PayloadAction<UpdateCartPayload>) => {
			const { newQty, options, productId } = action.payload
			const exactProduct = getExactProductInCart(
				state.cart.products,
				productId,
				options
			)
			if (newQty < 1 && exactProduct) {
				const deleteIndex = state.cart.products.indexOf(exactProduct)
				state.cart.products.splice(deleteIndex, 1)
			} else if (exactProduct) {
				exactProduct.qty = newQty
			} else {
				console.log("Product not found")
			}
		},
	},
})

export const {
	setCategory,
	setCurrency,
	addToCart,
	toggleShowCart,
	updateCartQty,
} = shopSlice.actions
export default shopSlice.reducer

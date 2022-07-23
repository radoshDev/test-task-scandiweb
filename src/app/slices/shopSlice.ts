import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Currency } from "../../types/navigationData"

const initialState = {
	category: "",
	currency: null as Currency | null,
	cart: null,
}

const shopSlice = createSlice({
	name: "count",
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
		setCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload
		},
	},
})

export const { setCategory, setCurrency } = shopSlice.actions
export default shopSlice.reducer

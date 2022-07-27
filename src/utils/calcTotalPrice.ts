import { Currency } from "../types/navigationData"
import { Cart } from "../types/storeTypes"

export const calcTotalPrice = (
	cart: Cart[],
	selectedCurrencyLabel: Currency["label"] | undefined
): number | string => {
	return cart
		.reduce((acc, curr) => {
			const price = curr.prices.find(
				item => item.currency.label === selectedCurrencyLabel
			)
			if (price) {
				return acc + price.amount * curr.qty
			}
			return acc
		}, 0)
		.toFixed(2)
}

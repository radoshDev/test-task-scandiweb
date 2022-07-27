import { Price } from "../types/product"

export const getPriceByCurrency = (
	prices: Price[],
	selectedCurrencyLabel: string | undefined
): Price | undefined => {
	return prices.find(item => item.currency.label === selectedCurrencyLabel)
}

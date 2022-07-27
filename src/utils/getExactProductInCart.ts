import { Product } from "../types/product"
import { Cart } from "../types/storeTypes"

export const getExactProductInCart = (
	cart: Cart[],
	productId: Product["id"],
	options: Cart["options"]
): Cart | undefined => {
	return cart.find(
		item =>
			item.productId === productId &&
			Object.entries(item.options).every(
				([attrId, optionId]) => options[attrId] === optionId
			)
	)
}

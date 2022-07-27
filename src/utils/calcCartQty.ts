import { Cart } from "../types/storeTypes"

export const calcCartQty = (cartProducts: Cart[]): number => {
	return cartProducts.reduce((acc, cur) => acc + cur.qty, 0)
}

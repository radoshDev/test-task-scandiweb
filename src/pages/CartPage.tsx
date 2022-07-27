import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import CartList from "../components/Cart/CartList"
import Button from "../components/ui/Button"
import { TAX_PERCENT } from "../constants"
import { RootState } from "../types/storeTypes"
import { calcCartQty } from "../utils/calcCartQty"
import { calcTotalPrice } from "../utils/calcTotalPrice"

const S = {
	CartPage: styled.div`
		padding: 80px 0;
		.cart_title {
			font-weight: 700;
			font-size: 32px;
			line-height: 1.25;
			text-transform: uppercase;
			margin-bottom: 55px;
		}
		.attribute_values {
			.attr_btn {
				cursor: default;
			}
		}
		.total {
			margin-bottom: 12px;
			tr {
				font-size: 24px;
				line-height: 1.116;

				td {
					padding: 4px 0;
					&:last-child {
						font-weight: 700;
						padding-left: 3px;
					}
				}
			}
		}
	`,
}

type Props = ConnectedProps<typeof connector>

class CartPage extends Component<Props> {
	render(): ReactNode {
		const { cartProducts, selectedCurrency } = this.props
		const totalPrice = calcTotalPrice(cartProducts, selectedCurrency?.label)
		const taxPrice = ((Number(totalPrice) * TAX_PERCENT) / 100).toFixed(2)
		const cartProductsCount = calcCartQty(cartProducts)
		return (
			<S.CartPage>
				<h1 className="cart_title">Cart</h1>
				<CartList cartProducts={cartProducts} />
				<table className="total">
					<tbody>
						<tr>
							<td>Tax {TAX_PERCENT}%:</td>
							<td>
								{selectedCurrency?.symbol}
								{taxPrice}
							</td>
						</tr>
						<tr>
							<td>Quantity:</td>
							<td>{cartProductsCount}</td>
						</tr>
						<tr>
							<td>Total:</td>
							<td>
								{selectedCurrency?.symbol}
								{totalPrice}
							</td>
						</tr>
					</tbody>
				</table>
				<Button variant="contained" width="279px" height="43px">
					Order
				</Button>
			</S.CartPage>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	cartProducts: state.shop.cart.products,
	selectedCurrency: state.shop.currency,
})

const connector = connect(mapState)

export default connector(CartPage)

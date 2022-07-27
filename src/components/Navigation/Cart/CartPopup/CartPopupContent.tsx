import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../../../types/storeTypes"
import { calcCartQty } from "../../../../utils/calcCartQty"
import { calcTotalPrice } from "../../../../utils/calcTotalPrice"
import CartList from "../../../Cart/CartList"

const S = {
	Content: styled.div`
		.title {
			margin-bottom: 32px;
			line-height: 1.6;
		}
		.total-price {
			display: flex;
			justify-content: space-between;
			font-size: 16px;
			margin-bottom: 32px;
			.total-price__title {
				font-weight: 500;
				font-family: ${p => p.theme.fonts.roboto};
			}
			.total-price__amount {
				font-weight: 700;
				font-family: ${p => p.theme.fonts.raleway};
			}
		}
		.cart_list {
			max-height: 420px;
			overflow-y: auto;
			overflow-y: overlay;
			margin-bottom: 40px;

			.cart_item {
				gap: 8px;
				overflow: hidden;
				border: none;
				padding: 0;
				&:not(:last-child) {
					margin-bottom: 40px;
				}
				.product_info {
					.product_title {
						font-size: 16px;
						line-height: 1.6;
						margin-bottom: 5px;
						.product_brand {
							display: inline;
							font-weight: 300;
						}
						.product_name {
							font-weight: 300;
						}
					}
					.price {
						font-size: 16px;
						font-weight: 500;
						line-height: 1.6;
						margin-bottom: 8px;
					}
				}
				.attribute_name {
					font-size: 14px;
					text-transform: none;
					font-family: inherit;
					font-weight: 400;
				}
				.attribute_values {
					.attr_btn {
						cursor: default;
						&.text {
							min-width: 24px;
							max-width: min-content;
							padding: 0 2px;
							height: 24px;
							margin-right: 8px;
							font-size: 14px;
							font-weight: 400;
						}
						&.color {
							margin-right: 5px;
							width: 20px;
							height: 20px;
						}
					}
				}
				.qty_action {
					.qty {
						font-size: 16px;
					}
					.btn {
						width: 24px;
						height: 24px;
						svg {
							width: 10px;
							height: 10px;
						}
					}
				}
				.product_image {
					flex-basis: 121px;
				}
			}
		}
	`,
}

type Props = ConnectedProps<typeof connector>

class CartPopupContent extends Component<Props> {
	render(): ReactNode {
		const { cartProducts, selectedCurrency } = this.props

		const totalPrice = calcTotalPrice(cartProducts, selectedCurrency?.label)
		const cartProductsCount = calcCartQty(cartProducts)
		return (
			<S.Content>
				<div className="title">
					<strong>My Bag</strong>, {cartProductsCount} item(s)
				</div>
				<CartList cartProducts={cartProducts} />
				<div className="footer">
					<div className="total-price">
						<span className="total-price__title">Total</span>
						<span className="total-price__amount">
							{selectedCurrency?.symbol}
							{totalPrice}
						</span>
					</div>
				</div>
			</S.Content>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	cartProducts: state.shop.cart.products,
	selectedCurrency: state.shop.currency,
})

const connector = connect(mapState)

export default connector(CartPopupContent)

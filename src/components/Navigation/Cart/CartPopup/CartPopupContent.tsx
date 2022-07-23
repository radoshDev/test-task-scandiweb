import { Component, ReactNode } from "react"
import styled from "styled-components"
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
		.cart_item {
			min-height: 190px;
			gap: 8px;
			overflow: hidden;
			.attr_btn {
				&.select {
					width: 24px;
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
			.qty_action {
				.btn {
					width: 24px;
					height: 24px;
					svg {
						width: 10px;
						height: 10px;
					}
				}
			}
		}
	`,
}

class CartPopupContent extends Component {
	render(): ReactNode {
		return (
			<S.Content>
				<div className="title">
					<strong>My Bag</strong>, 3 items
				</div>
				<CartList />
				<div className="footer">
					<div className="total-price">
						<span className="total-price__title">Total</span>
						<span className="total-price__amount">$200</span>
					</div>
				</div>
			</S.Content>
		)
	}
}

export default CartPopupContent

import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Button from "../../ui/Button"
import MinusIcon from "../../ui/icons/MinusIcon"
import PlusIcon from "../../ui/icons/PlusIcon"

const S = {
	CartItemQtyAction: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.btn {
			width: 45px;
			height: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			& > svg {
				width: 15px;
				height: 15px;
			}
		}
		.qty {
			font-weight: 500;
			font-size: 24px;
		}
	`,
}

type Props = {
	updateCartQty: (newQty: number) => void
	quantity: number
}

class CartItemQtyAction extends Component<Props> {
	render(): ReactNode {
		const { updateCartQty, quantity } = this.props
		return (
			<S.CartItemQtyAction className="qty_action">
				<Button
					variant="outline"
					className="btn"
					onClick={() => updateCartQty(quantity + 1)}>
					<PlusIcon />
				</Button>
				<span className="qty">{quantity}</span>
				<Button
					variant="outline"
					className="btn"
					onClick={() => updateCartQty(quantity - 1)}>
					<MinusIcon />
				</Button>
			</S.CartItemQtyAction>
		)
	}
}

export default CartItemQtyAction

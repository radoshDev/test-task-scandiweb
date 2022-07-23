import { Component, ReactNode } from "react"
import styled from "styled-components"
import CartItem from "./CartItem"

const S = {
	CartList: styled.div`
		max-height: 420px;
		overflow-y: auto;
		overflow-y: overlay;
		display: flex;
		flex-flow: column;
		gap: 40px;
		margin-bottom: 40px;
		&::-webkit-scrollbar {
			width: 0.5rem;
		}
		&::-webkit-scrollbar-thumb {
			background-color: ${p => p.theme.main.color};
		}
	`,
}

class CartList extends Component {
	render(): ReactNode {
		return (
			<S.CartList>
				<CartItem />
				<CartItem />
				<CartItem />
			</S.CartList>
		)
	}
}

export default CartList

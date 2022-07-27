import { nanoid } from "nanoid"
import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { Cart } from "../../types/storeTypes"
import CartItem from "./CartItem"

const S = {
	CartList: styled.div`
		margin-bottom: 32px;
		&::-webkit-scrollbar {
			width: 0.5rem;
		}
		&::-webkit-scrollbar-thumb {
			background-color: ${p => p.theme.main.color};
		}
	`,
}

type Props = {
	cartProducts: Cart[]
}

class CartList extends Component<Props> {
	render(): ReactNode {
		const { cartProducts } = this.props
		return (
			<S.CartList className="cart_list">
				{cartProducts.map(({ options, productId, qty }) => (
					<CartItem
						key={nanoid(4)}
						options={options}
						productId={productId}
						quantity={qty}
					/>
				))}
			</S.CartList>
		)
	}
}

export default CartList

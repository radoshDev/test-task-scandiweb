import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import CartButton from "./CartButton"
import CartPopup from "./CartPopup/CartPopup"

const S = {
	Cart: styled.div`
		position: relative;
	`,
}

type State = {
	isModal: boolean
}

type Props = Record<string, unknown>

class Cart extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			isModal: false,
		}
	}

	openModal = (): void => {
		this.setState({ isModal: true })
	}

	closeModal = (): void => {
		this.setState({ isModal: false })
	}

	render(): ReactNode {
		const { isModal } = this.state
		return (
			<S.Cart>
				<CartButton onClick={this.openModal} />
				{isModal && <CartPopup handleClose={this.closeModal} />}
			</S.Cart>
		)
	}
}

export default Cart

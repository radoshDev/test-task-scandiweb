import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import Button from "../../../ui/Button"
import Modal from "../../../ui/Modal"
import CartPopupContent from "./CartPopupContent"

const S = {
	CartPopup: styled.div`
		background-color: #fff;
		padding: 32px 16px;
		width: 325px;
		max-height: 677px;
		position: absolute;
		top: 60px;
		right: -15px;
		z-index: 3;

		.buttons_wrapper {
			*:first-child {
				margin-right: 12px;
			}
		}
	`,
	Overlay: styled.div`
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
		z-index: 2;
	`,
}

type Props = {
	handleClose: () => void
}

class CartPopup extends Component<Props> {
	render(): ReactNode {
		const { handleClose } = this.props
		return (
			<>
				<Modal>
					<S.Overlay onClick={handleClose} />
				</Modal>
				<S.CartPopup>
					<CartPopupContent />
					<div className="buttons_wrapper">
						<Button variant="outline" width="140px" height="43px">
							View Bag
						</Button>
						<Button variant="contained" width="140px" height="43px">
							Check Out
						</Button>
					</div>
				</S.CartPopup>
			</>
		)
	}
}

export default CartPopup

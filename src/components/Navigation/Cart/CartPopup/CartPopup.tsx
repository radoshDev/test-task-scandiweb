import { Component, ReactNode } from "react"
import styled from "styled-components/macro"
import { RouterProps, withRouter } from "../../../../hoc/withRouter"
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
		top: 80px;
		right: 0;
		z-index: 13;
		.buttons_wrapper {
			& > *:first-child {
				margin-right: 12px;
			}
		}
	`,
	Overlay: styled.div`
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		cursor: pointer;
		z-index: 11;
	`,
	Wrapper: styled.div`
		max-width: 1300px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(calc(-50% - 15px));
		z-index: 12;
	`,
}

type Props = {
	handleClose: () => void
	cartProductsCount: number
} & RouterProps

class CartPopup extends Component<Props> {
	componentDidMount(): void {
		document.body.style.overflow = "hidden"
	}

	componentWillUnmount(): void {
		document.body.style.overflow = "initial"
	}

	openCartPage = (): void => {
		const { handleClose, navigate } = this.props
		handleClose()
		navigate("/cart")
	}

	render(): ReactNode {
		const { handleClose, cartProductsCount } = this.props
		const isProductsInCart = cartProductsCount > 0
		return (
			<Modal>
				<S.Overlay onClick={handleClose} />
				<S.Wrapper>
					<S.CartPopup>
						{isProductsInCart ? (
							<>
								<CartPopupContent />
								<div className="buttons_wrapper">
									<Button
										variant="outline"
										width="140px"
										height="43px"
										onClick={this.openCartPage}>
										View Bag
									</Button>
									<Button variant="contained" width="140px" height="43px">
										Check Out
									</Button>
								</div>
							</>
						) : (
							<div>Cart is empty</div>
						)}
					</S.CartPopup>
				</S.Wrapper>
			</Modal>
		)
	}
}

export default withRouter(CartPopup)

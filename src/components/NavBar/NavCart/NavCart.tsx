import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components/macro"
import { setIsShowCart } from "../../../app/slices/shopSlice"
import { RootState } from "../../../types/storeTypes"
import { calcCartQty } from "../../../utils/calcCartQty"
import CartPopup from "./CartPopup/CartPopup"
import NavCartButton from "./NavCartButton"

const S = {
	NavCart: styled.div`
		position: relative;
	`,
}

type Props = ConnectedProps<typeof connector>

class NavCart extends Component<Props> {
	render(): ReactNode {
		const { isShowCart, cartProductsCount, setIsShowCartModal } = this.props

		const toggleShowModal = (): void => {
			if (isShowCart) {
				setIsShowCartModal(false)
			} else {
				setIsShowCartModal(true)
			}
		}
		return (
			<S.NavCart>
				<NavCartButton
					cartProductsCount={cartProductsCount}
					toggleShowModal={toggleShowModal}
				/>
				{isShowCart && (
					<CartPopup
						handleClose={() => setIsShowCartModal(false)}
						cartProductsCount={cartProductsCount}
					/>
				)}
			</S.NavCart>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	isShowCart: state.shop.cart.isShow,
	cartProductsCount: calcCartQty(state.shop.cart.products),
})

const mapDispatch = {
	setIsShowCartModal: setIsShowCart,
}

const connector = connect(mapState, mapDispatch)

export default connector(NavCart)

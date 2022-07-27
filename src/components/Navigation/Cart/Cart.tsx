import { Component, ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components/macro"
import { toggleShowCart } from "../../../app/slices/shopSlice"
import { RootState } from "../../../types/storeTypes"
import { calcCartQty } from "../../../utils/calcCartQty"
import CartButton from "./CartButton"
import CartPopup from "./CartPopup/CartPopup"

const S = {
	Cart: styled.div`
		position: relative;
	`,
}

type Props = ConnectedProps<typeof connector>

class Cart extends Component<Props> {
	render(): ReactNode {
		const { isShowCart, cartProductsCount, toggleCartModal } = this.props
		return (
			<S.Cart>
				<CartButton
					cartProductsCount={cartProductsCount}
					handleOpenCart={() => toggleCartModal()}
				/>
				{isShowCart && (
					<CartPopup
						handleClose={() => toggleCartModal()}
						cartProductsCount={cartProductsCount}
					/>
				)}
			</S.Cart>
		)
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = (state: RootState) => ({
	isShowCart: state.shop.cart.isShow,
	cartProductsCount: calcCartQty(state.shop.cart.products),
})

const mapDispatch = {
	toggleCartModal: toggleShowCart,
}

const connector = connect(mapState, mapDispatch)

export default connector(Cart)
